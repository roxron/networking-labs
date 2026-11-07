import https from 'node:https';
import net from 'node:net';
import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { WebSocketServer } from 'ws';

const listenHost = process.env.RELAY_GATEWAY_HOST || '0.0.0.0',
  listenPort = Number(process.env.RELAY_GATEWAY_PORT || 3001);
const sessionTtl = 12 * 60 * 60 * 1000,
  sessions = new Map(),
  loginAttempts = new Map();
const appDir = path.dirname(fileURLToPath(import.meta.url));
const dataDir = process.env.RELAY_DATA_DIR || path.join(appDir, 'data');
const tls = {
  key: fs.readFileSync(process.env.RELAY_TLS_KEY || path.join(appDir, 'certs/relay-console-key.pem')),
  cert: fs.readFileSync(process.env.RELAY_TLS_CERT || path.join(appDir, 'certs/relay-console-cert.pem')),
};
const usersFile = path.join(dataDir, 'users.json');
function passwordHash(password, salt = crypto.randomBytes(16).toString('hex')) {
  return {
    salt,
    hash: crypto.scryptSync(String(password), salt, 64).toString('hex'),
  };
}
function loadUsers() {
  try {
    return JSON.parse(fs.readFileSync(usersFile, 'utf8'));
  } catch {
    fs.mkdirSync(dataDir, { recursive: true });
    const credentials = passwordHash(process.env.RELAY_PASSWORD || 'relay');
    const users = [
      {
        username: process.env.RELAY_USERNAME || 'admin',
        role: 'admin',
        ...credentials,
      },
    ];
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), {
      mode: 0o600,
    });
    return users;
  }
}
let localUsers = loadUsers();
function saveUsers() {
  const temporary = path.join(dataDir, 'users.json.tmp');
  fs.writeFileSync(temporary, JSON.stringify(localUsers, null, 2), {
    mode: 0o600,
  });
  fs.renameSync(temporary, usersFile);
}
function publicUser(user) {
  return { username: user.username, role: user.role };
}
function validPassword(user, password) {
  const candidate = passwordHash(password, user.salt).hash;
  return safeEqual(candidate, user.hash);
}
const eveConfigFile = path.join(dataDir, 'eve-config.enc.json');
const configKey = crypto.createHash('sha256').update(tls.key).digest();
function loadEveConfig() {
  try {
    const stored = JSON.parse(fs.readFileSync(eveConfigFile, 'utf8'));
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      configKey,
      Buffer.from(stored.iv, 'base64'),
    );
    decipher.setAuthTag(Buffer.from(stored.tag, 'base64'));
    return JSON.parse(
      Buffer.concat([
        decipher.update(Buffer.from(stored.data, 'base64')),
        decipher.final(),
      ]).toString('utf8'),
    );
  } catch {
    return {};
  }
}
function saveEveConfig() {
  fs.mkdirSync(dataDir, { recursive: true });
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', configKey, iv);
  const data = Buffer.concat([
    cipher.update(
      JSON.stringify({
        baseUrl: eveBase,
        username: eveUser,
        password: evePassword,
        labName: targetLab,
      }),
    ),
    cipher.final(),
  ]);
  fs.writeFileSync(
    eveConfigFile,
    JSON.stringify({
      iv: iv.toString('base64'),
      tag: cipher.getAuthTag().toString('base64'),
      data: data.toString('base64'),
    }),
    { mode: 0o600 },
  );
}
const savedEveConfig = loadEveConfig();
let eveBase = (
  savedEveConfig.baseUrl ||
  process.env.EVE_BASE_URL ||
  'https://eve-ng.local'
).replace(/\/$/, '');
let eveHost = new URL(eveBase).hostname;
let eveUser = savedEveConfig.username || process.env.EVE_USERNAME || '';
let evePassword = savedEveConfig.password || process.env.EVE_PASSWORD || '';
let targetLab = savedEveConfig.labName || process.env.EVE_LAB_NAME || '';
let eveConnected = false;
const IAC = 255,
  DONT = 254,
  DO = 253,
  WONT = 252,
  WILL = 251;
let sessionCookie = '';
const cookieJar = new Map();
function updateCookies(values = []) {
  for (const value of values) {
    const pair = value.split(';')[0],
      index = pair.indexOf('=');
    if (index > 0) cookieJar.set(pair.slice(0, index), pair.slice(index + 1));
  }
  sessionCookie = [...cookieJar]
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');
}

function eveRequest(path, { method = 'GET', body } = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, eveBase);
    const payload = body ? JSON.stringify(body) : null;
    const req = https.request(
      url,
      {
        method,
        rejectUnauthorized: false,
        headers: {
          'Content-Type': 'application/json',
          ...(sessionCookie ? { Cookie: sessionCookie } : {}),
          ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
        },
      },
      (res) => {
        const chunks = [];
        res.on('data', (d) => chunks.push(d));
        res.on('end', () => {
          const raw = Buffer.concat(chunks).toString();
          updateCookies(res.headers['set-cookie']);
          try {
            const parsed = JSON.parse(raw);
            if (res.statusCode >= 400 || parsed.status === 'unauthorized')
              reject(
                new Error(
                  parsed.message || `EVE-NG returned ${res.statusCode}`,
                ),
              );
            else resolve(parsed);
          } catch (error) {
            reject(
              error instanceof SyntaxError
                ? new Error(`Invalid EVE-NG response (${res.statusCode})`)
                : error,
            );
          }
        });
      },
    );
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}
async function login() {
  if (!eveUser || !evePassword)
    throw new Error(
      'Set EVE_USERNAME and EVE_PASSWORD in the gateway environment.',
    );
  await eveRequest('/api/auth/login', {
    method: 'POST',
    body: { username: eveUser, password: evePassword, html5: '0' },
  });
}
async function authenticated(path) {
  if (!eveConnected) throw new Error('EVE-NG is disconnected.');
  try {
    return await eveRequest(path);
  } catch (error) {
    if (!/401|login|unauthor/i.test(error.message)) throw error;
    sessionCookie = '';
    cookieJar.clear();
    await login();
    return eveRequest(path);
  }
}
async function runningNodes() {
  if (!eveConnected) throw new Error('EVE-NG is disconnected.');
  if (!sessionCookie) await login();
  const running = await authenticated('/api/folders/Running');
  let labs = running.data?.labs || [];
  if (targetLab)
    labs = labs.filter(
      (l) => l.file === targetLab || l.file === `${targetLab}.unl`,
    );
  const result = [];
  for (const lab of labs) {
    const labPath = String(lab.path)
      .replace(/^\//, '')
      .split('/')
      .map(encodeURIComponent)
      .join('/');
    const response = await authenticated(`/api/labs/${labPath}/nodes`);
    for (const node of Object.values(response.data || {})) {
      if (Number(node.status) !== 2 || node.console !== 'telnet' || !node.url)
        continue;
      const consoleUrl = new URL(node.url);
      result.push({
        id: `${lab.path}:${node.id}`,
        nodeId: node.id,
        labPath: lab.path,
        name: node.name,
        lab: lab.file.replace(/\.unl$/, ''),
        host: eveHost,
        port: Number(consoleUrl.port),
        type: node.type,
        console: node.console,
      });
    }
  }
  return result;
}
async function labTopology(requestedLabPath) {
  if (!eveConnected) throw new Error('EVE-NG is disconnected.');
  if (!sessionCookie) await login();
  const running = await authenticated('/api/folders/Running');
  const labs = running.data?.labs || [];
  const lab = labs.find((item) => String(item.path) === requestedLabPath);
  if (!lab) throw new Error('The selected running lab was not found.');
  const labPath = String(lab.path).replace(/^\//, '').split('/').map(encodeURIComponent).join('/');
  const nodeResponse = await authenticated(`/api/labs/${labPath}/nodes`);
  const topologyResponse = await authenticated(`/api/labs/${labPath}/topology`);
  const rawNodes = Object.values(nodeResponse.data || {});
  const nodes = rawNodes.map((node) => ({
    id: String(node.id),
    name: String(node.name || `Node ${node.id}`),
    left: Number.parseFloat(node.left) || 0,
    top: Number.parseFloat(node.top) || 0,
    status: Number(node.status) || 0,
  }));
  const interfaceMaps = new Map();
  await Promise.all(rawNodes.map(async (node) => {
    try {
      const response = await authenticated(`/api/labs/${labPath}/nodes/${node.id}/interfaces`);
      const entries = [...(response.data?.ethernet || []), ...(response.data?.serial || [])];
      for (const item of entries) {
        const networkId = String(item.network_id ?? item.id ?? '');
        if (!networkId || networkId === '0') continue;
        const list = interfaceMaps.get(networkId) || [];
        list.push({ nodeId: String(node.id), name: String(item.name || '') });
        interfaceMaps.set(networkId, list);
      }
    } catch {}
  }));
  const links = [];
  for (const endpoints of interfaceMaps.values()) {
    for (let index = 0; index < endpoints.length; index += 1) {
      for (let other = index + 1; other < endpoints.length; other += 1) {
        links.push({
          source: endpoints[index].nodeId,
          target: endpoints[other].nodeId,
          sourceInterface: endpoints[index].name,
          targetInterface: endpoints[other].name,
        });
      }
    }
  }
  if (!links.length && Array.isArray(topologyResponse.data)) {
    for (const item of topologyResponse.data) {
      const source = String(item.source || '').replace(/^node/, '');
      const target = String(item.destination || '').replace(/^node/, '');
      if (nodes.some((node) => node.id === source) && nodes.some((node) => node.id === target))
        links.push({ source, target });
    }
  }
  return { labPath: lab.path, nodes, links };
}
function stripTelnet(data, socket) {
  const output = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i] !== IAC) {
      output.push(data[i]);
      continue;
    }
    const command = data[++i];
    if (command === IAC) {
      output.push(IAC);
      continue;
    }
    if ([DO, DONT, WILL, WONT].includes(command)) {
      const option = data[++i];
      socket.write(
        Buffer.from([
          IAC,
          command === DO || command === DONT ? WONT : DONT,
          option,
        ]),
      );
    }
  }
  return Buffer.from(output);
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 16384) {
        reject(new Error('Request is too large.'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(raw || '{}'));
      } catch {
        reject(new Error('Invalid JSON request.'));
      }
    });
    req.on('error', reject);
  });
}
function safeEqual(left, right) {
  const a = Buffer.from(String(left)),
    b = Buffer.from(String(right));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
function cookies(req) {
  return Object.fromEntries(
    String(req.headers.cookie || '')
      .split(';')
      .map((value) => value.trim().split('='))
      .filter(([key, value]) => key && value),
  );
}
function authenticatedRequest(req) {
  const token = cookies(req).relay_session,
    session = token && sessions.get(token);
  if (
    !session ||
    session.expires < Date.now() ||
    !localUsers.some((user) => user.username === session.username)
  ) {
    if (token) sessions.delete(token);
    return null;
  }
  session.expires = Date.now() + sessionTtl;
  return localUsers.find((user) => user.username === session.username) || null;
}
function createSession(res, username) {
  const token = crypto.randomBytes(32).toString('base64url');
  sessions.set(token, { username, expires: Date.now() + sessionTtl });
  res.setHeader(
    'Set-Cookie',
    `relay_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${sessionTtl / 1000}`,
  );
}
function clearSession(req, res) {
  const token = cookies(req).relay_session;
  if (token) sessions.delete(token);
  res.setHeader(
    'Set-Cookie',
    'relay_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0',
  );
}
function clientAddress(req) {
  return req.socket.remoteAddress || 'unknown';
}
function loginAllowed(req) {
  const state = loginAttempts.get(clientAddress(req));
  return !state || state.blockedUntil < Date.now();
}
function failedLogin(req) {
  const key = clientAddress(req),
    now = Date.now(),
    prior = loginAttempts.get(key);
  const count = !prior || prior.blockedUntil < now ? 1 : prior.count + 1;
  loginAttempts.set(key, {
    count,
    blockedUntil: count >= 5 ? now + 15 * 60 * 1000 : now,
  });
}
function configureEve(body) {
  const baseUrl = String(body.baseUrl || '')
    .trim()
    .replace(/\/$/, '');
  const username = String(body.username || '').trim();
  const password = body.password === undefined || String(body.password) === ''
    ? evePassword
    : String(body.password);
  const labName = String(body.labName || '').trim();
  const parsed = new URL(baseUrl);
  if (!['http:', 'https:'].includes(parsed.protocol))
    throw new Error('EVE-NG host must use http:// or https://.');
  if (!username) throw new Error('Username is required.');
  if (!password) throw new Error('Password is required for the initial setup.');
  const connectionChanged = eveBase !== baseUrl || eveUser !== username || evePassword !== password;
  eveBase = baseUrl;
  eveHost = parsed.hostname;
  eveUser = username;
  evePassword = password;
  targetLab = labName;
  if (connectionChanged) {
    eveConnected = false;
    sessionCookie = '';
    cookieJar.clear();
  }
  saveEveConfig();
  return { baseUrl: eveBase, username: eveUser, labName: targetLab, configured: true, connected: eveConnected };
}
async function connectEve() {
  if (!eveUser || !evePassword) throw new Error('Save EVE-NG credentials before connecting.');
  sessionCookie = '';
  cookieJar.clear();
  try {
    await login();
    eveConnected = true;
    return { connected: true };
  } catch (error) {
    eveConnected = false;
    sessionCookie = '';
    cookieJar.clear();
    throw error;
  }
}
function disconnectEve() {
  eveConnected = false;
  sessionCookie = '';
  cookieJar.clear();
  for (const session of terminalSessions.values()) session.socket?.destroy();
  return { connected: false };
}

async function githubFetch(url, { json = false, maxBytes = 2_000_000 } = {}) {
  const response = await fetch(url, {
    headers: {
      Accept: json ? 'application/vnd.github+json' : 'text/plain',
      'User-Agent': 'Relay-Console',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    redirect: 'follow',
  });
  if (!response.ok) {
    if (response.status === 404) throw new Error('GitHub repository or lab file was not found. Public repositories are supported in this version.');
    if (response.status === 403) throw new Error('GitHub declined the request or its anonymous API limit was reached. Try again later.');
    throw new Error(`GitHub returned HTTP ${response.status}.`);
  }
  const declaredSize = Number(response.headers.get('content-length') || 0);
  if (declaredSize > maxBytes) throw new Error('The GitHub lab file is too large to display.');
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength > maxBytes) throw new Error('The GitHub response is too large to display.');
  const text = new TextDecoder().decode(bytes);
  return json ? JSON.parse(text) : text;
}

function githubRawUrl(owner, repo, ref, filePath) {
  const encodedPath = filePath.split('/').filter(Boolean).map(encodeURIComponent).join('/');
  return `https://raw.githubusercontent.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${encodeURIComponent(ref)}/${encodedPath}`;
}

async function githubTextFile(input) {
  let url;
  try { url = new URL(String(input || '').trim()); } catch { throw new Error('Enter a valid GitHub file URL.'); }
  if (!['github.com', 'www.github.com', 'raw.githubusercontent.com'].includes(url.hostname))
    throw new Error('Only GitHub file links are supported.');
  const parts = url.pathname.split('/').filter(Boolean).map(decodeURIComponent);
  let owner, repo, ref, filePath;
  if (url.hostname === 'raw.githubusercontent.com') {
    if (parts.length < 4) throw new Error('The raw GitHub URL must identify a file.');
    [owner, repo, ref] = parts;
    filePath = parts.slice(3).join('/');
  } else {
    if (parts.length < 5 || parts[2] !== 'blob') throw new Error('The GitHub URL must identify a repository file.');
    owner = parts[0];
    repo = parts[1].replace(/\.git$/, '');
    ref = parts[3];
    filePath = parts.slice(4).join('/');
  }
  if (!/^[A-Za-z0-9_.-]+$/.test(owner) || !/^[A-Za-z0-9_.-]+$/.test(repo) || !filePath)
    throw new Error('The GitHub file URL is invalid.');
  const content = await githubFetch(githubRawUrl(owner, repo, ref, filePath));
  return {
    path: filePath,
    name: filePath.split('/').pop(),
    sourceUrl: `https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/blob/${encodeURIComponent(ref)}/${filePath.split('/').map(encodeURIComponent).join('/')}`,
    content,
  };
}

async function githubLab(input) {
  let url;
  try { url = new URL(String(input || '').trim()); } catch { throw new Error('Enter a valid GitHub repository or Markdown file URL.'); }
  if (!['github.com', 'www.github.com', 'raw.githubusercontent.com'].includes(url.hostname))
    throw new Error('Only github.com lab links are supported.');
  const parts = url.pathname.split('/').filter(Boolean).map(decodeURIComponent);
  if (parts.length < 2) throw new Error('The GitHub URL must include an owner and repository.');
  const owner = parts[0], repo = parts[1].replace(/\.git$/, '');
  if (!/^[A-Za-z0-9_.-]+$/.test(owner) || !/^[A-Za-z0-9_.-]+$/.test(repo))
    throw new Error('The GitHub owner or repository name is invalid.');

  let ref = '';
  let requestedPath = '';
  let exactMarkdown = false;
  if (url.hostname === 'raw.githubusercontent.com') {
    if (parts.length < 4) throw new Error('The raw GitHub URL must identify a file.');
    ref = parts[2];
    requestedPath = parts.slice(3).join('/');
    exactMarkdown = /\.md$/i.test(requestedPath);
  } else if (parts[2] === 'blob') {
    if (parts.length < 5) throw new Error('The GitHub file URL is incomplete.');
    ref = parts[3];
    requestedPath = parts.slice(4).join('/');
    exactMarkdown = /\.md$/i.test(requestedPath);
  } else if (parts[2] === 'tree') {
    ref = parts[3] || '';
    requestedPath = parts.slice(4).join('/').replace(/\/$/, '');
  }

  if (!ref) {
    const repository = await githubFetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`, { json: true });
    ref = repository.default_branch;
  }

  let instructionPath = requestedPath;
  let files = [];
  if (!exactMarkdown) {
    const tree = await githubFetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/trees/${encodeURIComponent(ref)}?recursive=1`, { json: true, maxBytes: 5_000_000 });
    const prefix = requestedPath ? `${requestedPath}/` : '';
    const blobs = (tree.tree || []).filter((item) => item.type === 'blob' && (!prefix || item.path.startsWith(prefix)));
    const markdownFiles = blobs.filter((item) => /\.md$/i.test(item.path));
    if (!markdownFiles.length) throw new Error('No Markdown instruction file was found in this GitHub location.');
    const priority = ['INSTRUCTIONS.MD', 'LAB.MD', 'README.MD', 'TASKS.MD'];
    markdownFiles.sort((a, b) => {
      const aName = a.path.split('/').pop().toUpperCase(), bName = b.path.split('/').pop().toUpperCase();
      const aRank = priority.includes(aName) ? priority.indexOf(aName) : priority.length;
      const bRank = priority.includes(bName) ? priority.indexOf(bName) : priority.length;
      return aRank - bRank || a.path.length - b.path.length || a.path.localeCompare(b.path);
    });
    instructionPath = markdownFiles[0].path;
    files = blobs
      .filter((item) => /(^|\/)(configs?|startup-configs?)\//i.test(item.path) || /\.(cfg|conf|config|txt)$/i.test(item.path))
      .slice(0, 250)
      .map((item) => ({ path: item.path, url: githubRawUrl(owner, repo, ref, item.path) }));
  }
  if (!/\.md$/i.test(instructionPath)) throw new Error('Select a Markdown file or a repository containing lab instructions.');
  const markdown = await githubFetch(githubRawUrl(owner, repo, ref, instructionPath));
  const heading = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim();
  const sourceUrl = `https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/blob/${encodeURIComponent(ref)}/${instructionPath.split('/').map(encodeURIComponent).join('/')}`;
  return {
    title: heading || instructionPath.split('/').pop().replace(/\.md$/i, ''),
    repository: `${owner}/${repo}`,
    sourceUrl,
    markdown,
    files,
  };
}
const server = https.createServer(tls, async (req, res) => {
  const origin = req.headers.origin;
  if (origin) {
    try {
      const originUrl = new URL(origin);
      const requestHost = new URL(`https://${req.headers.host}`).hostname;
      if (originUrl.protocol === 'https:' && originUrl.port === '3000' && originUrl.hostname === requestHost)
        res.setHeader('Access-Control-Allow-Origin', origin);
    } catch {}
  }
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PATCH,DELETE,OPTIONS',
  );
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }
  if (req.method === 'POST' && req.url === '/api/auth/login') {
    if (!loginAllowed(req)) {
      res.statusCode = 429;
      res.end(
        JSON.stringify({
          status: 'error',
          message: 'Too many failed attempts. Try again in 15 minutes.',
        }),
      );
      return;
    }
    const body = await readJson(req),
      user = localUsers.find(
        (item) => item.username === String(body.username || ''),
      );
    if (!user || !validPassword(user, body.password)) {
      failedLogin(req);
      res.statusCode = 401;
      res.end(
        JSON.stringify({
          status: 'error',
          message: 'Incorrect username or password.',
        }),
      );
      return;
    }
    loginAttempts.delete(clientAddress(req));
    createSession(res, user.username);
    res.end(JSON.stringify({ status: 'success', data: publicUser(user) }));
    return;
  }
  if (req.method === 'POST' && req.url === '/api/auth/logout') {
    clearSession(req, res);
    res.end(JSON.stringify({ status: 'success' }));
    return;
  }
  if (req.method === 'GET' && req.url === '/api/auth/status') {
    const user = authenticatedRequest(req);
    res.statusCode = user ? 200 : 401;
    res.end(
      JSON.stringify({
        status: user ? 'success' : 'error',
        authenticated: Boolean(user),
        data: user ? publicUser(user) : null,
      }),
    );
    return;
  }
  const signedInUser = authenticatedRequest(req);
  if (!signedInUser) {
    res.statusCode = 401;
    res.end(
      JSON.stringify({ status: 'error', message: 'Authentication required.' }),
    );
    return;
  }
  if (req.method === 'POST' && req.url === '/api/auth/password') {
    const body = await readJson(req);
    if (!validPassword(signedInUser, body.currentPassword)) {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          status: 'error',
          message: 'Current password is incorrect.',
        }),
      );
      return;
    }
    if (String(body.newPassword ?? '') === '') {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          status: 'error',
          message: 'New password cannot be blank.',
        }),
      );
      return;
    }
    Object.assign(signedInUser, passwordHash(body.newPassword));
    saveUsers();
    res.end(JSON.stringify({ status: 'success' }));
    return;
  }
  if (req.url === '/api/users' && req.method === 'GET') {
    if (signedInUser.role !== 'admin') {
      res.statusCode = 403;
      res.end(
        JSON.stringify({
          status: 'error',
          message: 'Administrator access required.',
        }),
      );
      return;
    }
    res.end(
      JSON.stringify({ status: 'success', data: localUsers.map(publicUser) }),
    );
    return;
  }
  if (req.url === '/api/users' && req.method === 'POST') {
    if (signedInUser.role !== 'admin') {
      res.statusCode = 403;
      res.end(
        JSON.stringify({
          status: 'error',
          message: 'Administrator access required.',
        }),
      );
      return;
    }
    const body = await readJson(req),
      username = String(body.username || '').trim();
    if (!/^[a-zA-Z0-9._-]{3,32}$/.test(username)) {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          status: 'error',
          message:
            'Username must be 3–32 letters, numbers, dots, dashes, or underscores.',
        }),
      );
      return;
    }
    if (
      localUsers.some(
        (user) => user.username.toLowerCase() === username.toLowerCase(),
      )
    ) {
      res.statusCode = 409;
      res.end(
        JSON.stringify({
          status: 'error',
          message: 'That username already exists.',
        }),
      );
      return;
    }
    if (String(body.password ?? '') === '') {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          status: 'error',
          message: 'Password cannot be blank.',
        }),
      );
      return;
    }
    const created = {
      username,
      role: body.role === 'admin' ? 'admin' : 'user',
      ...passwordHash(body.password),
    };
    localUsers.push(created);
    saveUsers();
    res.statusCode = 201;
    res.end(JSON.stringify({ status: 'success', data: publicUser(created) }));
    return;
  }
  const userMatch = req.url.match(/^\/api\/users\/([^/]+)$/);
  if (userMatch && signedInUser.role === 'admin') {
    const username = decodeURIComponent(userMatch[1]),
      target = localUsers.find((user) => user.username === username);
    if (!target) {
      res.statusCode = 404;
      res.end(JSON.stringify({ status: 'error', message: 'User not found.' }));
      return;
    }
    if (req.method === 'PATCH') {
      const body = await readJson(req);
      if (body.password !== undefined) {
        if (String(body.password) === '') {
          res.statusCode = 400;
          res.end(
            JSON.stringify({
              status: 'error',
              message: 'Password cannot be blank.',
            }),
          );
          return;
        }
        Object.assign(target, passwordHash(body.password));
      }
      if (body.role === 'admin' || body.role === 'user') {
        if (
          target.role === 'admin' &&
          body.role === 'user' &&
          localUsers.filter((user) => user.role === 'admin').length === 1
        ) {
          res.statusCode = 400;
          res.end(
            JSON.stringify({
              status: 'error',
              message: 'At least one administrator is required.',
            }),
          );
          return;
        }
        target.role = body.role;
      }
      saveUsers();
      res.end(JSON.stringify({ status: 'success', data: publicUser(target) }));
      return;
    }
    if (req.method === 'DELETE') {
      if (target.username === signedInUser.username) {
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            status: 'error',
            message: 'You cannot delete your own account.',
          }),
        );
        return;
      }
      if (
        target.role === 'admin' &&
        localUsers.filter((user) => user.role === 'admin').length === 1
      ) {
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            status: 'error',
            message: 'The final administrator cannot be deleted.',
          }),
        );
        return;
      }
      localUsers = localUsers.filter((user) => user !== target);
      for (const [token, session] of sessions)
        if (session.username === target.username) sessions.delete(token);
      saveUsers();
      res.end(JSON.stringify({ status: 'success' }));
      return;
    }
  }
  if (req.method === 'GET' && req.url === '/api/eve/config') {
    res.end(
      JSON.stringify({
        status: 'success',
        data: {
          baseUrl: eveBase,
          username: eveUser,
          labName: targetLab,
          configured: Boolean(eveUser && evePassword),
          connected: eveConnected,
        },
      }),
    );
    return;
  }
  if (req.method === 'GET' && req.url?.startsWith('/api/github/lab?')) {
    try {
      const requestUrl = new URL(req.url, 'https://localhost');
      const sourceUrl = requestUrl.searchParams.get('url');
      if (!sourceUrl) throw new Error('A GitHub lab URL is required.');
      res.end(JSON.stringify({ status: 'success', data: await githubLab(sourceUrl) }));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ status: 'error', message: error.message }));
    }
    return;
  }
  if (req.method === 'GET' && req.url?.startsWith('/api/github/file?')) {
    try {
      const requestUrl = new URL(req.url, 'https://localhost');
      const sourceUrl = requestUrl.searchParams.get('url');
      if (!sourceUrl) throw new Error('A GitHub file URL is required.');
      res.end(JSON.stringify({ status: 'success', data: await githubTextFile(sourceUrl) }));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ status: 'error', message: error.message }));
    }
    return;
  }
  if (req.method === 'POST' && req.url === '/api/eve/config') {
    try {
      const data = await configureEve(await readJson(req));
      res.end(JSON.stringify({ status: 'success', data }));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ status: 'error', message: error.message }));
    }
    return;
  }
  if (req.method === 'POST' && req.url === '/api/eve/connect') {
    try {
      res.end(JSON.stringify({ status: 'success', data: await connectEve() }));
    } catch (error) {
      res.statusCode = 502;
      res.end(JSON.stringify({ status: 'error', message: error.message }));
    }
    return;
  }
  if (req.method === 'POST' && req.url === '/api/eve/disconnect') {
    res.end(JSON.stringify({ status: 'success', data: disconnectEve() }));
    return;
  }
  if (req.method === 'GET' && req.url === '/api/eve/running-nodes') {
    try {
      res.end(
        JSON.stringify({ status: 'success', data: await runningNodes() }),
      );
    } catch (error) {
      res.statusCode = 502;
      res.end(JSON.stringify({ status: 'error', message: error.message }));
    }
    return;
  }
  if (req.method === 'GET' && req.url?.startsWith('/api/eve/topology?')) {
    try {
      const requestUrl = new URL(req.url, 'https://localhost');
      const labPath = requestUrl.searchParams.get('lab');
      if (!labPath) throw new Error('A lab path is required.');
      res.end(JSON.stringify({ status: 'success', data: await labTopology(labPath) }));
    } catch (error) {
      res.statusCode = 502;
      res.end(JSON.stringify({ status: 'error', message: error.message }));
    }
    return;
  }
  res.statusCode = 404;
  res.end(JSON.stringify({ status: 'error', message: 'Not found' }));
});
const terminalSessions = new Map();
function terminalSession(port) {
  const key = `${eveHost}:${port}`;
  const existing = terminalSessions.get(key);
  if (existing) return existing;
  const session = {
    key,
    port,
    telnet: net.createConnection({ host: eveHost, port, timeout: 10000 }),
    clients: new Set(),
    history: Buffer.alloc(0),
    connected: false,
  };
  terminalSessions.set(key, session);
  session.telnet.on('connect', () => {
    session.telnet.setTimeout(0);
    session.connected = true;
    for (const client of session.clients)
      if (client.readyState === 1)
        client.send(JSON.stringify({ type: 'status', value: 'connected' }));
  });
  session.telnet.on('data', (data) => {
    const clean = stripTelnet(data, session.telnet);
    if (!clean.length) return;
    session.history = Buffer.concat([session.history, clean]).subarray(
      -1024 * 1024,
    );
    for (const client of session.clients)
      if (client.readyState === 1) client.send(clean);
  });
  session.telnet.on('timeout', () => {
    for (const client of session.clients)
      if (client.readyState === 1)
        client.send(
          JSON.stringify({
            type: 'error',
            value: 'Connection timed out while opening the console.',
          }),
        );
    session.telnet.destroy();
  });
  session.telnet.on('error', (error) => {
    for (const client of session.clients)
      if (client.readyState === 1)
        client.send(JSON.stringify({ type: 'error', value: error.message }));
  });
  session.telnet.on('close', () => {
    terminalSessions.delete(key);
    for (const client of session.clients)
      if (client.readyState === 1) client.close(1000, 'Telnet session closed.');
  });
  return session;
}
const sockets = new WebSocketServer({ noServer: true });
server.on('upgrade', (req, socket, head) => {
  const url = new URL(req.url, `https://${listenHost}`);
  const host = url.searchParams.get('host'),
    port = Number(url.searchParams.get('port'));
  if (!authenticatedRequest(req)) {
    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
    socket.destroy();
    return;
  }
  if (host !== eveHost || !Number.isInteger(port) || port < 1 || port > 65535) {
    socket.write('HTTP/1.1 403 Forbidden\r\n\r\n');
    socket.destroy();
    return;
  }
  sockets.handleUpgrade(req, socket, head, (ws) =>
    sockets.emit('connection', ws, req),
  );
});
sockets.on('connection', (websocket, request) => {
  const url = new URL(request.url, `https://${listenHost}`),
    port = Number(url.searchParams.get('port')),
    session = terminalSession(port);
  session.clients.add(websocket);
  if (session.history.length) websocket.send(session.history);
  if (session.connected)
    websocket.send(JSON.stringify({ type: 'status', value: 'connected' }));
  websocket.on(
    'message',
    (message) => session.telnet.writable && session.telnet.write(message),
  );
  websocket.on('close', () => session.clients.delete(websocket));
});
server.listen(listenPort, listenHost, () =>
  console.log(
    `Relay gateway ready at https://${listenHost}:${listenPort}; EVE-NG host: ${eveHost}`,
  ),
);

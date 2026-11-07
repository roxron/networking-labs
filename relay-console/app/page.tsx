'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  CircleDot,
  Copy,
  Ellipsis,
  GitFork,
  LockKeyhole,
  LogOut,
  Network,
  PanelLeftClose,
  Plus,
  Power,
  Router,
  Search,
  Settings,
  ShieldCheck,
  TerminalSquare,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Slider } from '@/components/ui/slider';
import { TerminalPane } from '@/components/terminal-pane';
import { TopologyWindow, type TopologyData } from '@/components/topology-window';
import { LabGuideWindow, type LabGuide } from '@/components/lab-guide-window';
import { UserManagement } from '@/components/user-management';

type Session = {
  id: number | string;
  name: string;
  group: string;
  host: string;
  port: number;
  status: 'connected' | 'idle';
  color: string;
  nodeId?: string;
  labPath?: string;
};
type LabHistoryEntry = {
  url: string;
  title: string;
  repository: string;
  openedAt: number;
};
const initial: Session[] = [];
const transcripts: Record<number, string[]> = {
  1: [
    'Connecting to 10.20.0.12:32769...',
    'Connected to EVE-NG console.',
    '',
    'CORE-RTR-01# show ip interface brief',
    'Interface              IP-Address      OK? Method Status                Protocol',
    'GigabitEthernet0/0     10.10.0.1      YES manual up                    up',
    'GigabitEthernet0/1     172.16.0.1     YES manual up                    up',
    'Loopback0              1.1.1.1        YES manual up                    up',
    '',
    'CORE-RTR-01#',
  ],
  2: [
    'Connected to EVE-NG console.',
    '',
    'CORE-RTR-02# show ip ospf neighbor',
    'Neighbor ID     Pri   State           Dead Time   Address         Interface',
    '1.1.1.1           1   FULL/DR         00:00:33    172.16.0.1      Gi0/1',
    '',
    'CORE-RTR-02#',
  ],
  3: [
    'Connected to EVE-NG console.',
    '',
    'EDGE-RTR-01# show ip route summary',
    'IP routing table name is default (0x0)',
    'Route Source    Networks    Subnets     Replicates  Overhead    Memory (bytes)',
    'connected       0           5           0           480         1320',
    'static          1           0           0           96          264',
    '',
    'EDGE-RTR-01#',
  ],
  4: ['Session saved. Select Connect to open the Telnet console.'],
  5: [
    'Connected to EVE-NG console.',
    '',
    'FW-ASA-01# show interface ip brief',
    'Interface                  IP-Address      OK? Method Status                Protocol',
    'GigabitEthernet0/0         203.0.113.10    YES CONFIG up                    up',
    '',
    'FW-ASA-01#',
  ],
};

export default function ConsoleWorkspace() {
  const [sessions, setSessions] = useState<Session[]>(initial);
  const [active, setActive] = useState<Session['id']>(0);
  const [query, setQuery] = useState('');
  const [groupMode, setGroupMode] = useState<'custom' | 'lab' | 'compare'>(
    'custom',
  );
  const [compareA, setCompareA] = useState<Session['id'] | ''>('');
  const [compareB, setCompareB] = useState<Session['id'] | ''>('');
  const [compareExtra, setCompareExtra] = useState<(Session['id'] | '')[]>([
    '',
    '',
    '',
    '',
  ]);
  const [comparePaneCount, setComparePaneCount] = useState<2 | 4 | 6>(2);
  const [compareLayout, setCompareLayout] = useState<'side' | 'stacked'>(
    'side',
  );
  const [broadcastInput, setBroadcastInput] = useState(false);
  const [broadcastTargets, setBroadcastTargets] = useState<Set<string>>(
    new Set(),
  );
  const [customGroups, setCustomGroups] = useState<Record<string, string>>({});
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());
  const [menuNodeId, setMenuNodeId] = useState<string | null>(null);
  const [sidebar, setSidebar] = useState(true);
  const [discovery, setDiscovery] = useState('Discovering running nodes…');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState(13);
  const [topologyOpen, setTopologyOpen] = useState(false);
  const [topology, setTopology] = useState<TopologyData | null>(null);
  const [topologyLoading, setTopologyLoading] = useState(false);
  const [topologyError, setTopologyError] = useState('');
  const [githubLabUrl, setGithubLabUrl] = useState('');
  const [labGuide, setLabGuide] = useState<LabGuide | null>(null);
  const [labGuideOpen, setLabGuideOpen] = useState(false);
  const [labSourceOpen, setLabSourceOpen] = useState(false);
  const [labGuideMode, setLabGuideMode] = useState<'popup' | 'split'>('popup');
  const [labGuideLoading, setLabGuideLoading] = useState(false);
  const [labGuideError, setLabGuideError] = useState('');
  const [labHistory, setLabHistory] = useState<LabHistoryEntry[]>([]);
  const [eveBaseUrl, setEveBaseUrl] = useState('https://eve-ng.local');
  const [eveUsername, setEveUsername] = useState('');
  const [evePassword, setEvePassword] = useState('');
  const [eveLabName, setEveLabName] = useState('');
  const [configStatus, setConfigStatus] = useState('');
  const [configSaving, setConfigSaving] = useState(false);
  const [eveConfigured, setEveConfigured] = useState(false);
  const [eveConnected, setEveConnected] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    username: string;
    role: 'admin' | 'user';
  } | null>(null);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const openSessionIds = useRef<Set<string>>(new Set());
  const gatewayBase =
    typeof window === 'undefined'
      ? 'https://localhost:3001'
      : `https://${window.location.hostname}:3001`;
  const current = sessions.find((s) => s.id === active) ??
    sessions[0] ?? {
      id: 0,
      name: 'No running nodes',
      group: 'EVE-NG',
      host: 'eve-ng.local',
      port: 0,
      status: 'idle' as const,
      color: '#5e6978',
    };
  const visible = useMemo(() => {
    const needle = query.toLowerCase();
    return sessions.filter(
      (s) =>
        s.name.toLowerCase().includes(needle) ||
        s.group.toLowerCase().includes(needle) ||
        (customGroups[String(s.id)] || 'Ungrouped')
          .toLowerCase()
          .includes(needle),
    );
  }, [sessions, query, customGroups]);
  const groups = [
    ...new Set(
      visible.map((s) =>
        groupMode === 'custom'
          ? customGroups[String(s.id)] || 'Ungrouped'
          : s.group,
      ),
    ),
  ].sort((a, b) =>
    a === 'Ungrouped' ? 1 : b === 'Ungrouped' ? -1 : a.localeCompare(b),
  );
  const knownGroups = [...new Set(Object.values(customGroups))].sort((a, b) =>
    a.localeCompare(b),
  );
  const compareValues = [compareA, compareB, ...compareExtra].slice(
    0,
    comparePaneCount,
  );
  const compareSessions = compareValues
    .map((id) => sessions.find((session) => session.id === id))
    .filter((session): session is Session => Boolean(session));
  const compareWorkspaceClass =
    comparePaneCount === 2
      ? `flex ${compareLayout === 'side' ? 'flex-row' : 'flex-col'}`
      : `grid grid-rows-2 ${comparePaneCount === 4 ? 'grid-cols-2' : 'grid-cols-3'}`;
  const persistOpenSessions = () =>
    localStorage.setItem(
      'relay-console-open-sessions',
      JSON.stringify([...openSessionIds.current]),
    );
  const toggle = () =>
    setSessions((s) =>
      s.map((x) => {
        if (x.id !== active) return x;
        const connected = x.status !== 'connected';
        if (connected) openSessionIds.current.add(String(x.id));
        else openSessionIds.current.delete(String(x.id));
        persistOpenSessions();
        return { ...x, status: connected ? 'connected' : 'idle' };
      }),
    );
  const selectSession = (id: Session['id']) => {
    openSessionIds.current.add(String(id));
    persistOpenSessions();
    setActive(id);
    localStorage.setItem('relay-console-active-session', String(id));
    setSessions((items) =>
      items.map((item) =>
        item.id === id ? { ...item, status: 'connected' } : item,
      ),
    );
  };
  useEffect(() => {
    const switchNode = (event: KeyboardEvent) => {
      if (
        !event.shiftKey ||
        !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key) ||
        !sessions.length ||
        groupMode === 'compare' ||
        settingsOpen ||
        userMenuOpen
      )
        return;
      event.preventDefault();
      if (event.key === 'ArrowLeft') {
        if (!sidebar) setSidebar(true);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const target = [...document.querySelectorAll<HTMLElement>('[data-node-id]')]
              .find((element) => element.dataset.nodeId === String(active));
            target?.focus();
            target?.scrollIntoView({ block: 'nearest' });
          });
        });
        return;
      }
      if (event.key === 'ArrowRight') {
        requestAnimationFrame(() => {
          const terminal = [...document.querySelectorAll<HTMLElement>('[data-terminal-id]')]
            .find((element) => element.dataset.terminalId === String(active));
          (terminal?.querySelector('.xterm-helper-textarea') as HTMLElement | null)?.focus();
        });
        return;
      }
      const currentIndex = sessions.findIndex((session) => session.id === active);
      const direction = event.key === 'ArrowUp' ? -1 : 1;
      const nextIndex = (Math.max(currentIndex, 0) + direction + sessions.length) % sessions.length;
      const next = sessions[nextIndex];
      openSessionIds.current.add(String(next.id));
      localStorage.setItem(
        'relay-console-open-sessions',
        JSON.stringify([...openSessionIds.current]),
      );
      localStorage.setItem('relay-console-active-session', String(next.id));
      setActive(next.id);
      setSessions((items) =>
        items.map((item) =>
          item.id === next.id ? { ...item, status: 'connected' } : item,
        ),
      );
    };
    window.addEventListener('keydown', switchNode, true);
    return () => window.removeEventListener('keydown', switchNode, true);
  }, [active, groupMode, sessions, settingsOpen, sidebar, userMenuOpen]);
  useEffect(() => {
    if (!authenticated || !eveConnected) {
      if (authenticated && !eveConnected) {
        setSessions([]);
        setActive(0);
        setDiscovery('EVE-NG is disconnected');
      }
      return;
    }
    try {
      openSessionIds.current = new Set(
        JSON.parse(localStorage.getItem('relay-console-open-sessions') || '[]'),
      );
    } catch {
      openSessionIds.current = new Set();
    }
    let cancelled = false;
    const discover = async () => {
      try {
        const response = await fetch(`${gatewayBase}/api/eve/running-nodes`, {
          credentials: 'include',
        });
        const payload = await response.json();
        if (response.status === 401) {
          setAuthenticated(false);
          return;
        }
        if (!response.ok)
          throw new Error(payload.message || 'Discovery failed');
        if (cancelled) return;
        setSessions((existing) =>
          payload.data.map(
            (
              node: {
                id: string;
                name: string;
                lab: string;
                host: string;
                port: number;
                nodeId: string;
                labPath: string;
              },
              index: number,
            ) => ({
              id: node.id,
              name: node.name,
              group: node.lab,
              host: node.host,
              port: node.port,
              status:
                existing.find((x) => x.id === node.id)?.status ??
                (openSessionIds.current.has(String(node.id)) ||
                (existing.length === 0 && index === 0)
                  ? 'connected'
                  : 'idle'),
              color: '#52d273',
              nodeId: String(node.nodeId),
              labPath: node.labPath,
            }),
          ),
        );
        setActive((value) => {
          if (payload.data.some((node: { id: string }) => node.id === value))
            return value;
          const saved = localStorage.getItem('relay-console-active-session');
          return (
            payload.data.find(
              (node: { id: string }) => String(node.id) === saved,
            )?.id ??
            payload.data[0]?.id ??
            0
          );
        });
        setDiscovery(`${payload.data.length} running nodes discovered`);
      } catch (error) {
        if (!cancelled) {
          setDiscovery(
            error instanceof Error ? error.message : 'Unable to discover nodes',
          );
          setSessions([]);
          setActive(0);
        }
      }
    };
    discover();
    const timer = setInterval(discover, 5000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [authenticated, eveConnected, gatewayBase]);
  useEffect(() => {
    if (!topologyOpen || !current.labPath) return;
    let cancelled = false;
    setTopologyLoading(true);
    setTopologyError('');
    fetch(`${gatewayBase}/api/eve/topology?lab=${encodeURIComponent(current.labPath)}`, { credentials: 'include' })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.message || 'Unable to load topology.');
        if (!cancelled) setTopology(payload.data);
      })
      .catch((error) => { if (!cancelled) setTopologyError(error instanceof Error ? error.message : 'Unable to load topology.'); })
      .finally(() => { if (!cancelled) setTopologyLoading(false); });
    return () => { cancelled = true; };
  }, [topologyOpen, current.labPath, gatewayBase]);
  useEffect(() => {
    if (!sessions.length) return;
    openSessionIds.current = new Set(
      sessions
        .filter((session) => session.status === 'connected')
        .map((session) => String(session.id)),
    );
    persistOpenSessions();
  }, [sessions]);
  useEffect(() => {
    try {
      setCustomGroups(
        JSON.parse(localStorage.getItem('relay-console-node-groups') || '{}'),
      );
    } catch {
      setCustomGroups({});
    }
  }, []);
  useEffect(() => {
    setGithubLabUrl(localStorage.getItem('relay-console-github-lab-url') || '');
    const savedMode = localStorage.getItem('relay-console-lab-guide-mode');
    if (savedMode === 'popup' || savedMode === 'split') setLabGuideMode(savedMode);
  }, []);
  useEffect(() => {
    if (!currentUser) return;
    try {
      const saved = JSON.parse(localStorage.getItem(`relay-console-lab-history:${currentUser.username}`) || '[]');
      setLabHistory(Array.isArray(saved) ? saved.slice(0, 20) : []);
    } catch {
      setLabHistory([]);
    }
  }, [currentUser]);
  useEffect(() => {
    localStorage.setItem('relay-console-lab-guide-mode', labGuideMode);
  }, [labGuideMode]);
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem('relay-console-compare') || '{}',
      );
      const devices = Array.isArray(saved.devices)
        ? saved.devices
        : [saved.a || '', saved.b || ''];
      setCompareA(devices[0] || '');
      setCompareB(devices[1] || '');
      setCompareExtra([
        devices[2] || '',
        devices[3] || '',
        devices[4] || '',
        devices[5] || '',
      ]);
      if (saved.count === 2 || saved.count === 4 || saved.count === 6)
        setComparePaneCount(saved.count);
      if (saved.layout === 'side' || saved.layout === 'stacked')
        setCompareLayout(saved.layout);
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem(
      'relay-console-compare',
      JSON.stringify({
        devices: [compareA, compareB, ...compareExtra],
        count: comparePaneCount,
        layout: compareLayout,
      }),
    );
  }, [compareA, compareB, compareExtra, comparePaneCount, compareLayout]);
  useEffect(() => {
    setBroadcastTargets(new Set(compareValues.filter(Boolean).map(String)));
    setBroadcastInput(false);
  }, [compareA, compareB, compareExtra, comparePaneCount]);
  const toggleNodeSelection = (id: Session['id']) =>
    setSelectedNodes((current) => {
      const next = new Set(current);
      const key = String(id);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  const createSelectedGroup = () => {
    if (!selectedNodes.size) return;
    const name = window.prompt(
      `Name this group of ${selectedNodes.size} node${selectedNodes.size === 1 ? '' : 's'}`,
    );
    if (!name?.trim()) return;
    setCustomGroups((current) => {
      const next = { ...current };
      for (const id of selectedNodes) next[id] = name.trim();
      localStorage.setItem('relay-console-node-groups', JSON.stringify(next));
      return next;
    });
    setSelectedNodes(new Set());
    setSelectionMode(false);
    setGroupMode('custom');
  };
  const assignNodeGroup = (id: Session['id'], group?: string) => {
    setCustomGroups((current) => {
      const next = { ...current };
      if (group) next[String(id)] = group;
      else delete next[String(id)];
      localStorage.setItem('relay-console-node-groups', JSON.stringify(next));
      return next;
    });
    setMenuNodeId(null);
  };
  const createGroupForNode = (id: Session['id']) => {
    const name = window.prompt('Name the new group');
    if (name?.trim()) assignNodeGroup(id, name.trim());
  };
  const selectCompareDevice = (slot: number, value: string) => {
    const session = sessions.find((item) => String(item.id) === value);
    const id = session?.id ?? '';
    if (
      id &&
      compareValues.some(
        (selected, index) => index !== slot && String(selected) === String(id),
      )
    )
      return;
    if (slot === 0) setCompareA(id);
    else if (slot === 1) setCompareB(id);
    else
      setCompareExtra((current) =>
        current.map((item, index) => (index === slot - 2 ? id : item)),
      );
    if (!id) return;
    openSessionIds.current.add(String(id));
    persistOpenSessions();
    setSessions((items) =>
      items.map((item) =>
        item.id === id ? { ...item, status: 'connected' } : item,
      ),
    );
  };
  const resetComparison = () => {
    setCompareA('');
    setCompareB('');
    setCompareExtra(['', '', '', '']);
    setComparePaneCount(2);
    setCompareLayout('side');
    setBroadcastInput(false);
    setBroadcastTargets(new Set());
    localStorage.removeItem('relay-console-compare');
  };
  const toggleBroadcastTarget = (id: Session['id']) =>
    setBroadcastTargets((current) => {
      const next = new Set(current),
        key = String(id);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  const addConnection = () => {
    const name = window.prompt('Device name (for example CORE-RTR-03)');
    if (!name) return;
    const host = window.prompt('EVE-NG host', current?.host || '10.20.0.12');
    if (!host) return;
    const port = Number(window.prompt('Telnet console port', '32769'));
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      window.alert('Enter a valid TCP port.');
      return;
    }
    const next = {
      id: Date.now(),
      name: name.trim().toUpperCase(),
      group: 'Saved devices',
      host: host.trim(),
      port,
      status: 'idle' as const,
      color: '#8a96a6',
    };
    setSessions((s) => [...s, next]);
    setActive(next.id);
  };
  const removeConnection = () => {
    if (sessions.length === 1) return;
    const remaining = sessions.filter((x) => x.id !== active);
    setSessions(remaining);
    setActive(remaining[0].id);
  };
  useEffect(() => {
    const saved = Number(localStorage.getItem('relay-console-font-size'));
    if (saved >= 10 && saved <= 24) setFontSize(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem('relay-console-font-size', String(fontSize));
  }, [fontSize]);
  useEffect(() => {
    if (!authenticated) return;
    fetch(`${gatewayBase}/api/eve/config`, { credentials: 'include' })
      .then((response) => response.json())
      .then((payload) => {
        if (payload.status !== 'success') return;
        setEveBaseUrl(payload.data.baseUrl || '');
        setEveUsername(payload.data.username || '');
        setEveLabName(payload.data.labName || '');
        setEveConfigured(Boolean(payload.data.configured));
        setEveConnected(Boolean(payload.data.connected));
      })
      .catch(() => setConfigStatus('Local gateway is unavailable.'));
  }, [authenticated, gatewayBase]);
  useEffect(() => {
    fetch(`${gatewayBase}/api/auth/status`, { credentials: 'include' })
      .then(async (response) => {
        const payload = await response.json();
        setAuthenticated(response.ok);
        setCurrentUser(response.ok ? payload.data : null);
      })
      .catch(() => {
        setAuthenticated(false);
        setCurrentUser(null);
      })
      .finally(() => setAuthReady(true));
  }, [gatewayBase]);
  const signIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginError('');
    try {
      const response = await fetch(`${gatewayBase}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message || 'Sign in failed.');
      setAuthenticated(true);
      setCurrentUser(payload.data);
      setLoginPassword('');
    } catch (error) {
      setLoginPassword('');
      setLoginError(
        error instanceof Error ? error.message : 'Unable to sign in.',
      );
    }
  };
  const signOut = async () => {
    try {
      await fetch(`${gatewayBase}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setAuthenticated(false);
      setCurrentUser(null);
      setLoginUsername('');
      setLoginPassword('');
      setSettingsOpen(false);
      setUserMenuOpen(false);
    }
  };
  const saveEveConfig = async () => {
    setConfigSaving(true);
    setConfigStatus('Saving connection settings…');
    try {
      const response = await fetch(`${gatewayBase}/api/eve/config`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baseUrl: eveBaseUrl,
          username: eveUsername,
          password: evePassword,
          labName: eveLabName,
        }),
      });
      const payload = await response.json();
      if (!response.ok)
        throw new Error(payload.message || 'Unable to save settings.');
      setEvePassword('');
      setEveConfigured(true);
      setEveConnected(Boolean(payload.data.connected));
      setConfigStatus(payload.data.connected ? 'Settings saved. EVE-NG remains connected.' : 'Settings saved. Select Connect when ready.');
    } catch (error) {
      setConfigStatus(
        error instanceof Error
          ? error.message
          : 'Unable to save EVE-NG connection.',
      );
    } finally {
      setConfigSaving(false);
    }
  };
  const toggleEveConnection = async () => {
    setConfigSaving(true);
    setConfigStatus(eveConnected ? 'Disconnecting…' : 'Connecting…');
    try {
      const response = await fetch(`${gatewayBase}/api/eve/${eveConnected ? 'disconnect' : 'connect'}`, {
        method: 'POST',
        credentials: 'include',
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message || 'Unable to change EVE-NG connection.');
      const connected = Boolean(payload.data.connected);
      setEveConnected(connected);
      setConfigStatus(connected ? 'Connected. Device discovery is refreshing.' : 'Disconnected. Saved credentials were retained.');
    } catch (error) {
      setConfigStatus(error instanceof Error ? error.message : 'Unable to change EVE-NG connection.');
    } finally {
      setConfigSaving(false);
    }
  };
  const loadGithubLab = async (requestedUrl?: string, addToHistory = true) => {
    const sourceUrl = (requestedUrl ?? githubLabUrl).trim();
    if (!sourceUrl) return;
    setGithubLabUrl(sourceUrl);
    setLabGuideLoading(true);
    setLabGuideError('');
    try {
      const response = await fetch(`${gatewayBase}/api/github/lab?url=${encodeURIComponent(sourceUrl)}`, {
        credentials: 'include',
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message || 'Unable to read this GitHub lab.');
      setLabGuide(payload.data);
      setLabGuideOpen(true);
      setLabSourceOpen(false);
      setTopologyOpen(false);
      localStorage.setItem('relay-console-github-lab-url', sourceUrl);
      if (currentUser && addToHistory) {
        setLabHistory((existing) => {
          const next = [
            {
              url: sourceUrl,
              title: payload.data.title,
              repository: payload.data.repository,
              openedAt: Date.now(),
            },
            ...existing.filter((entry) => entry.url !== sourceUrl),
          ].slice(0, 20);
          localStorage.setItem(`relay-console-lab-history:${currentUser.username}`, JSON.stringify(next));
          return next;
        });
      }
    } catch (error) {
      setLabGuideError(error instanceof Error ? error.message : 'Unable to read this GitHub lab.');
    } finally {
      setLabGuideLoading(false);
    }
  };
  const comparePanel = (
    <div className="space-y-4 px-2 py-2">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#667386]">
          Number of panes
        </p>
        <div className="mt-1 grid grid-cols-3 gap-1 rounded-md bg-[#090d12] p-0.5">
          {([2, 4, 6] as const).map((count) => (
            <button
              key={count}
              onClick={() => setComparePaneCount(count)}
              className={`rounded px-2 py-2 text-[9px] font-bold uppercase tracking-wider ${comparePaneCount === count ? 'bg-[#1a252f] text-[#55d68b]' : 'text-[#617083] hover:text-white'}`}
            >
              {count} ways
            </button>
          ))}
        </div>
      </div>
      {compareValues.map((selected, index) => (
        <div key={index}>
          <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#667386]">
            Device {String.fromCharCode(65 + index)}
          </p>
          <select
            aria-label={`Compare device ${String.fromCharCode(65 + index)}`}
            value={String(selected)}
            onChange={(event) => selectCompareDevice(index, event.target.value)}
            className="mt-1 h-9 w-full rounded-md border border-white/10 bg-[#090d12] px-2 text-xs text-[#d8dee9] outline-none focus:border-[#55d68b]/60"
          >
            <option value="">Select device</option>
            {sessions.map((session) => (
              <option
                key={session.id}
                value={String(session.id)}
                disabled={compareValues.some(
                  (value, slot) =>
                    slot !== index && String(value) === String(session.id),
                )}
              >
                {session.name}
              </option>
            ))}
          </select>
        </div>
      ))}
      {comparePaneCount === 2 && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#667386]">
            Pane split
          </p>
          <div className="mt-1 grid grid-cols-2 gap-1 rounded-md bg-[#090d12] p-0.5">
            <button
              onClick={() => setCompareLayout('side')}
              className={`rounded px-2 py-2 text-[9px] font-bold uppercase tracking-wider ${compareLayout === 'side' ? 'bg-[#1a252f] text-[#55d68b]' : 'text-[#617083] hover:text-white'}`}
            >
              Vertical
            </button>
            <button
              onClick={() => setCompareLayout('stacked')}
              className={`rounded px-2 py-2 text-[9px] font-bold uppercase tracking-wider ${compareLayout === 'stacked' ? 'bg-[#1a252f] text-[#55d68b]' : 'text-[#617083] hover:text-white'}`}
            >
              Horizontal
            </button>
          </div>
          <p className="mt-2 text-[9px] leading-relaxed text-[#566274]">
            Vertical places terminals side by side. Horizontal stacks them top
            and bottom.
          </p>
        </div>
      )}
      {compareSessions.length < comparePaneCount && (
        <p className="rounded-md border border-white/[.07] bg-[#090d12] p-3 text-[10px] leading-relaxed text-[#718095]">
          Choose {comparePaneCount} different devices to open the comparison
          workspace.
        </p>
      )}
    </div>
  );
  if (!authReady) return <main className="h-dvh bg-[#0a0e13]" />;
  if (!authenticated)
    return (
      <main className="grid h-dvh place-items-center overflow-hidden bg-[#080c11] px-4 text-[#d8dee9]">
        <form
          onSubmit={signIn}
          className="w-full max-w-sm rounded-xl border border-white/10 bg-[#0d1218] p-7 shadow-2xl"
        >
          <div className="mx-auto grid size-12 place-items-center rounded-xl bg-[#55d68b] text-[#07120c]">
            <LockKeyhole className="size-5" />
          </div>
          <h1 className="mt-5 text-center text-lg font-bold">Relay Console</h1>
          <p className="mt-1 text-center text-xs text-[#718095]">
            Sign in to manage network lab sessions
          </p>
          <label className="mt-6 block text-[10px] font-bold uppercase tracking-[.12em] text-[#788698]">
            Username
            <input
              autoFocus
              autoComplete="username"
              value={loginUsername}
              onChange={(event) => setLoginUsername(event.target.value)}
              className="mt-2 h-10 w-full rounded-md border border-white/10 bg-[#080d12] px-3 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-[#55d68b]/60"
            />
          </label>
          <label className="mt-4 block text-[10px] font-bold uppercase tracking-[.12em] text-[#788698]">
            Password
            <input
              type="password"
              autoComplete="current-password"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
              className="mt-2 h-10 w-full rounded-md border border-white/10 bg-[#080d12] px-3 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-[#55d68b]/60"
            />
          </label>
          {loginError && (
            <p role="alert" className="mt-3 text-xs text-[#ff8b87]">
              {loginError}
            </p>
          )}
          <Button
            type="submit"
            className="mt-5 h-10 w-full bg-[#55d68b] text-[#07120c] hover:bg-[#6de09a]"
          >
            Sign in
          </Button>
          <p className="mt-4 text-center text-[9px] text-[#536071]">
            Local access only
          </p>
        </form>
      </main>
    );
  return (
    <main className="relative flex h-dvh w-screen min-h-0 flex-col overflow-hidden bg-[#0a0e13] text-[#d8dee9]">
      <header className="relative z-40 flex h-14 shrink-0 items-center gap-4 overflow-hidden border-b border-white/[.08] bg-[#0d1218] px-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-md bg-[#55d68b] text-[#07120c]">
            <TerminalSquare className="size-4" />
          </span>
          <div>
            <b className="block text-sm tracking-tight">Relay Console</b>
            <span className="block text-[9px] font-semibold uppercase tracking-[.14em] text-[#718095]">
              NETWORK LAB SESSION MANAGER
            </span>
          </div>
        </div>
        <div className="ml-4 hidden h-5 w-px bg-white/10 sm:block" />
        <div className="hidden items-center gap-2 text-xs text-[#8290a2] sm:flex">
          <ShieldCheck className="size-3.5 text-[#55d68b]" /> Local gateway{' '}
          <span className="rounded bg-[#55d68b]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#55d68b]">
            ONLINE
          </span>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Button
            onClick={() => {
              setSettingsOpen((open) => !open);
              setUserMenuOpen(false);
            }}
            variant="ghost"
            size="icon"
            className={`text-[#8390a0] hover:bg-white/5 hover:text-white ${settingsOpen ? 'bg-white/[.07] text-white' : ''}`}
            aria-label="Console settings"
            aria-expanded={settingsOpen}
          >
            <Settings />
          </Button>
          <button
            onClick={() => {
              setUserMenuOpen((open) => !open);
              setSettingsOpen(false);
            }}
            title={currentUser?.username}
            aria-label="User credentials and management"
            aria-expanded={userMenuOpen}
            className={`grid size-8 place-items-center rounded-full text-xs font-bold hover:bg-[#354457] ${userMenuOpen ? 'bg-[#354457] ring-1 ring-[#55d68b]/50' : 'bg-[#273343]'}`}
          >
            {currentUser?.username.slice(0, 2).toUpperCase()}
          </button>
          <Button
            onClick={signOut}
            variant="ghost"
            size="icon"
            className="text-[#8390a0] hover:bg-white/5 hover:text-white"
            aria-label="Sign out"
          >
            <LogOut />
          </Button>
        </div>
      </header>
      {userMenuOpen && (
        <section className="absolute right-4 top-[50px] z-50 max-h-[calc(100vh-64px)] w-80 overflow-y-auto rounded-lg border border-white/10 bg-[#111820] p-4 shadow-2xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-white">User account</p>
              <p className="mt-1 text-[10px] text-[#718095]">
                Credentials and local users
              </p>
            </div>
            <Button
              onClick={() => setUserMenuOpen(false)}
              variant="ghost"
              size="icon-xs"
              className="text-[#718095] hover:bg-white/5 hover:text-white"
            >
              <X />
            </Button>
          </div>
          <div className="mt-5">
            <UserManagement
              gatewayBase={gatewayBase}
              currentUser={currentUser}
            />
          </div>
        </section>
      )}
      {settingsOpen && (
        <section className="absolute right-4 top-[50px] z-50 max-h-[calc(100vh-64px)] w-80 overflow-y-auto rounded-lg border border-white/10 bg-[#111820] p-4 shadow-2xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-white">Console settings</p>
              <p className="mt-1 text-[10px] text-[#718095]">
                Connection and display preferences
              </p>
            </div>
            <Button
              onClick={() => setSettingsOpen(false)}
              variant="ghost"
              size="icon-xs"
              className="text-[#718095] hover:bg-white/5 hover:text-white"
            >
              <X />
            </Button>
          </div>
          <div className="mt-5">
            <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#667386]">
              EVE-NG connection
            </p>
            <div className="mt-3 space-y-3">
              <label className="block text-[10px] text-[#9aa7b6]">
                Host URL
                <input
                  value={eveBaseUrl}
                  onChange={(event) => setEveBaseUrl(event.target.value)}
                  placeholder="https://eve-ng.local"
                  className="mt-1 h-8 w-full rounded border border-white/10 bg-[#080d12] px-2.5 font-mono text-[11px] text-white outline-none focus:border-[#55d68b]/60"
                />
              </label>
              <label className="block text-[10px] text-[#9aa7b6]">
                Username
                <input
                  value={eveUsername}
                  onChange={(event) => setEveUsername(event.target.value)}
                  autoComplete="username"
                  className="mt-1 h-8 w-full rounded border border-white/10 bg-[#080d12] px-2.5 text-[11px] text-white outline-none focus:border-[#55d68b]/60"
                />
              </label>
              <label className="block text-[10px] text-[#9aa7b6]">
                Password
                <input
                  type="password"
                  value={evePassword}
                  onChange={(event) => setEvePassword(event.target.value)}
                  autoComplete="current-password"
                  placeholder={eveConfigured ? 'Stored — enter only to update' : 'Required for initial setup'}
                  className="mt-1 h-8 w-full rounded border border-white/10 bg-[#080d12] px-2.5 text-[11px] text-white outline-none focus:border-[#55d68b]/60"
                />
              </label>
              <label className="block text-[10px] text-[#9aa7b6]">
                Lab name
                <input
                  value={eveLabName}
                  onChange={(event) => setEveLabName(event.target.value)}
                  placeholder="Optional — discover all running labs"
                  className="mt-1 h-8 w-full rounded border border-white/10 bg-[#080d12] px-2.5 text-[11px] text-white outline-none focus:border-[#55d68b]/60"
                />
              </label>
            </div>
            {configStatus && (
              <p className="mt-3 text-[10px] leading-relaxed text-[#8fa0b4]">
                {configStatus}
              </p>
            )}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button
                onClick={saveEveConfig}
                disabled={configSaving || !eveBaseUrl || !eveUsername || (!eveConfigured && !evePassword)}
                size="sm"
                className="bg-[#55d68b] text-[#07120c] hover:bg-[#6de09a]"
              >
                Save
              </Button>
              <Button
                onClick={toggleEveConnection}
                disabled={configSaving || !eveConfigured}
                size="sm"
                className={eveConnected ? 'bg-[#d95757] text-white hover:bg-[#ed6868]' : 'bg-[#243242] text-[#dce4ed] hover:bg-[#314358]'}
              >
                {eveConnected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
            <p className="mt-2 text-[9px] leading-relaxed text-[#566274]">
              Leave the password blank to keep the stored password. It is never returned to the browser.
            </p>
          </div>
          <div className="my-5 h-px bg-white/[.08]" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#667386]">Lab guide display</p>
            <div className="mt-2 grid grid-cols-2 gap-1 rounded-md bg-[#080d12] p-0.5">
              {(['popup', 'split'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setLabGuideMode(mode)}
                  className={`rounded px-2 py-2 text-[9px] font-bold uppercase tracking-wider ${labGuideMode === mode ? 'bg-[#1a252f] text-[#55d68b]' : 'text-[#617083] hover:text-white'}`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[9px] leading-relaxed text-[#566274]">Popup floats over the terminal. Split keeps the terminal left and instructions right.</p>
          </div>
          <div className="my-5 h-px bg-white/[.08]" />
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-xs font-medium text-[#b8c3d0]">
                Console text size
              </label>
              <output className="min-w-10 rounded bg-[#080d12] px-2 py-1 text-center font-mono text-[10px] text-[#55d68b]">
                {fontSize}px
              </output>
            </div>
            <Slider
              min={10}
              max={24}
              step={1}
              value={[fontSize]}
              onValueChange={(value) => setFontSize(value[0])}
            />
            <div className="mt-2 flex justify-between font-mono text-[9px] text-[#4f5d6e]">
              <span>10px</span>
              <span>24px</span>
            </div>
          </div>
          <Button
            onClick={() => setFontSize(13)}
            variant="outline"
            size="sm"
            className="mt-5 w-full border-white/10 bg-transparent text-[#9aa7b6] hover:bg-white/5 hover:text-white"
          >
            Reset text size
          </Button>
        </section>
      )}
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-0 min-w-0 flex-1 overflow-hidden"
      >
        {sidebar && (
          <>
            <ResizablePanel
              defaultSize="26%"
              minSize="220px"
              maxSize="42%"
              className="min-w-0 overflow-hidden"
            >
              <aside className="flex h-full min-w-0 flex-col overflow-hidden border-r border-white/[.08] bg-[#0d1218]">
                <div className="flex items-center justify-between px-4 pb-3 pt-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#667386]">
                      Running devices
                    </p>
                    <p className="mt-1 text-xs text-[#8d99a8]">{discovery}</p>
                  </div>
                  <Button
                    size="icon-sm"
                    className="bg-[#55d68b] text-[#07120c] hover:bg-[#6de09a]"
                    onClick={addConnection}
                    aria-label="Add manual connection"
                  >
                    <Plus />
                  </Button>
                </div>
                <div className="px-3 pb-3">
                  <label className="flex h-8 items-center gap-2 rounded-md border border-white/[.08] bg-[#090d12] px-2.5 focus-within:border-[#55d68b]/50">
                    <Search className="size-3.5 text-[#5f6d7d]" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Filter devices"
                      className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#536071]"
                    />
                  </label>
                  <div className="mt-2 grid grid-cols-3 rounded-md bg-[#090d12] p-0.5">
                    <button
                      onClick={() => setGroupMode('custom')}
                      className={`rounded px-1 py-1 text-[9px] font-bold uppercase tracking-wider ${groupMode === 'custom' ? 'bg-[#1a252f] text-[#55d68b]' : 'text-[#617083] hover:text-white'}`}
                    >
                      My groups
                    </button>
                    <button
                      onClick={() => setGroupMode('lab')}
                      className={`rounded px-1 py-1 text-[9px] font-bold uppercase tracking-wider ${groupMode === 'lab' ? 'bg-[#1a252f] text-[#55d68b]' : 'text-[#617083] hover:text-white'}`}
                    >
                      Lab
                    </button>
                    <button
                      onClick={() => {
                        setGroupMode('compare');
                        setSelectionMode(false);
                        setSelectedNodes(new Set());
                      }}
                      className={`rounded px-1 py-1 text-[9px] font-bold uppercase tracking-wider ${groupMode === 'compare' ? 'bg-[#1a252f] text-[#55d68b]' : 'text-[#617083] hover:text-white'}`}
                    >
                      Compare
                    </button>
                  </div>
                  {groupMode === 'custom' && (
                    <div className="mt-2 flex gap-1.5">
                      <button
                        onClick={() => {
                          setSelectionMode((value) => !value);
                          setSelectedNodes(new Set());
                        }}
                        className={`flex-1 rounded border px-2 py-1.5 text-[9px] font-bold uppercase tracking-wider ${selectionMode ? 'border-[#55d68b]/50 bg-[#55d68b]/10 text-[#55d68b]' : 'border-white/10 text-[#718095] hover:text-white'}`}
                      >
                        {selectionMode ? 'Cancel selection' : 'Select nodes'}
                      </button>
                      {selectionMode && selectedNodes.size > 0 && (
                        <button
                          onClick={createSelectedGroup}
                          className="flex-1 rounded bg-[#55d68b] px-2 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[#07120c]"
                        >
                          Name group ({selectedNodes.size})
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <nav className="min-h-0 flex-1 overflow-auto px-2 pb-4">
                  {groupMode === 'compare'
                    ? comparePanel
                    : groups.map((group) => (
                        <section key={group} className="mb-4">
                          <p className="mb-1 px-2 text-[9px] font-bold uppercase tracking-[.15em] text-[#566274]">
                            {group}
                          </p>
                          {visible
                            .filter(
                              (s) =>
                                (groupMode === 'custom'
                                  ? customGroups[String(s.id)] || 'Ungrouped'
                                  : s.group) === group,
                            )
                            .map((s) => (
                              <div key={s.id} className="group relative mb-0.5">
                                <button
                                  data-node-id={String(s.id)}
                                  onClick={() =>
                                    selectionMode
                                      ? toggleNodeSelection(s.id)
                                      : selectSession(s.id)
                                  }
                                  className={`flex w-full items-center gap-3 rounded-md px-2.5 py-2 pr-8 text-left transition ${selectedNodes.has(String(s.id)) ? 'bg-[#55d68b]/10 ring-1 ring-[#55d68b]/40' : active === s.id && !selectionMode ? 'bg-[#1a252f] ring-1 ring-white/[.06]' : 'hover:bg-white/[.035]'}`}
                                >
                                  <span className="relative grid size-8 shrink-0 place-items-center rounded-md bg-[#151c25] text-[#8fa0b4]">
                                    <Router className="size-4" />
                                    {selectionMode ? (
                                      <i
                                        className={`absolute -right-1 -top-1 grid size-4 place-items-center rounded border text-[9px] not-italic ${selectedNodes.has(String(s.id)) ? 'border-[#55d68b] bg-[#55d68b] text-[#07120c]' : 'border-[#526174] bg-[#0d1218]'}`}
                                      >
                                        {selectedNodes.has(String(s.id))
                                          ? '✓'
                                          : ''}
                                      </i>
                                    ) : (
                                      <i
                                        className={`absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-[#0d1218] ${s.status === 'connected' ? 'bg-[#52d273]' : 'bg-[#5e6978]'}`}
                                      />
                                    )}
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <b
                                      className={`block truncate text-xs ${active === s.id && !selectionMode ? 'text-white' : 'text-[#b7c1cf]'}`}
                                    >
                                      {s.name}
                                    </b>
                                    <small className="block font-mono text-[9px] text-[#5f6d7e]">
                                      {s.host}:{s.port}
                                    </small>
                                  </span>
                                </button>
                                {groupMode === 'custom' && !selectionMode && (
                                  <button
                                    onClick={() =>
                                      setMenuNodeId((value) =>
                                        value === String(s.id)
                                          ? null
                                          : String(s.id),
                                      )
                                    }
                                    aria-label={`Reassign ${s.name}`}
                                    className="absolute right-1.5 top-2.5 grid size-6 place-items-center rounded text-[#718095] opacity-0 hover:bg-white/10 hover:text-white group-hover:opacity-100 focus:opacity-100"
                                  >
                                    <Ellipsis className="size-3.5" />
                                  </button>
                                )}
                                {menuNodeId === String(s.id) && (
                                  <div className="absolute right-1 top-9 z-40 min-w-36 rounded-md border border-white/10 bg-[#111820] p-1 shadow-xl">
                                    {knownGroups
                                      .filter(
                                        (name) =>
                                          name !== customGroups[String(s.id)],
                                      )
                                      .map((name) => (
                                        <button
                                          key={name}
                                          onClick={() =>
                                            assignNodeGroup(s.id, name)
                                          }
                                          className="block w-full rounded px-2 py-1.5 text-left text-[10px] text-[#b8c3d0] hover:bg-white/[.06] hover:text-white"
                                        >
                                          Move to {name}
                                        </button>
                                      ))}
                                    <button
                                      onClick={() => createGroupForNode(s.id)}
                                      className="block w-full rounded px-2 py-1.5 text-left text-[10px] text-[#55d68b] hover:bg-white/[.06]"
                                    >
                                      New group…
                                    </button>
                                    {customGroups[String(s.id)] && (
                                      <button
                                        onClick={() => assignNodeGroup(s.id)}
                                        className="block w-full rounded px-2 py-1.5 text-left text-[10px] text-[#ff8b87] hover:bg-white/[.06]"
                                      >
                                        Move to Ungrouped
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                        </section>
                      ))}
                </nav>
                {groupMode === 'compare' &&
                  compareSessions.length === comparePaneCount && (
                    <div className="border-t border-white/[.07] px-3 pt-3">
                      <label className="flex items-center gap-2 text-[10px] font-semibold text-[#b8c3d0]">
                        <input
                          type="checkbox"
                          checked={broadcastInput}
                          onChange={(event) =>
                            setBroadcastInput(event.target.checked)
                          }
                          className="accent-[#55d68b]"
                        />
                        Broadcast keyboard input
                      </label>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="mr-auto text-[9px] text-[#617083]">
                          Targets: {broadcastTargets.size}/{comparePaneCount}
                        </span>
                        <button
                          onClick={() =>
                            setBroadcastTargets(
                              new Set(
                                compareSessions.map((session) =>
                                  String(session.id),
                                ),
                              ),
                            )
                          }
                          className="rounded border border-white/10 px-2 py-1 text-[9px] text-[#8fa0b4] hover:text-white"
                        >
                          All
                        </button>
                        <button
                          onClick={() => setBroadcastTargets(new Set())}
                          className="rounded border border-white/10 px-2 py-1 text-[9px] text-[#8fa0b4] hover:text-white"
                        >
                          None
                        </button>
                      </div>
                      {broadcastInput && (
                        <p className="mt-2 text-[9px] leading-relaxed text-[#d9a95f]">
                          Keyboard input is sent to every checked terminal.
                        </p>
                      )}
                    </div>
                  )}
                {groupMode === 'compare' && compareValues.some(Boolean) && (
                  <div className="border-t border-white/[.07] px-3 pt-3">
                    <button
                      onClick={resetComparison}
                      className="w-full rounded-md border border-white/10 px-2 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[#ff8b87] hover:bg-[#ff6b66]/10"
                    >
                      Reset comparison
                    </button>
                  </div>
                )}
                <div className="border-t border-white/[.07] p-3">
                  <div className="flex items-center gap-2 rounded-md bg-[#090d12] p-2.5">
                    <Network className="size-4 text-[#55d68b]" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] font-semibold">
                        EVE-NG · {current.host}
                      </p>
                      <p className="text-[9px] text-[#617083]">
                        API discovery every 5 seconds
                      </p>
                    </div>
                    <CircleDot className={`size-3 ${eveConnected ? 'text-[#55d68b]' : 'text-[#d95757]'}`} />
                  </div>
                </div>
              </aside>
            </ResizablePanel>
            <ResizableHandle className="bg-white/[.08] hover:bg-[#55d68b]/50" />
          </>
        )}
        <ResizablePanel
          defaultSize="74%"
          minSize="45%"
          className="min-w-0 overflow-hidden"
        >
          <section className="flex h-full min-w-0 flex-col overflow-hidden">
            <div className="flex h-12 shrink-0 items-center gap-3 overflow-hidden border-b border-white/[.08] bg-[#0b1016] px-3">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setSidebar(!sidebar)}
                className="text-[#718095] hover:bg-white/5 hover:text-white"
              >
                <PanelLeftClose className={!sidebar ? 'rotate-180' : ''} />
              </Button>
              <div className="h-5 w-px bg-white/[.08]" />
              <span
                className="size-2 rounded-full"
                style={{
                  background:
                    current.status === 'connected' ? '#52d273' : '#5f6b78',
                }}
              />
              <div className="min-w-0">
                <b className="block truncate text-xs text-[#dce4ed]">
                  {current.name}
                </b>
                <small className="block truncate font-mono text-[9px] text-[#5e6c7d]">
                  telnet://{current.host}:{current.port}
                </small>
              </div>
              <div className="ml-auto flex shrink-0 items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[10px] text-[#7f8da0] hover:bg-white/5 hover:text-white"
                >
                  <Copy /> Copy
                </Button>
                <Button
                  onClick={() => {
                    setTopologyOpen(false);
                    if (groupMode === 'compare') setGroupMode('lab');
                    if (labGuide) setLabGuideOpen((open) => !open);
                    else setLabSourceOpen(true);
                  }}
                  variant="ghost"
                  size="sm"
                  className={`text-[10px] hover:bg-white/5 hover:text-white ${labGuideOpen ? 'text-[#55d68b]' : 'text-[#7f8da0]'}`}
                >
                  <BookOpen /> Lab
                </Button>
                <Button
                  onClick={() => {
                    setTopologyOpen((open) => !open);
                    setLabGuideOpen(false);
                  }}
                  disabled={!current.labPath}
                  variant="ghost"
                  size="sm"
                  className={`text-[10px] hover:bg-white/5 hover:text-white ${topologyOpen ? 'text-[#55d68b]' : 'text-[#7f8da0]'}`}
                >
                  <Network /> Topology
                </Button>
                <Button
                  onClick={toggle}
                  variant="ghost"
                  size="sm"
                  className={
                    current.status === 'connected'
                      ? 'text-[10px] text-[#ff7e78] hover:bg-[#ff6b66]/10 hover:text-[#ff918d]'
                      : 'text-[10px] text-[#55d68b] hover:bg-[#55d68b]/10'
                  }
                >
                  <Power />
                  {current.status === 'connected' ? 'Disconnect' : 'Connect'}
                </Button>
                <Button
                  disabled={sessions.length === 1}
                  onClick={removeConnection}
                  variant="ghost"
                  size="icon-sm"
                  className="text-[#718095] hover:bg-white/5 hover:text-white"
                >
                  <X />
                </Button>
              </div>
            </div>
            <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden bg-[#070a0e]">
              {labSourceOpen && (
                <div className="absolute inset-0 z-50 grid place-items-center bg-black/55 p-4 backdrop-blur-sm">
                  <section className="w-full max-w-lg rounded-lg border border-white/15 bg-[#10171f] p-5 shadow-2xl">
                    <div className="flex items-start gap-3">
                      <div className="grid size-9 shrink-0 place-items-center rounded-md bg-[#55d68b]/10 text-[#55d68b]"><GitFork className="size-4" /></div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-sm font-bold text-white">Open GitHub lab guide</h2>
                        <p className="mt-1 text-[10px] leading-relaxed text-[#718095]">Paste a public GitHub repository, folder, or Markdown instruction link.</p>
                      </div>
                      <button onClick={() => setLabSourceOpen(false)} className="text-[#718095] hover:text-white" aria-label="Close GitHub lab dialog"><X className="size-4" /></button>
                    </div>
                    <label className="mt-5 block text-[9px] font-bold uppercase tracking-wider text-[#778596]">
                      GitHub URL
                      <div className="mt-2 flex items-center gap-2 rounded-md border border-white/10 bg-[#080d12] px-3 focus-within:border-[#55d68b]/50">
                        <GitFork className="size-4 shrink-0 text-[#657386]" />
                        <input
                          autoFocus
                          value={githubLabUrl}
                          onChange={(event) => setGithubLabUrl(event.target.value)}
                          onKeyDown={(event) => { if (event.key === 'Enter') void loadGithubLab(); }}
                          placeholder="https://github.com/owner/network-lab"
                          className="h-10 min-w-0 flex-1 bg-transparent font-mono text-[11px] font-normal normal-case tracking-normal text-[#d9e1ea] outline-none placeholder:text-[#465363]"
                        />
                      </div>
                    </label>
                    {labGuideError && <p className="mt-3 text-[10px] leading-relaxed text-[#ff8b87]">{labGuideError}</p>}
                    {labHistory.length > 0 && (
                      <section className="mt-4 border-t border-white/[.08] pt-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="text-[9px] font-bold uppercase tracking-[.12em] text-[#778596]">Recent Labs ({labHistory.length}/20)</h3>
                          <button
                            onClick={() => {
                              setLabHistory([]);
                              if (currentUser) localStorage.removeItem(`relay-console-lab-history:${currentUser.username}`);
                            }}
                            className="text-[9px] text-[#718095] hover:text-[#ff8b87]"
                          >
                            Clear history
                          </button>
                        </div>
                        <div className="max-h-44 space-y-1 overflow-y-auto pr-1">
                          {labHistory.map((entry) => (
                            <div key={entry.url} className="group flex items-center rounded-md border border-white/[.07] bg-[#080d12] hover:border-[#55d68b]/25">
                              <button
                                onClick={() => void loadGithubLab(entry.url)}
                                className="min-w-0 flex-1 px-3 py-2 text-left"
                              >
                                <b className="block truncate text-[10px] text-[#cbd5df]">{entry.title}</b>
                                <span className="block truncate font-mono text-[9px] text-[#596779]">{entry.repository}</span>
                              </button>
                              <button
                                onClick={() => {
                                  setLabHistory((existing) => {
                                    const next = existing.filter((item) => item.url !== entry.url);
                                    if (currentUser) localStorage.setItem(`relay-console-lab-history:${currentUser.username}`, JSON.stringify(next));
                                    return next;
                                  });
                                }}
                                aria-label={`Remove ${entry.title} from history`}
                                className="mr-2 grid size-6 shrink-0 place-items-center rounded text-[#596779] opacity-0 hover:bg-white/5 hover:text-[#ff8b87] group-hover:opacity-100 focus:opacity-100"
                              >
                                <X className="size-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                    <div className="mt-4 flex justify-end gap-2">
                      <Button onClick={() => setLabSourceOpen(false)} variant="ghost" size="sm" className="text-[#8896a7] hover:bg-white/5 hover:text-white">Cancel</Button>
                      <Button onClick={() => void loadGithubLab()} disabled={labGuideLoading || !githubLabUrl.trim()} size="sm" className="bg-[#55d68b] text-[#07120c] hover:bg-[#6de09a]">
                        {labGuideLoading ? 'Loading…' : 'Open guide'}
                      </Button>
                    </div>
                  </section>
                </div>
              )}
              {labGuideOpen && labGuide && groupMode !== 'compare' && (
                <LabGuideWindow
                  key={labGuide.sourceUrl}
                  guide={labGuide}
                  mode={labGuideMode}
                  gatewayBase={gatewayBase}
                  onNavigate={(url) => loadGithubLab(url, false)}
                  onClose={() => setLabGuideOpen(false)}
                  onReset={() => {
                    setLabGuide(null);
                    setLabGuideOpen(false);
                    setLabSourceOpen(false);
                    setGithubLabUrl('');
                    setLabGuideError('');
                    localStorage.removeItem('relay-console-github-lab-url');
                  }}
                />
              )}
              {topologyOpen && groupMode !== 'compare' && (
                <TopologyWindow
                  data={topology}
                  selectedNodeId={current.nodeId}
                  loading={topologyLoading}
                  error={topologyError}
                  onClose={() => setTopologyOpen(false)}
                  onSelectNode={(nodeId) => {
                    const target = sessions.find((session) => session.labPath === current.labPath && session.nodeId === nodeId);
                    if (target) selectSession(target.id);
                  }}
                />
              )}
              {groupMode === 'compare' &&
              compareSessions.length === comparePaneCount ? (
                <div
                  className={`${compareWorkspaceClass} h-full min-h-0 min-w-0 ${labGuideOpen && labGuideMode === 'split' ? 'w-1/2' : 'w-full'}`}
                >
                  {compareSessions.map((session, index) => (
                    <div
                      key={session.id}
                      className={`flex min-h-0 min-w-0 flex-1 basis-0 flex-col overflow-hidden ${comparePaneCount === 2 && index === 1 ? (compareLayout === 'side' ? 'border-l border-white/10' : 'border-t border-white/10') : comparePaneCount > 2 ? 'border border-white/[.07]' : ''}`}
                    >
                      <div className="flex h-8 shrink-0 items-center gap-2 border-b border-white/[.07] bg-[#0b1016] px-3">
                        <input
                          type="checkbox"
                          aria-label={`Broadcast to ${session.name}`}
                          checked={broadcastTargets.has(String(session.id))}
                          onChange={() => toggleBroadcastTarget(session.id)}
                          className="accent-[#55d68b]"
                        />
                        <span className="size-1.5 rounded-full bg-[#52d273]" />
                        <b className="truncate text-[10px] text-[#c9d3de]">
                          {session.name}
                        </b>
                        <span className="ml-auto truncate font-mono text-[8px] text-[#526174]">
                          {session.host}:{session.port}
                        </span>
                      </div>
                      <div className="min-h-0 flex-1">
                        <TerminalPane
                          session={session}
                          preview={transcripts[Number(session.id)] ?? []}
                          fontSize={fontSize}
                          broadcast={{
                            enabled: broadcastInput,
                            targets: [...broadcastTargets],
                          }}
                          onStatus={(connected) =>
                            setSessions((items) =>
                              items.map((item) =>
                                item.id === session.id
                                  ? {
                                      ...item,
                                      status: connected ? 'connected' : 'idle',
                                    }
                                  : item,
                              ),
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                sessions
                  .filter(
                    (session) =>
                      session.status === 'connected' || session.id === active,
                  )
                  .map((session) => (
                    <div
                      key={session.id}
                      data-terminal-id={String(session.id)}
                      tabIndex={-1}
                      data-terminal-session={session.name}
                      aria-hidden={session.id !== active}
                      className={`absolute bottom-0 left-0 top-0 min-h-0 min-w-0 overflow-hidden ${labGuideOpen && labGuideMode === 'split' ? 'right-1/2' : 'right-0'} ${session.id === active ? 'visible z-10' : 'invisible pointer-events-none z-0'}`}
                    >
                      <TerminalPane
                        session={session}
                        preview={transcripts[Number(session.id)] ?? []}
                        fontSize={fontSize}
                        onStatus={(connected) =>
                          setSessions((items) =>
                            items.map((item) =>
                              item.id === session.id
                                ? {
                                    ...item,
                                    status: connected ? 'connected' : 'idle',
                                  }
                                : item,
                            ),
                          )
                        }
                      />
                    </div>
                  ))
              )}
            </div>
          </section>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}

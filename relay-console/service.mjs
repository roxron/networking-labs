import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir=path.dirname(fileURLToPath(import.meta.url));
const node=process.execPath;
const processes=[];
let stopping=false;
function launch(name,script,args=[]){const child=spawn(node,[script,...args],{cwd:appDir,env:process.env,stdio:'inherit'});processes.push(child);child.on('exit',(code,signal)=>{if(stopping)return;console.error(`${name} exited (${signal||code}); stopping Relay Console.`);shutdown(code||1)});return child}
function shutdown(code=0){if(stopping)return;stopping=true;for(const child of processes)if(!child.killed)child.kill('SIGTERM');setTimeout(()=>{for(const child of processes)if(!child.killed)child.kill('SIGKILL');process.exit(code)},5000).unref();Promise.all(processes.map(child=>new Promise(resolve=>child.once('exit',resolve)))).then(()=>process.exit(code))}

launch('application',path.join(appDir,'node_modules/vinext/dist/cli.js'),['start','--hostname','127.0.0.1','--port',process.env.RELAY_APP_PORT||'3002']);
launch('gateway',path.join(appDir,'gateway.mjs'));
launch('web entry point',path.join(appDir,'https-proxy.mjs'));
process.on('SIGTERM',()=>shutdown(0));
process.on('SIGINT',()=>shutdown(0));

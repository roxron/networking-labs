'use client';
import { useEffect, useRef } from 'react';
import type { Terminal } from '@xterm/xterm';
import type { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

type Props={session:{id:number|string;name:string;host:string;port:number;status:string};preview:string[];fontSize:number;onStatus:(connected:boolean)=>void;broadcast?:{enabled:boolean;targets:string[]}};

export function TerminalPane({session,preview,fontSize,onStatus,broadcast}:Props){
 const hostRef=useRef<HTMLDivElement>(null);
 const terminalRef=useRef<Terminal|null>(null);
 const fitRef=useRef<FitAddon|null>(null);
 const broadcastRef=useRef(broadcast);broadcastRef.current=broadcast;
 useEffect(()=>{
  const term=terminalRef.current;if(!term)return;
  term.options.fontSize=fontSize;
  requestAnimationFrame(()=>{try{term.clearTextureAtlas();fitRef.current?.fit();term.refresh(0,Math.max(0,term.rows-1))}catch{}});
 },[fontSize]);
 useEffect(()=>{
  if(!hostRef.current)return;
  let disposed=false;let socket:WebSocket|undefined;let cleanup=()=>{};
  Promise.all([import('@xterm/xterm'),import('@xterm/addon-fit')]).then(([{Terminal},{FitAddon}])=>{
   if(disposed||!hostRef.current)return;
   const term=new Terminal({cursorBlink:true,fontFamily:'Menlo, Monaco, "SFMono-Regular", Consolas, "Liberation Mono", monospace',fontSize,lineHeight:1.25,letterSpacing:0,theme:{background:'#070a0e',foreground:'#c7d2de',cursor:'#55d68b',selectionBackground:'#2d4b5f',black:'#0c1117',green:'#55d68b',brightGreen:'#79e4a7'},scrollback:5000,scrollOnUserInput:true,convertEol:true});
   const fit=new FitAddon();terminalRef.current=term;fitRef.current=fit;term.loadAddon(fit);term.open(hostRef.current);fit.fit();
   term.writeln('\x1b[38;2;85;214;139mRelay Console\x1b[0m — '+session.name);term.writeln('');
   if(session.status==='connected'){
    term.writeln(`Connecting to ${session.host}:${session.port}...`);
    socket=new WebSocket(`wss://${window.location.hostname}:3001/?host=${encodeURIComponent(session.host)}&port=${session.port}`);socket.binaryType='arraybuffer';
    socket.onmessage=e=>{if(typeof e.data==='string'){try{const m=JSON.parse(e.data);if(m.type==='status'){term.writeln('\x1b[32mConnected to EVE-NG console.\x1b[0m');onStatus(true)}else term.writeln(`\x1b[31m${m.value}\x1b[0m`)}catch{term.write(e.data)}}else term.write(new Uint8Array(e.data))};
    socket.onerror=()=>term.writeln('\r\n\x1b[31mGateway unavailable. Start it with “npm run gateway”.\x1b[0m');socket.onclose=()=>{if(!disposed)onStatus(false)};
    const receiveBroadcast=(event:Event)=>{const detail=(event as CustomEvent<{source:string;data:string;targets:string[]}>).detail;if(detail.source!==String(session.id)&&detail.targets.includes(String(session.id))&&socket?.readyState===WebSocket.OPEN)socket.send(detail.data)};
    window.addEventListener('relay-console-broadcast',receiveBroadcast);
    const input=term.onData(data=>{term.scrollToBottom();if(socket?.readyState===WebSocket.OPEN)socket.send(data);const settings=broadcastRef.current;if(settings?.enabled&&settings.targets.includes(String(session.id)))window.dispatchEvent(new CustomEvent('relay-console-broadcast',{detail:{source:String(session.id),data,targets:settings.targets}}))});
    cleanup=()=>{window.removeEventListener('relay-console-broadcast',receiveBroadcast);input.dispose();socket?.close();term.dispose()};
   }else{preview.forEach(line=>term.writeln(line));term.writeln('');term.writeln('\x1b[33mSaved session is disconnected. Select Connect to open it.\x1b[0m');cleanup=()=>term.dispose()}
   let resizeFrame=0;const resize=()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>{if(disposed)return;try{fit.fit()}catch{}})};window.addEventListener('resize',resize);const observer=new ResizeObserver(resize);observer.observe(hostRef.current);const prior=cleanup;cleanup=()=>{cancelAnimationFrame(resizeFrame);observer.disconnect();window.removeEventListener('resize',resize);if(terminalRef.current===term)terminalRef.current=null;if(fitRef.current===fit)fitRef.current=null;prior()};
  });
  return()=>{disposed=true;cleanup()};
 },[session.id,session.status,session.host,session.port]);
 return <div ref={hostRef} className="h-full min-h-0 min-w-0 max-w-full overflow-hidden bg-[#070a0e] [&_.xterm]:box-border [&_.xterm]:h-full [&_.xterm]:max-w-full [&_.xterm]:p-3 [&_.xterm-screen]:max-w-full" aria-label={`${session.name} terminal`}/>;
}

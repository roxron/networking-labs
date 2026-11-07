import https from 'node:https';
import http from 'node:http';
import net from 'node:net';
import fs from 'node:fs';

const host=process.env.RELAY_WEB_HOST||'0.0.0.0';
const port=Number(process.env.RELAY_WEB_PORT||3000);
const upstreamHost=process.env.RELAY_APP_HOST||'127.0.0.1';
const upstreamPort=Number(process.env.RELAY_APP_PORT||3002);
const key=fs.readFileSync(process.env.RELAY_TLS_KEY||new URL('./certs/relay-console-key.pem',import.meta.url));
const cert=fs.readFileSync(process.env.RELAY_TLS_CERT||new URL('./certs/relay-console-cert.pem',import.meta.url));

const server=https.createServer({key,cert},(request,response)=>{
 const headers={...request.headers,'x-forwarded-proto':'https','x-forwarded-host':request.headers.host};
 const proxy=http.request({host:upstreamHost,port:upstreamPort,path:request.url,method:request.method,headers},upstream=>{response.writeHead(upstream.statusCode||502,upstream.headers);upstream.pipe(response)});
 proxy.on('error',()=>{if(!response.headersSent)response.writeHead(502,{'Content-Type':'text/plain','Cache-Control':'no-store'});response.end('Relay Console application service is unavailable.');});
 request.pipe(proxy);
});
server.on('upgrade',(request,socket,head)=>{
 const upstream=net.connect(upstreamPort,upstreamHost,()=>{upstream.write(`${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`);for(const [name,value] of Object.entries(request.headers))upstream.write(`${name}: ${value}\r\n`);upstream.write('\r\n');if(head.length)upstream.write(head);socket.pipe(upstream).pipe(socket)});
 upstream.on('error',()=>socket.destroy());
});
server.listen(port,host,()=>console.log(`Relay Console HTTPS entry point ready at https://${host}:${port}`));

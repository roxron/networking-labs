# Untitled Document

> Imported source note. Provenance: `NetEngineer_Journal/Network/Untitled Document`  
> Original source context: Network. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Server: IP-address: 192.168.1.10 
Apps:
Webserver Apache      TCP 80
Video Server X-Player TCP 600


Client1:  192.168.1.5
Firefox 

Client2: 192.168.1.15
VLC Player 


Cl1: Firefox >>>>>>>>>>>>>>>>>>>>> Server Apache 
Firefox source:TCP1055>>>>>>>>>>>> Apache Dist:TCP80 
 Ip S 192.168.1.5 >>>>>>>>>>>>>>>>>> D 192.168.1.10 

Firefox DistTCP1055<<<<<<<<<<<<<<<<Apache Source TCP80
IP D 192.168.1.5 <<<<<<<<<<<<<<<<< IP S 192.168.1.10

Socket: 

192.168.1.5:1055 >>>>>>>>>>>>>>>>>> 192.168.1.10:80
192.168.1.5:1056 >>>>>>>>>>>>>>>>>> 192.168.1.10:80
```

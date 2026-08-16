# ACLs

> Imported source note. Provenance: `NetEngineer_Journal/ACLs Example/ACLs`  
> Original source context: ACLs Example. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Extended IP access list ACCESS_INTERNET

10 deny tcp 192.168.0.0 0.0.0.255 any eq telnet
20 deny tcp 192.168.0.0 0.0.0.255 any eq ftp
30 deny tcp 192.168.0.0 0.0.0.255 any eq ftp-data
40 permit tcp 192.168.0.0 0.0.0.255 any eq www
50 permit tcp 192.168.0.0 0.0.0.255 any eq 443
60 permit tcp 192.168.0.0 0.0.0.255 any eq pop3
70 permit tcp 192.168.0.0 0.0.0.255 any eq smtp
80 permit tcp 192.168.0.0 0.0.0.255 any eq 143
90 permit udp 192.168.0.0 0.0.0.255 any 
100 permit icmp 192.168.0.0 0.0.0.255 any 
110 deny ip 192.168.0.0 0.0.0.255 any 

120 deny tcp 192.168.1.0 0.0.0.255 any eq telnet
130 deny tcp 192.168.1.0 0.0.0.255 any eq ftp
140 deny tcp 192.168.1.0 0.0.0.255 any eq ftp-data
150 permit tcp 192.168.1.0 0.0.0.255 any eq www
160 permit tcp 192.168.1.0 0.0.0.255 any eq 443
170 permit tcp 192.168.1.0 0.0.0.255 any eq pop3
180 permit tcp 192.168.1.0 0.0.0.255 any eq smtp
190 permit tcp 192.168.1.0 0.0.0.255 any eq 143
200 permit udp 192.168.1.0 0.0.0.255 any 
210 permit icmp 192.168.1.0 0.0.0.255 any 
220 deny ip 192.168.1.0 0.0.0.255 any 

230 deny tcp 192.168.2.0 0.0.0.255 any eq telnet
240 deny tcp 192.168.2.0 0.0.0.255 any eq ftp
250 deny tcp 192.168.2.0 0.0.0.255 any eq ftp-data
260 permit tcp 192.168.2.0 0.0.0.255 any eq www
270 permit tcp 192.168.2.0 0.0.0.255 any eq 443
280 permit tcp 192.168.2.0 0.0.0.255 any eq pop3
290 permit tcp 192.168.2.0 0.0.0.255 any eq smtp
300 permit tcp 192.168.2.0 0.0.0.255 any eq 143
310 permit udp 192.168.2.0 0.0.0.255 any 
320 permit icmp 192.168.2.0 0.0.0.255 any 
330 deny ip 192.168.2.0 0.0.0.255 any 

340 deny tcp 192.168.3.0 0.0.0.255 any eq telnet
350 deny tcp 192.168.3.0 0.0.0.255 any eq ftp
360 deny tcp 192.168.3.0 0.0.0.255 any eq ftp-data
370 permit tcp 192.168.3.0 0.0.0.255 any eq www
380 permit tcp 192.168.3.0 0.0.0.255 any eq 443
390 permit tcp 192.168.3.0 0.0.0.255 any eq pop3
400 permit tcp 192.168.3.0 0.0.0.255 any eq smtp
410 permit tcp 192.168.3.0 0.0.0.255 any eq 143
420 permit udp 192.168.3.0 0.0.0.255 any 
430 permit icmp 192.168.3.0 0.0.0.255 any 
440 deny ip 192.168.3.0 0.0.0.255 any 




 permit tcp 10.0.0.0 0.0.0.7 any 
 permit udp 10.0.0.0 0.0.0.7 any 
 permit icmp 10.0.0.0 0.0.0.7 any 
 deny tcp 192.168.0.0 0.0.3.255 any eq telnet
 deny tcp 192.168.0.0 0.0.3.255 any eq ftp
 deny tcp 192.168.0.0 0.0.3.255 any eq ftp-data
 permit tcp 192.168.0.0 0.0.3.255 any eq 22
 permit tcp 192.168.0.0 0.3.0.255 any eq www
 permit tcp 192.168.0.0 0.3.0.255 any eq 443
 permit tcp 192.168.0.0 0.3.0.255 any eq pop3
 permit tcp 192.168.0.0 0.3.0.255 any eq smtp
 permit tcp 192.168.0.0 0.3.0.255 any eq 143
 permit udp 192.168.0.0 0.3.0.255 any 
 permit icmp 192.168.0.0 3.0.0.255 any 
 deny ip 192.168.0.0 0.0.3.255 any 


 permit tcp any 10.0.0.0 0.0.0.7 established 
 permit udp any 10.0.0.0 0.0.0.7 
 permit icmp any 10.0.0.0 0.0.0.7 echo-reply 
 permit icmp any 10.0.0.0 0.0.0.7 unreachable 
 permit tcp any 192.168.0.0 0.0.3.255 established
 permit udp any 192.168.0.0 0.0.3.255
 permit icmp any 192.168.0.0 0.0.3.255 echo-reply
 permit icmp any 192.168.0.0 0.0.3.255 unreachable

 








Extended IP access list RETURN_CONNECTIONS

    

    10 permit tcp any 192.168.0.0 0.0.0.255 established
    20 permit udp any 192.168.0.0 0.0.0.255
    30 permit icmp any 192.168.0.0 0.0.0.255 echo-reply
    40 permit icmp any 192.168.0.0 0.0.0.255 unreachable

    50 permit tcp any 192.168.1.0 0.0.0.255 established
    60 permit udp any 192.168.1.0 0.0.0.255
    70 permit icmp any 192.168.1.0 0.0.0.255 echo-reply
    80 permit icmp any 192.168.1.0 0.0.0.255 unreachable
```

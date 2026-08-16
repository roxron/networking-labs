# CH2 TCP IP Review

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/BOOKS/Jeff Doyle/Routing TCP IP Volume 1 Jeff Doyle 1998/CH2 TCP IP Review`  
> Original source context: 07 SAFARI ONLINE / BOOKS / Jeff Doyle / Routing TCP IP Volume 1 Jeff Doyle 1998. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Change how the Subnet Mask is represented in show Commands:
!
R1(config)# line vty 0 15 
R1(config-line)# ip netmask-format bit 
!
!
!
ARP:
!
!
Debug ARP packets:
!
R1# debug arp 
!
!
Display ARP table:
!
R1# show arp
!
C:\WINDOWS> arp -a
!
Linux:~# arp -a 
!
!
Change ARP Timeout to 30 minutes:
!
R1(config)# interface G0/0
R1(config-if)# arp timeout 1800 
!
!
Statically map IP address to MAC address:
!
R1(config)# arp 172.21.5.131 0000.00a4.b711 snap
!
!
Clear Dynamic ARP Cache:
!
R1# clear arp-cache
!
!
Disable Proxy-ARP:
!
R1(config-if)# no ip proxy-arp 
!
!
!
ICMP:
!
!
Debug ICMP:
!
R1# debug ip icmp 
!
!
Disable IP Redirect:
!
R
1(config-if)# no ip redirects
!
!
!
```

# 15 ASA NAT

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/15 ASA NAT`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring NAT on the ASA 8.2 and older: 
!
nat (inside) 1 10.0.0.0 255.255.255.0
global (outside) 1 192.168.1.51-192.168.1.100
global (outside) 1 192.168.1.101
global (dmz) 1 interface 
!
access-list NONAT permit ip (source net to dest net) 
nat (inside) 0 access-list NONAT 
!
static (dmz,outside) 192.168.1.175 172.16.0.5 
static (dmz,inside) 172.16.0.5 172.16.0.5
```

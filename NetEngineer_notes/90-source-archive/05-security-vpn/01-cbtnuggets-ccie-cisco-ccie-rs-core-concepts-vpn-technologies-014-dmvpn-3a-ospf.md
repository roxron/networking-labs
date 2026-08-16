# 014 DMVPN%3a OSPF

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS Core Concepts - VPN Technologies/014 DMVPN%3a OSPF`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS Core Concepts - VPN Technologies. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Hub:
router ospf 1 
area 11 stub 
!
interface tunnel 0 
ip ospf network broadcast 
ip ospf 1 area 11
!
Spoke: 
router ospf 1 
area 11 stub 
!
interface tunnel 0 
ip ospf network broadcast 
ip ospf 1 area 11
ip ospf priority 0
```

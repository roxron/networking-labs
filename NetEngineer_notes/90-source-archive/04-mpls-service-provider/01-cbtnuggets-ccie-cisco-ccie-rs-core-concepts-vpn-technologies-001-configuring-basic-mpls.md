# 001 Configuring Basic MPLS

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS Core Concepts - VPN Technologies/001 Configuring Basic MPLS`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS Core Concepts - VPN Technologies. Content is preserved as historical study material; validate commands against the target platform and release.

```text
P1(config)# mpls label range 100 199 
P1(config)# mpls ip 
!
P1(config)# inteface g0/0
P1(config-if)# mpls ip
```

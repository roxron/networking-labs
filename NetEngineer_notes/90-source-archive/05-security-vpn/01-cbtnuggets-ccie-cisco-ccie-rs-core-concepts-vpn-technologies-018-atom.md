# 018 AToM

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS Core Concepts - VPN Technologies/018 AToM`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS Core Concepts - VPN Technologies. Content is preserved as historical study material; validate commands against the target platform and release.

```text
PE1
!
pseudowire-class one 
 encapsulation mpls 
!
int s0/0 
 encapsulation hdlc 
 xconnect 10.200.1.1 100 pw-class one 
!
```

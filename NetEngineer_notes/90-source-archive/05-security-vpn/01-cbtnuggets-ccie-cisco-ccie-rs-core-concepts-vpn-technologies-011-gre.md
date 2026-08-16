# 011 GRE

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS Core Concepts - VPN Technologies/011 GRE`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS Core Concepts - VPN Technologies. Content is preserved as historical study material; validate commands against the target platform and release.

```text
C1(config)# interface tunnel 10
C1(config-if)# tunnel source f0/0
C1(config-if)# tunnel destination 10.20.20.3 
C1(config-if)# ip address 172.16.0.1 255.255.255.252
!
C1(config)# interface tunnel 10
C1(config-if)# tunnel source f0/0
C1(config-if)# tunnel destination 10.10.10.1 
C1(config-if)# ip address 172.16.0.2 255.255.255.252 
!
Verify:
C1# show ip interface brief
C1# show ip interface tunnel 10
```

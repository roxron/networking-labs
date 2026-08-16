# 012 DMVPN%3a NHRP and EIGRP

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS Core Concepts - VPN Technologies/012 DMVPN%3a NHRP and EIGRP`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS Core Concepts - VPN Technologies. Content is preserved as historical study material; validate commands against the target platform and release.

```text
DMVPN HUB:
!
R1(config)# interface tunnel 0
R1(config-if)# ip address 172.16.1.1 255.255.255.0
R1(config-if)# ip nhrp network-id 10 
R1(config-if)# ip nhrp map multicast dynamic 
R1(config-if)# tunnel source g0/2 
R1(config-if)# tunnel mode gre multipoint 
R1(config-if)# 
!
!
DMVPN SPOKE: 
!
R2(config)# interface tunnel 0 
R2(config-if)# ip address 172.16.1.2 255.255.255.0 
R2(config-if)# ip nhrp network-id 10 
R2(config-if)# ip nhrp nhs 172.16.1.1 
R2(config-if)# ip nhrp map 172.16.1.1 10.0.0.13 
R2(config-if)# ip nhrp map multicast 10.0.0.13
R2(config-if)# tunnel source g0/1
R2(config-if)# tunnel mode gre multipoint 
!
Verify: 
!
R1# show ip nhrp 
R1# show dmvpn
```

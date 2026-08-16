# 008 CE to PE Routing

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS Core Concepts - VPN Technologies/008 CE to PE Routing`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS Core Concepts - VPN Technologies. Content is preserved as historical study material; validate commands against the target platform and release.

```text
OSPF: 
!
PE1# show vrf 
PE1# show ip interface brief 
!
PE1(config)# router ospf 101 vrf 101:CBT 
PE1(config-router)# network 10.0.0.12 0.0.0.3 area 0 
PE1(config-router)# exit 
!
PE1# show ip protocol vrf 101:CBT 
!
!
EIGRP:
!
PE1(config)# router eigrp 100
PE1(config-router)# address-family ipv4 unicast vrf 102:ACME autonomous-system 102 
PE1(config-router)# network 10.0.0.10 0.0.0.0
PE1(config-router)# exit 
!
PE1# show ip route vrf 102:ACME
!
!
RIP: 
!
PE2(config)# router rip 
PE2(config-router)# address-family ipv4 vrf 101:CBT 
PE2(config-router)# version 2 
PE2(config-router)# no auto 
PE2(config-router)# network 10.0.0.0 
PE2(config-router)# exit 
!
PE2# show ip route vrf 101:CBT
!
!
BGP:
!
PE2(config)# router bgp 65444 
PE2(config-router)# neighbor 192.168.0.1 nex-hop-self 
PE2(config-router)# address-family ipv4 unicast vrf 102:ACME 
PE2(config-router-af)# neighbor 10.0.0.18 remote-as 64555 
PE2(config-router-af)#
```

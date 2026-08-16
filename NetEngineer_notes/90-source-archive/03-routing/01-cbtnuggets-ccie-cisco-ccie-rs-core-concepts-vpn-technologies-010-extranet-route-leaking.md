# 010 Extranet Route Leaking

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS Core Concepts - VPN Technologies/010 Extranet Route Leaking`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS Core Concepts - VPN Technologies. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Route Leaking between Provider core and CE netwotk:
!
PE2(config)# ip route 22.22.22.0 255.255.255.0 g0/2 10.0.0.25 
PE2(config)# router ospf 1 
PE2(config-router)# redistribute static subnets 
PE2(config-router)# exit 
!
PE2(config)# ip route vrf 101:ACME 10.0.0.16 255.255.255.252 g0/1 10.0.0.33
PE2(config)# router rip 
PE2(config-router)# address-family ipv4 vrf 101:ACME 
PE2(config-router)# redistribute static metric 2
PE2(config-router)#
!
!
Route Leaking between CE networks:
!
PE2(config)# ip prefix-list EXPORT_LIST permit 3.3.3.0/24
PE2(config)# route-map EXPORT_MAP permit 10 
PE2(config-route-map)# match ip address prefix-list EXPORT_LIST 
PE2(config-route-map)# set extcommunity rt 3:3 addtive 
!
PE2(config)# vrf definition 101:ACME 
PE2(config-vrf)# address-family ipv4 
PE2(config-vrf-af)# export map EXPORT_MAP
!
PE1(config)# vrf definition 102:CBT 
PE1(config-vrf)# address-family ipv4 
PE1(config-vrf-af)# route-target import 3:3
```

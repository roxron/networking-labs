# 03 CR3

> Imported source note. Provenance: `NetEngineer_Journal/CONFG_TEMPLATES/BGP COnfedirationLAB/03 CR3`  
> Original source context: CONFG_TEMPLATES / BGP COnfedirationLAB. Content is preserved as historical study material; validate commands against the target platform and release.

```text
hostname CR3
!
int g0/0
ip address 80.0.0.9 255.255.255.252
no shutdown
!
int g0/1
ip address 80.0.0.13 255.255.255.252
no shutdown
!
int g0/2
ip address 80.0.0.18 255.255.255.252
no shutdown
!
int g0/3
ip address 80.0.0.22 255.255.255.252
no shutdown
!
int g0/4
ip address 80.0.2.1 255.255.255.252
no shutdown
!
int g0/5
ip address 80.0.2.5 255.255.255.252
no shutdown
!
int g0/6
ip address 80.0.2.9 255.255.255.252
no shutdown
!
int g0/7
ip address 80.0.2.13 255.255.255.252
no shutdown
!
int g0/8
ip address 80.0.2.17 255.255.255.252
no shutdown
!
int g0/9
ip address 80.0.2.21 255.255.255.252
no shutdown
!
int g0/10
ip address 80.0.2.25 255.255.255.252
no shutdown
!
int g0/11
ip address 80.0.2.29 255.255.255.252
no shutdown
!
!
int lo 100
ip address 80.0.0.103 255.255.255.255
description BGP PEERING
!
!
!
router ospf 100
 router-id 0.0.0.3
 auto-cost reference-bandwidth 1000
 area 0 range 80.0.0.0 255.255.255.0
 area 2 range 80.0.2.0 255.255.255.0
 network 80.0.0.8 0.0.0.3 area 0
 network 80.0.0.12 0.0.0.3 area 0
 network 80.0.0.16 0.0.0.3 area 0
 network 80.0.0.20 0.0.0.3 area 0
 network 80.0.0.103 0.0.0.0 area 0
 network 80.0.2.0 0.0.0.3 area 2
 network 80.0.2.4 0.0.0.3 area 2
 network 80.0.2.8 0.0.0.3 area 2
 network 80.0.2.12 0.0.0.3 area 2
 network 80.0.2.16 0.0.0.3 area 2
 network 80.0.2.20 0.0.0.3 area 2
 network 80.0.2.24 0.0.0.3 area 2
 network 80.0.2.28 0.0.0.3 area 2
!
!
!
router bgp 64601
 bgp router-id 80.0.0.103
 bgp log-neighbor-changes
 bgp confederation identifier 400
 bgp confederation peers 64600 
 neighbor IBGP peer-group
 neighbor IBGP remote-as 64601
 neighbor IBGP password cisco
 neighbor IBGP update-source Loopback100
 neighbor IBGP next-hop-self
 neighbor IBGP soft-reconfiguration inbound
 neighbor 80.0.0.104 peer-group IBGP
 neighbor 80.0.0.121 peer-group IBGP
 neighbor 80.0.0.122 peer-group IBGP
 neighbor 80.0.0.131 peer-group IBGP
 neighbor 80.0.0.132 peer-group IBGP
 neighbor EBGP peer-group
 neighbor EBGP remote-as 64600
 neighbor EBGP password cisco
 neighbor EBGP ebgp-multihop 2
 neighbor EBGP update-source Loopback100
 neighbor EBGP soft-reconfiguration inbound
 neighbor 80.0.0.101 peer-group EBGP
 neighbor 80.0.0.102 peer-group EBGP
```

# 02 CR2

> Imported source note. Provenance: `NetEngineer_Journal/CONFG_TEMPLATES/BGP COnfedirationLAB/02 CR2`  
> Original source context: CONFG_TEMPLATES / BGP COnfedirationLAB. Content is preserved as historical study material; validate commands against the target platform and release.

```text
hostname CR2
!
int g0/0
ip address 80.0.0.2 255.255.255.252
no shutdown
!
int g0/1
ip address 80.0.0.6 255.255.255.252
no shutdown
!
int g0/2
ip address 80.0.0.25 255.255.255.252
no shutdown
!
int g0/3
ip address 80.0.0.29 255.255.255.252
no shutdown
!
int g0/4
ip address 80.0.1.25 255.255.255.252
no shutdown
!
int g0/5
ip address 80.0.1.29 255.255.255.252
no shutdown
!
int g0/6
ip address 80.0.1.33 255.255.255.252
no shutdown
!
int g0/7
ip address 80.0.1.37 255.255.255.252
no shutdown
!
int g0/8
ip address 80.0.1.41 255.255.255.252
no shutdown
!
int g0/9
ip address 80.0.1.45 255.255.255.252
no shutdown
!
!
int lo 100
ip address 80.0.0.102 255.255.255.255
description BGP PEERING
!
!
!
router ospf 100
 router-id 0.0.0.2
 auto-cost reference-bandwidth 1000
 area 0 range 80.0.0.0 255.255.255.0
 area 1 range 80.0.1.0 255.255.255.0
 network 80.0.0.0 0.0.0.3 area 0
 network 80.0.0.4 0.0.0.3 area 0
 network 80.0.0.24 0.0.0.3 area 0
 network 80.0.0.28 0.0.0.3 area 0
 network 80.0.0.102 0.0.0.0 area 0
 network 80.0.1.24 0.0.0.3 area 1
 network 80.0.1.28 0.0.0.3 area 1
 network 80.0.1.32 0.0.0.3 area 1
 network 80.0.1.36 0.0.0.3 area 1
 network 80.0.1.40 0.0.0.3 area 1
 network 80.0.1.44 0.0.0.3 area 1
!
!
!
router bgp 64600
 bgp router-id 80.0.0.102
 bgp log-neighbor-changes
 bgp confederation identifier 400
 bgp confederation peers 64601 
 neighbor IBGP peer-group
 neighbor IBGP remote-as 64600
 neighbor IBGP password cisco
 neighbor IBGP update-source Loopback100
 neighbor IBGP next-hop-self
 neighbor IBGP soft-reconfiguration inbound
 neighbor 80.0.0.101 peer-group IBGP
 neighbor 80.0.0.111 peer-group IBGP
 neighbor 80.0.0.112 peer-group IBGP
 neighbor 80.0.0.113 peer-group IBGP
 neighbor EBGP peer-group
 neighbor EBGP remote-as 64601
 neighbor EBGP password cisco
 neighbor EBGP ebgp-multihop 2
 neighbor EBGP update-source Loopback100
 neighbor EBGP soft-reconfiguration inbound
 neighbor 80.0.0.103 peer-group EBGP
 neighbor 80.0.0.104 peer-group EBGP
```

# 10 POP2a

> Imported source note. Provenance: `NetEngineer_Journal/CONFG_TEMPLATES/BGP COnfedirationLAB/10 POP2a`  
> Original source context: CONFG_TEMPLATES / BGP COnfedirationLAB. Content is preserved as historical study material; validate commands against the target platform and release.

```text
hostname POP2a
!
int g0/0
ip address 80.0.2.50 255.255.255.252
no shutdown
!
int g0/1
ip address 80.0.2.54 255.255.255.252
no shutdown
!
int g0/2
ip address 80.0.2.18 255.255.255.252
no shutdown
!
int g0/3
ip address 80.0.2.22 255.255.255.252
no shutdown
!
!
int lo 100
ip address 80.0.0.131 255.255.255.255
description BGP PEERING
!
!
!
router ospf 100
 router-id 0.0.2.21
 auto-cost reference-bandwidth 1000
 network 80.0.0.131 0.0.0.0 area 2
 network 80.0.2.16 0.0.0.3 area 2
 network 80.0.2.20 0.0.0.3 area 2
 network 80.0.2.48 0.0.0.3 area 2
 network 80.0.2.52 0.0.0.3 area 2
!
!
!
router bgp 64601
 bgp router-id 80.0.0.131
 bgp log-neighbor-changes
 bgp confederation identifier 400
 bgp confederation peers 64600 
 neighbor IBGP peer-group
 neighbor IBGP remote-as 64601
 neighbor IBGP password cisco
 neighbor IBGP update-source Loopback100
 neighbor IBGP next-hop-self
 neighbor IBGP soft-reconfiguration inbound
 neighbor 80.0.0.103 peer-group IBGP
 neighbor 80.0.0.104 peer-group IBGP
 neighbor 80.0.0.121 peer-group IBGP
 neighbor 80.0.0.122 peer-group IBGP
 neighbor 80.0.0.132 peer-group IBGP
```

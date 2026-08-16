# 05 BGP1

> Imported source note. Provenance: `NetEngineer_Journal/CONFG_TEMPLATES/BGP COnfedirationLAB/05 BGP1`  
> Original source context: CONFG_TEMPLATES / BGP COnfedirationLAB. Content is preserved as historical study material; validate commands against the target platform and release.

```text
hostname BGP1
!
int g0/0
ip address 80.0.1.2 255.255.255.252
no shutdown
!
int g0/1
ip address 80.0.1.6 255.255.255.252
no shutdown
!
int g0/2
ip address 80.0.1.26 255.255.255.252
no shutdown
!
int g0/3
ip address 80.0.1.30 255.255.255.252
no shutdown
!
int g0/4
ip address 50.0.0.10 255.255.255.252
no shutdown
!
int g0/5
ip address 50.0.0.14 255.255.255.252
no shutdown
!
int g0/6
ip address 60.0.0.10 255.255.255.252
no shutdown
!
int g0/7
ip address 60.0.0.14 255.255.255.252
no shutdown
!
!
int lo 100
ip address 80.0.0.111 255.255.255.255
description BGP PEERING
!
!
!
router ospf 100
 router-id 0.0.1.1
 auto-cost reference-bandwidth 1000
 network 80.0.0.111 0.0.0.0 area 1
 network 80.0.1.0 0.0.0.3 area 1
 network 80.0.1.4 0.0.0.3 area 1
 network 80.0.1.24 0.0.0.3 area 1
 network 80.0.1.28 0.0.0.3 area 1
!
!
!
router bgp 64600
 bgp router-id 80.0.0.111
 bgp log-neighbor-changes
 redistribute static route-map RR
 bgp confederation identifier 400
 bgp confederation peers 64601 
 neighbor IBGP peer-group
 neighbor IBGP remote-as 64600
 neighbor IBGP password cisco
 neighbor IBGP update-source Loopback100
 neighbor IBGP next-hop-self
 neighbor IBGP soft-reconfiguration inbound
 neighbor EBGP peer-group
 neighbor EBGP password cisco
 neighbor EBGP ebgp-multihop 2
 neighbor EBGP update-source Loopback100
 neighbor EBGP soft-reconfiguration inbound
 neighbor EBGP filter-list 1 out
 neighbor 50.0.0.100 remote-as 100
 neighbor 50.0.0.100 peer-group EBGP
 neighbor 60.0.0.100 remote-as 200
 neighbor 60.0.0.100 peer-group EBGP
 neighbor 80.0.0.101 peer-group IBGP
 neighbor 80.0.0.102 peer-group IBGP
 neighbor 80.0.0.112 peer-group IBGP
 neighbor 80.0.0.113 peer-group IBGP
!
!
!
ip sla 1
 icmp-echo 50.0.0.9 source-interface GigabitEthernet0/4
 request-data-size 100
 threshold 500
 timeout 800
 frequency 1
 exit
!
ip sla 2
 icmp-echo 50.0.0.13 source-interface GigabitEthernet0/5
 request-data-size 100
 threshold 500
 timeout 800
 frequency 1
 exit
!
ip sla 3
 icmp-echo 60.0.0.9 source-interface GigabitEthernet0/6
 request-data-size 100
 threshold 500
 timeout 800
 frequency 1
 exit
!
ip sla 4
 icmp-echo 60.0.0.13 source-interface GigabitEthernet0/7
 request-data-size 100
 threshold 500
 timeout 800
 frequency 1
 exit
!
!
ip sla  schedule 1 life forever start-time now
ip sla  schedule 2 life forever start-time now
ip sla  schedule 3 life forever start-time now
ip sla  schedule 4 life forever start-time now
!
!
track 1 ip sla 1
track 2 ip sla 2
track 3 ip sla 3
track 4 ip sla 4

exit
!
!
!
ip route 50.0.0.100 255.255.255.255 50.0.0.9 track 1
ip route 50.0.0.100 255.255.255.255 50.0.0.13 track 2
ip route 60.0.0.100 255.255.255.255 60.0.0.9 track 3
ip route 60.0.0.100 255.255.255.255 60.0.0.13 track 4
!
!
ip route 80.0.0.0 255.255.248.0 null 0
!
ip prefix-list RD_ST permit 80.0.0.0/21
!
!
route-map RR permit 10
 match ip address prefix-list RD_ST
 set origin igp
!
!
!
ip as-path access-list 1 permit ^$
```

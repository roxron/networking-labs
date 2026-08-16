# 06 BGP2

> Imported source note. Provenance: `NetEngineer_Journal/CONFG_TEMPLATES/BGP COnfedirationLAB/06 BGP2`  
> Original source context: CONFG_TEMPLATES / BGP COnfedirationLAB. Content is preserved as historical study material; validate commands against the target platform and release.

```text
hostname BGP2
!
int g0/0
ip address 80.0.1.10 255.255.255.252
no shutdown
!
int g0/1
ip address 80.0.1.14 255.255.255.252
no shutdown
!
int g0/2
ip address 80.0.1.34 255.255.255.252
no shutdown
!
int g0/3
ip address 80.0.1.38 255.255.255.252
no shutdown
!
int g0/4
ip address 50.0.0.18 255.255.255.252
no shutdown
!
int g0/5
ip address 50.0.0.22 255.255.255.252
no shutdown
!
int g0/6
ip address 70.0.0.2 255.255.255.252
no shutdown
!
int g0/7
ip address 70.0.0.6 255.255.255.252
no shutdown
!
!
int lo 100
ip address 80.0.0.112 255.255.255.255
description BGP PEERING
!
!
!
router ospf 100
 router-id 0.0.1.2
 auto-cost reference-bandwidth 1000
 network 80.0.0.112 0.0.0.0 area 0
 network 80.0.1.8 0.0.0.3 area 1
 network 80.0.1.12 0.0.0.3 area 1
 network 80.0.1.32 0.0.0.3 area 1
 network 80.0.1.36 0.0.0.3 area 1
!
!
!
router bgp 64600
 bgp router-id 80.0.0.112
 bgp log-neighbor-changes
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
 neighbor 50.0.0.100 remote-as 100
 neighbor 50.0.0.100 peer-group EBGP
 neighbor 70.0.0.100 remote-as 300
 neighbor 70.0.0.100 peer-group EBGP
 neighbor 80.0.0.101 peer-group IBGP
 neighbor 80.0.0.102 peer-group IBGP
 neighbor 80.0.0.111 peer-group IBGP
 neighbor 80.0.0.113 peer-group IBGP
!
!
!
ip sla 1
 icmp-echo 50.0.0.17 source-interface GigabitEthernet0/4
 request-data-size 100
 threshold 500
 timeout 800
 frequency 1
 exit
!
ip sla 2
 icmp-echo 50.0.0.21 source-interface GigabitEthernet0/5
 request-data-size 100
 threshold 500
 timeout 800
 frequency 1
 exit
!
ip sla 3
 icmp-echo 70.0.0.1 source-interface GigabitEthernet0/6
 request-data-size 100
 threshold 500
 timeout 800
 frequency 1
 exit
!
ip sla 4
 icmp-echo 70.0.0.5 source-interface GigabitEthernet0/7
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
ip route 50.0.0.100 255.255.255.255 50.0.0.17 track 1
ip route 50.0.0.100 255.255.255.255 50.0.0.21 track 2
ip route 70.0.0.100 255.255.255.255 70.0.0.1 track 3
ip route 70.0.0.100 255.255.255.255 70.0.0.5 track 4
```

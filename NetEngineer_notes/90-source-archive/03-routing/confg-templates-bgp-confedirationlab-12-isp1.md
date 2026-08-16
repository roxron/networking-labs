# 12 ISP1

> Imported source note. Provenance: `NetEngineer_Journal/CONFG_TEMPLATES/BGP COnfedirationLAB/12 ISP1`  
> Original source context: CONFG_TEMPLATES / BGP COnfedirationLAB. Content is preserved as historical study material; validate commands against the target platform and release.

```text
hostname ISP1
!
int g0/0
ip address 50.0.0.1 255.255.255.252
no shutdown
!
int g0/1
ip address 50.0.0.5 255.255.255.252
no shutdown
!
int g0/2
ip address 50.0.0.9 255.255.255.252
no shutdown
!
int g0/3
ip address 50.0.0.13 255.255.255.252
no shutdown
!
int g0/4
ip address 50.0.0.17 255.255.255.252
no shutdown
!
int g0/5
ip address 50.0.0.21 255.255.255.252
no shutdown
!
!
int lo 100
ip address 50.0.0.100 255.255.255.255
description BGP PEERING
!
!
!
ip sla 1
 icmp-echo 50.0.0.2 source-interface GigabitEthernet0/0
 request-data-size 100
 threshold 500
 timeout 800
 frequency 1
 exit
!
ip sla 2
 icmp-echo 50.0.0.6 source-interface GigabitEthernet0/1
 request-data-size 100
 threshold 500
 timeout 800
 frequency 1
 exit
!
ip sla 3
 icmp-echo 50.0.0.10 source-interface GigabitEthernet0/2
 request-data-size 100
 threshold 500
 timeout 800
 frequency 1
 exit
!
ip sla 4
 icmp-echo 50.0.0.14 source-interface GigabitEthernet0/3
 request-data-size 100
 threshold 500
 timeout 800
 frequency 1
 exit
!
ip sla 5
 icmp-echo 50.0.0.18 source-interface GigabitEthernet0/4
 request-data-size 100
 threshold 500
 timeout 800
 frequency 1
 exit
!
ip sla 6
 icmp-echo 50.0.0.22 source-interface GigabitEthernet0/5
 request-data-size 100
 threshold 500
 timeout 800
 frequency 1
 exit
!
ip sla  schedule 1 life forever start-time now
ip sla  schedule 2 life forever start-time now
ip sla  schedule 3 life forever start-time now
ip sla  schedule 4 life forever start-time now
ip sla  schedule 5 life forever start-time now
ip sla  schedule 6 life forever start-time now
!
track 1 ip sla 1
track 2 ip sla 2
track 3 ip sla 3
track 4 ip sla 4
track 5 ip sla 5
track 6 ip sla 6
exit
!
!
!
ip route 60.0.0.100 255.255.255.255 50.0.0.2 track 1
ip route 60.0.0.100 255.255.255.255 50.0.0.6 track 2
ip route 80.0.0.111 255.255.255.255 50.0.0.10 track 3
ip route 80.0.0.111 255.255.255.255 50.0.0.14 track 4
ip route 80.0.0.112 255.255.255.255 50.0.0.18 track 5
ip route 80.0.0.112 255.255.255.255 50.0.0.22 track 6
!
!
!
router bgp 100
 bgp router-id 50.0.0.100
 bgp log-neighbor-changes
 redistribute static route-map RR
 neighbor EBGP peer-group
 neighbor EBGP password cisco
 neighbor EBGP ebgp-multihop 2
 neighbor EBGP update-source Loopback100
 neighbor EBGP soft-reconfiguration inbound
 neighbor 60.0.0.100 remote-as 200
 neighbor 60.0.0.100 peer-group EBGP
 neighbor 80.0.0.111 remote-as 400
 neighbor 80.0.0.111 peer-group EBGP
 neighbor 80.0.0.112 remote-as 400
 neighbor 80.0.0.112 peer-group EBGP
!
!
!
int lo1
ip address 50.0.1.1 255.255.255.0
!
int lo2
ip address 50.0.2.1 255.255.255.0
!
int lo3
ip address 50.0.3.1 255.255.255.0
!
!
ip route 50.0.0.0 255.255.252.0 null 0
!
ip prefix-list RD_ST permit  50.0.0.0/22
!
!
route-map RR permit 10
 match ip address prefix-list RD_ST
 set origin igp
!
```

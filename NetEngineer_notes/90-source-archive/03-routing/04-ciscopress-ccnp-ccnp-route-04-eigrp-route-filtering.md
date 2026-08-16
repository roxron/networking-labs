# 04 EIGRP Route Filtering

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/04 EIGRP Route Filtering`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
By ACL:
On Router B1, before the filtering is applied:
B1# show ip route | include 10.17
D 10.17.35.0/25 [90/2300416] via 10.1.1.1, 00:00:18, Serial0/0/0.1
D 10.17.34.0/24 [90/2300416] via 10.1.1.1, 00:00:18, Serial0/0/0.1
D 10.17.32.0/23 [90/2300416] via 10.1.1.1, 00:00:18, Serial0/0/0.1
D 10.17.36.0/26 [90/2300416] via 10.1.1.1, 00:00:18, Serial0/0/0.1
D 10.17.36.64/26 [90/2300416] via 10.1.1.1, 00:00:18, Serial0/0/0.1
D 10.17.35.128/25 [90/2300416] via 10.1.1.1, 00:00:18, Serial0/0/0.1
!
Configuration:
! On Router WAN1:
WAN1# configure terminal
Enter configuration commands, one per line.
End with CNTL/Z.
WAN1(config)# access-list 2 deny 10.17.32.0 0.0.31.255
WAN1(config)# access-list 2 permit any
WAN1(config)# router eigrp 1
WAN1(config-router)# distribute-list 2 out
WAN1(config-router)# ^Z
WAN1#
!
! On Router B1, after the filtering is applied
B1# show ip route | include 10.17
B1#



By Prefix-List:
! On Router WAN1: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
WAN1# show running-config
! lines omitted for brevity
router eigrp 1
network 10.0.0.0
distribute-list prefix fred out
auto-summary
!
ip prefix-list fred seq 5 deny 10.17.35.0/24 ge 25 le 25
ip prefix-list fred seq 10 deny 10.17.36.0/24 ge 26 le 26
ip prefix-list fred seq 15 deny 0.0.0.0/0 ge 30 le 30
ip prefix-list fred seq 20 permit 0.0.0.0/0 le 32
!
B1#show ip route 10.17.32.0 255.255.248.0 longer-prefixes



By Route Maps:
!
router eigrp 1
network 10.0.0.0
distribute-list route-map filter-man-slash30 out
!
ip prefix-list manufacturing seq 5 permit 10.17.35.0/24 ge 25 le 25
ip prefix-list manufacturing seq 10 permit 10.17.36.0/24 ge 26 le 26
ip prefix-list slash30 seq 5 permit 0.0.0.0/0 ge 30 le 30
!
route-map filter-man-slash30 deny 8
match ip address prefix-list manufacturing
!
route-map filter-man-slash30 deny 15
match ip address prefix-list slash30
!
route-map filter-man-slash30 permit 23
```

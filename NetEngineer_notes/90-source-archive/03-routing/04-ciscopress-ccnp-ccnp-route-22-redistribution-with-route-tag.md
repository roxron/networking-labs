# 22 Redistribution with Route Tag

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/22 Redistribution with Route Tag`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
! The following is the routing protocol configuration on RD1
router ospf 2
router-id 3.3.3.3
log-adjacency-changes
redistribute eigrp 1 subnets route-map set-tag-11
network 172.30.0.0 0.0.255.255 area 0
!
route-map set-tag-11 permit 10
set tag 11
!
!
!
! The following is the routing protocol configuration on RD2
router eigrp 1
redistribute ospf 2 metric 1000 200 255 1 1500 route-map stop-tag-11
network 172.16.0.0
no auto-summary
!
route-map stop-tag-11 deny 10
match tag 11
!
route-map stop-tag-11 permit 20
```

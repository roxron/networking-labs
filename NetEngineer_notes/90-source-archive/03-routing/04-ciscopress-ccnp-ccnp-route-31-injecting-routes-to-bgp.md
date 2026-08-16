# 31 Injecting Routes to BGP

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/31 Injecting Routes to BGP`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Method1:
!
router bgp 500
 network 192.168.0.0 mask 255.255.192.0
!

Method2:
router bgp 11
redistribute ospf 1 route-map only-128-107
!
route-map only-128-107 permit
match ip address prefix 128-107
!
ip prefix-list 128-107 permit 128.107.0.0/19 le 32
!
!
show ip bgp 128.107.0.0/19 longer-prefixes

!
!
Advertise summary network:

E1# conf t
E1(config)# router bgp 11
E1(config-router)# aggregate-address 128.107.0.0 255.255.224.0 summary-only
E1(config-router)# ^Z
```

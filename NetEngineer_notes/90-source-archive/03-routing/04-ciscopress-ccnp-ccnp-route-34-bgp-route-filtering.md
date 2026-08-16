# 34 BGP Route Filtering

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/34 BGP Route Filtering`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Filter outbound Routes with Prefix-List:
!
E1# configure terminal
E1(config)# ip prefix-list only-public permit 128.107.0.0/19
E1(config)# router bgp 11
E1(config-router)# neighbor 1.1.1.1 prefix-list only-public out
E1(config-router)# end
E1#
!
!
clear ip bgp 1.1.1.1
E1# show ip bgp neighbor 1.1.1.1 advertised-routes



Filter outbound Routes with Distribute-List:
!
access-list 101 permit ip host 128.107.0.0 host 255.255.224.0
router bgp 11
neighbor 1.1.1.1 distribute-list 101 out



Filter outbound Routes with Route-map:
!
ip prefix-list only-public seq 5 permit 128.107.0.0/19
!
route-map only-public-rmap permit 10
match ip address prefix-list only-public
!
router bgp 11
neighbor 1.1.1.1 route-map only-public-rmap out

Verify BGP Filters:
show ip bgp neighbor 1.1.1.1 advertised-routes
```

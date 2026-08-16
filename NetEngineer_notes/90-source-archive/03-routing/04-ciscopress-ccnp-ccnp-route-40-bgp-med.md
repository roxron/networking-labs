# 40 BGP MED

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/40 BGP MED`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
MED Configuration on Router E1:
route-map set-med-to-I1-1 permit 10
match ip address prefix-list only-public
set metric 10
!
route-map set-med-to-I1-4 permit 10
match ip address prefix-list only-public
set metric 20
!
ip prefix-list only-public permit 128.107.0.0/19
!
router bgp 11
neighbor 1.1.1.1 route-map set-med-I1-1 out
neighbor 192.168.1.2 route-map set-med-I1-4 out
```

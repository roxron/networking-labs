# 38 BGP Local Preferance

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/38 BGP Local Preferance`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Setting the BGP Local_Pref Using a Route Map:
E1# show running-config
! only pertinent portions shown
ip prefix-list match-184 seq 5 permit 184.0.0.0/8
!
ip prefix-list match-185 seq 5 permit 185.0.0.0/8
!
route-map set-LP-150 permit 10
match ip address prefix-list match-185
set local-preference 150
!
route-map set-LP-150 permit 15
match ip address prefix-list match-184
set local-preference 50
!
route-map set-LP-150 permit 20
!
router bgp 11
neighbor 1.1.1.1 route-map set-LP-150 in
!
!
!
show ip bgp 185.0.0.0/8
show ip bgp 176.0.0.0/4 longer-prefixes
show ip bgp 185.0.0.0/8 longer-prefixes


show ip bgp rib-failures
```

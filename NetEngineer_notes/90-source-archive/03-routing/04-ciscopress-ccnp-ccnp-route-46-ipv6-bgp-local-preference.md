# 46 IPv6 BGP Local Preference

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/46 IPv6 BGP Local Preference`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Local Preference Configuration:
!
R1# conf term
R1(config)# route-map LP-R2
R1(config-route-map)# set local-preference 50
R1(config-route-map)# exit
R1(config)# route-map LP-R3
R1(config-route-map)# set local-preference 150
R1(config-route-map)# exit
R1(config)# router bgp 64701
R1(config-router)# address-family ipv6
R1(config-router-af)# neighbor 198.51.100.2 route-map LP-R2 in
R1(config-router-af)# neighbor 198.51.100.6 route-map LP-R3 in
R1(config-router-af)# end
R1# clear ip bgp * soft
R1# show bgp ipv6 unicast
```

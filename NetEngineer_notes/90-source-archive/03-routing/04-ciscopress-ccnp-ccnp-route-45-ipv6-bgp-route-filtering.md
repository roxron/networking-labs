# 45 IPV6 BGP Route Filtering

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/45 IPV6 BGP Route Filtering`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Prefix List Configuration on Router R2:
R2# conf term
R2(config)# ipv6 prefix-list SMALL_NETS seq 10 permit 2000::/16 le 64
R2(config)# router bgp 64702
R2(config-router)# address-family ipv6
R2(config-router-af)# neighbor 198.51.100.1 prefix-list SMALL_NETS out
R2(config-router-af)# end
R2# clear ip bgp * soft
```

# 44 IPv6 over IPv6 BGP Session

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/44 IPv6 over IPv6 BGP Session`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
IPv6 over IPv6 BGP Session—R1 Configuration:
ipv6 unicast-routing
! 
router bgp 64701
neighbor 2000:2::2 remote-as 64702
!
address-family ipv6
network 2000:1::/64
neighbor 2000:2::2 activate
exit-address-family
```

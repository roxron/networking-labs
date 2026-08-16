# 43 IPv6 over IPv4 BGP Session

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/43 IPv6 over IPv4 BGP Session`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
ipv6 unicast-routing
!
router bgp 64701
neighbor 198.51.100.2 remote-as 64702
!
address-family ipv4
network 192.0.2.0
neighbor 198.51.100.2 activate
exit-address-family
!
address-family ipv6
network 2000:1::/64	
neighbor 198.51.100.2 activate
neighbor 198.51.100.2 route-map IPV6-NEXT-HOP out
exit-address-family
!
route-map IPV6-NEXT-HOP permit 10
set ipv6 next-hop 2000:2::1
```

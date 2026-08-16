# 00 IPv6 ADDRESS Configuration

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/00 IPv6 ADDRESS Configuration`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R2# show ipv6 interface brief
R2# show interfaces fa0/0
R2# show ipv6 interface fa0/0
R2# show ipv6 route
!
!
The IPv6 Neighbor Table:
!
R2# debug ipv6 nd
R2# ping 2000:0:0:2::3
R2# undebug all
R2# show ipv6 neighbors
!
!
Stateless Autoconfiguration:
!
R2# conf t
R2(config)# ipv6 unicast-routing
R2(config)# interface fa0/1
R2(config-if)# no ipv6 address
R2(config-if)# ipv6 address autoconfig
R2(config-if)# ^Z
R2# show ipv6 interface brief
!
R2# show ipv6 router
```

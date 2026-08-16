# 01 Basic IPv6

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/IPV6/01 Basic IPv6`  
> Original source context: 01 CBTNUGGETS / IPV6. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# ipv6 unicast-routing
R1(config)# interface G0/0
R1(config-if)# no shutdown 
R1(config-if)# ipv6 address 2001:DB8:1010:1::1/64
R1(config-if)# ipv6 address FE80::1 link-local

R1# show ipv6 interface brief
R1# show ipv6 route
R1# show ipv6 protocols

R1(config)# ipv6 router rip RIP
R1(config)# interface G0/0
R1(config-if)# ipv6 rip RIP enable


R1# debug ipv6 nd 
R1# show ipv6 neighbors
R1# show ipv6 router
```

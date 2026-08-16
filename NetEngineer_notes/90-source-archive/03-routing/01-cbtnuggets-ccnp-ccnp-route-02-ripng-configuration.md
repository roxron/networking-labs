# 02 RIPng Configuration

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP ROUTE/02 RIPng Configuration`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure:
R1(config)# ipv6 unicast-routing 
R1(config)# ipv6 router rip RIPng
R1(config-rtr)# exit
R1(config)# interface G0/0
R1(config-if)# ipv6 rip RIPng enable

Verify RIPng
R1# show ipv6 protocols 
R1# show ipv6 route
R1# show ipv6 rip 
R1# show ipv6 rip database
R1# show ipv6 neighbors
R1# show ipv6 router 
R1# show ipv6 rip next-hop 
R1# debug ipv6 ndeRIP
```

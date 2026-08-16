# 09 EIGRP IPv6

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP ROUTE/09 EIGRP IPv6`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# ipv6 unicast-routing
R1(config)# ipv6 router eigrp 10 
R1(config-rtr)# router-id 1.1.1.1
R1(config-rtr)# no shutdown
R1(config-rtr)# exit
R1(config)# interface S0/0
R1(config-if)# ipv6 eigrp 10
R1(config-if)# interface S0/1
R1(config-if)# ipv6 eigrp 10
```

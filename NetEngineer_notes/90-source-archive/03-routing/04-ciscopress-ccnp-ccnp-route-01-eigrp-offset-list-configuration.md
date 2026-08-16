# 01 EIGRP Offset-list Configuration

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/01 EIGRP Offset-list Configuration`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
WAN1(config)# access-list 11 permit 10.11.1.0
WAN1(config)# router eigrp 1
WAN1(config-router)# offset-list 11 in 3 Serial0/0/0.1
WAN1(config-router)# end

WAN1# show ip eigrp topo 10.11.1.0/24
```

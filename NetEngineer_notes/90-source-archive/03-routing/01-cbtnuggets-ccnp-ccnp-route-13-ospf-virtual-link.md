# 13 OSPF Virtual-link

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP ROUTE/13 OSPF Virtual-link`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R5(config)# router ospf 1
R5(config-router)# area 10 virtual-link 6.6.6.6

R6(config)# router ospf 1
R6(config-router)# area 10 virtual-link 5.5.5.5
```

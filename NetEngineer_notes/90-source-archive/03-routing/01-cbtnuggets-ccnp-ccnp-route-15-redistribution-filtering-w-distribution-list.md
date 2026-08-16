# 15 Redistribution  Filtering w Distribution List

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP ROUTE/15 Redistribution_ Filtering w Distribution List`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R2(config)# access-list 1 permit 172.16.0.0 0.0.1.255 
R2(config)# router ospf 1
R2(config-router)# distribute-list 1 out
```

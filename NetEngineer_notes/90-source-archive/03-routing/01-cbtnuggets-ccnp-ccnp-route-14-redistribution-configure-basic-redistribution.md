# 14 Redistribution  Configure Basic Redistribution

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP ROUTE/14 Redistribution_ Configure Basic Redistribution`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
on ASBR:
R1(config)# router ospf 1
R1(config-router)# redistribute eigrp 1 metric 100 subnets metric-type 1
R1(config-router)# exit
R1(config)# router eirgp 1
R1(config-router)# redistribute ospf 1
```

# 11 OSPF Summarization

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP ROUTE/11 OSPF Summarization`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
ABR summary:
R2(config)# router ospf 1
R2(config-router)# area 1 range 172.16.0.0 255.255.252.0
R2(config-router)# area 0 range 10.0.0.0 255.255.0.0

ASBR summary:
R1(config) router ospf 1 
R1(config-router)# summary-address 10.2.0.0 255.255.248.0
```

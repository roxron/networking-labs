# 09 Redistribution Between OSPF and RIP

> Imported source note. Provenance: `NetEngineer_Journal/02 NETWORK LESSONS/CCNP/CCNP ROUTE/09 Redistribution Between OSPF and RIP`  
> Original source context: 02 NETWORK LESSONS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R2(config)# router ospf 1
R2(config-router)# redistribute rip subnets

R2(config)# router rip 
R2(config-router)# redistribute ospf 1 metric 5
```

# 10 OSPF Security

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP ROUTE/10 OSPF Security`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# router ospf 10
R1(config-router)# area 0 authentication message-digest
R1(config-router)# exit
R1(config)# interface S0/0 
R1(config-if)# ip ospf message-digest-key 1 md5 0 cisco
R1(config-if)# exit
```

# 12 OSPF Special Area Types

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP ROUTE/12 OSPF Special Area Types`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure stub area:
on Internal router:
R3(config)# router ospf 1
R3(config-router)# area 1 stub
R3(config-router)# exit
R3(config)#
on ABR router:
R1(config)# router ospf 1
R1(config-router)# area 1 stub 
R1(config-router)# exit


Configure totally stub area:
on Internal router:
R3(config)# router ospf 1
R3(config-router)# area 1 stub
on ABR router:
R1(config)# router ospf 1
R1(config-router)# area 1 stub no-summary 


Configure Not-So-Stubby area (NSSA):
on ASBR Router: 
R5(config)# router ospf 1
R5(config-router)# area 2 nssa
on ABR router:
R2(config)# router ospf 1
R2(config-router)# area 2 nssa no-sumary
```

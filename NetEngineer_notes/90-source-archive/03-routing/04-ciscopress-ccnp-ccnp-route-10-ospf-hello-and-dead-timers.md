# 10 OSPF Hello and Dead timers

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/10 OSPF Hello and Dead timers`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R4# conf t
R4(config)# interface fastethernet0/0
R4(config-if)# ip ospf hello-interval 9
R4(config-if)# ip ospf dead-interval 36
!
or
!
R4(config-if)# ip ospf dead-interval minimal hello-multiplier 4
```

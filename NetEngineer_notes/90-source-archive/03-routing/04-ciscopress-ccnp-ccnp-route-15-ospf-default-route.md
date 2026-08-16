# 15 OSPF Default Route

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/15 OSPF Default Route`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure Default route by using area range command:
!
router ospf 10
area 0 range 0.0.0.0 0.0.0.0
!

Regular way to advertise 0.0.0.0:
!
router ospf 10 
default-information originate metric 10
```

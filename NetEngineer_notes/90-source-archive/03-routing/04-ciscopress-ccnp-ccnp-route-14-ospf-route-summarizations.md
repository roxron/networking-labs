# 14 OSPF Route Summarizations

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/14 OSPF Route Summarizations`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Summarization at ABRs:
! Next, on R2, configuring the same summary:
!
router ospf 2
area 0 range 10.16.0.0 255.255.252.0 cost 12


Summarization at ASBRs:
!
router ospf 1
summary-address 10.16.0.0 255.255.254.0
```

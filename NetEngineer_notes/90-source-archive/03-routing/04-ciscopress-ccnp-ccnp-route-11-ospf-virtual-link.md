# 11 OSPF Virtual Link

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/11 OSPF Virtual Link`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring OSPF Virtual Link:
! On Router C1:
router ospf 1
area 1 virtual-link 4.4.4.4
!
!
! On Router C2:
router ospf 4
area 1 virtual-link 1.1.1.1
!
!
Verifying the OSPF Virtual Link:
R1# show ip ospf virtual-links
```

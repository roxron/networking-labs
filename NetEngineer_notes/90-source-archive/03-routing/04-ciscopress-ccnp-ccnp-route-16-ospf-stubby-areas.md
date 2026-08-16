# 16 OSPF Stubby areas

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/16 OSPF Stubby areas`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Stub Area Configuration:
!
! On Router R1:
router ospf 1
area 34 stub
!
!
! On Router R2:
router ospf 1
area 34 stub

Verify OSPF Stub area: 
show ip ospf 
show ip ospf database summary 0.0.0.0
show ip ospf database database-summary 


Configuring and Verifying Totally Stubby Areas:
!
! On Router R1:
router ospf 1
area 34 stub no-summary
!
!
! On Router R1:
router ospf 1
area 34 stub 

Totally NSSA Configuration and Verification:
!
! On Router R1:
router ospf 1
area 34 nssa no-summary
area 34 nssa default-information originate
!
! On Router R3:
router ospf 3
area 34 nssa
```

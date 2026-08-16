# 23  Route%3a Troubleshooting Prefix Lists

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/23  Route%3a Troubleshooting Prefix Lists`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Route: Troubleshooting Prefix Lists:
!
WHAT ARE PREFIX LISTS?:
!
> AN IMPOVEMENT ON ACCESS LISTS FOR MATHING ROUTES 
   - IMPRIVED PROCESSOR UTILIZATION
   - BETTER SUBNET MASK MATCHING ABILITIES 
> SIMULAR "STRUCTURE' AS ACLs
> TWO STAGE MATCHING SYSTEM: NETWORK + MASK 
!
!
PREFIX LISTS: WHAT CAN GO WRONG?:
!
> MISTAKEN MATHCING MECHANICS (NO GE OR LE, MISTAKEN GE OR LE)
> IMMEDIATE EXECUTION WHEN APPLIED (IMPLICIT DENY DSETROYS ALL)
> OTHER ACL-LIKE ISSUES (WRONG DIRECTION, TOP DOWN, ETC..)
!
!
- show ip prefix-list 
- show ip prefix-list detail 
- show run | include ip prefix 
- show route-map 
!
```

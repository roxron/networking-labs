# 21  Route%3a Troubleshooting IPv4 Access Lists

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/21  Route%3a Troubleshooting IPv4 Access Lists`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Route: Troubleshooting IPv4 Access Lists:
!
IPV4 ACLs: WHAT CAN GO WRONG?:
!
> ACCESS LIST APPLIED THE WRONG DIRECTION (VIA ACCESS GROUP OR MISSED LOGINC) 
!
> FORGOTTEN IMPLICIT DENY (ALWAYS MANUALLY ADD IT)
!
> EARLIER MATCH, UNEXPECTED RESULTS
!
> PORT NUMBER IN THE WRONG PLACE
!
- show run | section access-list 
- show ip access-list (ACL matches) 
- show run | s interface (ACL application) 
- show ip interface (ACL application) 
!
```

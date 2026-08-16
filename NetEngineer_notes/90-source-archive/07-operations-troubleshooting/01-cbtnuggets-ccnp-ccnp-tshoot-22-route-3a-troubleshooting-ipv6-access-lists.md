# 22  Route%3a Troubleshooting IPv6 Access Lists

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/22  Route%3a Troubleshooting IPv6 Access Lists`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Route: Troubleshooting IPv6 Access Lists:
!
IPV6 ACLs: WHAT CAN GO WRONG?:
!
> ACCESS LIST APPLIED THE WRONG DIRECTION (VIA TRAFFICE FILTER OR MISSED LOGINC) 
!
> FORGOTTEN IMPLICIT DENY (MANUALLY ADD IT - CAREFUL ON ICMP ND)
!
> EARLIER MATCH, UNEXPECTED RESULTS 
!
> PORT NUMBER IN THE WRONG PLACE 
!
- show run | section access-list 
- show ipv6 access-list 
- show run | sectiong interace 
- show ipv6 interface 
!
```

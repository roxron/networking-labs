# 38  Management%3a Troubleshooting AAA

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/38  Management%3a Troubleshooting AAA`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Management: Troubleshooting AAA:
!
AAA: WHAT CAN GO WRONG?:
!
> AAA NOT ENABLED 
> USER ACCOUNBT NOT CREATED 
> AUTHENTICATION METHOD NOT DEFINED 
> AUTHENTICATION METHOD NOT APPLIED TO LINES 
> AAA "FAILOVER" MISUNDERSTOOD
!
- show run | section vty / aaa
- show run | section username 
- debug aaa authentication 
!
!
```

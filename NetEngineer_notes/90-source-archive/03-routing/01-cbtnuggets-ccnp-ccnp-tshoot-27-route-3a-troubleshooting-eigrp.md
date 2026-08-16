# 27  Route%3a Troubleshooting EIGRP

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/27  Route%3a Troubleshooting EIGRP`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Route: Troubleshooting EIGRP;
!
EIGRP: WHAT CAN GO WRONG?:
!
> INTERFACE IS DOWN 
> WRONG AS NUMBER 
> WRONG NETWORK STATEMENT 
> PASSIVE INTERFACE OR WRONG SUBNET 
> AUTHENTICATION 
> ACL 
> MISMATCHED TIMERS (FLAPPING NEIGHBORS) 
!
- show run | section eigrp 
- show ip eigrp neighbors 
- show ip route eugrp 
- show ip protocols 
- show ip eigrp interface 
- show ip eigrp topology 
- debug ip eigrp packet 
!
!
```

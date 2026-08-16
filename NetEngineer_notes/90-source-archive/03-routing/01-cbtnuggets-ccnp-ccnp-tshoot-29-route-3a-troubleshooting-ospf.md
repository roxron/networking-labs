# 29 Route%3a Troubleshooting OSPF

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/29 Route%3a Troubleshooting OSPF`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Route: Troubleshooting OSPF:
!
OSPF: WHAT CAN GO WRONG?:
!
> INTERFACE IS DOWN OR ACL BLOCKING 
> MISMATCHED AREA NUMBER / AREA TYPE / TIMERS
> WRONG NETWORK STATEMENT 
> PASSIVE INTERFACE OR WRONG SUBNET 
> AUTHENTICATION MISMATCH
> WRONG DR ELECTED (IN A HUB-AND-SPOKE ENV.)
!
!
- show run | section ospf 
- show ip ospf neighbors
- show ip route ospf 
- show ip protocols 
- show ip ospf interface brief
- show ip ospf interface 
- debug ip ospf hello 
- debug ip ospf adj 
!
!
```

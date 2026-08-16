# 30 Route%3a Troubleshooting OSPFv3

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/30 Route%3a Troubleshooting OSPFv3`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Route: Troubleshooting OSPFv3:
!
OSPFv3: WHAT CAN GO WRONG?:
!
> INTERFACE IS DOWN OR ACL BLOCKING 
> MISMATCHED AREA NUMBER / AREA TYPE / TIMERS
> DUPLICATED ROUTER-IDS
> PASSIVE INTERFACE OR WRONG SUBNET
> AUTHENTICATION MISMATCH
> WRONG DR ELECTED (IN A HUB-AND-SPOKE ENV.) 
!
- show run | section ospf 
- show ipv6 ospf neighbors 
- show ipv6 route ospf 
- show ipv6 ospf 
- show ipv6 protocols 
- show ipv6 ospf interface 
- debug ipv6 ospf hello 
- debug ipv6 ospf adj 
!
```

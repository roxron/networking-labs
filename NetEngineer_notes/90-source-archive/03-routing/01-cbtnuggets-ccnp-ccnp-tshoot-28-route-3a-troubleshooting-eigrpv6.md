# 28  Route%3a Troubleshooting EIGRPv6

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/28  Route%3a Troubleshooting EIGRPv6`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Route: Troubleshooting EIGRPv6:
!
EIGRPv6: WHAT CAN GO WRONG?:
!
> INTERFACE DOWN / NOT ENABLED / NEIGHBORS NOT FORMING 
> MISMATCHED AUTHENTICATION, TIMERS OR AS NUMBER
> ACL OR ROUTE FILTER 
> SPLIT HORIZON 
!
- show run | section ipv6 router eigrp 
- show ipv6 eigrp neighbors detail 
- show ipv6 interface brief 
- show ipv6 protocols 
- show ipv6 eigrp interface detail 
- show ipv6 eigrp topology 
- debug ipv6 eigrp 
!
!
```

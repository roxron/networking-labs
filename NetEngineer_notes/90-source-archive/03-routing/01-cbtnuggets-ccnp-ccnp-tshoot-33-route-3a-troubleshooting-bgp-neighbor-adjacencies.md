# 33 Route%3a Troubleshooting BGP Neighbor Adjacencies

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/33 Route%3a Troubleshooting BGP Neighbor Adjacencies`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Route: Troubleshooting BGP Neighbor Adjacencies:
!
BGP Neighbors: What Can Go Wrong?:
!
> Interface Down / L3 Connectivity Failing / Wrong Source IP 
> Neighbor Reachable on the Route Beyond Default Route
> Incorrect Neighbor Statement 
> ACL (TCP 179) 
> Authentication mismatch 
!
- show run | section bgp 
- show ip bgp summary 
- show bgp ipv4 unicast summary 
- show ip bgp neighbors 
- show bgp ipv4 unicast neighbors 
!
!
```

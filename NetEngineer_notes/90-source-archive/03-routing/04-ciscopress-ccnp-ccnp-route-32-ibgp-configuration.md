# 32 iBGP configuration

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/32 iBGP configuration`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
BGP Configuration on E1: Neighborships Configured:
router bgp 11
no synchronization
bgp log-neighbor-changes
neighbor 10.1.1.10 remote-as 11

! Now, on router E2
router bgp 11
no synchronization
bgp log-neighbor-changes
neighbor 10.1.1.9 remote-as 11



!
iBGP Configuration to Use Loopbacks as the Update Source:
!
! Configuration on router E1
interface loopback 0
ip address 10.100.1.1 255.255.255.255
router bgp 11
neighbor 10.100.1.2 remote-as 11
neighbor 10.100.1.2 update-source loopback0
!
! Configuration on router E2
interface loopback 1
ip address 10.100.1.2 255.255.255.255
router bgp 11
neighbor 10.100.1.1 remote-as 11
neighbor 10.100.1.1 update-source loopback1

Verifying iBGP:
show ip bgp summary 
show ip bgp neighbors 10.100.1.2
```

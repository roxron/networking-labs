# 29 eBGP Neighborship COnfiguration

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/29 eBGP Neighborship COnfiguration`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
BGP Configuration on E1: Neighborships Configured:
! Configuration on router E1
router bgp 11
neighbor 10.1.1.2 remote-as 1
neighbor 192.168.1.2 remote-as 3
!
! Next commands are on I1-1
router bgp 1
neighbor 10.1.1.1 remote-as 11
!
! Next commands are on I3-1
router bgp 3
neighbor 192.168.1.1 remote-as 11



Using Loopbacks with Update Source for eBGP:
!
Router E1:
!
neighbor 1.1.1.1 remote-as 1
neighbor 1.1.1.1 update-source loopback 1
!
!
Router I1-1
!
neighbor 11.11.11.11 remote-as 11
neighbor 11.11.11.11 update-source loopback2


eBGP Multihop Configuration:
!
Router E1:
neighbor 1.1.1.1 ebgp-multihop 2
!
!
Router I1-1
neighbor 11.11.11.11 ebgp-multihop 2
!

Verify eBGP:
show ip bgp summary 
show ip bgp neighbors
show tcp brief
debug ip bgp 

Administratively Control Neighbor Status:
!
neighbor 1.1.1.1 shutdown 
!or
no neighbor 1.1.1.1 shutdown


Verifying BGP table:
show ip bgp
```

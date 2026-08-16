# 04 Configuring BGP

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CIsco ASA/07 IP Routing/04 Configuring BGP`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CIsco ASA / 07 IP Routing. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring BGP:
!
ASA(config)# router bgp 65000 
!
bgp maxas-limit 15
bgp log-neighbor-changes 
bgp transport path-mtu-discovery 
bgp default local-preference 500
!
!
Configuration Example:
!
router bgp 64000
 bgp log-neighbor-changes
 bgp router-id 1.1.1.1
 address-family ipv4 unicast
  neighbor 50.0.0.1 remote-as 64100
  neighbor 50.0.0.1 ebgp-multihop 2
  neighbor 50.0.0.1 activate
  no auto-summary
  no synchronization
 exit-address-family
!
Verify BGP:
!
ASA# show bgp 
ASA# show bgp summary 
ASA# show bgp neighbors 10.2.1.2 
!
```

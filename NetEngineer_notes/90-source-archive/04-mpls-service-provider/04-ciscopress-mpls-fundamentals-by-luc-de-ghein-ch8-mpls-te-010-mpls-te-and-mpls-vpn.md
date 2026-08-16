# 010 MPLS TE and MPLS VPN

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/MPLS Fundamentals by luc De Ghein/CH8 MPLS TE/010 MPLS TE and MPLS VPN`  
> Original source context: 04 CISCOPRESS / MPLS Fundamentals by luc De Ghein / CH8 MPLS TE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Example 8-32. VRF-to-TE Tunnel Routing:
!
hostname paris
!
ip route 10.200.254.8 255.255.255.255 Tunnel1
ip route 10.200.254.9 255.255.255.255 Tunnel2
!
!
hostname sydney
!
interface Loopback0 
ip address 10.200.254.7 255.255.255.255
!
interface Loopback1 
ip address 10.200.254.8 255.255.255.255
!
interface Loopback2 
ip address 10.200.254.9 255.255.255.255
!
ip vrf cust-one 
rd 1:1 
route-target export 1:1 
route-target import 1:1 
bgp next-hop Loopback1
!
ip vrf cust-two 
rd 1:2 
route-target export 1:2 
route-target import 1:2 
bgp next-hop Loopback2
!
```

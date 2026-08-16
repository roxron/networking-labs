# 00 Configure MPLS TE

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/MPLS Fundamentals/L8 MPLS TE/8.3 Distribution of TE Information (IGP)_ Demo/00 Configure MPLS TE`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / MPLS Fundamentals / L8 MPLS TE / 8.3 Distribution of TE Information (IGP)_ Demo. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuration with OSPF as IGP:
!
mpls traffic-eng tunnels
!
interface Loopback0 
ip address 10.200.254.2 255.255.255.255
!
interface pos 10/1 
ip address 10.200.210.1 255.255.255.0 
mpls traffic-eng tunnels
!
router ospf 1 
mpls traffic-eng router-id Loopback0 
mpls traffic-eng area 0 
router-id 10.200.254.2 
network 10.192.0.0 0.63.255.255 area 0
!
!
Verify MPLS TE:
!
show ip ospf
show ip ospf database
show ip ospf database opaque-area
!
!
Configuration with IS-IS as IGP:
!
interface POS5/0 
ip address 10.200.202.2 255.255.255.0 
ip router isis bruges 
mpls traffic-eng tunnels 
ip rsvp bandwidth 155000 sub-pool 10000
!
router isis bruges 
net 49.0001.0000.0000.0001.00 
is-type level-2-only 
metric-style wide 
mpls traffic-eng router-id Loopback0 
mpls traffic-eng level-2
!
!
Verify MPLS TE:
!
show isis database verbose
show isis mpls traffic-eng advertisements
!
!
!
Change the periodic flooding for TE:
!
R1(config)#mpls traffic-eng link-management timers periodic-flooding ?  
<0-3600> seconds
```

# 00 Configure MPLS TE Tunnel

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/MPLS Fundamentals/L8 MPLS TE/8.6 RSVP_ Demo/00 Configure MPLS TE Tunnel`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / MPLS Fundamentals / L8 MPLS TE / 8.6 RSVP_ Demo. Content is preserved as historical study material; validate commands against the target platform and release.

```text
paris#
!interface Tunnel1 
ip unnumbered Loopback0 
tunnel destination 10.200.254.5 
tunnel mode mpls traffic-eng 
tunnel mpls traffic-eng autoroute announce 
tunnel mpls traffic-eng path-option 1 explicit name paris-berlin 
tunnel mpls traffic-eng fast-reroute
!
ip explicit-path name paris-berlin enable 
 next-address 10.200.210.2 
 next-address 10.200.211.2
!
!
paris# show ip explicit-paths name paris-berlin
paris#show mpls traffic-eng tunnels tunnel 1
!
!
!
paris# show running-config interface tunnel 1
!
interface Tunnel1 
ip unnumbered Loopback0 
tunnel destination 10.200.254.5
tunnel mode mpls traffic-eng 
tunnel mpls traffic-eng autoroute announce 
tunnel mpls traffic-eng path-option 1 explicit name paris-berlin 
tunnel mpls traffic-eng path-option 2 dynamic 
tunnel mpls traffic-eng fast-reroute
end
!
!
paris# show mpls traffic-eng tunnels tunnel 1
!
!
!
interface Tunnel1 
ip unnumbered Loopback0 
tunnel destination 10.200.254.6 
tunnel mode mpls traffic-eng 
tunnel mpls traffic-eng autoroute announce 
tunnel mpls traffic-eng priority 7 7 
tunnel mpls traffic-eng bandwidth 100000 
tunnel mpls traffic-eng path-option 10 explicit name not-router-berlin
!
ip explicit-path name not-router-berlin enable 
exclude-address 10.200.254.5
!
paris# show mpls traffic-eng tunnels tunnel 1
!
!
!
!
ReOptimzation:
!
Periodic Reoptimization:
!
mpls traffic-eng reoptimize timers frequency interval
tunnel mpls traffic-eng path-option number {dynamic | explicit {name path-name | path-number}} [lockdown ]
!
!
Event-Driven Reoptimization
!
mpls traffic-eng reoptimize events link-up
!
!
Manual Reoptimization
!
# mpls traffic
```

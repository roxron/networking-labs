# 06 RSVP

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/MPLS Fundamentals by luc De Ghein/CH8 MPLS TE/06 RSVP`  
> Original source context: 04 CISCOPRESS / MPLS Fundamentals by luc De Ghein / CH8 MPLS TE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure penultimate hop router to interpret the explicit NULL label:
!
mpls traffic-eng signalling interpret explicit-null verbatim
!
!
Configure the tail end router to advertise an implicit NULL label:
!
mpls traffic-eng signalling advertise implicit-null [acl-name | acl-number]
!
!
RRO:
!
!
interface Tunnel1 
ip unnumbered Loopback0 
tunnel destination 10.200.254.5 
tunnel mode mpls traffic-eng 
tunnel mpls traffic-eng autoroute announce 
tunnel mpls traffic-eng priority 7 7 
tunnel mpls traffic-eng bandwidth 100000 
tunnel mpls traffic-eng path-option 1 explicit name paris-rome 
tunnel mpls traffic-eng record-route 
tunnel mpls traffic-eng fast-reroute
!
paris#show mpls traffic-eng tunnels tunnel 1
!
!
debug ip rsvp dump-messages
!
```

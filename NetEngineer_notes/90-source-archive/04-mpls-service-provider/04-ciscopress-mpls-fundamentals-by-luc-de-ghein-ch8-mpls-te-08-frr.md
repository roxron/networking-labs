# 08 FRR

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/MPLS Fundamentals by luc De Ghein/CH8 MPLS TE/08 FRR`  
> Original source context: 04 CISCOPRESS / MPLS Fundamentals by luc De Ghein / CH8 MPLS TE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Example 8-18. Backup Tunnel Configuration for Link Protection:
!
brussels#
!
interface Tunnel1000 
ip unnumbered Loopback0 t
unnel destination 10.200.254.5 
tunnel mode mpls traffic-eng 
tunnel mpls traffic-eng path-option 1 explicit name link-bru-ber
!
interface POS10/3 
ip address 10.200.211.1 255.255.255.0 
mpls traffic-eng 
tunnels mpls traffic-eng backup-path Tunnel1000 
ip rsvp bandwidth 155000
!
ip explicit-path name link-bru-ber enable 
next-address 10.200.212.2 
next-address 10.200.213.2
!
paris#
!
interface Tunnel1 
ip unnumbered Loopback0 
tunnel destination 10.200.254.6 
tunnel mode mpls traffic-eng 
tunnel mpls traffic-eng autoroute announce 
tunnel mpls traffic-eng bandwidth 155000 
tunnel mpls traffic-eng path-option 10 dynamic 
tunnel mpls traffic-eng fast-reroute
!
brussels# show mpls traffic-eng fast-reroute database detail
!
!
!
Example 8-19. Backup Tunnel Configuration for Node Protection:
!
brussels#
interface Tunnel2000 
ip unnumbered Loopback0 
tunnel destination 10.200.254.6 
tunnel mode mpls traffic-eng 
tunnel mpls traffic-eng path-option 1 explicit name exclude-berlin
!
interface POS10/3 
ip address 10.200.211.1 255.255.255.0 
mpls traffic-eng 
tunnels mpls traffic-eng backup-path Tunnel2000 
ip rsvp bandwidth 155000
!
ip explicit-path name exclude-berlin enable 
exclude-address 10.200.254.5
!
paris#
!
interface Tunnel1 
ip unnumbered Loopback0 
tunnel destination 10.200.254.7 
tunnel mode mpls traffic-eng 
tunnel mpls traffic-eng autoroute announce 
tunnel mpls traffic-eng priority 7 7 
tunnel mpls traffic-eng bandwidth 1000 
tunnel mpls traffic-eng path-option 10 explicit name one 
tunnel mpls traffic-eng fast-reroute node-protect
!
ip explicit-path name one enable 
next-address 10.200.210.2 
next-address 10.200.211.2 
next-address 10.200.215.2 
next-address 10.200.202.2
!
!
!
Example 8-20. Verifying the NNHOP Tunnel:
!
paris# show mpls traffic-eng tunnels tunnel 1 protection
brussels# show mpls traffic-eng fast-reroute database detail
brussels# show ip rsvp fast-reroute
!
!
!
SRLG Used by Backup Tunnels:
!
mpls traffic-eng auto-tunnel backup srlg exclude [force | preferred]
!
!
Example 8-21. Verifying SRLG Membership of TE Links:
!
show mpls traffic-eng topology brief
show mpls traffic-eng topology srlg
!
!
```

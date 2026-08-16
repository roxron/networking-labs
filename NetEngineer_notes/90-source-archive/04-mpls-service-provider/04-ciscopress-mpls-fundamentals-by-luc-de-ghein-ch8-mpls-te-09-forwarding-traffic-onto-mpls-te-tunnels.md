# 09 Forwarding Traffic onto MPLS TE Tunnels

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/MPLS Fundamentals by luc De Ghein/CH8 MPLS TE/09 Forwarding Traffic onto MPLS TE Tunnels`  
> Original source context: 04 CISCOPRESS / MPLS Fundamentals by luc De Ghein / CH8 MPLS TE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Forwarding Traffic onto MPLS TE Tunnels:
!
Static routing
Policy-based routing
Autoroute announce
Forwarding adjacency
Direct mapping of AToM traffic onto TE tunnels
Class-based tunnel selection
!
!
Static Routing:
!
paris#conf t
paris(config)#ip route 10.200.254.7 255.255.255.255 tunnel 1
paris(config)#^Z
!
!
 Configuring Policy-Based Routing:
!
interface Ethernet1/1 
ip address 10.200.200.2 255.255.255.0 
ip policy route-map pbr
!
route-map pbr permit 10 
match ip address 100 
set interface Tunnel1 
set ip precedence flash
!
access-list 100 permit ip host 10.200.254.1 host 10.200.254.7
!
!
Forwarding Adjacency:
!
tunnel mpls traffic-eng forwarding-adjacency {holdtime value}
!
Configuration of Forwarding Adjacency:
!
paris# 
!
interface Tunnel1 
ip unnumbered Loopback0 
ip ospf cost 1 
tunnel destination 10.200.254.6 
tunnel mode mpls traffic-eng 
tunnel mpls traffic-eng forwarding-adjacency 
tunnel mpls traffic-eng priority 7 7 
tunnel mpls traffic-eng bandwidth 155000
!
paris# show mpls traffic-eng forwarding-adjacency
!
!
Direct Mapping of AToM Traffic onto TE Tunnels
!
!
Class-Based Tunnel Selection:
!
!interface Tunnel1 
ip unnumbered Loopback0 
tunnel destination 10.200.254.6 
tunnel mode mpls traffic-eng 
tunnel mpls traffic-eng autoroute announce 
tunnel mpls traffic-eng path-option 10 dynamic 
tunnel mpls traffic-eng exp default
!
interface Tunnel2 
ip unnumbered Loopback0 
tunnel destination 10.200.254.6 
tunnel mode mpls traffic-eng 
tunnel mpls traffic-eng autoroute announce 
tunnel mpls traffic-eng path-option 10 dynamic 
tunnel mpls traffic-eng exp 5
!
paris# show mpls forwarding-table 10.200.254.7 detail
```

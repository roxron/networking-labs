# 09  Multilayer Switching

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP SWITCH/09  Multilayer Switching.txt`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Chapter 11. Multilayer Switching:
!
Configuring Inter-VLAN Routing:
!
Layer 2 Port Configuration:
!
SW1(config)# interface G0/0
SW1(config-if)# switchport 
!
Layer 3 Port Configuration:
!
SW1(config)# interface g0/0
SW1(config-if)# no switchport 
SW1(config-if)# ip address 192.168.0.1 255.255.255.0
!
Verify switchport:
!
SW1# show interface G0/0 switchport 
!
SVI Port Configuration:
!
SW1(config)# interface vlan 10 
SW1(config-if)# ip address 10.0.10.1 255.255.255.0
SW1(config-if)# no shutdown 
!
SVI Autostate:
!
SW1(config-if)# switchport autostate exclude 
!
!
CEF:
!
SW1# show ip cef 
SW1# show ip cef vlan 101
SW1# show ip cef 10.1.0.0 255.255.0.0 longer-prefixes 
SW1# show ip cef 10.1.3.0 255.255.255.192 detail 
!
Adjacency Table:
!
show adjacency summary
show adjacency vlan 99 detail
show ip cef adjacency glean
show cef drop
show cef not-cef-switched
!
Configuring CEF:
!
SW1(config)# ip cef 
SW1(config-if)# no ip route-cache cef 
!
Verifying Multilayer Switching:
!
Verifying Inter-VLAN Routing:
!
Switch# show interface gigabitethernet 1/0/1 switchport
Switch# show interface vlan 100
Switch# show vlan
Switch# show ip interface vlan 101
show ip interface brief 
!
```

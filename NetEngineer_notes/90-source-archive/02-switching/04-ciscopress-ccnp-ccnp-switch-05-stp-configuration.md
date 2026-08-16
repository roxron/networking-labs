# 05 STP Configuration

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP SWITCH/05 STP Configuration.txt`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Chapter 7. Spanning-Tree Configuration:
!
Configuration Example:
!
SW1(config)# spanning-tree vlan 1 priority 4096
SW1(config)# spanning-tree vlan 10 root primary 
SW1(config)# spanning-tree vlan 20 root secondary 
!
!
Verify STP:
!
SW1# show spanning-tree
!
!
Tuning the Root Path Cost:
!
Changing STP Port Cost for all VLANs:
!
SW1(config)# interface G0/10
SW1(config-if)# spanning-tree cost 25
!
Changing STP Port Cost per VLAN:
!
SW1(config)# interface g0/11
SW1(config-if)# spanning-tree vlan 5 cost 30 
!
Verify STP Port Cost:
!
SW1# # show spanning-tree interface gigabitEthernet0/10
!
!
Modify Port Priority:!
!
Switch(config)# interface gigabitethernet 2/0/44
Switch(config-if)# spanning-tree vlan 10,100 port-priority 64
!
!
Modifying STP Timers:
!
Per Port:
!
SW1(config)# spanning-tree hello-time 1
SW1(config)# spanning-tree forward-time 5
SW1(config)# spanning-tree max-age 10
!
Per VLAN:
!
SW1(config)# spannig-tree vlan 10 hello-time 1
SW1(config)# spannig-tree vlan 10 forward-time 5
SW1(config)# spaning-tree vlan 10 max-age 10 
!
!
Automatically Configuring STP Timers:
!
SW1(config)# spannig-tree vlan 100 root primary diameter 3 hello-time 1
!
!
PortFast: Access Layer Nodes:
!
Switch(config)# spanning-tree portfast default
!
Switch(config)# spanning-tree portfast default
!
Switch(config-if)# [no] spanning-tree portfast
!
!
To enable the UplinkFast:
!
Switch(config)# spanning-tree uplinkfast
!
Switch# show spanning-tree uplinkfast
!
!
BackboneFast:
!
Switch(config)# spanning-tree backbonefast
!
Switch# show spanning-tree backbonefast
!
!
Monitoring STP:
!
show spanning-tree
show spanning-tree detail
show spanning-tree summary 
show spanning-tree bridge 
show spanning-tree uplinkfast 
show spanning-tree backbonefast 
!
!
```

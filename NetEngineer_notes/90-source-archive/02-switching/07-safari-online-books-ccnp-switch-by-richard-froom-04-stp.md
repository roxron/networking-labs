# 04 STP

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/BOOKS/CCNP SWITCH by Richard Froom/04 STP`  
> Original source context: 07 SAFARI ONLINE / BOOKS / CCNP SWITCH by Richard Froom. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring and Modifying STP Behavior:
!
SW3# show spanning-tree
SW3# debug spanning-tree events
!
Changing STP Priority:
!
SW1(config)# spanning-tree vlan 1 root primary 
!
SW2(config)# spanning-tree vlan 1 root secondary 
!
SW1(config)# spanning-tree vlan 1 priority 4096
!
!
STP Path Manipulation:
!
SW3(config-if)# spanning-tree vlan 1 cost 16
!
SW3(config-if)# spanning-tree vlan 1 port-priority 112
!
!
Manually configure timers:
!
SW1(config)# spanning-tree vlan 1 hello-time 2
!
SW1(config)# spanning-tree vlan 1 forward-time 4
!
SW1(config)# spanning-tree vlan 1 max-age 6
!
!
Enabling RSTP: 
!
SW1(config)# spannig-tree mode rapid-pvst
!
!
!
Implementing STP Stability Mechanisms:
!
Cisco STP Toolkit:
1 UplinkFast
2 BackboneFast 
3 PortFast 
4 BPDU Guard 
5 BPDU Filter 
6 Root Guard 
7 Loop Guard 
!
!
Use UplinkFast:
!
ASW(config)# spanning-tree uplinkfast
!
ASW# show spanning-tree uplinkfast
!
!
Use BackboneFast:
!
DSW1(config)# spanning-tree backbonefast
!
DSW1# show spanning-tree backbonefast
!
!
Use PortFast:
!
ASW(config-if)# spanning-tree portfast
or
ASW(config)# spanning-tree portfast default
!
ASW# show spanning-tree interface ethernet 0/0 portfast
!
!
Enable PortFast on trunk ports:
!
ASW(config-if)# spanning-tree portfast trunk
!
!
Use BPDU Guard:
!
ASW(config-if)# spanning-tree bpduguard enable
!
ASW(config)# spanning-tree portfast bpduguard default
!
ASW# show spanning-tree summary totals
!
!
Disabling STP with BPDU Filter:
Configuring BPDU Filter:
!
Switch(config-if)# spanning-tree bpdufilter enable
!
Switch(config)# spanning-tree portfast bpdufilter default
!
Switch# show spanning-tree totals
Switch# show spanning-tree interface Ethernet 0/0 detail
!
!
Use Root Guard:
!
Switch(config-if)# spanning-tree guard root
!
Switch# show spanning-tree inconsistentports
!
!
Use Loop Guard:
!
Switch(config-if)# spanning-tree guard loop
!
Switch(config)# spanning-tree loopguard default
!
show spanning-tree interface
show spanning-tree summary
!
!
!
Use Unidirectional Link Detection (UDLD):
!
Configure:
!
Normal mode:
S1(config)# udld enable
or
S1(config-if)# udld enable
!
Aggressive mode:
!
S1(config)# udld aggressive  
or
S1(config-if)# udld port aggressive
!
show udld 
udld reset 
!
!
Use FlexLinks
!
S1(config)# interface G0/0
S1(config-if)# switchport backup interface G0/1
!
S1# show interface switchport backup
!
!
!
Configuring Multiple Spanning Tree Protocol:
!
Configure MST:
!
SW1(config)# spanning-tree mst configuration
SW1(config-mst)# name CCNP
SW1(config-mst)# revision 1
!
SW2(config)# spanning-tree mst configuration
SW2(config-mst)# name CCNP
SW2(config-mst)# revision 1
!
SW3(config)# spanning-tree mst configuration
SW3(config-mst)# name CCNP
SW3(config-mst)# revision 1
!
!
SW1(config)# spanning-tree mst configuration
SW1(config-mst)# instance 1 vlan 2,3
SW1(config-mst)# instance 2 vlan 4,5
SW1(config-mst)# end
!
SW2(config)# spanning-tree mst configuration
SW2(config-mst)# instance 1 vlan 2,3
SW2(config-mst)# instance 2 vlan 4,5
SW2(config-mst)# end
!
SW3(config)# spanning-tree mst configuration
SW3(config-mst)# instance 1 vlan 2,3
SW3(config-mst)# instance 2 vlan 4,5
SW3(config-mst)# end
!
SW1(config)# spanning-tree mst 1 root primary
SW1(config)# spanning-tree mst 2 root secondary
!
SW1(config)# spanning-tree mode mst
!
show spanning-tree summary
show spanning-tree mst configuration digset 
!
SW3(config)# spanning-tree mst configuration
SW3(config-mst)# show current
SW3(config-mst)# show pending 
!
SW1# show spanning-tree mst configuration digest
SW3# show spanning-tree mst 1
!
!
Configuring MST Path Cost:
!
Switch(config)# interface Ethernet 0/2
Switch(config-if)# spanning-tree mst 1 cost 1000000
!
!
Configuring MST Port Priority:
!
Switch(config)# interface Ethernet 0/2
Switch(config-if)# spanning-tree mst 1 port-priority 32
!
!
end
```

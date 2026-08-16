# 07 Advanced Spanning Tree Protocol

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP SWITCH/07 Advanced Spanning Tree Protocol.txt`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Chapter 9. Advanced Spanning Tree Protocol:
!
RSTP Configuration:
!
SW1(config)# spanning-tree mode rapid-pvst
SW1(config)# spanning-tree link-type point-to-point
!
SW1(config-if)# spanning-tree portfast
!
!
!
MSTP Configuration:
!
Switch(config)# spanning-tree mode mst
Switch(config)# spanning-tree mst configuration
Switch(config-mst)# name MST1
Switch(config-mst)# revision 1
Switch(config-mst)# instance 1 vlan 1-100 
Switch(config-mst)# show pending
Switch(config-mst)# exit
!
Switch(config)# spanning-tree mst 1 root primary 
Switch(config)# spanning-tree mst 1 priority 4096 
Switch(config)# spanning-tree mst 1 cost 1
!
Switch(config)# spanning-tree mst hello-time 1
Switch(config)# spanning-tree mst forward-time 5 
Switch(config)# spanning-tree mst max-age 10
```

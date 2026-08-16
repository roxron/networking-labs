# 01 Configure Cisco FabricPath

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/Cisco DATA CENTER/01 Configure Cisco FabricPath`  
> Original source context: 01 CBTNUGGETS / Cisco DATA CENTER. Content is preserved as historical study material; validate commands against the target platform and release.

```text
NX1(config)# install feature-set fabricpath 

NX1(config)# feature-set fabricpath

NX1(config)# fabricpath switch-id 11

NX1(config)# spannig-tree vlan 10-20 priority 8192
NX1(config)# spannig-tree mst 1-5 priority 8192

NX1(config)# interface e2/1-20
NX1(config-if)# switchport mode fabricpath
NX1(config-if)# interface port-channel 1
NX1(config-if)# switchport mode fabricpath 

NX1(config)# vlan 10-20 
NX1(config-vlan)# mode fabricpath 

NX1(config)# vpc domain 1
NX1(config-vpc-domain)# fabricpth switch-id 1000

NX1(config)# fabricpath load-balance unicast layer3
NX1(config)# fabricpath load-balance mlticasst include-vlan 

Verify:
show feature-set 
show feature-set services fabricpath 
show fabricpath switch-id 
show fabricpath topology vlan active
show mac address-table dynamic vlan 10
show fabricpath isis route
show fabricpath route 
show fabricpath isis interfaces brief
show fabricpath isis adjacency
```

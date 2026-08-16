# 03 Private VLAN Implementation

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/03 Private VLAN Implementation`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure PRivate VLANs:
!
SW1(config)# default interface range g0/0-24
SW1(config)# vtp mode transparent 
SW1(config)# vlan 300 
SW1(config-vlan)# private-vlan community 
SW1(config)# vlan 400 
SW1(config-vlan)# private-vlan community 
SW1(config)# vlan 500 
SW1(config-vlan)# private-vlan community 
SW1(config)# vlan 600 
SW1(config-vlan)# private-vlan isolated 
SW1(config)# vlan 200 
SW1(config-vlan)# private-vlan primary 
SW1(config-vlan)# private-vlan association 300,400,500,600
Switch(config)# interface vlan 202
Switch(config-if)# private-vlan mapping add 303-307,309,440
Switch(config-if)# end
Switch# show interfaces private-vlan mapping 
SW1(config-vlan)# exit
SW1(config)# interface G0/0 
SW1(config-if)# switchport mode private-vlan promiscuous 
SW1(config-if)# switchport private-vlan mapping 200 300,400,500,600
!
Place ports in Isolated VLANs:
!
SW1(config)# interface range gig 0/1-5
SW1(config-if)# switchport mode private-vlan host 
SW1(config-if)# switchport private-vlan host-association 200 600
!
Add Port to Community VLAN:
!
SW1(config)# interface range g0/6-10
SW1(config-if)# switchport mode ptivate-vlan host
SW1(config-if)# switchport ptivate-vlan host-association 200 300
!
Verify Private VLAN:
SW1# show vlan private-vlan 
SW1# show interface g0/0 switchport 
SW1# show interface g0/1 private-vlan mapping
```

# 01 PRIVATE VLANS

> Imported source note. Provenance: `NetEngineer_Journal/05 CISCO MISCELLANEOUS/01 PRIVATE VLANS`  
> Original source context: 05 CISCO MISCELLANEOUS. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring a VLAN as a PVLAN:
!
Switch# configure terminal
Switch(config)# vlan 202
Switch(config-vlan)# private-vlan primary
Switch(config-vlan)# end
Switch# show vlan private-vlan
!
!
Switch# configure terminal
Switch(config)# vlan 303
Switch(config-vlan)# private-vlan community
Switch(config-vlan)# end
Switch# show vlan private-vlan
!
!
Switch# configure terminal
Switch(config)# vlan 440
Switch(config-vlan)# private-vlan isolated
Switch(config-vlan)# end
Switch# show vlan private-vlan 
!
!
!
Associating a Secondary VLAN with a Primary VLAN:
!
Switch# configure terminal
Switch(config)# vlan 202
Switch(config-vlan)# private-vlan association 303-307,309,440
Switch(config-vlan)# end
Switch# show vlan private-vlan 
!
!
!
Configuring a Layer 2 Interface as a PVLAN Promiscuous Port:
!
Switch# configure terminal
Switch(config)# interface fastethernet 5/2
Switch(config-if)# switchport mode private-vlan promiscuous
Switch(config-if)# switchport private-vlan mapping 200 303-307,309,440
Switch(config-if)# end
Switch# show interfaces fastethernet 5/2 switchport
!
!
!
Configuring a Layer 2 Interface as a PVLAN Host Port:
!
Switch# configure terminal
Switch(config)# interface fastethernet 5/1
Switch(config-if)# switchport mode private-vlan host
Switch(config-if)# switchport private-vlan host-association 202 440
Switch(config-if)# end
Switch# show interfaces fastethernet 5/1 switchport
!
!
!
Configuring a Layer 2 Interface as an Isolated PVLAN Trunk Port:
!
Switch# configure terminal
Switch(config)# interface fastethernet 5/2
Switch(config-if)# switchport mode private-vlan trunk secondary
Switch(config-if)# switchport private-vlan trunk native vlan 10
Switch(config-if)# switchport private-vlan trunk allowed vlan 10. 3-4
Switch(config-if)# switchport private-vlan association trunk 3 301
Switch(config-if)# end
Switch# show interfaces fastethernet 5/2 switchport
!
!
!
Configuring a Layer 2 Interface as a Promiscuous PVLAN Trunk Port:
!
Switch# configure terminal
Switch(config)# interface fastethernet 5/2
Switch(config-if)# switchport mode private-vlan trunk promiscuous
Switch(config-if)# switchport private-vlan trunk native vlan 10
Switch(config-if)# switchport private-vlan trunk allowed vlan 10, 3-4
Switch(config-if)# switchport private-vlan mapping trunk 3 301, 302
Switch(config-if)# end
Switch# show interfaces fastethernet 5/2 switchport
!
!
!
Permitting Routing of Secondary VLAN Ingress Traffic:
!
Switch# configure terminal
Switch(config)# interface vlan 202
Switch(config-if)# private-vlan mapping add 303-307,309,440
Switch(config-if)# end
Switch# show interfaces private-vlan mapping 
!
!
!
```

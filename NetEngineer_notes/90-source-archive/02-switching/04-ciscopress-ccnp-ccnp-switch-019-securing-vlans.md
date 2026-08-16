# 019 Securing VLANs

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP SWITCH/019 Securing VLANs.txt`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Chapter 20. Securing VLANs:
!
VLAN Access Lists:
!
Switch(config)# ip access-list extended local-17
Switch(config-acl)# permit ip host 192.168.99.17 192.168.99.0  0.0.0.255
Switch(config-acl)# exit
Switch(config)# vlan access-map block-17 10
Switch(config-access-map)# match ip address local-17
Switch(config-access-map)# action drop
Switch(config-access-map)# vlan access-map block-17 20
Switch(config-access-map)# action forward
Switch(config-access-map)# exit
Switch(config)# vlan filter block-17 vlan-list 99
!
!
Private VLANs:
!
Switch(config)# vlan 10
Switch(config-vlan)# private-vlan community
Switch(config-vlan)# vlan 20
Switch(config-vlan)# private-vlan community
Switch(config-vlan)# vlan 30
Switch(config-vlan)# private-vlan isolated
Switch(config-vlan)# vlan 100
Switch(config-vlan)# private-vlan primary
Switch(config-vlan)# private-vlan association 10,20,30
Switch(config-vlan)# exit
Switch(config)# interface range gigabitethernet 1/0/1 - 1/0/2
Switch(config-if)# switchport mode private-vlan host
Switch(config-if)# switchport private-vlan host-association 100 10
Switch(config-if)# exit
Switch(config)# interface range gigabitethernet 1/0/4 - 1/0/5
Switch(config-if)# switchport mode private-vlan host
Switch(config-if)# switchport private-vlan host-association 100 20
Switch(config-if)# exit
Switch(config)# interface gigabitethernet 1/0/3
Switch(config-if)# switchport mode private-vlan host
Switch(config-if)# switchport private-vlan host-association 100 30
Switch(config-if)# exit
Switch(config)# interface gigabitethernet 1/0/48
Switch(config-if)# switchport mode private-vlan promiscuous
Switch(config-if)# switchport private-vlan mapping 100 10,20,30
!
!
Switch(config)# vlan 40
Switch(config-vlan)# private-vlan isolated
Switch(config-vlan)# vlan 50
Switch(config-vlan)# private-vlan community
Switch(config-vlan)# vlan 200
Switch(config-vlan)# private-vlan primary
Switch(config-vlan)# private-vlan association 40,50
Switch(config-vlan)# exit
Switch(config)# interface vlan 200
Switch(config-if)# ip address 192.168.199.1 255.255.255.0
!
Switch(config)# interface vlan 200
Switch(config-if)# private-vlan mapping 40,50
!
!
Preclude VLAN Hopping:
!
Switch(config)# vlan 800
Switch(config-vlan)# name bogus_native
Switch(config-vlan)# exit
Switch(config)# interface gigabitethernet 1/0/1
Switch(config-if)# switchport trunk encapsulation dot1q
Switch(config-if)# switchport trunk native vlan 800
Switch(config-if)# switchport trunk allowed vlan remove 800
Switch(config-if)# switchport mode trunk
!
!
Tag the native VLAN:
!
Switch(config)# vlan dot1q tag native
```

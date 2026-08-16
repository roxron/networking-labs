# 02 VLANs and Trunks

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP SWITCH/02 VLANs and Trunks.txt`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Chapter 4. VLANs and Trunks:
!
VLAN Configuration:
!
SW1(config)# vlan 100
SW1(config-vlan)# name Engineering 
!
Delete VLAN:
!
SW1(config)# no vlan 100
!
!
Assign switch ports to VLAN:!
!
SW1(config)# interface G0/10
SW1(config-if)# switchport 
SW1(config-if)# switchport mode access 
SW1(config-if)# switchport access vlan 100
!
!
Verify VLAN:
!
SW1# show vlan 
SW1# show vlan brief 
SW1# show interface g0/10 switchport 
!
!
!
Configuring a VLAN Trunk:
!
SW1(config)# interface G0/0
SW1(config-if)# switchport 
SW1(config-if)# switchport trunk encapsulation dot1q 
SW1(config-if)# switchport mode trunk 
SW1(config-if)# switchport trunk native vlan 99
SW1(config-if)# switchport trunk allowed vlan all exept 500
SW1(config-if0# switchport nonegotiate
!
!
Verify Trunk:
!
SW1# show interface trunk 
SW1# show interface status 
SW1# show dtp interface g0/0
!
!
!
Voice VLAN ConfigurationL
!
SW1(config-if)# switchport voice vlan 55 
!
!
SW1# show interfaces gigabitethernet 1/0/1 switchport
```

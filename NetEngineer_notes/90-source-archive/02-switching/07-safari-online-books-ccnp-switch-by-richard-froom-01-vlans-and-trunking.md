# 01 VLANS and TRUNKING

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/BOOKS/CCNP SWITCH by Richard Froom/01 VLANS and TRUNKING`  
> Original source context: 07 SAFARI ONLINE / BOOKS / CCNP SWITCH by Richard Froom. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Implementing VLANs and Trunks in Campus Environment:
!
Configure Native VLAN:
!
S1(config-if)# switchport trunk native vlan 100
!
!
Configuring, Verifying, and Troubleshooting VLANs and Trunks:
!
S1# configure terminal
S1(config)# vlan 100
S1(config-vlan)# name PRODUCTION
S1(config-vlan)# exit
!
!
To delete VLAN: 
!
S1(config)# no vlan 100
!
!
To assign switch port to VLAN:
!
S1(config)# interface G0/10
S1(config-if)# switchport mode access 
S1(config-if)# switchport host 
S1(config-if)# switchport access vlan 100
!
!
Verifying the VLAN Configuration:
!
show vlan 
show vlan brief 
show vlan id 100
show vlan name PRODUCTION
show runnning-config interface g0/10
show interface g0/10
show interface g0/10 switchport 
show mac address-table interface g0/10
!
!
Trunk configuration:
!
S1(config)# interface g0/0
S1(config-if)# switchport trunk encapsulation dot1q
S1(config-if)# switchport trunk allowed vlan 1,20 
S1(config-if)# switchport mode trunk 
!
!
Verify Trunks:
!
show interfaces trunk 
show interface G0/1 switchport 
!
!
Configure Voice VLAN:
!
S1(config)# interface G0/11
S1(config-if)# switchport access vlan 10
S1(config-if)# switchport voice vlan 110
!
```

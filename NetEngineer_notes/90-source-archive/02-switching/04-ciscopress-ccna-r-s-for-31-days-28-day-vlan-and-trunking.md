# 28 Day Vlan and Trunking

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNA R&S for 31 days/28 Day Vlan and Trunking`  
> Original source context: 04 CISCOPRESS / CCNA R&S for 31 days. Content is preserved as historical study material; validate commands against the target platform and release.

```text
VLAN Configuration and Verification:
!
Dispaly Default VLAN Configuration:
!
S1# show vlan brief 
!
!
!
Creating VLANs:
!
Method1:
S1(config)# vlan 10 
S1(config-vlan)# name Faculty
S1(config-vlan)# exit
!
Method2:
S1(config)# interface Fa0/18 
S1(config-if)# switchport access vlan 20 
!
!
!
Assigning VLANs to Interfaces:
S1(config)# inteface Fa0/10 
S1(config-if)# switchport mode access 
S1(config-if)# switchport access vlan 10
S1(config-if)# end
!
!
!
Verify VLAN Assignment:
!
S1# show vlan 
S1# show vlan brief 
S1# show interface switchport 
S1# show interface Fa0/10 switchport 
!
!
!
Configuring Extended VLANs on a Cisco 2960 Switch:
!
S1(config)# vtp mode transperant 
S1(config)# vlan 2500 
S1(config-vlan)# end
S1# show vlan brief 
!
!
!
Trunking Configuration and Verification:
!
S1(config)# interface g0/0 
S1(config-if)# switchport trunk encapsulation dot1q 
S1(config-if)# switchport mode trunk 
S1(config-if)# switchport trunk native vlan 99 
!
!
Verifying Trunk Configuration:
!
S1# show interface trunk 
S1# show interface g0/0 switchport 
!
!
!
VLAN Troubleshooting Commands:
!
S1# show vlan 
S1# show vlan brief 
S1# show vlan id 10
S1# show interfaces switchport 
S1# show interfaces g0/0 switchport 
S1# show mac address-table 
S1# show interface status
!
!
!
Disable VLAN:
!
S1(config)# vlan 10 
S1(config-vlan)# shutdown 
!
!
!
Add Missing VLAN to the trunk:
!
S1(config)# interface g0/0 
S1(config-if)# switchport trunk allowed vlan add 10
!
!
!
```

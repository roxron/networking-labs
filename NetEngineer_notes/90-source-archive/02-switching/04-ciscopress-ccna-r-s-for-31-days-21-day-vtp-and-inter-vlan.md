# 21 Day VTP and Inter-VLAN

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNA R&S for 31 days/21 Day VTP and Inter-VLAN`  
> Original source context: 04 CISCOPRESS / CCNA R&S for 31 days. Content is preserved as historical study material; validate commands against the target platform and release.

```text
VTP and Inter-VLAN Routing Configuration:
!
!
VTP Configuration and Verification:
!
Configure VTP server:
!
S1(config)# vtp mode server 
S1(config)# vtp version 2
S1(config)# vtp password cisco
S1(config)# vtp domain CCNA
S1(config)# vtp pruning 
!
!
Configure vVTP Client:
!
S2(config)# vtp mode client 
S2(config)# vtp password cisco
S2(config)# vtp domain CCNA
S2(config)# vtp version 2
! 
Verifying VTP:
!
S1# show vtp status 
S1# show vtp password
S1# show vlan brief
!
!
!
!
Inter-VLAN Routing Concepts:
!
Router on a Stick Configuration and Verification:
!
Router part:
!
R1(config)# interface g0/0
R1(config-if)# no shutdown
R1(config-if)# interface g0/0.10
R1(config-subif)# encapsulation dot1q 10
R1(config-subif)# ip address 172.17.10.1 255.255.255.0
R1(config-subif)# interface g0/0.30
R1(config-subif)# encapsulation dot1q 30
R1(config-subif)# ip address 172.17.30.1 255.255.255.0
!
Switch part:
!
S1(config)# interface G0/0
S1(config-if)# switchport trunk encapsulation dot1q 
S1(config-if)# switchport mode trunk 
!
Verifying Router on the Stick
!
show vlans 
show ip route 
show ip interface brief 
!
!
!
Multilayer Switch Inter-VLAN Routing Configuration and Verification:
!
Configuring a Switch to Use SVIs for Routing:
!
MLS(config)# ip routing
MLS(config)# vlan 10
MLS(config)# vlan 30
MLS(config)# interface vlan 10
MLS(config-if)# ip address 172.17.10.1 255.255.255.0
MLS(config-if)# interface vlan 30
MLS(config-if)# ip address 172.30.10.1 255.255.255.0
MLS(config-if)# interface f0/11
MLS(config-if)# switchport mode access
MLS(config-if)# switchport access vlan 10
MLS(config-if)# interface f0/6
MLS(config-if)# switchport mode access
MLS(config-if)# switchport access vlan 30
MLS(config-if)# end
MLS# show ip route
!
!
Configuring a Layer 3 Routed Port:
!
MLS(config)# interface g0/1
MLS(config-if)# no switchport
MLS(config-if)# ip address 192.0.2.2 255.255.255.0
!
!
```

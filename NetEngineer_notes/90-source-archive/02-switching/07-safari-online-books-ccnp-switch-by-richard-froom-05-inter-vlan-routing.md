# 05 Inter-VLAN Routing

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/BOOKS/CCNP SWITCH by Richard Froom/05 Inter-VLAN Routing`  
> Original source context: 07 SAFARI ONLINE / BOOKS / CCNP SWITCH by Richard Froom. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring Inter-VLAN Routing Using an External Router:
!
R1(config)# interface ethernet 0/0.10
R1(config-subif)# encapsulation dot1q 10
R1(config-subif)# ip address 10.0.10.1 255.255.255.0
!
R1(config)# interface ethernet 0/0.20
R1(config-subif)# encapsulation dot1q 20
R1(config-subif)# ip address 10.0.20.1 255.255.255.0
!
R1(config)# interface ethernet 0/0.1
R1(config-subif)# encapsulation dot1q 1 native
R1(config-subif)# ip address 10.0.1.1 255.255.255.0
!
R1# show ip interface brief
!
SW1(config)# interface ethernet 0/0
SW1(config-if)# switchport trunk encapsulation dot1q
SW1(config-if)# switchport mode trunk
SW1(config-if)# switchport trunk allowed vlan 1,10,20
!
SW1# show interfaces ethernet0/0 switchport
!
!
Inter-VLAN Routing Using Switch Virtual Interfaces:
!
Configuring Inter-VLAN Routing Using SVI and Routed Ports:
!
DSW1(config)# vlan 10
DSW1(config-vlan)# vlan 20
!
DSW1(config)# ip routing
!
DSW1(config)# interface vlan 10
DSW1(config-if)# ip address 10.0.10.1 255.255.255.0
DSW1(config-if)# no shutdown
!
DSW1(config)# interface vlan 20
DSW1(config-if)# ip address 10.0.20.1 255.255.255.0
DSW1(config-if)# no shutdown
!
DSW1# show ip interface brief
!
Configure Routed Port:
!
DSW1(config)# interface g0/0
DSW1(config-if)# no switchport 
DSW1(config-if)# ip address 10.0.99.1 255.255.255.252
!
!
Using the SVI autostate exclude Command:
!
SW1(config)# interface G0/2
SW1(conf9g-if)# switchport autostate exclude 
!
!
!
Layer 2 Versus Layer 3 EtherChannel:
!
Layer 3 EtherChannel Configuration:
!
Switch(config)# interface port-channel 1
Switch(config-if)# no switchport
Switch(config-if)# ip address 172.32.52.10 255.255.255.0
!
Switch(config)# interface range fastethernet 5/4 - 5
Switch(config-if-range)# no switchport
Switch(config-if-range)# channel-protocol pagp
Switch(config-if-range)# channel-group 1 mode desirable
!
Verify Etherchanbel:
!
show interface port-channel 1
show etherchannel summary 
show spanning-tree detail 
!
!
!
Implementing DHCP:
!
Configuring DHCP Server:
!
DSW1(config)# ip dhcp excluded-address 10.0.10.1
DSW1(config)# ip dhcp pool VLAN10POOL
DSW1(config-dhcp)# network 10.0.10.0 255.255.255.0
DSW1(config-dhcp)# default-router 10.0.10.1
DSW1(config-dhcp)# lease 2
!
Verify DHCP:
!
show ip dhcp pool
show ip dhcp server packet
show ip dhcp binding 
!
!
Configure Router as DHCP Client:
!
R1(config)# interface G0/5
R1(config-if)# ip address dhcp 
R1(config-if)# no shutdown 
!
!
Configure Manually client-identifier:
!
show ip dhcp binding 10.0.10.4 
clear ip dhcp binding 10.0.10.4
!
DSW1(config)# ip dhcp pool CLIENT3
DSW1(dhcp-config)# host 10.0.10.200 255.255.255.0
DSW1(dhcp-config)# client-identifier 0063.6973.636f.2d61.6162.622e.6363.3030.2e30.3630.302d.4574.302f.30
!
!
Configuring a DHCP Relay:
!
DSW1(config)# interface vlan 10
DSW1(config-if)# ip helper-address 10.100.44.100
!
!
Configuring DHCP Options:
!
Switch(config)# ip dhcp pool TELEPROFILES
Switch(dhcp-config)# options 150 ip 10.10.10.1
!
```

# 03 VLANs Implementaion

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN1/03 VLANs Implementaion.txt`  
> Original source context: 03 NETACAD / ICDN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Create VLAN:
S1(config)# vlan 10
S1(config-vlan)# name Native
S1(config-vlan)# exit
S1(config)# vlan 100,102,105-108

Assigning Ports to VLANs:
S1(config)# interface F0/1
S1(config-if)# switchport mode access
S1(config-if)# switchport access vlan 100
S1(config-if)# exit


Configure a Data and voice VLANs to a switchport:
S1(config)# vlan 10
S1(config-vlan)# name DATA
S1(config-vlan)# vlan 20 
S1(config-vlan)# name VOICE
S1(config-vlan)# exit
S1(Config)# interface F0/20
S1(config-if)# switchport mode access 
S1(config-if)# switchport access vlan 10
S1(config-if)# switchport voice vlan 20 
S1(config-if)# mls qos trust cos
S1(config-if)# exit

Verify VLANs:
S1# show vlan 
S1# show vlan id 10
S1# show vlan summary
S1# show interface F0/1 switchport


Configuring IEEE 802.1Q Trunk Links:
S1(config)# interface F0/1
S1(config-if)# switchport mode trunk 
S1(config-if)# switchport trunk native vlan 10
S1(config-if)# switchport trunk allowed vlan 10,20,30,40 
S1(config-if)# end

Verify Trunk Links:
S1# show inteface F0/1 switchport 
S1# show interface trunk


Configure Legacy Inter-VLAN Routing: 
Switch side:
S1(config)# vlan 10 
S1(config-vlan)#exit
S1(config)#vlan 20 
S1(config-vlan)#exit
S1(config)# interface f0/1
S1(config-if)# switchport access vlan 10
S1(config-if)# exit
S1(config)# interface F0/2
S1(config-if)# switchport access vlan 20

Router Side:
R1(config)# interface G0/0
R1(config-if)# ip address 192.168.0.1 255.255.255.0 
R1(config-if)# no shutdown
R1(config-if)# exit
R1(config)# interface G0/1 
R1(config-if)# ip address 192.168.1.1 255.255.255.0
R1(config-if)# no shutdown


Configure Router-on-a-Stick: Switch Configuration
S1(config)# interface G0/1
S1(config-if)# switchport mode trunk 
S1(config-if)# switchport trunk native vlan 10
S1(config-if)# switchport trunk allowed vlan all
S1(config-if)# exit

Configure Router-on-a-Stick: Router Subinterface Configuration:
R1(config)# interface G0/0.10
R1(config-if)# encapsulation dot1q 10
R1(config-if)# ip address 192.168.10.1 255.255.255.0
R1(config-if)# interface G0/0.30 
R1(config-if)# encapsulation dot1q 30
R1(config-if)# ip address 192.168.30.1 255.255.255.0

Configure Router-on-a-Stick: Verifying Subinterfaces:
R1# show vlan
R1# show ip route
```

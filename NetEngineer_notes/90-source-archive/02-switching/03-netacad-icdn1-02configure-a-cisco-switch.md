# 02Configure A Cisco Switch

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN1/02Configure A Cisco Switch.txt`  
> Original source context: 03 NETACAD / ICDN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Set bootble Cisco IOS image:
S1(config)# boot system flash:/c2960-lanbasek9-mz.150-2.SE.bin
S1# show boot


Configuring Basic Switch Management Access with IPv4:
S1(config)#interface vlan 99
S1(config-if)# ip address 172.16.99.2 255.255.255.0
S1(config-if)# no shutdown 
S1(config-if)# exit
S1(config)# vlan 99
S1(config-vlan)#name Management 
S1(config-vlan)# exit
S1(config)# inteface FastEthernet0/1
S1(config-if)# switchport access vlan 99
S1(config-if)# exit
S1(config)# ip default-gateway 172.16.99.1 
S1(config)# end
S1# show ip interface brief
S1# copy running-conifg startup-config

S1# show interface vlan 1
S1# show vlan 
S1# show vlan brief
S1# show flash:
S1# dir flash:
S1# show mac-address table 
S1# show mac-address table dynamic
S1# show mac-address table address 01AC.AF10.123E
S1# show runnig-config 
S1# show startup-config 
S1# show version
S1# show interface F0/18
S1# show history


Set a configuration on the range of ports:
S1(config)#interface range F0/1 - 10, g0/1 - 2
S1(config-if-range)# switchport access vlan 100
S1(config-if-range)# exit


Configure Static Mac address: 
S1# clear mac address-table dynamic
S1(config)# mac address-table static 0011.ABCD.25FE vlan 100 inteface f0/6


Configure Switch Ports at the Physical Layer:
S1(config)#interface F0/1
S1(config-if)# duplex full
S1(config-if)# speed 1000

Aout-MDIX:
S2(config)#interface F0/2 
S2(config-if)# mdix auto
S2(config-if)# duplex auto
S2(config-if)# speed auto

S1# show controllers ethernet-controllers fa 0/1 phy | include Auto-MDIX


Configure SSH:
S1(config)# ip domain-name s1.local
S1(config)# crypto key generate rsa
S1(config)# username admin secret ciscoclass
S1(config)# line vty 0 15
S1(config-line)# login local
S1(config-line)# transport input ssh
S1(config-line)# exit
S1(config)# ip ssh version 2
S1(config)# ip ssh time-out 10
S1(config)# ip ssh authintication-retries 1

S1# show ip ssh
S1# show ssh

PORT SECURITY:

Configure Static Secure MAC Address:
S1(config)# interface F0/1
S1(config-if)# switchport mode access 
S1(config-if)# switchport port-security
S1(config-if)# switchport port-security maximum 1 
S1(config-if)# switchport port-security mac-address 0002.1692.B4E0
S1(config-if)# switchport port-security violation shutdown

Configure Dynamic Mac Address:
S1(config)# interface F0/2
S1(config-if)# switchport mode access 
S1(config-if)# switchport port-security
S1(config-if)# switchport port-security maximum 10
S1(config-if)# switchport port-security violation restrict

Configure Sticky Mac Address:
S1(config)# interface F0/3
S1(config-if)# switchport mode access 
S1(config-if)# switchport port-security
S1(config-if)# switchport port-security maximum 5
S1(config-if)# switchport port-security violation protect 
S1(config-if)# switchport port-security mac-address sticky

Verify Port Security:
S1# show port-security
S1# show port-security interface F0/1
S1# show port-security address
S1# show interface F0/2 status
```

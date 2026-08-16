# 010 Campus Network Security

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/BOOKS/CCNP SWITCH by Richard Froom/010 Campus Network Security`  
> Original source context: 07 SAFARI ONLINE / BOOKS / CCNP SWITCH by Richard Froom. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Chapter 10. Campus Network Security
!
This chapter covers the following topics: 
!
Overview of switch security issues 
!
Required best practices for basic security protection on Catalyst switches 
!
Campus network vulnerabilities 
!
Port security 
!
Storm control 
!
Mitigating spoofing attacks 
!
DHCP snooping, 
!
IP Source Guard, and dynamic ARP inspection 
!
Securing VLAN trunks Private VLANs
!
!
Cisco Switch Security Configuration Best Practices:
!
SW1(config)# enable secret strongpassword
!
SW1(config)# service password-encryption 
!
SW1(config)# aaa new-model 
!
SW1(config)# banner login #UNAUTHORIZED ACCESS PROHIBITED!#
!
SW1(config)# lin3 console 0
SW1(config-line)# login authentication default 
!
SW1(config)# access-list 1 permit host 10.0.0.234 
SW1(config)# line vty 0 15
SW1(config-line)# access-class 1 in 
SW1(config-line)# transport input ssh 
SW1(config-line)# login authentication default 
!
SW1(config)# no ip http server 
!
SW1(config)# ip http secure server 
SW1(config)# access-list 1 permit 10.100.50.0 0.0.0.255 
SW1(config)# ip http access-class 1 
!
use SSH 
!
Secure SNMP access 
!
Secure STP Operation: BPDU Guard, 
!
Secure CDP
!
Secure Unused Switch ports
!
!
!
Campus Network Vulnerabilities:
!
Rogue Access 
!
Switch Vulnerabilities
!
MAC Layer Attacks 
 > MAC address flooding 
!
VLAN Attacks 
 > VLAN hopping 
 > Attacks between devices on a common VLAN 
!
Spoofing Attacks 
 > DHCP Starvation 
 > DHCP spoofing 
 > STP compromises 
 > MAC spoofing 
 > ARP spoofing 
!
Switch Device Attacks 
 > CDP manipulation 
 > SSh and Telnet Attacks 
!
!
!
Introducing Port Security:
!
Port Security Configuration
!
Switch# configure terminal
Switch(config)# interface gigabitethernet 3/12
Switch(config-if)# switchport mode access
Switch(config-if)# switchport port-security
Switch(config-if)# switchport port-security maximum 5
Switch(config-if)# switchport port-security mac-address sticky
Switch(config-if)# end
!
Switch# show port-security interface gigabitethernet 3/12
!
!
!
Err-Disabled Automatic Recovery:
!
Switch(config)# errdisable detect cause [all | cause-name]
!
Switch(config)# errdisable recovery cause psecure-violation
Switch(config)# errdisable recovery interval 60
!
show errdisable recovery
!
!
!
Port Access Lists:
!
!
Configure the access group mode:
!
SW1(config-if)# access-group mode port | merge 
!
!
Configure PACL:
!
SW1(config)# mac access-list extended MAC_ACL 
SW1(config-ext-macl)# permit host 0000.1111.2222 aaaa.bbbb.cccc
!
SW1(config)# interface g0/2 
SW1(config-if)# mac access-group MAC_ACL in
!
SW1# show mac access-group 
!
!
!
Storm Control:
!
Configuring and Verifying Storm Control on an Interface:
!
Switch(config)# interface GigabitEthernet 0/0/1
Switch(config-if)# storm-control broadcast level 40 25
Switch(config-if)# storm-control multicast level pps 50k 25k
Switch(config-if)# storm-control unicast level bps 20m
Switch(config-if)# storm-control action shutdown
Switch(config-if)# storm-control action trap
!
Verify:
!
Switch# show storm-control 
Switch# show storm-control multicast
Switch# show storm-control unicast
!
!
!
Mitigating Spoofing Attacks:
!
!
DHCP Snooping Example Configuration:
!
SW(config)# ip dhcp snooping
SW(config)# ip dhcp snooping VLAN 10
SW(config)# interface Ethernet 0/0
SW(config-if)# ip dhcp snooping trust
SW(config-if)# ip dhcp snooping limit rate 10
!
show ip dhcp snooping 
show ip dhcp snooping binding
!
!
!
IP Source Guard:
!
IPSG Configuration:
!
SW(config)# interface Ethernet 0/1
SW(config-if)# ip verify source
SW(config-if)# ip verify source port-security
SW(config-if)# interface Ethernet0/2
SW(config-if)# ip verify source
SW(config-if)# ip verify source port-security
!
Verify IPSG:
!
SW# show ip verify source 
!
!
!
Dynamic ARP Inspection:
!
DAI Configuration:
!
SW(config)# ip dhcp snooping
SW(config)# ip dhcp snooping vlan 10
SW(config)# ip arp inspection vlan 10
SW(config)# interface Ethernet 0/0
SW(config-if)# ip dhcp snooping trust
SW(config-if)# ip arp inspection trust
!
!
!
Securing VLAN Trunks:
!
Manually configure access ports:
!
W(config)# interface g0/1
SW(config-if)# switchport mode access
SW(config-if)# switchport access vlan 10
!
!
VLAN Hopping:
!
Protecting Against VLAN Hopping:
!
Configure Native VLAN as unused VLAN:
!
SW(config)# inteface G0/0
SW(config-if)# switchport trunk native vlan 500
!
!
Prune Native VLAN:
!
SW(config)# interface G0/0 
SW(config-if)# switchport trunk native vlan 500
SW(config-if)# switchport trunk allowed vlan remove 500
!
!
Tag all frames on trunk ports by default:
!
SW1(config-if)# vlan dot1q tag native
SW1# show vlan dot1q tag native
!

!
!
VLAN Access Lists:
!
SW(config)# mac access-list extend simple-mac-acl
SW(config-ext-macl)# permit host 0000.001c.2014 any
SW(config-ext-macl)# exit
SW(config)# ip access-list extended simple-ip-acl
SW(config-ext-nacl)# permit ip host 192.168.1.1 any
SW(config-ext-nacl)# exit
SW(config)#
SW(config)# vlan access-map simple-vlan-map
SW(config-access-map)# match mac address simple-mac-acl
SW(config-access-map)# match ip address simple-ip-acl
SW(config-access-map)# action forward
SW(config-access-map)# exit
SW(config)# vlan filter simple-vlan-map vlan-list 2-10
SW(config)# end
!
!
!
Private VLANs:
!
PVLAN Configuration:
!
SW(config)# vlan 100
SW(config-vlan)# private-vlan primary
SW(config)# vlan 101
SW(config-vlan)# private-vlan isolated
SW(config)# vlan 102
SW(config-vlan) private-vlan community
SW(config) vlan 100
SW(config-vlan) private-vlan association 101, 102
!
!
SW(config)# interface GigabitEthernet 0/1
SW(config-if)# switchport description Interface-to-Router
SW(config-if)# switchport mode private-vlan promiscuous
SW(config-if)# switchport private-vlan mapping 100 add 101, 102
!
SW(config-if)# interface range GigabitEthernet 0/2-3
SW(config-if-range)# switchport description End-User-Ports-In-Isolated-PVLAN
SW(config-if-range)# switchport mode private-vlan host
SW(config-if-range)# switchport private-vlan host-association 100 101
!
SW(config-if)# interface range GigabitEthernet 0/4-5
SW(config-if-range)# switchport description End-User-Ports-In-Community-PVLAN
SW(config-if-range)# switchport mode private-vlan host
SW(config-if-range)# switchport private-vlan host-association 100 102
!
!
PVLAN Verification:
!
Switch# show vlan private-vlan
Switch# show interfaces gigabitEthernet 0/1 switchport | include private-vlan
!
!
PVLANs Across Multiple Switches:
!
 Standard trunk port 
 Isolated PVLAN trunk port 
 Promiscuous PLVAN trunk port
!
!

Using the Protected Port Feature:
!
SW(config)# interface g0/5
SW(config-if)# switchport protected
!
!
```

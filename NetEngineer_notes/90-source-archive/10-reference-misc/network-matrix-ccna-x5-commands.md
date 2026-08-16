# CCNA x5 Commands

> Imported source note. Provenance: `NetEngineer_Journal/Network Matrix/CCNA x5 Commands`  
> Original source context: Network Matrix. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Chapter 2: Basic Switching Concepts and Configuration 
Basic Switch Configuration
Display setting of IOS Boot File. 
Command:
S1#show boot
or 
S1# show bootvar 

Configure a Switch with Initial Settings
Step 1. Configure Management Interface
Commands:
S1(config)# interface vlan 99
S1(config-if)# ip address 192.168.99.2 255.255.255.0
S1(config-if)# no shutdown 
S1(config-if)# exit
S1(config)# vlan 99
S1(config-vlan)# name Management 
S1(config-vlan)# exit
S1(config)# interface F0/1 
S1(config-if)# switchport access vlan 99 
S1(config-if)# end
S1#
Step 2. Configure Default Gateway
Commands:
S1(config)# ip default-gateway 192.168.99.1 
S1(config)# exit 
S1# copy running-config startup-config 
Step3: Verify Configurations
Commands:
S1# show ip interface brief

Switch Verifycation
Commands:
S1# show running-config 
S1# show startup-config 
S1# show interface vlan1 
S1# show ip interface vlan1
S1# show version 
S1# show interface F0/0
S1# show vlan 
S1# show flash 
S1# dir flash: 


Configure basic switch settings
Commands:
Switch> enable 
Switch# configure terminal 
Switch(config)# hostname S1
S1(config)# service password-encryption 
S1(config)# enable secret cisco
S1(config)# no ip domain-lookup 
S1(config)# banner motd #Unauthorized access is strictly prohibited!#

Configure line Interfaces 
Commands:
S1(config)# line con 0
S1(config-line)# password cisco
S1(config-line)# login 
S1(config-line)# logging synchronous
S1(config-line)# exit
S1(config)# line vty 0 15 
S1(config-line)# password cisco
S1(config-line)# login 

Select a range of ports on switch 
Commands:
S1(config)# interface range F0/1-24 
S1(config-if)#

Manage the MAC Address Table
Display the MAC addresses:
S1# show mac address-table 
S1# show mac address-table dynamic
Clear the MAC address table:
S1# clear mac adress-table dynamic 
Set up a static MAC address:
S1(config)# mac address-table static 0050.abcd.01A1 vlan 1  interface f0/1 

Initialize and reload the router.
Commands:
S1# erase startup-config  
S1# delete vlan.dat 
S1# reload 


Configure Switch Ports Duplex and Speed and Auto-MDIX 
Commands:
S1(config)# interface F0/1
S1(config-if)# duplex full
S1(config-if)# speed 100
S1(config-if)# mdix auto 

Examine the auto-MDIX setting for a specific interface
Command:
S1# show conftrollers ethernet-controller fa0/1 phy | include Auto-MDIX 

Secure Remote Access
Configure SSH
Commands:
S1(config)# ip domain-name  s1.loc
S1(config)# crypto key generate rsa 
S1(config)# username admin secret cisco
S1(config)# line vty 0 15 
S1(config-line)# login local 
S1(config-line)# transport insput ssh
S1(config-line)# exit
S1(config)# ip ssh version 
S1(config)# ip ssh authentication-retries 2 
S1(config)# ip ssh time-out 30

Disable SSH 
Command:
S1(config)# crypto key zeroize rsa 

Verify SSH
Commands:
S1# show ssh 
S1# show ip ssh 

Disable Unused Ports
Commands:
S1(config)# interface range f0/0-24, g0/1-2 
S1(config-if)#shutdown 

DHCP snooping configuration 
Commands:
S1(config)# ip dhcp snooping 
S1(config)# ip dhcp snooping vlan 10,20 
S1(config)# interface F0/0
S1(config-if)# ip dhcp snooping trust  
S1(config-if)# interface F0/1
S1(config-if)# ip dhcp snooping limit rate 5

Switch Port Security Configuration 
Static port security
Commands:
S1(config)# interface F0/1
S1(config-if)# switchport  mode access 
S1(config-if)# switchport  port-security 
S1(config-if)# switchport  port-security mac-address 0011.ABCD.9876 

Dynamic port security 
Commands:
S1(config)# interface F0/2 
S1(config-if)# switchport mode access 
S1(config-if)# switchport port-security 
S1(config-if)# switchport port-security maximus 50 

Sticky port security 
Commands:
S1(config)# interface F0/3  
S1(config-if)# switchport mode access 
S1(config-if)# switchport  port-security 
S1(config-if)# switchport port-security maximum  2 
S1(config-if)# switchport port-security mac-address sticky

Configuring  Port Security Violation 
Commands:
S1(config-if)# switchport port-security violation protect
S1(config-if)# switchport port-security violation restrict 
S1(config-if)# switchport port-security violation shutdown 

Verify Port Security 
Commands:
S1# show port-security 
S1# show port-security address 
S1# show port-security interface F0/1

Ports in Error-disabled state 
Display port status
Commands:
S1# show interface F0/1 status 
S1# show port-security interface F0/1 

Reenable port
Commands:
S1(config)# interface F0/1
S1(config-if)# shutdown 
S1(config-if)# no shutdown 


Network Time Protocol (NTP)
Configure a NTP server 
Command:
R1(config)# ntp master 1

Configure a NTP client 
Command:
S1(config)# ntp server 10.0.0.1

Verify NTP
Commands:
S1# show ntp associations
S1# show ntp status



Chapter 3: VLANs 

Creating a VLAN
Commands:
S1(config)# vlan 20
S1(config-vlan)# name Faculty
S1(config-vlan)# end
or 
S1(config)# vlan 10,20,30,100-110 
S1(config-vlan)# 

Assigning Ports to VLANs
Commands:
S1(config)# interface  F0/1
S1(config-if)# switchport mode access 
S1(config-if)# swtchport access vlan 20 

Deleting VLANs
Commands:
S1(config)# no vlan 20
S1# delete vlan.dat 

Verifying VLAN Information
Commnads:
S1# show vlan
S1# show vlan brief 
S1# show vlan name Faculty
S1# show vlan id 20 
S1# show vlan summary
S1# show interface F0/11 switchport 

Configuring IEEE 802.1Q Trunk Links
Commnads:
S1(config)# interface G0/1
S1(config-if)# switchport mode trunk 
S1(config-if)# switchport trunk native vlan 99
S1(config-if)# switchport trunk allowd vlan 10,20,30,40,99 

Resetting the Trunk to Default State
Commnads:
S1(config)# interface G0/1
S1(config-if)# no switchport trunk  native vlan 
S1(config-if)# no switchport trunk allowed vlan 

Return Port to Access mode 
Commands:
S1(config)# interface G0/1 
S1(config-if)# switchpor mode access

Verifying Trunk Configuration
Commnads:
S1# show interface G0/1 switchport 
S1# show interface trunk

Dynamic Trunking Protocol (DTP) modes
Commands:
S1(config-if)# switchport mode trunk 
S1(config-if)# switchport nonegotiate 
S1(config-if)# switchport dynamic auto 
S1(config-if)# switchport dynamic desirable 

Determine the current DTP mode
Command:
S1# show dtp interface F0/1 

PVLAN Edge configuration
Commands:
S1(config)# interface F0/2
S1(config-if)# switchport protected 

Verify PVLAN 
Commands:
S1# show interface F0/2 switchport 



Chapter 4: LAN Redundancy 

STP 

Configure STP port cost 
Commands:
S1(config)# interface  F0/1 
S1(config-if)# spanning-tree cost 25  

Verify STP port cost 
Command:
S1# show spanning-tree

Configure STP port priority 
Commands:
S1(config)# interface F0/1
S1(config-if)# spanning-tree vlan 1 port-priority 112 

Configure RSTP Link Types
Commands:
S1(config)# interface f0/1
S1(config-if)# spanning-tree link-type point-to-point 

Configure PVST+ 
Commands:
S1(config)#  spanning-tree vlan 1 root primary 
S2(config)# spanning-tree  vlan 1 root secondary 
or 
S1(config)# spanning-tree vlan 1 priority 24576 
S1(config)# spanning-tree vlan 1 priority 28672 

Configure  PortFast and BPDUGUARD

Globally configure PortFast 
Commands:
S1(config)# spanning-tree portfast default 
Configure PortFast on interface 
Commands:
S1(config)# interface F0/1
S1(config-if)# spanning-tree portfast 

Configure BPDUguard on interface 
Command:
S1(config)# interface f0/1 
S1(config-if)# spanning-tree bpduguard enable 

Globally configure BPDUguard and ProtFast
Command:
S1(config)#  spanning-tree portfast bpduguard default  

Verify  PortFast and BPDUguard 
Command:
S1# show running-config interface F0/1

Configure Rapid PVST+ 
Command:
S1(config)#  spannig-tree  mode rapid-pvst 
S1(config)#  interface  f0/1 
S1(config-if)# spanning-tree link-type point-to-point 
S1(config-if)# end
S1# clear spanning-tree detected-protocols

Verify STP 
Commnads:
S1# show spannig-tree 
S1# show spannig-tree vlan 10 
S1# show spannig-tree active 
S1# show spaning-tree summary

Troubleshoot STP
Command:
S1# debug spanning-tree event

First Hop Redundancy Protocols (FHRP)

Configure HSRP 
Commands:
R1(config)# interface F0/1
R1(config-if)# standby 1 ip 192.168.0.3 
R1(config-if)# standby 1 priority 150
R1(config-if)# standby 1 preempt 

R2(config)# interface F0/1 
R2(config-if)# standby 1 ip 192.168.0.3 

Verify HSRP
Command:
R1# show standby 
R1# show standby brief 

Configure GLBP
Commands:
R1(config)# interface F0/1 
R1(config-if)# glbp 1  ip 192.168.0.3 
R1(config-if)# glbp 1  priority 100
R1(config-if)# glbp 1  preempt 
R1(config-if)# glbp 1 load-balancing round-robin 

R2(config)# interface F0/1 
R2(config-if)# glbp 1 ip 192.168.0.3 
R2(config-if)# glbp 1 load-balancing round-robin 

Verify GLBP 
Commands: 
R1# show  glbp 
R1# show glbp brief 



Chapter 5: Link Aggregation

Configuring EtherChannel with LACP
Commands:
S1(config)#  interface range F0/1-2 
S1(config-if)# channel-group 1 mode active 
S1(config-if)# exit
S1(config)# interface port-channel 1 
S1(config-if)# switchport mode trunk 
S1(config-if)# switchport trunk allowed vlan 10,20,30-35 
S1(config-if)# switchport native vlan 10 

S2(config)# interface range F0/1-2 
S2(config-if)# channel-group 1  mode passive 
S2(config-if)# exit
S2 (config)#  interface port-channel 1
S2(config-if)# switchport mode trunk 
S2(config-if)# switchport trunk allowed vlan 10,20,30-35 
S2(config-if)# switchport native vlan 10 


Configuring EtherChannel with PAgP 
Commands:
S1(confg)# interface range F0/1-2 
S1(config-if)# channel-group 1 mode desirable 
S1(config-if)# exit
S1(config)# interface port-channel 1 
S1(config-if)# switchport mode trunk 
S1(config-if)# switchport trunk allowed vlan 10,20,30-35 
S1(config-if)# switchport native vlan 10 

S2(config)# interface range F0/1-2 
S2(config-if)# channel-group 1  mode auto 
S2(config-if)# exit
S2 (config)#  interface port-channel 1
S2(config-if)# switchport mode trunk 
S2(config-if)# switchport trunk allowed vlan 10,20,30-35 
S2(config-if)# switchport native vlan 10 

Verify EtherChannel 
Commands:
S1# show interface port-channel 1
S1# show etherchannel summary 
S1# show etherchannel port-channel 
S1# show interface F0/1 etherchannel 
 


Chapter 6: Inter-VLAN Routing

Legacy Method: (Traditional)
Configuration on Switch side
Commands:
S1(config)# interface range F0/1-2 
S1(config-if)# switchport mode access
S1(config-if)# switchport access vlan 10
S1(config-if)# exit
S1(config)# interface range F0/3-4 
S1(config-if)# switchport mode access
S1(config-if)# switchport access vlan 20  

Cofiguration on Router side 
Commands:
R1(config)# interface F0/0
R1(config-if)# ip address 192.168.10.1 255.255.255.0 
R1(config-if)# no shutdown 
R1(config-if)# exit
R1(config)# interface F0/1 
R1(config-if)# ip address 192.168.20.1 255.255.255.0
R1(config-if)# no shutdown 
R1(config-if)# exit

Router-on-the-Stick Method 
Configuration on a Switch
Commands:
S1(config)# vlan 10,20 
S1(config-vlan)# exit 
S1(config)# interface f0/5 
S1(config-if)# switchport mode access 
S1(config-if)# switchport access vlan 10
S1(config-if)# interface f0/6 
S1(config-if)# switchport mode access 
S1(config-if)# switchport access vlan 20
S1(config-if)# exit
S1(config)# interface g0/1 
S1(config-if)# switchport mode trunk 
S1(config-if)# switchport trunk allowed vlan 1,10,20 
S1(config-if)# exit

Configuration on a Router 
Commands:
R1(config)# interface g0/0.10 
R1(config-if)# encapsulation dot1q  10
R1(config-if)# ip address 192.168.10.1 255.255.255.0
R1(config-if)# interface g0/0.20 
R1(config-if)# encapsulation dot1q 20
R1(config-if)# ip address 192.168.20.1 255.255.255.0 
R1(config-if)# interface g0/0
R1(config-if)# no shutdown 

Verify Router on the Stick 
Commands:
S1# show interface trunk 
S1# show  interface g0/1 switchport 
R1# show vlan 
R1# show ip route 


Layer 3 Switching
Configure SVI 
Commands:
S1(config)# interface vlan 10
S1(config-if)# ip address 192.168.10.1 255.255.255.0
S1(config-if)# exit

Configure Routed Ports on a Switch
Commands:
S1(config)#  interface G0/1 
S1(config-if)# no switchport 
S1(config-if)# ip address  100.0.0.1 255.255.255.252 
S1(config-if)# exit


Configuring Static Routes on a Catalyst 2960
Cisco Switch Database Manager (SDM) 
Configure SDM Template 
Commands:
S1(config)# sdm prefer ?
       default
       dual-ipv4-and-ipv6 
       lanbase-routing 
       qos 
S1(config)# sdm prefer lanbase-routing
S1(config)# do copy run startup 
S1(config)# do reload 

Display current SDM template 
Command:
S1# show sdm prefer 

Configuring Static Routes on a Catalyst 2960
Commands:
S1(config)# vlan 2 
S1(config-vlan)# exit
S1(config)# interface range f0/1-3   
S1(config-if)# switchport mode access 
S1(config-if)# switchport access vlan 2 
S1(config-if)# exit 
S1(config)# interface vlan 2 
S1(config-if)# ip address 192.168.1.2 255.255.255.0
S1(config-if)# no shutdown 
S1(config-if)# exit
S1(config)# ip route 0.0.0.0 0.0.0.0 192.168.1.1 vlan2 



Chapter 7: DHCP 

Configuring a Basic DHCPv4 Server
Step 1. Excluding IPv4 Addresses
Commnads:
R1(config)#  ip dhcp excluded-address 192.168.1.1 192.168.1.9 
R1(config)# ip dhcp  excluded-address 192.168.1.254

Step 2. Configuring a DHCPv4 Pool
Commands:
R1(config)# ip dhcp pool LAN1-POOL 
R1(dhcp-config)# 

Step 3. Configuring Specific Tasks
Commands:
R1(dhcp-config)# network 192.168.1.0 255.255.255.0 
R1(dhcp-config)# default-router 192.168.1.1 
R1(dhcp-config)# dns-server  200.100.10.115 
R1(dhcp-config)# domain-name  dhcpserver.ipcom.net 
R1(dhcp-config)# lease 2 

Disable DHCP 
R1(config)# no dhcp service 

Verifying DHCPv4
Commands:
R1# show running-config | section dhcp 
R1# show ip dhcp binding 
R1# show ip dhcp server statistics 
R1# show ip dhcp pool 

Configuring DHCPv4 Relay
Commands:
R1(config)# interface F0/0
R1(config-if)# ip helper-address 192.168.11.6 

Verify DHCPv4 Relay 
Command:
R1# show ip interface F0/0 


Configuring a Router as DHCPv4 Client
Commands:
R1(config)# interface F0/1 
R1(config-if)# ip address dhcp
R1(config-if)# no shutdown 

Troubleshoot DHCPv4

Troubleshooting Task 1: Resolve IPv4 Address Conflicts
Command:
R1# show ip dhcp conflict 
Troubleshooting Task 2: Verify Physical Connectivity
Command:
R1# show interfaces
Troubleshooting Task 3: Test Connectivity using a Static IP Address
  Settup IP address statically and verify connectivity 
Troubleshooting Task 4: Verify Switch Port Configuration
   Check VLANs, Trunking, STP, PortFast, Channeling 
Troubleshooting Task 5: Test DHCPv4 Operation on the Same Subnet or VLAN

Verify DHCPv4 Relay and DHCPv4 Services 
Commands:
R1# show runnig-config | section interface F0/0
R1# show runnig-config | include no service dhcp 

Debugging DHCPv4
Commands:
R1(config)# access-list 100 permit  udp any any eq 67
R1(config)# access-list 100 permit  udp any any eq 68
R1(config)# exit
R1# debug ip packet 100
also 
R1# debug ip dhcp sever events


Dynamic Host Configuration Protocol v6

Configuring only a SLAAC option to obtain IPv6  parameters 
Commands:
Router(config-if)# no ipv6 nd managed-config-flag 
Router(config-if)# no ipv6 nd other-config-flag 

Configuring a Router as a Stateless DHCPv6 Server
Commands:
R1(config)# ipv6 unicast-routing 
R1(config)# ipv6 dhcp pool IPv6-STATELESS 
R1(config-dhcpv6)# dns-server 2001:DDDD:1234::100
R1(config-dhcpv6)# domain-name  dhcpv6server.ipsoft.net 
R1(config-dhcpv6)# exit
R1(config)# interface  f0/1 
R1(config-if)#  ipv6 dhcp server IPv6-STATELESS 
R1(config-if)# ipv6 nd other-config-flag 
R1(config-if)# exit

Configuring a Router as a Stateless DHCPv6 Client
Commands:
R1(config)# interface f0/1 
R1(config-if)# ipv6 enable 
R1(config-if)# ipv6 address autoconfig 

Verifying the Stateless DHCPv6 Server
Commands:
R1# show ipv6 dhcp pool 
R1# show runnig-config 

Verifying the Stateless DHCPv6 Client
Commands:
R2# show ipv6 interface F0/1
R2# debug ipv6 dhcp detail 

Configuring a Router as a Stateful DHCPv6 Server
Commands:
R1(config)# ipv6 unicast-routing 
R1(config)# ipv6 dhcp pool DHCP1 
R1(config-dhcpv6)#  address prefix 2001:AAAA:BBBB:CCCC::/64 
R1(config-dhcpv6)#  lifetime infinite  
R1(config-dhcpv6)# dns-server 2001:DDDD::100
R1(config-dhcpv6)# exit
R1(config)# interface F0/1 
R1(config-if)# ipv6 dhcp server DHCP1 
R1(config-if)# ipv6 nd managed-config-flag 

Configuring a Router as a Stateful DHCPv6 Client
Commands:
R2(config)# interface F0/1
R2(config-if)# ipv6 enable 
R2(config-if)# ipv6  address dhcp 

Verifying Stateful DHCPv6
Commands:
R1# show ipv6 dhcp pool 
R1#  show ipv6 dhcp binding 
R1#  show runnig-config

Configuring a Router as a DHCPv6 Relay Agent
Commands:
R1(config)# interface F0/1 
R1(config-if)# ipv6 dhcp relay destination 2001:DB8:CAFE:1::6 
R1(config-if)# exit

Troubleshooting DHCPv6
Troubleshooting Task 1: Resolve Conflicts
Command:
R1# show ipv6 dhcp conflict
Troubleshooting Task 2: Verify Allocation Method
Command:
R1# show ipv6 interface f0/0
Troubleshooting Task 3: Test with a Static IPv6 Address
Troubleshooting Task 4: Verify Switch Port Configuration
Troubleshooting Task 5: Test DHCPv6 Operation on the Same Subnet or VLAN

Debugging DHCPv6
Command:
R1# debug ipv6 dhcp detail
```

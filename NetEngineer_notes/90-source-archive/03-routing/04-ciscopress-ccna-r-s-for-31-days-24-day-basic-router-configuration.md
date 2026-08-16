# 24 Day Basic Router Configuration

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNA R&S for 31 days/24 Day Basic Router Configuration`  
> Original source context: 04 CISCOPRESS / CCNA R&S for 31 days. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Basic Router Configuration with IPv4:
!
 Naming the router
 Setting passwords
 Configuring interfaces
 Configuring a banner
 Saving changes on a router
 Verifying basic configuration and router operations
!
!
Configuration Example:
Router> enable 
Router# configure terminal 
Router(config)# hostname R1
!
R1(config)# enable secret class
R1(config)# line console 0
R1(config-line)# password cisco
R1(config-line)# login
!
R1(config)# line vty 0 15
R1(config-line)# transport input ssh 
R1(config-line)# login local
!
R1(config)# username rustem password cisco
!
R1(config)# service password-encryption 
!
R1(config)# banner motd # Authorized User Only!#
!
R1(config)# interface G0/0
R1(config-if)# ip address 192.168.2.1 255.255.255.252
R1(config-if)# description Link to Level3 ISP, help by 1-800-555-1234
R1(config-if)# no shutdown 
!
R1# copy running-config startup-config 
!
!
!
Verification Example:
!
R!# show running-config
R1# show ip route 
R1# show ip interface brief 
R1# show interface G0/0
R1# clear interface  
!
!
!
Basic Router Configuration with IPv6:
!
R1(config)# ipv6 unicast-routing 
!
R1(config)# interface G0/0 
R1(config-if)# ipv6 address fe80::1 link-local 
R1(config-if)# ipv6 address 2001:DB8:ACAD:1000::100/64
!
!
!
Verifing IPv6 comfiguration:
!
R1# show ipv6 interface brief 
R1# show ipv6 interface g0/0

R1# show ipv6 route
```

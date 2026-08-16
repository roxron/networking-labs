# 01 Multicast Basics

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/Cisco ENCORE/IPv4 Multicast Fundamentals/01 Multicast Basics`  
> Original source context: 01 CBTNUGGETS / Cisco ENCORE / IPv4 Multicast Fundamentals. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Multicast addresses:
!
224.0.0.13 - All-PIM-Routers 
!
!
!
Enable Multicast Globally:
!
R1(config)# ip multicast-routing 
!
Enable Sparse mode:
!
R1(config)# interface g0/1
R1(config-if)# ip pim sparse-mode 
!
Configure Router to discover Multicast source:
!
R1(config)# ip pim rp-address 3.3.3.3
!
!
Enable IP IGMP on the interface:
!
R1(config)# interface g0/1
R1(config-if)# ip igmp version 3
!
Verify IGMP:
!
R1# show ip igmp interface g0/1
!
!
Verify Multicast routing table:
!
R1# show ip mroute 
R1# show ip mroute count 
!
!
!
Source Specific Multicast (SSM):
SSM destination addresses must be in the ranges 232.0.0.0/8 for IPv4
!
Join SSM from router for testing purposes:
!
R5(config)# interface g0/1 
R5(config-if)# ip igmp join-group 232.0.0.0/8 source 10.2.0.10 
!
Configure PIM SSM globally:
!
R5(config)# ip pim ssm default 
R5(config)# interface g0/0
R5(config-if)# ip igmp version 3
!
!
!
Static Multicast:
!
R1(config)# ip mroute 10.123.0.0 255.255.255.0 10.23.0.2
!
!
!
Configuring RP:
!
R1(config)# ip multicast-routing 
R1(config)# interface lo0
R1(config-if)# ip address 10.10.0.1 255.255.255.255
R1(config-if)# ip pim sparse-mode 
!
R1(config)# ip pim rp-address 10.10.0.1 
!
Verify RP mapping:
!
R2# show ip pim rp mapping 
!
!
!
Configuring BSR (Boot Strap Routing):
!
R1(config)# interface lo0
R1(config-if)# ip pim sparse-mode
!
R1(config)# ip pim bsr-candidate loopback 0
!
!
R2(config)# interface loopback0
R2(config-if)# ip pim sparse-mode
!
R2(config)# ip pim rp-candidate loopback 0
!
R1# show ip pim rp mapping 
!
!
!
COnfiguring Auto-RP:
!
224.0.1.39 and 224.0.1.40 Auto-RP Multicast addresses:
!
Enable PIM on loopback interface
!
!
Configuring RP:
!
R1(config)# ip pim send-rp-announce lo0 scope 10 
!
!
Confugiring Mapping Agent:
!
R2(config)# ip pim send-rp-discovery lo0 scope 10 
!
R5# show ip pim mapping 
!
Enable autorp listener on the the Other Routers:
!
R5(config)# ip pim autorp listener
!
!
!
Sparse-Dense Mode
!
R1(config)# int g0/1
R1(config-if)# ip pim sparse-dense-mode 
!
!
!
BiDir-PIM:
!
R1(config)# ip pim bidir-enable 
!
!
!
Assign Multicast Group to RP: 
!
R1(config)# ip access-list standard CRP 
R1(config-std-pacl)# permit 239.2.2.2
!
R1(config)# ip pim rp-candidate lo0 group-list CRP 
!
!
!
Multicast Boundary:
!
R2(config)# access-list 1 deny 239.2.2.2
R2(config)# access-list 1 permit 224.0.0.0 15.255.255.255
!
R2(config)# interface g1/0
R2(config-if)# ip multicast boundary 1 in 
!
R2# clear ip mroute *
!
```

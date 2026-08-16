# CCNA x4 Commands

> Imported source note. Provenance: `NetEngineer_Journal/Network Matrix/CCNA x4 Commands`  
> Original source context: Network Matrix. Content is preserved as historical study material; validate commands against the target platform and release.

```text
CCNAX3 
Chapter 1 Routing concepts 

Configure management SVI on Switch 
Commands:
S1(config)#  interface vlan 1 
S1(config-if)# ip address 192.168.1.2 255.255.255.0
S1(config-if)# no shutdown 
S1(config-if)# exit
S1(config)# ip default-gateway 192.168.1.1



Verifying IP configuration commands 
Commands:
R1# show ip interface brief 
R1# show ip interface F0/0
R1# show ip route 
R1# show running-config 
R1# show protocols 

On Windows PC 
Commands: 
  ipconfig 
  ipconfig  /all 
  ipv6config /all



Basic setting on the Router 
Commands:
Router>
Router> enable
Router# configure terminal 
Router(config)# hostname R1
R1(config)# enable secret  cisco
R1(config)# line console 0
R1(config-line)# password  cisco
R1(config-line)# login 
R1(config-line)# exit
R1(config)# line vty 0 4 
R1(config-line)# password cisco
R1(config-line)# login 
R1(config-line)# exit
R1(config)# service password-encryption 
R1(config)# banner motd  #Authorized Access Only!#
R1(config)#exit 
R1# copy running-config startup-config 



Configure  Router interface with IP 
Commands:
R1(config)#interface F0/0
R1(config-if)# ip address 10.10.1.1 255.255.255.0 
R1(config-if)# no shutdown 
R1(config-if)# description  Connected to LAN1
R1(config-if)#exit

Serial interface
Commands: 
R1(config)# interface Serial 0/0/0 
R1(config-if)# ip address  200.0.0.1 255.255.255.252
R1(config-if)# clock rate 64000
R1(config-if)#  no shutdown 
R1(config-if)#  description Link to R2
R1(config-if)# exit

Configure IPv6 address on interface 
Enable IPv6  routing 
Command:
R1(config)#  ipv6 unicast-routing 

Assign autoconfigure Link-Local Address 
Commands:
R1(config)# interface F0/0 
R1(config-if)# ipv6 enable 
R1(config-if)# exit

Assign IPv6 address 
Commands:
R1(config)# interface F0/0 
R1(config-if)# ipv6 address FE80::1 link-local
R1(config-if)# ipv6 address 2001:ABCD:1111:2222::A/64 
R1(config-if)# no shutdown 
R1(config-if)#exit

Configure IPv4 Loopback interface 
Commands:
R1(config)#interface Loopback 0
R1(config-if)# ip address 10.10.10.10 255.255.255.0
R1(config-if)# exit

Verify connectivity of directly connected networks 
IPv4 Commands:
R1# show ip interface brief 
R1# show ip route 
R1# show running-config interface
R1# show ip interface 
R1# show interfaces 

IPv6 Commands:
R1# show ipv6 interface brief 
R1# show ipv6 route
R1# show ipv6 interface G0/0


Filter Show Command output 
Commands:
R1# show running-config | section dhcp 
R1# show ip interface brief  | include up
R1# show running-config | begin router 

Specify the number of lines to be displayed:
Command:
R1(config)# terminal length 20 


Commands History Feature
Commands:
R1# terminal history size 200
R1# show history 



Chapter 2 Static Routing 

Configure a Next-Hop Static routes
Commands:
R1(config)# ip route 192.168.0.0 255.255.255.0  10.10.10.1 
R1(config)# ip route 172.16.10.0 255.255.255.0  10.10.10.5 

Configure a Directly Connected Static routes 
Commands:
R1(config)# ip route  100.123.32.0 255.255.254.0 S0/0/0
R1(config)# ip route  200.0.1.0  255.255.255.128  F0/0

Configure a Fully Specified Static routes
Commands:
R1(config)# ip route 172.16.0.0 255.255.255.0  G0/1  192.168.1.1 
R1(config)# ip route 172.16.1.0 255.255.255.0  G0/2  192.168.2.1

Verify Static Route
Commands:
R1# ping 172.16.1.1
R1# traceroute 172.16.1.1
R1# show ip route 
R1# show ip route static 
R1# show ip route 172.16.1.1
R1# show running-config | section ip route 

Configure Default Static route
Command:
R1(config)# ip route 0.0.0.0 0.0.0.0 S0/0/1


IPv6 Static routing 
Enable IPv6 rouing on the router 
Command:
R1(config)# ipv6 unicast-routing 

Configure a Next-hop Static IPv6 route
Commands:
R1(config)# ipv6 route 2001:DB8:ACAD:1::/64 2001:DB8:ACAD:5::1
R1(config)# ipv6 route 2001:DB8:ACAD:2::/64 2001:DB8:ACAD:5::1

Configure a Directly Attached Static IPv6 route
Command:
R1(config)# ipv6 route 2001:DB8:ACAD:10::/64  S0/0/0

Configure a Fully Specified Static IPv6 route
Command:
R1(config)# ipv6 route 2001:DB8:ACAD:1::/64  G0/0 FE80::1 

Verify IPv6 Static routes
Commands:
R1# ping  2001:DB8:ACAD:1::10 
R1# traceroute 2001:DB8:ACAD:1::10
R1# show ipv6 route 
R1# show ipv6 route static 
R1# show ipv6 route 2001:DB8:ACAD:1::
R1# show running-config  | section ipv6 route

Configure a Default Static IPv6 route 
Command:
R1(config)# ipv6 route  ::/0  2001:DB8:ACAD:1::10

Configure Floating Static route 
Command:
R1(config)#ip route 200.0.0.0 255.255.255.0 S0/0/0  10 


Chapter 3 Routing Dynamically 

Configuring the RIP protocol 
Enable RIP  v1
Command:
R1(config)# router rip 
R1(config-router)#

Disable RIP
Command:
R1(config)# no router rip

Advertising networks in RIP
Commands:
R1(config)# router rip 
R1(config-router)# network 192.168.1.0
R1(config-router)# network 192.168.2.0 

Verify RIP configuration
Commands:
R1# show ip protocols
R1# show ip route
R1# show runnig-config | section  router rip 

Enable RIPv2 
Commands:
R1(config)# router rip  
R1(config-router)# version 2

Disable Auto-summarization
Commands:
R1(config)# router rip
R1(config-router)# version  2
R1(config-router)# no auto-summary

Configure and verify Passive interface 
Commands:
R1(config)# router rip
R1(config-router)# passive-interface G0/0

Configure all  interfaces as pasive and exlude only needed interface:
Commands:
R1(config)# router rip 
R1(config-router)# passive-interface default
R1(config-router)# no passive-interface S0/0/0 

R1# show ip protocols

Propagating a Default Route in RIP
Commands:
R1(config)# ip route 0.0.0.0  0.0.0.0  S0/0/0  100.10.5.1 
R1(config)# router rip 
R1(config-router)# default-information originate 

Modify Administrative distance 
Commands:
R1(config)# router rip 
R1(config-router)# distance 89 

Troubleshooting RIP 
Commands:
R1#debug  ip rip 
R1# debug ip rip events
R1# debug ip routing 

Configuring the RIPng 
Commands:
R1(config)# ipv6 unicast-routing 
R1(config)# ipv6 router rip RIP_AS 
R1(config-rtr)# exit
R1(config)# interface G0/0
R1(config-if)# ipv6 rip RIP_AS enable 

Propagate Default route in RIPng 
Commands:
R1(config)# ipv6 route ::/0   S0/0/0  FE80::1
R1(config)# interface G0/0 
R1(config-if)# ipv6 rip RIP_AS  default-information originate 

Verify  RIPng 
Commands:
R1# show  ipv6 protocols
R1# show ipv6 route 
R1# show ipv6 route rip 


Chapter4: EIGRP

Enable EIGRP process 
Command:
R1(config)# router eigrp 1
R1(config-router)# 

Disable EIGRP on router 
Command:
R1(config)# no router eigrp

Configure the EIGRP router ID
Commands:
R1(config)# router eigrp 1
R1(config-router)# eigrp router-id 1.1.1.1
or on old IOS:
R1(config-router)# router-id  1.1.1.1

Configure Network  in EIGRP
Commands:
R1(config)# router eigrp 1 
R1(config-router)# network 172.16.0.0 

Configure Network with wildcard mask
Commands:
R1(config)# router eigrp 1
R1(config-router)# nerwork 192.168.1.32 0.0.0.3
 
Display any changes in EIGRP neighbor adjacencies
Commands:
R1(config)# router eigrp 1
R1(config-router)# eigrp log-neighbor-changes

Configure Passive interface
Commands:
R1(config-router)# router eigrp 1
R1(config-router)# passive-interface G0/0

Verify EIGRP:
Commands:
R1# show ip eigrp neighbor
R1# show ip protocols
R1# show ip route 

EIGRP composite  Metric
By default EIGRP uses 
Bandwidth  and Delay   but aslo can uses Load and Reliability 
Modify K values
Commands:
R1(config)# router eigrp 1
R1(config-router)# metric weights 1 1 0 1 0 0

Verify K value 
Command:
R1# show ip protcols 

Examining interface values
Command:
R1# show ip interface F0/0

Configuring the Bandwidth Parameter
Commands:
R1(config)# interface S0/0/0
R1(config-if)# bandwidth 1000 

Restore default value of bandwidth:
Commands:
R1(config)# interface S0/0/0
R1(config-if)# no bandwidth

Verify bandwidth 
Command:
R1# show interface S0/0/0

Calculating the EIGRP metric
Formula:
[K1*Bandwidth + K3*Delay] * 256 = Metric
because K1 and K3 both equal 1, the formula becomes:
(Bandwidth+Delay)*256=Metric 
Bandwidth calculation formula:
(10 000 000/slowest link BW)=Bandwidth 
Delay calculation formula:
(sum of delay)/10 = Delay

Example of  Calculation
Distanation route of R1 to R3 is 192.168.0.0/24 
Path to Distanation  R1 S0/0/0  --->  R2 S0/0/1 ----->  R3 G0/0 
Verifing interfaces:
R1# show interface S0/0/0
   bandwidth 1544 
   delay           20000
R2# show intrerface S0/0/1 
   bandwidth  980
   delay       20000
R3# show interface G0/0
     bandwidth 1000000
     delay      10 
Calculate bandwidth:
(10000000/980)= 10204 
Calculate delay:
(20000+20000+10)/10 = 4001
Calculate metric:
(10204+4001)*256=3636480
Done.

DUAL and Topology Table
DUAL use  terms like:
Succsessor 
Feasible Distance 
Feasible Succsessor
Feasibility Condition 
Reported Distance

Verify topology table 
R1# show ip eigrp topology 
R1# show ip eigrp topology all-links

Examine DUAL FSM
Command:
R1# debug eigrp fsm

Configuring a EIGRP for IPv6 
Commands:
R1(config)# ipv6 unicast-routing 
R1(config)# ipv6 router eigrp 1
R1(config-rtr)# eigrp router-id 1.1.1.1
R1(config-rtr)# no shutdown 
R1(config-rtr)# exit
R1(config)# interface S0/0/0
R1(config-if)# ipv6 eigrp 1

Configure passive interface in EIGRPv6
Commands:
R1(config)# ipv6 router eigrp 1
R1(config-rtr)# passive-interface G0/0

Verify EIGRP for IPv6
Commands:
R1# show ipv6 eigrp neighbor
R1# show ipv6 protocols
R1# show ipv6 route
R1# show ipv6 topology 


Chapter 5: EIGRP Advanced Configurations and Troubleshooting

Autosummarization :
Enable auto-summary:
Commands:
R1(config)# router eigrp 1
R1(config-router)# auto-summary  

Disable auto-summary:
Commands:
R1(config)# router eigrp 1
R1(config-router)# no auto-summary

Verify Auto-summary
Commands:
R1# show ip  eigrp topology all-links
R1# show ip route eigrp 
R1# show ip protocols

Configure a EIGRP manual summary route
Commands:
R1(config)# interface S0/0/0
R1(config-if)# ip summary-address eigrp 1 192.168.0.0 255.255.252.0 

Verify EIGRP manual summary route:
Command:
R2#show ip route 

Configure a EIGRP IPv6 manual summary route
Commands:
R1(config)# interface S0/0/0 
R1(config-if)# ipv6 summary-address eigrp 1 2001:DB8:ACAD::/48 
R2# show ipv6 route eigrp 

Propagating a Deafault static route in EIGRP
Commands:
R1(config)# ip route 0.0.0.0 0.0.0.0  s0/0/0 200.165.0.1 
R1(config)# router eigrp 1 
R1(config-router)# redistribute static

Verify EIGRP Default route propagation
R1# show ip route static
R1# show ip protocols
R2# show ip route eigrp 

Propagating a Deafault static route in EIGRP IPv6 
Commands:
R1(config)# ipv6 route ::/0 s0/0/0  fe80::4 
R1(config)# ipv6 router eigrp 1
R1(config-rtr)# redistribute static 

Verify EIGRP IPv6  Default route propagation
Commands:
R1# show ipv6 route 
R1# show ipv6 protoclos 

Fine-tuning EIGRP interfaces:

EIGRP Bandwidth Utilization:
For IPv4:
Commands:
R1(onfig)#interface S0/0/0
R1(config-if)# ip bandwidth-percent  eigrp 1 50 

For IPv6:
Commands:
R1(config)# interface S0/0/0 
R1(config-if)# ipv6 bandwidth-percent eigrp 1 50

Hello and Hold Timers 
Configuring EIGRP IPv4 Hello and Hold timers
Commands:
R1(config)# interface S0/0/0
R1(config-if)# ip hello-interval eigrp 1 10 
R1(config-if)# ip hold-time eigrp 1 30 

Configuring EIGRP IPv6 Hello and Hold timers
Commands:
R1(config)# interface S0/0/0
R1(config-if)# ipv6 hello-interval eigrp 1 10 
R1(config-if)# ipv6 hold-time eigrp 1 30

Change amount of paths for load balancing  in EIGRP
IPv4
Commands:
R1(config)# router eigrp 1 
R1(config-if)# maximum-paths 6 
IPv6 
Commands:
R1(config)# ipv6 router eigrp 1
R1(config-rtr)# maximum-paths 6

EIGRP Authentication 
Configure EIGRP Authentication
For IPV4
Commands: 
R1(config)#  key chain EIGRP_KEY
R1(config-keychain)# key 1
R1(config-keychain-key)# key-string  cisco123 
R1(config-keychain-key)# exit
R1(config-keychain)# exit
R1(config)# interface  S0/0/1
R1(config-if)# ip authentication mode eigrp 1 md5 
R1(config-if)# ip authentication key-chain eigrp 1 EIGRP_KEY 
R1(config-if)#exit
For IPv6
Commands:
R1(config)# key chain EIGRP_IPV6_KEY
R1(config-keychain)# key 1
R1(config-keychain-key)# key-string cisco123
R1(config-keychain-key)# exit
R1(config-keychain)# exit
R1(config)# interface S0/0/0
R1(config-if)# ipv6 authentication mode eigrp 1 md5 
R1(config-if)# ipv6 authentication key-chain eigrp 1 EIGRP_IPV6_KEY

Verify EIGRP Authentication
For IPv4 
Commands:
R1# show ip eigrp neighbor 
R1# show ip eigrp interface
R1# show  key-chain 
R1# show running-config
For IPv6
Commands:
R1# show ipv6 eigrp neighbor
R1# show ipv6 eigrp interface


Chapter 6: Single-Area OSPF

Enable OSPF process on the router 
Commands:
R1(config)# router ospf 10
R1(config-router)#

Configuring an OSPF Router ID
Commands:
R1(config)# router ospf 10
R1(config-router)# router-id 1.1.1.1

Modify a Router ID
the same as above 
Clear after modifying by using 
Command:
R1# clear ip ospf  process

Configuring a LoopBack interface as  an OSPF Router ID
Commands:
R1(config)# interface loopback 0 
R1(config-if)# ip address 1.1.1.1 255.255.255.255

Assigning interface to OSPF network
Connamds:
R1(config)# router ospf 10
R1(config-router)# network 192.168.10.4 0.0.0.3  area 0
R1(config-router)# network 10.0.0.1 0.0.0.0 area 0 

Configuring Passive Interface 
Commands:
R1(config)# router ospf 10 
R1(config-router)# passive-interface  G0/0

OSPF Cost
Adjusting the Reference Bandwidth
Commands:
R1(config)# router ospf 10 
R1(config-router)# auto-cost reference-bandwidth  1000 

Adjusting the Interface Bandwidth
R1(config)# interface S0/0/0
R1(cinfig-if)# bandwidth 1024

Manually setting the OSPF cost 
R1(config)# interface s0/0/0 
R1(config-if)# ip ospf cost 976 

Verifying OSPF 
Commands:
R1# show ip ospf neighbor 
R1# show ip protocols 
R1# show ip ospf 
R1# show ip ospf interface brief
R1# show ip ospf interface S0/0/0
R1# show ip route ospf 

Configurig Single-area OSPFv3 
Commands:
R1(config)# ipv6 unicast-routing 
R1(config)# ipv6 router ospf 10
R1(config-rtr)# router-id 1.1.1.1 
R1(conf g-rtr)# exit
R1(config)# interface S0/0/0 
R1(config-if)#ipv6 ospf 10 area 0 

Clear OSPF process
Command:
R1# clear ipv6  ospf process 

Verifying OSPFv3
Commands:
R1# show ipv6 ospf neighbor 
R1# show ipv6 protocols 
R1# show ipv6 ospf 
R1# show ipv6 ospf interface brief
R1# show ipv6 ospf interface s0/0/0 
R1# show ipv6 route ospf 

Chapter 7: Adjust and Troubleshoot Single-Area OSPF

DR/BDR Election
Verify DR/BDR Roles
Command:
R1# show ip ospf interface F0/0
Verify DR/BDR adjacencies 
Command:
R1# show ip ospf neighbor

Changing OSPF Priority 
Command:
R1(config)# interface G0/0
R1(config-if)# ip  ospf priority  255
For  IPv6
Commands:
R1(config)# interface G0/0
R1(config-if)# ipv6 ospf priority  255

Propagating a Default Static route in OSPFv2 
Commands:
R1(config)# ip route 0.0.0.0 0.0.0.0 s0/0/0 50.0.0.1
R1(config)# router ospf 10 
R1(config-router)#  default-information originate 

Propagating a Default Static route in OSPFv3 
Commands:
R1(config)# ipv6 route ::/0 s0/0/0  fe80::1
R1(config)# ipv6 router ospf  10
R1(config-rtr)# default-information originate 

OSPF Hello and Dead Interval 

Modify for OSPFv2
Commands:
R1(config)# interface s0/0/0
R1(config-if)# ip ospf hello-interval  5
R1(config-if)# ip ospf dead-interval  20 
Verify intervals
Command:
R1# show ip ospf interface  S0/0/0

Modify  for OSPFv3
Commands:
R1(config)# interface  s0/0/0
R1(config-if)# ipv6 ospf hello-interval 5
R1(config-if)# ipv6 ospf dead-interval 20
Verify intervals
Command:
R1# show ipv6  ospf interface  S0/0/0

Secure OSPF  
Authentication for OSPFv3 is supports by IPSec 
Commands:
R1(config)# interface  S0/0/0 
R1(config-if)# ipv6 ospf authentication ipsec spi  

Enabled OSPFv2 Authentication globally:
Commands:
R1(config)# router ospf 10 
R1(config-router)# area 0 authentication message-digest  
R1(config-router)# exit
R1(config)# interface S0/0/0
R1(config-if)# ip ospf  message-digest-key 1 md5 cisco123

Enabled OSPFv2 Authentication on interface 
Commands:
R1(config)#  interface s0/0/0  
R1(config-if)# ip ospf authentication message-digest 
R1(config-if)# ip ospf message-digest-key 1 md5 cisco123

Verify OSPF MD5 Authentication 
Commands:
R1# show ip ospf interface 
R1# show ip ospf neighbor


Chapter 8: Multiarea OSPF 

Configuring Multiarea OSPF
Commands:
R1(config)# router ospf 10 
R1(config-router)# router-id 1.1.1.1
R1(config-router)# network 192.168.0.0 0.0.0.255  area 0
R1(config-router)# network 10.10.0.0  0.0.0.255  area 1

Configuring Multiarea OSPFv3
Commands:
R1(config)# ipv6 router ospf 10
R1(config-rtr)# router-id 1.1.1.1
R1(config-rtr)# exit
R1(config)# interface S0/0/0 
R1(config-if)# ipv6 ospf 10 area 0
R1(config-if)# interface S0/0/1 
R1(config-if)# ipv6 ospf 10 area 1

External route summarization in Multiarea OSPF
Commands:
R1(config)# router ospf 10  
R1(config-router)# summary-adress 192.168.0.0 255.255.252.0 

Interarea route summarization in Multiarea OSPF 
Commands:
R1(config)# router ospf 10 
R1(config-router)# area 1 range 192.168.0.0 255.255.252.0 

Verify Multiarea OSPF 
Commands:
R1# show ip protocols 
R1# show ip ospf interface brief 
R1# show ip route ospf 
R1# show ip ospf database 


Chapter 9: Access Control Lists

Configure Standard  Numbered ACLs
Commands:
R1(config)# access-list 10 permit  host 192.168.1.10
R1(config)# acess-list 10 deny 192.168.1.0 0.0.0.255

Confure Standard Named ACLs 
Commands: 
R1(config)# ip access-list standard NO_ACCESS
R1(config-std-nacl)# deny host 192.168.1.10 
R1(config-std-nacl)# permit 192.168.1.0 0.0.0.255 

Assigning ACL to interface 
Commands:
R1(config)# interface f0/0
R1(config-if)# ip access-group NO_ACCESS out 
R1(config)# interface s0/0/0
R1(config-if)# ip access-group 10 in

Verify ACL
Commands:
R1# show  access-list
R1# show ip access-list 
R1# show ip interface j
R1# show running-config 

Using an ACL to Control VTY Access
Commands:
R1(config)# line vty 0  4
R1(config-line)# login local
R1(config-line)# transport input ssh 
R1(config-line)# access-class 15 in 
R1(config-line)#exit
R1(config)# access-list 15 remark Restsrict access to VTYs by only  one ip address 
R1(config)# access-list 15 permit  172.16.1.10
R1(config)# access-list 15 deny any
R1# show  access-list 


Extended IPv4 ACLs
Examples:
R1(config)# access-list 100 permit ip  any 200.0.0.0 0.0.0.255
R1(config)# access-list 100 permit tcp  192.168.0.0 0.0.0.255 any  eq www
R1(config)# access-list 100 permit udp 10.0.0.0 0.0.255.255 host 40.0.0.1 eq 53

R1(config)# access-list 101 deny tcp 172.16.0.0 0.0.255.255 any eq 110
R1(config)# access-list 101 deny tcp  any any  eq 21
R1(config)# access-list 101 deny tcp any host 30.0.0.111  eq snmp  

Configure ACL to  allow WEB traffic only and only return traffic originated from inside network 
Topology:

(LAN)<---------->[ G0/0](R1)[S0/0/0]<----------->(INTERNET) 

Commands:
R1(config)# access-list 110 permit tcp 192.168.1.0  0.0.0.255   any  eq 80
R1(config)# access-list 110 permit tcp 192.168.1.0 0.0.0.255 any eq 443 
R1(config)# access-list 111 permit tcp  any  192.168.1.0 0.0.0.255  established 

Apply ACL to interface
Commands:
R1(config)# interface G0/0
R1(config-if)# ip access-group 110 in
R1(config-if)# ip access-group 111 out 

Deny FTP ACL, permit all other traffic
Commands 
R1(config)# access-list 112 deny tcp 10.0.0.0 0.0.0.255 any eq ftp 
R1(config)# access-list 112 deny tcp 10.0.0.0 0.0.0.255 any eq ftp-data
R1(config)# access-list 112 permit ip any any 

Create Named Extended ACL
Commands:
R1(config)# ip access-list  extended NO_WEB
R1(config-ext-nacl)# deny tcp any any eq 80
R1(config-ext-nacl)# deny tcp any any eq 443
R1(config-ext-nacl)# permit ip any any 

Allow only WEB from LANs to Internet  and return traffic originated by LANs  with name extended ACL
Commands:
R1(config)#  ip access-list extended  BROWSING 
R1(config-ext-nacl)# permit tcp 172.16.0.0 0.0.0.255 any eq 80 
R1(config-ext-nacl)# permit tcp 172.16.0.0 0.0.0.255 any eq 443
R1(config-ext-nacl)# exit
R1(config)#  ip access-list extended RETURNS
R1(config-ext-nacl)# permit tcp any 172.16.0.0 0.0.0.255 established
R1(config)#  interface s0/0/0
R1(config-if)# ip access-group BROWSING out 
R1(config-if)# ip access-group RETURNS in

Configuring IPv6 ACLs

No Wildcard Masks
Applying an IPv6 ACL
Commands:
R1(config)# interface  s0/0/0
R1(config-if)# ipv6 traffic-filter ACL1 in 

Additional Default Statements:
deny ipv6 any any 
permit icmp any any nd-na
permit icmp any any nd-ns

Example of IPv6 ACL
Commands:
R1(config)# ipv6 access-list NO_LAN_ACCESS 
R1(config-ipv6-acl)#  deny ipv6 2001:db8:cafe:100a::/64 any 
R1(config-ipv6-acl)# permit ipv6 any any 
R1(config-ipv6-acl)# exit
R1(config)# interface s0/0/0
R1(config)# ipv6 traffic-filter  NO_LAN_ACCESS in

Verify IPv6 ACL 
Commands:
R1# show access-list 
R1# show ipv6 access-list 
R1# show ipv6 interface 
R1# show running-config


Chapter 10: IOS Images and Licensing 

Managing IOS file system
Commands:
R1# show version 
R1# show flash:
R1# show file system
R1# dir 
R1# copy running-config startup-config 
R1# copy startup-config  flash:
R1# copy tftp flash: 
R1# copy flash: tftp:
R1(config)# boot system  flash:c1900-universalk9.SPA-15.2M1.bin
R1(config)# boot system tftp://255.255.255.255/c1900-universalk9.SPA-15.2M1.bin
R1(config)# boot system rom 

IOS Licensing
View the technology package licenses
Command:
R1# show license  feature 

Display Unique Device Identifier (UDI)
Commands:
R1# show  license  udi 

License Instalation
Command:
R1# license install flash0:seck9-C1900-SPE150_K9-FHH12250057.xml
R1# reload 

Verify License 
Commands:
R1# show version 
R1# show license 

Evaluation Right-To-Use licenses (RTU) Installation 
Commands:
R1(config)# license accept end user agreement  
R1(config)# license boot  module c1900 technology-package  datak9  
R1(config)# exit
R1# copy running-config startup-config 
R1# relaod 

Backing Up the License 
Commands:
R1# liecense save flash0:R1_all_license.lic 

Uninstall license 
Step 1. Disable the technology package
Commands:
R1(config)# license boot module c1900 technology-package seck9 disable 
R1(config)# exit
R1# reload 

Step 2. Clear the license
Commands: 
R1# license clear seck9 
R1# configure terminal 
R1(config)#  no license boot module c1900 technology-package seck9 disable 
R1(config)# exit
R1# reload
```

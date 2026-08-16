# CCNA x6 Commands

> Imported source note. Provenance: `NetEngineer_Journal/Network Matrix/CCNA x6 Commands`  
> Original source context: Network Matrix. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Chapter 3: Point-to-Point Connections 

Configuring HDLC Encapsulation
Commands:
R1(config)# interface S0/0/0
R1(config-if)# encapsulation hdlc 

Troubleshooting a Serial Interface
Commands:
R1# show interface serial 
R1# show controllers 
R1# debug serial interface 


PPP Basic Configuration Command
Enabling PPP on an Interface
Commands:
R1(config)# interface S0/0/0
R1(config-if)# encapsulation ppp 
R1(config-if)# ip address 10.0.0.1 255.255.255.252

Configure a PPP Compression
Commands:
R1(config)# interface S0/0/0 
R1(config-if)# compress predictor 
or 
R1(config-if)# compress stac

Configure a PPP Link Quality Monitoring  
Commands:
R1(config)# interface S0/0/0
R1(config-if)#  ppp quality 80 

Configure a PPP Multilink
Commands:
R1(config)# interface multilink 1 
R1(config-if)# ip address 192.168.1.1 255.255.255.252
R1(config-if)# ppp multilink 
R1(config-if)# ppp multilink group 1
R1(config-if)# exit
R1(config)# interface s0/0/0 
R1(config-if)# no ip address 
R1(config-if)# encapsulation ppp
R1(config-if)# ppp multilink 
R1(config-if)# ppp multilink group 1
R1(config-if)# exit 
R1(config)# interface S0/0/1 
R1(config-if)# no ip address 
R1(config-if)# encapsulation ppp
R1(config-if)# ppp multilink
R1(config-if)# ppp multilink  group 1

Verify PPP 
Commands:
R1# show interface  serial 
R1# show ppp multilink 

Configuring PPP with Authentication
PAP
Commands:
R1(config)# username R2 password cisco
R1(config)# interface S0/0/0
R1(config-if)# ppp authentication pap 
R1(config-if)# ppp pap sent-username R1 password cisco

R2(config)# username R1 password cisco 
R2(config)# interface S0/0/0 
R2(config-if)# ppp autheintication pap 
R2(config-if)# ppp pap sent-username R2 password cisco 

CHAP
Commnads:
R1(config)# username R2 password cisco
R1(config)# interface S0/0/0 
R1(config-if)# ppp authentication chap 

R2(config)# username R1 password cisco
R1(config)#  interface S0/0/1
R1(config-if)# ppp authentication chap 

Troubleshooting PPP Serial Encapsulation
Commands:
R1# debug ppp packet 
R1# debug ppp negotiation 
R1# debug ppp error
R1# debug ppp authentication 
R1# debug ppp compression 
R1# debug ppp cbcp 



Chapter 4: Frame Relay

Configuring Static Mapping
Commands:
R1(config)# interface S0/0/0
R1(config-if)# ip address 10.0.0.1 255.255.255.240 
R1(config-if)# encapsulation frame-relay 
R1(config-if)# no frame-relay inverse-arp 
R1(config-if)# frame-relay map ip  10.0.0.2  102 broadcast cisco 
R1(config-if)# no shutdown 
R1(confg-if)# end
R1# show frame-relay map 

Local Management Interface (LMI)
Dysplay LMI type
Commands:
R1# show  frame-relay lmi 
R1# show interface serial 0/0/0

LMI Extensions
Configure LMI types 
Commands:
R1(config)# interface S0/0/0
R1(config-if)# frame-relay lmi-type cisco
or 
R1(config-if)# frame-relay lmi-type ansi
or 
R1(config-if)# frame-relay lmi-type q933a

Change keepalive on intrerface:
Command:
R1(config-if)# keepalive 15 

Configuring a Static Frame Relay Map
Commands:
R1(config)# interface serial 0/0/0
R1(config-if)# bandwidth 64
R1(config-if)# ip address 10.0.0.1 255.255.255.0
R1(config-if)# ipv6 address fe80::1 link-local 
R1(config-if)# ipv6 address 2001:ABCD::1/64
R1(config-if)# encapsulation frame-relay 
R1(config-if)# frame-relay map ip 10.0.0.2  102 broadcast 
R1(config-if)# frame-relay map ipv6 2001:ABCD::2 102
R1(config-if)# frame-relay map ipv6 fe80::2 102 broadcast 

Verify a Static Frame Relay Map
Command:
R1# show frame-relay map


Configuring Point-to-Point Subinterfaces
Commands:
R1(config)# interface S0/0/0 
R1(config-if)# no shutdown 
R1(config-if)# encapsulation frame-relay 
R1(config-if)# exit
R1(config)# interface s0/0/0.102 poit-to-point 
R1(config-subif)# ip address 10.0.0.1 255.255.255.252
R1(config-subif)# frame-relay interface-dlci 102
R1(config-subif)# exit
R1(config)# interface S0/0/0.103 point-to-point 
R1(config-subif)# ip address 10.0.0.5 255.255.255.252
R1(config-subif)# frame-relay interface-dlci 103


Verifying Frame Relay Operation

Verify Frame Relay Interfaces
Commands:
R1#show interface serial 0/0/0 

Verify LMI statistics
Command:
R1# show frame-relay lmi 

Verify PVC
Command:
R1# show frame-relay pvc 

Verify Inverse ARP
Commands:
R1# clear frame-relay inarp 
R1# show frame-relay map 

Troubleshoot Frame Relay
Command:
R1# debug frame-relay lmi 



Chapter 5: Network Address Translation for IPv4

 Configuring Static NAT
Commands:
R1(config)# ip nat inside  source static 192.168.1.10 200.0.0.1
R1(config)# interface F0/0
R1(config-if)# ip address 192.168.1.1 255.255.255.0
R1(config-if)# ip nat inside
R1(config-if)# exit
R1(config)# interface S0/0/0 
R1(config-if)# ip address 100.0.0.1 255.255.255.252 
R1(config-if)# ip nat outside 
R1(config-if)# exit

Verifying Static NAT
Commnads:
R1# show ip nat translations 
R1# show ip nat statistics 
R1# clear ip nat statistics 


Configuring Dynamic NAT
Commnads:
R1(config)#  ip nat pool PUBLIC_POOL  201.0.0.1 201.0.0.6  netmask 255.255.255.248
R1(config)#  access-list 1 permit 192.168.10.0 0.0.0.255 
R1(config)# ip nat inside source list 1 pool PUBLIC_POOL 
R1(config)# interface  S0/0/0 
R1(config-if)# ip nat outside 
R1(config-if)# interface F0/0
R1(config-if)# ip nat  inside 

Verifying Dynamic NAT
Commands:
R1# show ip nat translations
R1# show ip nat translations verbose 
R1# show ip nat statistics 
R1# show  running-config 

Configure translation entries time out
Command:
R1(config)# ip nat translation timeout 1000

Clear NAT  translations 
Commands:
R1# clear ip nat translation 


Configuring PAT: Address Pool
Commands:
R1(config)# ip nat pool PUBLIC_POOL 201.0.0.1 201.0.0.6 netmask 255.255.255.248 
R1(config)# access-list 1  permit 192.168.1.0 0.0.0.255 
R1(config)# ip nat inside source list 1 pool PUBLIC_POOL overload 
R1(config)# interface S0/0/0
R1(config-if)# ip nat inside 
R1(config-if)# interface F0/0
R1(config-if)# ip nat outside 


Configuring PAT: Single Address
Commands:
R1(config)# access-list 1 permit 192.168.1.0 0.0.0.255 
R1(config)# ip nat inside source  list 1 interface S0/0/0 overload 
R1(config)# interface S0/0/0
R1(config-if)# ip nat outside 
R1(config-if)# interface F0/1
R1(config-if)# ip nat inside 

Verifying PAT
Commands:
R1# show ip nat translations 
R1# show ip nat statistics 


Configuring Port Forwarding with IOS
Commands:
R1(config)# ip nat inside source static tcp  192.168.1.10 80 201.0.0.1 8080 
R1(config)# interface S0/0/0 
R1(config-if)# ip nat outside 
R1(config-if)# interface F0/0
R1(config-if)# ip nat inside 

Troubleshooting NAT: debug command
Commands:
R1# debug ip nat 
R1# debug ip nat detailed



Chapter 6: Broadband Solutions
Configuring a PPPoE 
Configure the ISP Router 
Commnds:
ISP(config)# username customer1 password pppoe1
ISP(config)# ip local pool PPPoEPOOL  10.0.0.2 10.0.0.254 
ISP(config)# interface virtual-template 1 
ISP(config-if)# ip address 10.0.0.1 255.255.255.0
ISP(config-if)# mtu 1492 
ISP(config-if)# peer default ip address pool PPPoEPOOL 
ISP(config-if)# ppp authentication chap callin 
ISP(config-if)# exit 
ISP(config)# bba-group pppoe global 
ISP(config-bba-group)# virtual-template 1
ISP(config-bba-group)# exit
ISP(config)# interface F0/0
ISP(config-if)# pppoe enable group global
ISP(config-if)# no shutdown 

Configure the Cust1 Router 
Commands:
Cust1(config)# interface f0/0
Cust1(config-if)# pppoe enable 
Cust1(config-if)# pppoe-client dial-pool-number 1
Cust1(config-if)# exit
Cust1(config)# interface dialer 1 
Cust1(config-if)# mtu 1492 
Cust1(config-if)# ip address negotiated 
Cust1(config-if)# encapsulation ppp 
Cust1(config-if)# dialer pool 1 
Cust1(config-if)# ppp authentication chap callin 
Cust1(config-if)# ppp chap hostname customer1 
Cust1(config-if)# ppp chap password pppoe1 
Cust1(config-if)#exit 
Cust1(config)# ip rpoute 0.0.0.0 0.0.0.0 dialer 1

Verify and Troubleshoot PPPoE 
Commands:
Cust1# show  pppoe session 
Cust1# show ip interface brief 
Cust1# show ip route 
Cust1# debug pppoe event 
Cust1# debug ppp authentication 
Cust1# ping 10.0.0.1 



Chapter 7: Securing Site-to-Site Connectivity
Configure Site-toSite IPsec VPN

On R1
Identify interesting traffic on R1
Command:
R1(config)# access-list 110 permit ip 192.168.1.0 0.0.0.255 192.168.3.0 0.0.0.255 

Configure the crypto ISAKMP policy 10
Commands:
R1(config)#  crypto isakmp policy 10
R1(config-isakmp)#  encryption aes 
R1(config-isakmp)# authentication pre-share
R1(config-isakmp)# group 2
R1(config-isakmp)# exit
R1(config)# crypto isakmp key cisco address 10.2.2.2 

Create the transform-set VPN-SET to use esp-3des and esp-sha-hmac
Commands:
R1(config)# crypto ipsec transform-set VPN-SET esp-3des esp-sha-hmac
R1(config)# crypto map VPN-MAP 10 ipsec-isakmp 
R1(config-crypto-map)# description VPN connection to R3 
R1(config-crypto-map)# set peer 10.2.2.2 
R1(config-crypto-map)# set transfor-set VPN-SET 
R1(config-crypto-map)# match address 110
R1(config-crypto-map)# exit
R1(config)# interface S0/0/0
R1(config-if)# crypto map VPN-MAP

On R3
Identify interesting traffic on R3
Command:
R3(config)# access-list 110 permit ip 192.168.3.0 0.0.0.255 192.168.1.0 0.0.0.255
R3(config)# 

Configure the crypto ISAKMP policy 10
Commands:
R3(config)# crypto isakmp policy 10
R3(config-isakmp)# encryption aes 
R3(config-isakmp)# authentication pre-share 
R3(config-isakmp)# group 2
R3(config-isakmp)# exit
R3(config)# crypto isakmp key cisco address 10.1.1.2 
R3(config)# crypto ipsec transform-set VPN-SET esp-3des esp-sha-hmac
R3(config)# crypto map VPN-MAP  10 ipsec-isakmp 
R3(config-crypto-map)# description VPN connection to R1 
R3(config-crypto-map)# set peer 10.1.1.2
R3(config-crypto-map)# set transform-set VPN-SET 
R3(config-crypto-map)# match address  110 
R3(config-crypto-map)# exit 
R3(config)# interface S0/0/1 
R3(config-if)# crypto map VPN-MAP 

Verify IPsec VPN 
Command:
R1# show crypto ipsec sa 


GRE Tunnel Configuration
Commands:
R1(config)# interface tunnel1 
R1(config-if)#  ip address 10.0.0.1 255.255.255.252
R1(config-if)# tunnel mode gre ip
R1(config-if)# tunnel source 50.0.0.1 
R1(config-if)# tunnel destination  100.10.145.34

R2(config)# interface tunnel1 
R2(config)# ip address 10.0.0.2 255.255.255.252
R2(config-if)# tunnel mode gre ip 
R2(config-if)# tunnel source 100.10.145.34
R2(config-if)# tunnel destination 50.0.0.1 

Verify GRE 
Commands:
R1# show ip interface brief 
R1# show interface tunnel1


Configuring GRE over IPsec
For tunnel configuration  use example above
Identify interesting traffic on R1 and R2  
Commands:
R1(config)# access-list 100 petmit gre host 50.0.0.1 host 100.10.145.34 
and 
R2(config)# access-list 100 permit gre host 100.10.145.34 host 50.0.0.1

The rest just copy from IPsec configuration above. 



Chapter 8: Monitoring the Network

Service Timestamp
Commands:
R1(config)# service timestamp  log uptime 
R1(config)# service timestamp log datetime
R1(config)# service sequence-numbers 

Configuring NTP server 
Command:
R1(config)# ntp master 1

Configuring NTP client 
Command:
R1(config)# ntp server 10.0.0.5 
R2(config)# ntp update-calendar

Verify NTP 
Commands:
R1# show ntp status 
R1# show ntp associations 

Setup time manualy 
Command:
R1# clock set 10:56:50 19 february 2014

Configuring Syslog
Default logging
Commands:
R1(config)# logging console 
R1(config)# logging buffered

Display logging settings 
Commands:
R1# show logging 

Router and Switch Commands for Syslog Clients
Commands:
R1(config)#  logging 192.168.1.4
R1(config)# logging trap 5  
R1(config)# logging source-interface F0/0 

Verify  Syslog
Command: 
R1# show logging 
R1# show logging | include changed state to up 
R1# show logging | begin June 12 22:34 


Configuring SNMP client 
SNMPv2c
Commands:
R1(config)# snmp-server community cisco rw SNMP_ACL
R1(config)# snmp-server location NOC_SNMP_MANAGER
R1(config)# snmp-server contact Rustem Saliev
R1(config)# snmp-server host 10.0.0.10 version 2c cisco 
R1(config)# snmp-server enable traps 
R1(config)# ip access-list standard SNMP_ACL
R1(config-std-nacl)# permit 10.0.0.10 

Verify SNMPv2c
Commands:
R1# show snmp 
R1# show snmp community 

Configure SNMPv3 
R1(config)# snmp-sever group SNMPGROUP v3 auth
R1(config)# snmp-server user roxron SNMPGROUP v3 encrypted auth sha cisco priv aes 256 cisco 

Verify SNMPv3 
R1# show snmp 
R1# show snmp group 
R1# show snmp user


Configuring NetFlow on Router 
Commands:
R1(config)# interface G0/0
R1(config-if)# ip flow ingress
R1(config-if)# ip flow egress 
R1(config-if)# exit
R1(config)# ip flow-export destination 10.0.0.10 2055 
R1(config)# ip flow-export version 5
R1(config)# ip flow-export source f0/0 

Verifying NetFlow
Commands:
R1# show ip cache flow 
R1# show ip flow interface 
R1# show ip flow export 



Chapter 9: Troubleshooting the Network 
Troubleshooting commands:
R1# show version 
R1# show ip interface 
R1# show ipv6 interface 
R1# show interface
R1# show ip route 
R1# show ipv6 route 
R1# show arp 
R1# show ipv6 neighbors
R1# show running-config
S1# show ports
S1# show vlan 
R1# show tech-support 
R1# show ip cache flow

Command for Gathering  Symptopms 
Commands:
R1# ping 
R1# traceroute 
R1# telnet 
R1# debug 
R1# show protocols
R1# show ip interface brief
R1# show ipv6 interface brief

Verify the Physical Layer
Commands:
R1# show processes cpu 
R1# show memory 
R1# show interface 

Verify Layer 2 and Layer 3 Addressing on the Local Network

Windosw Commands:
arp 
arp -a 
arp -d 
netsh interface ipv6  show neighbor 
Linix Commands:
arp -a 
ip neigh show 

Cisco Command:
R1# show ipv6 neighbors 
S1# show mac address-table 
S1# show vlan
```

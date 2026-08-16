# 10 Branch Connections

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN2/10 Branch Connections`  
> Original source context: 03 NETACAD / ICDN2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
PPPoE Configuration:
Client site:
R2(config)# interface dialer 1
R2(config-if)# encapsulation ppp
R2(config-if)# ip address negotiated
R2(config-if)# ppp chap hostname customer1
R2(config-if)# ppp chap password pppoe1234
R2(config-if)# dialer pool 1
R2(config-if)# ip mtu 1492
R2(config-if)# no shutdown 
R2(config-if)# exit
R2(config)# interface G0/1 
R2(config-if)# no ip address 
R2(config-if)# pppoe enable
R2(config-if)# pppoe-client dial-pool-number 1 
R2(config-if)# ip tcp adjust-mss 1452
R2(config-if)# no shutdown

PPPoE Verification:
R2# show ip interface brief
R2# show ip interface dialer 1
R2# show ip route 
R2# show pppoe session

Troubleshoot PPPoE:
R2# debug ppp negotiation 

Adjusting TCP maximum segment size (MSS):
R2(config)# interface G0/1
R2(config-if)# ip tcp adjust-mss 1452


Configure the ISP Router as PPPoE Server:
R1(config)# username customer1 password pppoe1234
R1(config)# ip local pool PPPoEPOOL 10.0.0.1 10.0.0.100
R1(config)# interface virtual-template 1
R1(config-if)# ip address 10.0.0.254 255.255.255.0
R1(config-if)# mtu 1492
R1(config-if)# peer default ip address pool PPPoEPOOL
R1(config-if)# ppp authentication chap callin
R1(config-if)# exit
R1(config)# bba-group pppoe global
R1(config-bba-group)# virtual-template 1
R1(config-bba-group)# exit
R1(config)# interface g0/1
R1(config-if)# pppoe enable group global
R1(config-if)# no shutdown


Configure GRE:
R1(config)# interface tunnel0
R1(config-if)# tunnel mode gre ip
R1(config-if)# ip address 192.168.2.1 255.255.255.252
R1(config-if)# tunnel source 10.0.0.1 
R1(config-if)# tunnel destination 172.16.50.200

R15(config)# interface tunnel0
R15(config-if)# tunnel mode gre ip
R15(config-if)# ip address 192.168.2.2 255.255.255.252
R15(config-if)# tunnel source 172.16.50.200
R15(config-if)# tunnel destination 10.0.0.1 

Verify GRE:
R15# show ip interface brief
R15# show interface tunnel0 


BGP Sample Configuration:
ISP1(config)# router bgp 65001
ISP1(config-router)# neighbor 209.165.201.2 remote-as 65000
ISP1(config-router)# network 0.0.0.0 

Comp-A(config)# router bgp 65000
Comp-A(config-router)# neighbor 209.165.201.1 remote-as 65001
Comp-A(config-router)# network 198.133.219.0 mask 255.255.255.0

Verify BGP:
Comp-A# show ip route
Comp-A# show ip bgp 
Comp-A# show ip bgp summary
```

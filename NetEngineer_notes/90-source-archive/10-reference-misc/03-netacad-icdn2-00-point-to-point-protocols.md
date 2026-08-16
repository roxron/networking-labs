# 00 Point-to-Point Protocols

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN2/00 Point-to-Point Protocols.txt`  
> Original source context: 03 NETACAD / ICDN2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring HDLC
R1(config)# interface S0/0/0
R1(config-if)# encapsulation hdlc

Verify and Troubleshooting a Serial Interface:
R1# show interfaces S0/0/0
R1# show controllers S0/0/0

PPP Basic Configuration Command:
on both Routers:

R1(config)#interface S0/0/0
R1(config-if)# ip address 10.0.0.1 255.255.255.252
R1(config-if)# ipv6 address 2001:DB8:ACAD:1234::1/64
R1(config-if)# encapsulation ppp

R2(config)# interface S0/0/0
R1(config-if)# ip address 10.0.0.2 255.255.255.252
R1(config-if)# ipv6 address 2001:DB8:ACAD:1234::2/64
R1(config-if)# encapsulation ppp

PPP Compression Commands:

R1(config-if)# compress predict
or
R1(config-if)# compress stac

PPP Link Quality Monitoring Command:
R1(config-if)# ppp quality 80


PPP MultiLink Configuration:
On Both Routers:

R1(config)# interface Multilink 1
R1(config-if)# ip address 10.0.0.1 255.255.255.252
R1(config-if)# ipv6 address 2001:DB8:ACAD:1111::1/64
R1(config-if)# ppp multilink 
R1(config-if)# ppp multilink group 1
R1(config-if)# exit
R1( config)# interface S0/0/0
R1(config-if)# encapsulation ppp
R1(config-if)# ppp multilink
R1(config-if)# ppp multilink group 1
R1(config-if)# exit
R1(config)# interface S0/0/1 
R1(config-if) encapsulation ppp
R1(config-if) ppp multilink 
R1(config-if) ppp multilink group 1

do the same on the other Router

Verify PPP:
R1# show inteface S0/0/0
R1# show ppp multilink


Configuring PPP with Authentication:

Use PAP:
on:
R1(config)# username R2 password cisco
R1(config)# interface S0/0/0
R1(config-if)# ppp authentication pap
R1(config-if)# ppp pap sent-username R1 password cisco
on:
R2(config)# username R1 password cisco
R2(config)# interface S0/0/0 
R2(config-if)# ppp authentication pap
R2(config-if)# ppp pap sent-username R2 password cisco

Use CHAP:
on:
R1(config)# username R2 password cisco
R1(config)# interface S0/0/0
R1(config-if)# ppp authentication chap
on:
R2(config)# username R1 password cisco
R2(config)# interface S0/0/0
R2(config-if)# ppp authentication chap

Troubleshooting PPP Serial Encapsulation 
R1# debug ppp packet 
R1# debug ppp negotiation 
R1# debug ppp error 
R1# debug ppp authentication 
R1# debug ppp compresssion 
R1# debug ppp cbcp
```

# 03 Routing Configurations

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN1/03 Routing Configurations.txt`  
> Original source context: 03 NETACAD / ICDN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure an IPv4 Router interface:
R1(config)# interface G0/1
R1(config-if)# description Link to LAN0
R1(config-if)# ip address 192.168.0.1 255.255.255.0
R1(config-if)# no shutdown 


Configure Serial DCE interface:
R1(config)# interface Serial0/0/0
R1(config-if)# description Link to R2 
R1(config-if)# ip address 10.0.0.1 255.255.255.252
R1(config-if)# clock rate 128000
R1(config-if)# no shutdown


Configure an Ipv6 Router interface:
R1(config)# unicast-routing 
R1(config)# interface GigabitEthernet 0/0
R1(config-if)# description LAN0
R1(config-if)# ipv6 address FE80::1 link-local 
R1(config-if)# ipv6 address 2001:db8:acad:1::1/64


Configure an IPv4 Loopback interface:
R1(config)# interface loopback 0
R1(config-if)# ip address 10.10.10.1 255.255.255.0


Verify IPv4 Interface Settings:
R1# show ip interface brief 
R1# show ip route
R1# show runnig-config
R1# show inteface
R1# show ip inteface 


Vertify IPv6 Interface Settings:
R1# show ipv6 interface brief
R1# show ipv6 route
R1# show ipv6 interface GigabitEthernet0/0


Filter Show Commands Output
R1# show running-config | section line con 0
R1# show ip interface brief | include up
R1# show ip interface brief | exclude unassigned
R1# show ip route | begin Gateway


Command History Feature:
R1(config)# terminal history size 100
R1# show history
```

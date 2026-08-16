# 09 OSPF

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN2/09 OSPF`  
> Original source context: 03 NETACAD / ICDN2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring OSPF:
Method1:
R1(config)# router ospf 1
R1(config-router)# router-id 1.1.1.1
R1(config-router)# network 192.168.0.0 0.0.0.255 area 0
R1(config-router)# network 10.0.0.0 0.0.0.3 area 0
R1(config-router)# network 10.0.0.4 0.0.0.3 area 0

Method2:
R1(config)# router ospf 1 
R1(config-router)# router-id 1.1.1.1
R1(config-router)# network 192.168.0.1 0.0.0.0 area 0
R1(config-router)# network 10.0.0.1 0.0.0.0 area 0
R1(config-router)# network 10.0.0.5 0.0.0.0 area 0

Configure Passive Interface:
R1(config)# router ospf 1
R1(config-router)# passive-interface G0/0


R1# clear ip ospf process

Adjusting the Reference Bandwidth:
R1(config)# router ospf 1
R1(config-router)# auto-cost reference-bandwidth 1000

Manually Setting the OSPF Cost:
R1(config)# interface S0/0/0
R1(config-if)# ip ospf cost 1000

Verify OSPF:
R1# show ip ospf neighbors
R1# show ip protocols
R1# show ip ospf 
R1# show ip ospf interface S0/0/0
R1# show ip ospf interface brief
R1# show ip route ospf 

Configure OSPFv3:
R1(config)# ipv6 unicast-routing 
R1(config)# ipv6 router ospf 1
R1(config-rtr)# router-id 1.1.1.1
R1(config-rtr)# auto-cost reference-bandwidth 1000
R1(config-rtr)# exit
R1(config)# interface S0/0/0 
R1(config-if)# ipv6 ospf 1 area 0
R1(config-if)# exit
R1(config)# inteface G0/0
R1(config-if)# ipv6 ospf 1 area 0

R1# clear ipv6 ospf process 

Verify OSPFv3:
R1# show ipv6 ospf neighbor
R1# show ipv6 protocols
R1# show ipv6 ospf interface brief
R1# show ipv6 ospf 
R1# show ipv6 route ospf

Configure Multiarea OSPF:
R1(config)# router ospf 1
R1(config-router)# router-id 1.1.1.1
R1(config-router)# network 10.0.0.0 0.0.0.255 area 1
R1(config-router)# network 10.0.1.0 0.0.0.255 area 1
R1(config-router)# network 192.168.0.1 255.255.255.252 area 0
R1(config-router)# area 1 range 10.0.0.0 255.255.254.0 

Configure The OSPF Priority:
R1(config)# interface G0/0
R1(config-if)# ip ospf priority 10
R1(config-if)# ipv6 ospf priority 10

Propagating a Default Static Route in OSPFv2:
R1(config)# ip route 0.0.0.0 0.0.0.0 200.10.25.1 
R1(config)# router ospf 1 
R1(config-router)# default-information originate

Propagating a Default Static Route in OSPFv3:
R1(config)# ipv6 route ::/0 2001:DB8:FEED:1::2
R1(config)# ipv6 router ospf 1 
R1(config-rtr)# default-information originate

Modifying OSPFv2 Intervals:
R1(config)# inteface S0/0/0
R1(config-if)# ip ospf hello-interval 5
R1(config-if)# ip ospf dead-interval 20 

Modifying OSPFv3 Intervals:
R1(config)# interface S0/0/0
R1(config-if)# ipv6 ospf hello-interval 5
R1(config-if)# ipv6 ospf dead-interval 20
```

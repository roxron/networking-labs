# 19 Day Single-Area OSPF Implementation

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNA R&S for 31 days/19 Day Single-Area OSPF Implementation`  
> Original source context: 04 CISCOPRESS / CCNA R&S for 31 days. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Single-Area OSPF Implementation:
!
Single-Area OSPFv2 Configuration:
!
R1(config)# router ospf 10
R1(config-router)# router-id 1.1.1.1
R1(config-router)# 
!
!
R1# show ip ospf interfaces
R1# show ip protocols 
R1# show ip ospf 
R1# clear ip ospf process 
!
!
Configuring OSPF Networks:
!
R1(config)# router ospf 10
R1(config-router)# network 172.16.1.1 0.0.0.0 area 0
R1(config-router)# network 172.16.3.1 0.0.0.0 area 0
R1(config-router)# network 192.168.10.5 0.0.0.0 area 0
!
R2(config)# router ospf 10
R2(config-router)# network 172.16.2.0 0.0.0.255 area 0
R2(config-router)# network 172.16.3.0 0.0.0.3 area 0
R2(config-router)# network 192.168.10.8 0.0.0.3 area 0
!
R3(config)# router ospf 10
R3(config-router)# network 192.168.1.0 0.0.0.255 area 0
R3(config-router)# network 192.168.10.4 0.0.0.3 area 0
R3(config-router)# network 192.168.10.8 0.0.0.3 area 0
!
!
Passive Interfaces:
!
R1(config)# passive-interface gigabitethernet 0/0
!
!
Changing the OSPF Reference Bandwidth:
!
R1(config-router)# auto-cost reference-bandwidth 10000
!
R2(config-router)# auto-cost reference-bandwidth 10000
!
R3(config-router)# auto-cost reference-bandwidth 10000
!
!
Adjusting the Interface Bandwidth:
!
R1(config)# interface S0/0/1
R1(config-if)# bandwidth 64 
!
R1(config)# interface S0/0/1
R1(config-if)# ip ospf cost 65535
!
!
Verifying OSPFv2:
!
R1# show ip route 
R1# show ip interface brief
R1# show ip protocols 
R1# show ip ospf neighbor
R1# show ip ospf 
R1# show ip ospf interface brief 
!
!
!
Single-Area OSPFv3 Configuration:
!
R1(config)# ipv6 unicast-routing 
R1(config)# ipv6 router ospf 10
R1(config-rtr)# router-id 1.1.1.1
R1(config-rtr)# auto-cost reference-bandwidth 10000
R1(config-rtr)# passive-interface g0/0
R1(config-rtr)# exit
!
Enable OSPFv3 on Interfaces:
!
R1(config)# interface GigabitEthernet 0/0
R1(config-if)# ipv6 ospf 10 area 0
R1(config-if)# interface Serial0/0/0
R1(config-if)# ipv6 ospf 10 area 0
R1(config-if)# interface Serial0/0/1
R1(config-if)# ipv6 ospf 10 area 0
!
Verifying OSPFv3:
!
R1# show ipv6 ospf 
R1# show ipv6 protocols 
R1# show ipv6 ospf interface 
R1# show ipv6 ospf interface brief
R1# show ipv6 ospf neighbor
R1# show ipv6 ospf database 
R1# show ipv6 route ospf
```

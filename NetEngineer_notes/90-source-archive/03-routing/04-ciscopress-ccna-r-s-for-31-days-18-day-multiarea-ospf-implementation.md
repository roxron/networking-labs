# 18 Day Multiarea OSPF Implementation

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNA R&S for 31 days/18 Day Multiarea OSPF Implementation`  
> Original source context: 04 CISCOPRESS / CCNA R&S for 31 days. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Multiarea OSPF Implementation: 
!
Configuring Multiarea OSPFv2 on R1:
!
R1(config)# router ospf 10
R1(config-router)# router-id 1.1.1.1
R1(config-router)# network 10.1.1.1 0.0.0.0 area 1
R1(config-router)# network 10.1.2.1 0.0.0.0 area 1
R1(config-router)# network 192.168.10.0 0.0.0.0 area 0
R1(config-router)# end
!
Verify:
!
R1# show ip ospf neighbor 
R1# show ip ospf 
R1# show ip ospf inteface 
R1# show ip protocols 
R1# show ip ospf interface brief 
R1# show ip route ospf 
R1# show ip ospf database 
!
!
Configuring Multiarea OSPFv3 on R1:
!
R1(config)# ipv6 router ospf 10
R1(config-rtr)# router-id 1.1.1.1
R1(config-rtr)# exit
R1(config)# interface GigabitEthernet 0/0
R1(config-if)# ipv6 ospf 10 area 1
R1(config-if)# interface GigabitEthernet 0/1
R1(config-if)# ipv6 ospf 10 area 1
R1(config-if)# interface Serial 0/0/0
R1(config-if)# ipv6 ospf 10 area 0
R1(config-if)# end
!
Verify:
!
R1# show ipv6 ospf neighbor 
R1# show ipv6 ospf 
R1# show ipv6 ospf inteface 
R1# show ipv6 protocols 
R1# show ipv6 ospf interface brief 
R1# show ipv6 route ospf 
R1# show ipv6 ospf database
```

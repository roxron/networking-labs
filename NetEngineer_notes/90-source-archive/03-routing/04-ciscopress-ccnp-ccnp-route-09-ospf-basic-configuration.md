# 09 OSPF Basic Configuration

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/09 OSPF Basic Configuration`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
!
! On Router R1: 
interface loopback 1
ip address 1.1.1.1 255.255.255.255
router ospf 1
network 10.0.0.0 0.255.255.255 area 1
!
! On Router R2:
interface loopback 1
ip address 2.2.2.2 255.255.255.255
router ospf 2
network 10.1.12.2 0.0.0.0 area 1
network 10.1.0.0 0.0.255.255 area 0
!
! On Router R3: 
interface loopback 1
ip address 3.3.3.3 255.255.255.255
router ospf 3
network 10.1.0.0 0.0.255.255 area 0
network 192.168.3.3 0.0.0.0 area 0

Verify OSPF:
R1# show ip ospf interface brief 
R1# show ip protocols
R1# show ip ospf neighbors
R1# show ip ospf database
R1# show ip route ospf 
R1# show ip ospf 

LSDB Verification:
R1# show ip ospf database
R1# show ip ospf database router 1.1.1.1
R1# show ip ospf database network 10.10.34.4 
R1# show ip ospf database summary 10.10.99.0
```

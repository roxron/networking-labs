# 17 OSPFv3

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/17 OSPFv3`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Traditional Configuration:
!
ipv6 unicast-routing 
ipv6 cef
ipv6 router ospf 10
 router-id 1.1.1.1
 passive-interface Loopback0 
!
interface G0/0
 ipv6 ospf 10 area 0
!

Address-Family OSPF Configuration:
!
ipv6 unicast-routing
ipv6 cef
!
interface Loopback0
ip address 1.1.1.1 255.255.255.255
ipv6 address 2007::1111/64
ospfv3 1 ipv6 area 0
ospfv3 1 ipv4 area 0
!
interface FastEthernet0/0
ip address 10.1.1.1 255.255.255.0
ipv6 address 2001::1/64
ospfv3 1 ipv6 area 0
ospfv3 1 ipv4 area 0
!
router ospfv3 1
router-id 1.1.1.1
!
address-family ipv4 unicast
passive-interface FastEthernet0/0
passive-interface Loopback0
exit-address-family
!
address-family ipv6 unicast
passive-interface FastEthernet0/0
passive-interface Loopback0
maximum-paths 32

Verify OSPFv3:
show ip route ospfv3
show ospfv3 neighbor
show ospfv3 interface brief 
show ospfv3 database 


Statically Configuring a Neighbor on an NBMA Network:

R2# conf term
R2(config)# interface s 1/1
R2(config-if)# ipv6 ospf neighbor FE80::C804:DFF:FE24:0
R2(config-if)# end
R2# show ipv6 ospf neighbor
```

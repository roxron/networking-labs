# 03 OSPFv3

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/IPV6/03 OSPFv3`  
> Original source context: 01 CBTNUGGETS / IPV6. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# ipv6 unicast-routing 
R1(config)# ipv6 router ospf 1
R1(config-rtr)# router-id 1.1.1.1
R1(config-rtr)# exit
R1(config)# interface g0/0
R1(config-if)# ipv6 ospf 1 area 0

R1# show ipv6 ospf interface brief
R1# show ipv6 ospf neighbors
R1# show ipv6 ospf database

Configure Redistribution between OSPF and RIPng
R1(config)# ipv6 router ospf 1 
R1(config-rtr)# redistribute rip RIPNG metric 100 include-connected 

R1(config)# ipv6 router rip RIPNG 
R1(config-rtr)# redistribute ospf 1 include-connected metric 5
```

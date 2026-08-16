# 19 IPV6 AToM

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/IPV6/19 IPV6 AToM`  
> Original source context: 01 CBTNUGGETS / IPV6. Content is preserved as historical study material; validate commands against the target platform and release.

```text
IPv6 over AToM:
PE1(config)# interface G0/2
PE1(config-if)# xconnect 2.2.2.2 777 encapsulation mpls
PE1(config-if-xconn)# end
PE1#  
!
!
PE2(config)# interface G0/2
PE2(config-if)# xconnect 1.1.1.1 777 encapsulation mpls
PE2(config-if-xconn)# end
PE2# 
!
PE2# show mpls ldp neighbor 1.1.1.1
PE2# ping mpls pseudowire 1.1.1.1 777
PE2# show mpls l2transport vc detail 


CE11(config)# ipv6 unicast-routing 
CE11(config)# ipv6 router ospf 1
CE11(config-rtr)# router-id 11.11.11.11
CE11(config-rtr)# exit
CE11(config)# int g0/2
CE11(config-if)# mac-address 0000.cece.1111
CE11(config-if)# ipv6 address fe80::11 link-local 
CE11(config-if)# ipv6 address 2001:DB8:1122::11/64
CE11(config-if)# ipv6 ospf 1 area 0
CE11(config-if)# no shutdown 
!
!
CE22(config)# ipv6 unicast-routing 
CE22(config)# ipv6 router ospf 1
CE22(config-rtr)# router-id 22.22.22.22
CE22(config-rtr)# exit
CE22(config)# int g0/2
CE22(config-if)# mac-address 0000.cece.2222
CE22(config-if)# ipv6 address fe80::22 link-local 
CE22(config-if)# ipv6 address 2001:DB8:1122::22/64
CE22(config-if)# ipv6 ospf 1 area 0
CE22(config-if)# no shutdown
```

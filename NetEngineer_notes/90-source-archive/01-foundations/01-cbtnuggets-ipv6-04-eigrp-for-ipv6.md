# 04 EIGRP for IPv6

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/IPV6/04 EIGRP for IPv6`  
> Original source context: 01 CBTNUGGETS / IPV6. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# ipv6 unicast-routing 
R1(config)# ipv6 router eigrp 1 
R1(config-rtr)# eigrp router-id 1.1.1.1
R1(config-rtr)# no shutdown 
R1(config-rtr)# exit
R1(config)# interface G0/0
R1(config-if)# ipv6 eigrp 1
R1(config-if)# exit


R1# show ipv6 eigrp neighbor 
R1# show ipv6 eigrp topology 
R1# show ipv6 eigrp interfaces
R1# clear ipv6 eighrp neighors
```

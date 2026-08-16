# 07 EIGRP for IPV6

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/07 EIGRP for IPV6`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring EIGRP for IPv6:
R1(config)# ipv6 unicast-routing
R1(config)# ipv6 router eigrp 1
R1(config-rtr)# eigrp router-id 1.1.1.1
R1(config-rtr)# no shutdown 
R1(config-rtr)# exit
R1(config)# interface g0/0
R1(config-if)# ipv6 eigrp 1 
R1(config-if)# exit
R1(config)#

Verifying EIGRP for IPv6:
R1# show ipv6 route 
R1# show ipv6 route eigrp 
R1# show ipv6 eigrp neighbors
R1# show ipv6 eigrp interface 
R1# show ipv6 eigrp topology 
R1# show ipv6 protocols
```

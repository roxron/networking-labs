# 16 Redistribution  Route Map

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP ROUTE/16 Redistribution_ Route Map`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Route map with ACL:
R1(config)# access-list 5 permit 192.168.10.0 0.0.0.255
R1(config)# route-map rustem permit 10
R1(config-route-map)# match ip address 5 
R1(config-route-map)# set metric 1000
R1(config-route-map)# exit
R1(config)# router ospf 1 
R1(config-router)# redistribute rip route-map rustem subnets

R1#show route-map

Route map with Prefix List
R1(config)# ip profix-list rustem permit 192.168.0.0/16 ge 24
R1(config)# route-map rustem permit 10
R1(config-route-map)# match ip address prefix-list rustem
R1(config-route-map)# exit
R1(config)# router eigrp 1
R1(config-router)# redistribute ospf 1 route-map rustem
```

# 10 Redistribution Route Tagging

> Imported source note. Provenance: `NetEngineer_Journal/02 NETWORK LESSONS/CCNP/CCNP ROUTE/10 Redistribution Route Tagging`  
> Original source context: 02 NETWORK LESSONS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Redistribute from RIP to OSPF use this configurations:
R3(config)# route-map TAG_RIP permit 10
R3(config-route-map)# set tag 120
R3(config-route-map)# exit
R3(config)#router ospf 10 
R3(config-router)# redistribute rip subnets route-map TAG_RIP

Prevent RIP's routes in OSPF domain go back to RIP domain:

R4(config)# route-map TAG_RIP deny 10
R4(config-route-map)# match tag 120
R4(config-route-map)# route-map TAG_RIP permit 20
R4(config-route-map)# exit
R4(config)# router rip 
R4(config-router)# redistribute ospf 10 metric 3 route-map TAG_RIP
```

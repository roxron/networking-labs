# 11 Metric Redistribution Issues

> Imported source note. Provenance: `NetEngineer_Journal/02 NETWORK LESSONS/CCNP/CCNP ROUTE/11 Metric Redistribution Issues`  
> Original source context: 02 NETWORK LESSONS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Solutions to resolve Metric problems:

Method1: Redistribution Filtering

R2(config)# ip access-list standard NATIVE_ODPF_ROUTES
R2(config-std-nacl)# permit 192.168.25.0 0.0.0.255

R2(config)# route-map NATIVE_OSPF permit 10
R2(config-route-map)# match ip address NATIVE_OSPF_ROUTES
R2(config-route-map)# route-map NATIVE_OSPF deny 20

R2(config)# router rip 
R2(config-router)# redistribute ospf 1 metric 1 route-map NATIVE_OSPF




Method2: Redistribution Route Tagging

R2(config)# route-map RIP_TO_OSPF permit 10 
R2(config-route-map)# set tag 120

R2(config)# router ospf 10
R2(config-router)# redistribute rip subnets route-map RIP_TO_OSPF


R3(config)# route-map OSPF_TO_RIP deny 10
R3(config-route-map)# match tag 120
R3(config-route-map)# route-map OSPF_TO_RIP permit 20 

R3(config)# router rip
R3(config-router)# redistribute ospf 10 metric 1 route-map OSPF_TO_RIP

another way with Route tagging:


R2(config)# route-map TAGGING deny 10
R2(config-route-map)# match tag 120
R2(config-route-map)# exit
R2(config)# route-map TAGGING permit 20
R2(config-route-map)# set tag 120
R2(config-route-map)# exit
R2(config)# router rip 
R2(config-router)# redistribute ospf 10 metric 1 route-map TAGGING
R2(config-router)# router ospf 10
R2(config-router)# redistribute rip subnets route-map TAGGING



Method3: Redistribution Seed Metric
R3(config)# router rip 
R3(config-router)# redistribute ospf 10 metric 10



Method4: Offset-List
R2(config)# ip access-list standard DENY_LOW_METRIC
R2(config-std-nacl)# permit 172.16.0.0 0.0.0.255

R2(config)# router rip 
R2(config)# offset-list DENY_LOW_METRIC in 10 G0/2



Method5: Distribute-list Filtering
R2(config)# ip access-list standard BLOCK_FROM_R3_R4
R2(config-std-nacl)# deny 172.16.0.0 0.0.1.255
R2(config-std-nacl)# permit any

R2(config)# router rip
R2(config-router)# distribute-list BLOCK_FROM_R3_R4 in G0/1
R2(config-router)# distribute-list BLOCK_FROM_R3_R4 in G0/2



Method6: Administrative Distance

R2(config)# ip access-list standard PREVENT_ROUTES
R2(config-std-nacl)# permit 172.16.0.0 0.0.1.255

R2(config)# router rip 
R2(config-router)# distance 255 192.168.0.6 0.0.0.0 PREVENT_ROUTES
R2(config-router)# distance 255 192.168.0.10 0.0.0.0 PREVENT_ROUTES
```

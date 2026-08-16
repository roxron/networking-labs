# 20 Redistribution with Route-map

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/20 Redistribution with Route-map`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# ip prefix-list FILTER-SUBNETS deny 172.16.50.0/24
R1(config)# ip prefix-list FILTER-SUBNETS permit 0.0.0.0/0 le 32
R1(config)# route-map FILTER-SUBNETS permint 10
R1(config-route-map)# match ip address prefix FILTER-SUBNETS
R1(config-route-map)# exit
R1(config)# router eigrp 1
R1(config-router)# redistribute ospf 2 route-map FILTER-SUBNETS
R1#

Set metric with Route map:
!
route-map set-metric permit 30
match ip address prefix-list match-106-107
set metric 100 4444 255 1 1500
!
```

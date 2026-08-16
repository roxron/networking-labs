# 06 OSPF LSA type 3 Filtering

> Imported source note. Provenance: `NetEngineer_Journal/02 NETWORK LESSONS/CCNP/CCNP ROUTE/06 OSPF LSA type 3 Filtering`  
> Original source context: 02 NETWORK LESSONS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Do it on ABRs only!:

R1(config)# ip prefix-list TO_AREA2 deny 172.16.100.0/24
R1(config)# ip prefix-list TO_AREA2 permit 0.0.0.0/0 le 32
R1(config)# router ospf 10
R1(config-router)# area 2 filter-list prefix TO_AREA2 in 

R1# show ip ospf | begin Area 2
```

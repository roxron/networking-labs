# 18  EIGRP Redistribution with Default Metric Components

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/18  EIGRP Redistribution with Default Metric Components`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Method 1:
!
RD1# configure terminal
RD1(config)# router eigrp 1
RD1(config-router)# redistribute ospf 2
RD1(config-router)# deafult-metric 100000 100 255 1 1500
RD1(config-router)# end
!
!
Method 2:
RD1# configure terminal
RD1(config)# router eigrp 1
RD1(config-router)# redistribute ospf 2 metric 100000 100 255 1 1500
RD1(config-router)# end
!
!
Method 3:
RD1# configure terminal
RD1(config)# router eigrp 1
RD1(config-router)# redistribute ospf 2 route-map RDR
RD1(config)# route-map RDR permit 10
RD1(config)# set metric 10000 10 255 1 1500
!
!
!
Verifying EIGRP Redistribution
```

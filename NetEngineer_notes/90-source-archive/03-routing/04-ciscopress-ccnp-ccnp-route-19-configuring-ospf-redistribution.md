# 19 Configuring OSPF Redistribution

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/19 Configuring OSPF Redistribution`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Redistributing into OSPF as E2 Routes:
!
RD1# configure terminal
RD1(config)# router ospf 2
RD1(config-router)# redistribute eigrp 1 subnets
RD1(config-router)# end
RD1#
!
!
Redistributing into OSPF as E1 Routes:
!
RD1# conf t
RD1(config)# router ospf 2
RD1(config-router)# redistribute eigrp 1 subnets metric-type 1
RD1(config-router)# end
RD1#


Veryfing OSPF Redistribution:
RD1# show ip ospf database | begin ASB
RD1# show ip ospf database asbr-summary 
RD2# show ip ospf border-routers
```

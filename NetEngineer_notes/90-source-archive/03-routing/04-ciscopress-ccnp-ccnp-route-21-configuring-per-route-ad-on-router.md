# 21 Configuring Per-Route AD on Router

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/21 Configuring Per-Route AD on Router`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
RD2# conf t
RD2(config)# router ospf 2
RD2(config-router)# distance 171 1.1.1.1 0.0.0.0 match-172-20
RD2(config-router)# ip access-list standard match-172-20
RD2(config-std-nacl)# permit host 172.20.0.0
RD2(config-std-nacl)# end
RD2#

D2# show ip protocols | section ospf
RD2# show ip route 172.20.0.0
```

# 01 EIGRP Static Neighbors

> Imported source note. Provenance: `NetEngineer_Journal/02 NETWORK LESSONS/CCNP/CCNP ROUTE/01 EIGRP Static Neighbors`  
> Original source context: 02 NETWORK LESSONS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# router eigrp 10
R1(config-router)# network 192.168.10.0 0.0.0.3
R1(config-router)# neighbor 192.168.10.2 F0/0
```

# 08 Redistribution Between RIP and EIGRP

> Imported source note. Provenance: `NetEngineer_Journal/02 NETWORK LESSONS/CCNP/CCNP ROUTE/08 Redistribution Between RIP and EIGRP`  
> Original source context: 02 NETWORK LESSONS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure Routing:
R1(config)# router eigrp 10
R1(config-router)# no auto-summary 
R1(config-router)# network 192.168.10.0 0.0.0.255 
R1(config-router)# network 10.0.0.0 0.0.0.3 

R2(config)# router eigrp 10
R2(config-router)# no auto-summary 
R2(config-router)# network 10.0.0.0 0.0.0.3

R2(config)# router rip 
R2(config-router)# verion 2
R2(config-router)# no auto-summary 
R2(config-router)# network 10.0.1.0 

R3(config)# router rip 
R3(config-router)# verion 2 
R3(config-router)# no auto-summary 
R3(config-router)# network 10.0.1.0 
R3(config-router)# network 172.16.10.0


Configure Redistribution:
R2(config)# router eigrp 10
R2(config-router)# redistribute rip metric 1544 100 255 1 1500
R2(config-router)# exit
R2(config)# router rip 
R2(config-router)# redistribute eigrp 10 metric 10
```

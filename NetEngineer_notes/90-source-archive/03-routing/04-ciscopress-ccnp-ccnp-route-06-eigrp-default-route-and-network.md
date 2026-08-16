# 06 EIGRP Default Route  and Network

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/06 EIGRP Default Route  and Network`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring EIGRP Default Route:
I1(config)# ip route 0.0.0.0 0.0.0.0 50.0.0.1 
I1(config)# router eigrp 1
I1(config-router)# network 0.0.0.0 
!
or
!
I1(config-router)# redistribute static 


Configuring a Default Network:
!
I1(config)# interface loopback 8
I1(config-if)# ip address 192.31.7.1 255.255.255.0
I1(config-if)# router eigrp 1
I1(config-router)# network 192.31.7.0
I1(config-router)# exit
I1(config)# ip default-network 192.31.7.0
```

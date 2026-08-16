# 20A Redistribution Filtering with the distribute-list Command

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/20A Redistribution Filtering with the distribute-list Command`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Redistribute into EIGRP:
RD1(config)# access-list 10 deny 192.168.10.0 0.0.0.255
RD1(config)# access-list 10 deny 192.168.20.0 0.0.0.255
RD1(config)# access-list 10 permit any 
RD1(config)# router eigrp 10
RD1(config-router)# distribute-list 10 out ospf 2



Redistribute into OSPF:
RD1(config)# ip prefix-list BAD_ROUTES seq 5 deny 172.16.0.0/16 ge 25 le 32
RD1(config)# ip prefix-list BAD_ROUTES seq 10 permit 0.0.0.0/0 le 32
RD1(config)# router ospf 10
RD1(config-router)# distribute-list prefix BAD_ROUTES out eigrp 1
```

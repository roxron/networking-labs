# 03 EIGRP Summarization

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP ROUTE/03 EIGRP Summarization`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
BB(config)# inteface S0/0 
BB(config-if)# ip summary-address eigrp 1 172.16.0.0 255.255.240.0 
BB(config-if)# exit
BB(config)# router eigrp 1
BB(config-router)# summary-metric 192.168.0.0 255.255.254.0 500000 10 255 1 1500
```

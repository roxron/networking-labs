# 04 EIGRP Security

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP ROUTE/04 EIGRP Security`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# key chain rustem 
R1(config-keychain)# key 1
R1(config-keychain-key)# key-string ciscoccnp
R1(config-keychain-key)# end
R1(config)# interface S0/0
R1(config-if)# ip authentication mode eigrp 1 md5
R1(config-if)# ip authentication key-chain eigrp 1 rustem
R1(config-if)#
```

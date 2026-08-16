# 18 PPPoE Configuration

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP ROUTE/18 PPPoE Configuration`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R2(config)# vpdn enable 
R2(config)# vpdn group MYGROUP request dialout pppoe
R2(config)# vpdn group MYGROUP ppp authentication chap
R2(config)# vpdn group MYGROUP localname rustem 
R2(config)# vpdn username rustem password cisco1234 store-local 
R2(config)# interface F0/0
R2(config-if)# ip address pppoe setroute  
R2(config-if)# pppoe client vpdn group MYGROUP
```

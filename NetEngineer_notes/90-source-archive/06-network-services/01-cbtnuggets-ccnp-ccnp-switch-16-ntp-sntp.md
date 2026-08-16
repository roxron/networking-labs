# 16 NTP+SNTP

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP SWITCH/16 NTP+SNTP`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# clock timezone NYC -5 
R1(config)# clock summer-time NYC recurring 
R1(config)# ntp server pool.ntp.org
R1(config)# ntp authentication-key 100 md5 !@UI#Uhjkhda
R1(config)# ntp authenticate

R1# show ntp associations
R1# show ntp status
```

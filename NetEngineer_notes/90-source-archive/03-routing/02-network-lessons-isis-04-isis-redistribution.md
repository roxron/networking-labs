# 04 IS-IS Redistribution

> Imported source note. Provenance: `NetEngineer_Journal/02 NETWORK LESSONS/IS-IS/04 IS-IS Redistribution`  
> Original source context: 02 NETWORK LESSONS / IS-IS. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Redistribute EIGRP to ISIS:
R2(config)# router isis 
R2(config-router)# redistribute eigrp 10 level-1

Redistribute ISIS to EIGRP:
R2(config)# router eigp 10
R2(config-router)# redistribute isis level-1 metric 100000 255 1 1 1500
```

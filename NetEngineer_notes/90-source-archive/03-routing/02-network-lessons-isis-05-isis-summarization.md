# 05 IS-IS Summarization

> Imported source note. Provenance: `NetEngineer_Journal/02 NETWORK LESSONS/IS-IS/05 IS-IS Summarization`  
> Original source context: 02 NETWORK LESSONS / IS-IS. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Border Summarization:
R2(config)# router isis
R2(config-router)# summary-address 172.16.0.0 255.255.0.0

Redistribution Summarization:
R1(config)# route-map L1_ONLY
R1(config-route-map)# match interface Loopback 1

R1(config)# router isis 
R1(config-router)# redistribute connected route-map L1_ONLY level-1
R1(config-router)# summary-address 11.0.0.0 255.0.0.0 level-1
```

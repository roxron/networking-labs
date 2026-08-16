# 01 Configure AS-SET with Aggregation

> Imported source note. Provenance: `NetEngineer_Journal/Extra/BGP/01 Configure AS-SET with Aggregation`  
> Original source context: Extra / BGP. Content is preserved as historical study material; validate commands against the target platform and release.

```text
!
R1(config)# router bgp 500
R1(config-router)# aggregate-address 172.16.0.0 255.255.0.0 summary-only as-set
```

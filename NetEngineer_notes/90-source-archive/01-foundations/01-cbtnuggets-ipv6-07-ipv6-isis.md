# 07 IPV6 IS-IS

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/IPV6/07 IPV6 IS-IS`  
> Original source context: 01 CBTNUGGETS / IPV6. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# router isis
R1(config-router)# metric-style wide 
R1(config-router)# net 49.0000.0000.0000.0001.00
R1(config-router)# exit
R1(config)# interface G0/0
R1(config-if)# ipv6 router isis
R1(config-if)# interface G0/1
R1(config-if)# ipv6 router isis

R1# show isis neighbors
R1# show clns neighbors
R1# show isis protocols 
R1# show isis database
R1# clear isis *

R1(config)# interface g0/1
R1(config-if)# isis circuit-type level-1
```

# 09 IPV6 GLBP

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/IPV6/09 IPV6 GLBP`  
> Original source context: 01 CBTNUGGETS / IPV6. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# interface G0/0
R1(config-if)# glbp 1 ipv6 fe80::100 
R1(config-if)# glbp 1 priority 122
R1(config-if)# 

R2(config)# interface G0/0
R2(config-if)# glbp 1 ipv6 fe80::100 
R2(config-if)# glbp 1 priority 115
R2(config-if)# 

R3(config)# interface G0/0
R3(config-if)# glbp 1 ipv6 fe80::100 
R3(config-if)# glbp 1 priority 105
R3(config-if)# 

R1# show glbp brief
R1# show glbp 
R1# debug glbp terse
```

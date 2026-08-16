# 19 BGP Route Dampening

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/BGP/19 BGP Route Dampening`  
> Original source context: 01 CBTNUGGETS / BGP. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(Config)# bgp router 500
R1(config-router)# bgp dampening 15 1000 4000 255 

R1# clear ip bgp dampening 150.0.1.0 255.255.255.0
R1# clear ip bgp 1.1.1.1 flap-statistics

R1# show ip bgp dampening dampened-paths 
R1# show ip bgp dampening flap-statistics
```

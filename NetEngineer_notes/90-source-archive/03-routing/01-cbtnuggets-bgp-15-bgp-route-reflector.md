# 15 BGP Route Reflector

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/BGP/15 BGP Route Reflector`  
> Original source context: 01 CBTNUGGETS / BGP. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# router bgp 500
R1(config-router)# neighbor 5.5.5.5 route-reflector-client 
R1(config-router)# neighbor 4.4.4.4 route-reflector-client 

Configure RR Cluster:
R1(config)# router bgp 500
R1(config-router)# bgp cluster-id 10 
R1(config-router)#
```

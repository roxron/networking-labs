# 05 BGP Using Router map

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/BGP/05 BGP Using Router map`  
> Original source context: 01 CBTNUGGETS / BGP. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# access-lst 10 permit 200.0.10.0 0.0.0.255
R1(config)# route-map ISP1 permit 10
R1(config-route-map)# match ip address 10 
R1(config-route-map)# set origin incomplete 
R1(config-route-map)# exit 
R1(config)# router bgp 300
R1(config-router)# neighbor 60.0.0.1 route-map ISP1 out
```

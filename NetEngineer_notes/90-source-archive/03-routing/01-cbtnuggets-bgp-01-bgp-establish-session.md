# 01 BGP Establish Session

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/BGP/01 BGP Establish Session`  
> Original source context: 01 CBTNUGGETS / BGP. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# router bgp 100
R1(config-router)# neighbor 50.0.0.2 remote-as 200
R1(config-router)# network 50.0.1.0 mask 255.255.255.0
R1(config-router)# neighbor 50.0.0.2 ebgp-multihop 2

R2(config)# router bgp 200 
R2(config-router)# neighbor 50.0.0.1 remote-as 100
R2(config-router)# network 60.0.1.0 mask 255.255.255.0
R2(config-router)# neighbor 50.0.0.1 ebgp-multihop 2



R1# show ip bgp summary 
R1# show ip bgp 
R1# show ip bgp neighbors 192.168.12.1 received-routes
R1# show ip bgp neighbors 192.168.12.2 advertised-routes
```

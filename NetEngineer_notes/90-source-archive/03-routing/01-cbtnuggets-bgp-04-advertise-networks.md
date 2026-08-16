# 04 Advertise Networks

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/BGP/04 Advertise Networks`  
> Original source context: 01 CBTNUGGETS / BGP. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Advertise public prefixes via Distribution list:
R1(config)# access-lsit 60 permit 200.1.1.0 0.0.0.255 
R1(config)# access-list 60 permit 150.1.1.0 0.0.0.255
R1(config)# router bgp 300
R1(config-router)# distribute-list 60 out connected 
R1(config-router)# redistribute connected

Change origin of BGP routes:
R1(config)# access-list 10 permit any
R1(config)# route-map CHANGE_ORIGIN permit 10
R1(config-route-map)# match ip address 10
R1(config-route-map)# set origin igp 

R1(config)# router bgp 300
R1(config-router)# redistribute connected route-map CHANGE_ORIGIN

Summary route with BGP:
R1(config)# router bgp 300
R1(config-router)# aggregate-address 10.1.0.0 255.255.0.0 summary-only

Advertise prefixes with static route:
R1(config)# ip route 10.1.0.0 255.255.0.0 null0
R1(config)# router bgp 300
R1(confog-router)# network 10.1.0.0 mask 255.255.0.0
```

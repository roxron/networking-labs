# 11 Prefix Lists

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/BGP/11 Prefix Lists`  
> Original source context: 01 CBTNUGGETS / BGP. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Default Route only:
R1(config)# ip prefix-list RM permit 0.0.0.0/0

Permit ANY:
R1(config)# ip prefix-list RM permit 0.0.0.0/0 le 32

All Hosts routes:
R1(config)# ip prefix-list RM permit 0.0.0.0/0 ge 32

Permit any Class A networks with mask greater than /24:
R1(config)# ip prefix-list RM permint 0.0.0.0/1 ge 24

Permit any Class B networks with mask greater than /20:
R1(config)# ip prefix-list RM permit 128.0.0.0/2 ge 20


BGP example of prefix-list:
R1(config)# ip prefix-list ISP2_ROUTES seq 10 permit 10.0.0.0/16 le 24
R1(config)# router bgp 500
R1(config-router)# neighbor 5.5.5.5 prefix-list ISP2_ROUTES in


R1(config)# ip prefix-list RM seq 10 permit 172.20.0.0/16 le 24 
R1(config)# route-map ISP1 permit 10
R1(config-route-map)# match ip address prefix-list RM 
R1(config-route-map)# set local-preference 1000 
R1(config-route-map)# exit
R1(config)# router bgp 500
R1(config-router)# neighbor 1.1.1.1 route-map ISP1 in
```

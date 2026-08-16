# 06 BGP for IPv6

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/IPV6/06 BGP for IPv6`  
> Original source context: 01 CBTNUGGETS / IPV6. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# router bgp 1000
R1(config-router)# bgp router-id 1.1.1.1 
R1(config-router)# neighbor 2001:DB8:AAAA:12::2 remote-as 2000
R1(config-router)# neighbor 2001:DB8:AAAA:19::2 remote-as 4000
R1(config-router)# address-family ipv6 
R1(config-router-af)# neighbor 2001:DB8:AAAA:12::2 activate 
R1(config-router-af)# neighbor 2001:DB8:AAAA:19::2 activate
R1(config-router-af)# exit
R1(config-router)# exit
R1(config)# ipv6 route 2001:DB8:AAAA::/48 null0
R1(config)# router bgp 1000
R1(config-router)# address-family ipv6
R1(config-router-af)# redistribute static

R1# show bgp ipv6 unicast 


R2(config)# router bgp 2000
R2(config-router)# bgp router-id 2.2.2.2
R2(config-router)# neighbor 2001:DB8:BBBB:3333::3 remote-as 2000
R2(config-router)# neighbor 2001:DB8:BBBB:3333::3 update-source Loopback0
R2(config-router)# neighbor 2001:DB8:BBBB:3333::3 next-hop-self
R2(config-router)# neighbor 2001:DB8:AAAA:12::1 remote-as 1000
R2(config-router)# address-family ipv6
R2(config-router-af)# neighbor 2001:DB8:BBBB:3333::3 activate
R2(config-router-af)# neighbor 2001:DB8:BBBB:3333::3 next-hop-self
R2(config-router-af)# neighbor 2001:DB8:AAAA:12::1 activate
R2(config-router-af)# exit
R2(config-router)# exit
R2(config)# ipv6 route 2001:DB8:BBBB::/48 null0
R2(config)# bgp router 2000
R2(config-router)# address-family ipv6
R2(config-router-af)# redistribute static

R2# show bgp all neighbors


Configure R3 as Route Reflector
R3(config)# router bgp 2000
R3(config-router)# bgp router-id 3.3.3.3
R3(config-router)# neighbor 2001:DB8:BBBB:2222::2 remote-as 2000
R3(config-router)# neighbor 2001:DB8:BBBB:2222::2 update-source Loopback0
R3(config-router)# neighbor 2001:DB8:BBBB:2222::2 route-reflector-client
R3(config-router)# neighbor 2001:DB8:BBBB:4444::2 remote-as 2000
R3(config-router)# neighbor 2001:DB8:BBBB:4444::2 update-source Loopback0
R3(config-router)# neighbor 2001:DB8:BBBB:4444::2 route-reflector-client
R3(config-router)# neighbor 2001:DB8:BBBB:5555::2 remote-as 2000
R3(config-router)# neighbor 2001:DB8:BBBB:5555::2 update-source Loopback0
R3(config-router)# neighbor 2001:DB8:BBBB:5555::2 route-reflector-client
R3(config-router)# address-family ipv6
R3(config-router-af)# redistribute static 
R3(config-router-af)# neighbor 2001:DB8:BBBB:2222::2 activate 
R3(config-router-af)# neighbor 2001:DB8:BBBB:2222::2 route-reflector-client
R3(config-router-af)# neighbor 2001:DB8:BBBB:4444::2 activate 
R3(config-router-af)# neighbor 2001:DB8:BBBB:4444::2 route-reflector-client
R3(config-router-af)# neighbor 2001:DB8:BBBB:5555::2 activate 
R3(config-router-af)# neighbor 2001:DB8:BBBB:5555::2 route-reflector-client


R3# show bgp ipv6 unicast 
R3# show bgp ipv6 unicast summary 
R3# show bgp ipv6 unicast neighbors
```

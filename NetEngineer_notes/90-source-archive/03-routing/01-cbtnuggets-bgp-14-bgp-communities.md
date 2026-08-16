# 14 BGP Communities

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/BGP/14 BGP Communities`  
> Original source context: 01 CBTNUGGETS / BGP. Content is preserved as historical study material; validate commands against the target platform and release.

```text
ISP1(config)# ip bgp-community new-format 
ISP1(config)# route-map C_CUST permit 10 
ISP1(config-route-map)# match community 1 
ISP1(config-route-map)# set local-preference 20
ISP1(config-route-map)# match community 2 
ISP1(config-route-map)# set as-path prepand last-as 1
ISP1(config)# ip community-list 1 permit 100:10
ISP1(config)# ip community-list 2 permit 100:20
ISP1(config)# router bgp 100
ISP1(config-router)# neighbor 50.0.0.2 route-map C_CUST in 


R1(config)# ip bgp-community new-format 
R1(config)# ip access-list standard CUSTOMER_ROUTES
R1(config-std-nacl)# permit 150.0.0.0 0.0.0.255
R1(config-std-nacl)# permit 150.0.1.0 0.0.0.255
R1(config-std-nacl)# exit
R1(config)# route-map SET_COMMUNITY permit 10
R1(config-route-map)# match ip address CUSTOMER_ROUTES
R1(config-route-map)# set community 200:10 200:20 
R1(config-route-map)# exit
R1(config)# router bgp 500
R1(config-router)# neighbor 50.0.0.1 send-community
R1(config-router)# neighbor 50.0.0.1 route-map SET_COMMUNITY out 

Verify Communities:
ISP1# show ip bgp community no-export 
ISP1# show ip bgp 150.0.1.0
```

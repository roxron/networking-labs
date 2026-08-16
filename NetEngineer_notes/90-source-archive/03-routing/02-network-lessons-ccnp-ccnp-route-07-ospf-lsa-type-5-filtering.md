# 07 OSPF LSA type 5 Filtering

> Imported source note. Provenance: `NetEngineer_Journal/02 NETWORK LESSONS/CCNP/CCNP ROUTE/07 OSPF LSA type 5 Filtering`  
> Original source context: 02 NETWORK LESSONS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Method1:
Distribute-list Filtering:

R1(config)# ip access-list standard NO_192.168.3
R1(config-std-nacl)# deny 192.168.3.0 0.0.0.255
R1(config-std-nacl)# permit any

R1(config)# router ospf 10
R1(config-router)# distribute-list NO_192.168.3 out

Method2:
Route-Map:

R1(config)# access-list 10 permit 192.168.3.0 0.0.0.255
R1(config)# route-map FILTER_TYPE5 deny 10 
R1(config-route-map)# match ip address 10 
R1(config-route-map)# exit
R1(config)# route-map FILTER_TYPE5 permit 20 

R1(config)# router ospf 10 
R1(config-router)# redistribute connected subnets route-map FILTER_TYPE5 


Method3:
Summary No-Advertise 

R1(config)# router ospf 10 
R1(config-router)# summary-address 192.168.3.0 255.255.255.0 not-advertise
```

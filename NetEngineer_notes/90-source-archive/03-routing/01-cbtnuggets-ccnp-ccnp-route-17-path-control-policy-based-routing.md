# 17 Path Control  Policy-Based Routing

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP ROUTE/17 Path Control_ Policy-Based Routing`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# ip access-list extended CLIENT1
R1(config-ext-nacl)# permit tcp host 192.168.0.11 any eq 80
R1(config-ext-nacl)# permit tcp host 192.168.0.11 any eq 443
R1(config-ext-nacl)# deny ip host 192.168.0.11 any 
R1(config-ext-nacl)# exit
R1(config)# ip access-list extended CLIENT2 
R1(config-ext-nacl)# permit tcp host 192.168.0.12 any eq 80
R1(config-ext-nacl)# permit tcp host 192.168.0.12 any eq 443
R1(config-ext-nacl)# deny ip host 192.168.0.12 any 
R1(config-ext-nacl)# exit
R1(config)# route-map CORP_POLICY permit 10
R1(config-route-map)# match ip address CLIENT1
R1(config-route-map)# set ip next-hop 50.0.0.13
R1(config-route-map)# route-map CORP_POLICY permit 20
R1(config-route-map)# match ip address CLIENT2
R1(config-route-map)# set ip next-hop 50.0.0.17
R1(config-route-map)# exit
R1(config)# interface F0/0
R1(config-if)# ip policy route-map CORP_POLICY
```

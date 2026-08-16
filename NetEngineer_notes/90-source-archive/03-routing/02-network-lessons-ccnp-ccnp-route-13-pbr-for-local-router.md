# 13 PBR for Local Router

> Imported source note. Provenance: `NetEngineer_Journal/02 NETWORK LESSONS/CCNP/CCNP ROUTE/13 PBR for Local Router`  
> Original source context: 02 NETWORK LESSONS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# ip access-list extended ICMP_R1 
R1(config-ext-nacl)# permit icmp host 192.168.0.1 host 172.16.100.1

R1(config)# route-map PBR_R1 permit 10 
R1(config-route-map)# match ip address ICMP_R1
R1(config-route-map)# set ip next-hop 192.168.1.2 

R1(config)# ip local policy route-map PBR_R1
```

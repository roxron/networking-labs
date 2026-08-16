# 06 EIGRP FR Multipoint

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP ROUTE/06 EIGRP FR Multipoint`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
HQ(config)# interface S0/0
HQ(config-if)# encapsulation frame-relay
HQ(config-if)# exit
HQ(config)# interface s0/0.100 multipoint 
HQ(config-subif)# ip address 10.200.0.1 255.255.255.0
HQ(config-subif)# frame-relay map ip 10.200.0.2 101 broadcast
HQ(config-subif)# frame-relay map ip 10.200.0.3 102 broadcast

R1(config)# interface S0/0
R1(config-if)# encapsulation frame-relay
R1(config-if)# no shutdown
R1(config-if)# exit
R1(config)# interface s0/0.201 multipoint 
R1(config-subif)# ip address 10.200.0.2 255.255.255.0
R1(config-subif)# frame-relay map ip 10.200.0.1 201 broadcast
R1(config-subif)# frame-relay map ip 10.200.0.3 201 broadcast

R2(config)# interface S0/0 
R2(config-if)# encapsulation frame-relay 
R2(config-if)# no shutdown 
R2(config-if)# exit
R2(config)# interface s0/0.201 multipoint 
R2(config-subif)# ip address 10.200.0.3 255.255.255.0
R2(config-subif)# frame-relay map ip 10.200.0.1 202 broadcast 
R2(config-subif)# frame-relay map ip 10.200.0.2 202 broadcast
```

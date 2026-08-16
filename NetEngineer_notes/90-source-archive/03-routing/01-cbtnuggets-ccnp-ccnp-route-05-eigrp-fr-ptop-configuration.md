# 05 EIGRP FR PtoP Configuration

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP ROUTE/05 EIGRP FR PtoP Configuration`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
HQ(config)# interface S0/0
HQ(config-if)# encapsulation frame-relay 
HQ(config-if)# exit
HQ(config)# interface s0/0.101 point-to-point
HQ(config-subif)# ip address 10.1.1.1 255.255.255.252
HQ(config-subif)# frame-relay interface-dlci 102
HQ(config-fr-dlci)# exit
HQ(config)# interface s0/0.103 point-to-point 
HQ(config-subif)# ip address 10.1.2.1 255.255.255.252
HQ(config-subif)# frame-relay interface-dlci 103
HQ(config-fr-dlci)# exit

R1(config)# interface S0/0
R1(config-if)# encapsulation frame-relay 
R1(config-if)# exit
R1(config)# interface s0/0.301 point-to-point 
R1(config-subif)# ip address 10.1.1.2 255.255.255.252
R1(config-subif)# frame-relay interface-dlci 301
R1(config-fr-dlci)# exit

R2(config)# interface S0/0 
R2(config-if)# encapsulation frame-relay 
R2(config-if)# exit
R2(config)# interace s0/0.302 point-to-point
R2(config-subif)# ip address 10.1.2.2 255.255.255.252
R2(config-subif)# frame-relay interface-dlci 302
R2(config-fr-dlci)# exit
```

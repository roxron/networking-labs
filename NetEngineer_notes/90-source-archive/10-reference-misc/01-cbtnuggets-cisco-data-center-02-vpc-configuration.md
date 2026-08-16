# 02 VPC Configuration

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/Cisco DATA CENTER/02 VPC Configuration`  
> Original source context: 01 CBTNUGGETS / Cisco DATA CENTER. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Enable VPC:
NX1(config)# feature vpc
NX1(config)# vpc domain 10 
NX1(config-vpc-domain)# 

NX1# show vpc role


Configure VPC Keepalive peer:
NX1(config)# vpc domain 10 
NX1(config-vpc-domain)# peer-keepalive destination 192.168.1.2 source 192.168.1.1 vrf VPC-KEEPALIVE

NX1# show vpc peer-keepalive


Configure VPC peer-link:
NX1(config)# interface port-channel 10 
NX1(config-if)# switchport mode trunk 
NX1(config-if)# switchport trunk allowed vlan 100-110
NX1(config-if)# switchport trunk native vlan 100
NX1(config-if)# vpc peer-link 
NX1(config-if)# spaning-tree port type network 
NX1(config-if)# 


Configure VPC ports:
NX1(config)# interface e2/4-5 
NX1(config-if-range)# channel-group 2 mode active 
NX1(config-if-range)# interface port-channel 2 
NX1(config-if)# switchport mode trunk 
NX1(config-if)# vpc 10 

Optinal Optimization: 
NX1(config)# vpc domain 10 
NX1(config-vpc-domai)# peer-gateway 
NX1(config-vpc-domai)# peer-switch 

Verify:
show vpc brief
```

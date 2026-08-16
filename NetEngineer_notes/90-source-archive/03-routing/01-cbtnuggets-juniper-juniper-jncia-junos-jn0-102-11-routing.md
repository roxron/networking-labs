# 11 Routing

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIA-Junos JN0-102/11 Routing`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIA-Junos JN0-102. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Routing tables:
inet.0  IPv4 Unicast 
inet.1  IPv4 Multicast 
inet.2  Multicast BGP
inet 3  MPLS 
inet.4  MSDP 
inet.6.0 IPv6 Unicast 
mpls.0  MPLS Next Hops
_____________________________________________________________
Routing source preference:
Direct                 0
OSPF Internal          10
IS-IS Level1 Internal  15
RIP                    100
OSPF AS external       150
BGP internal & External 170 
_____________________________________________________________
root> show route 
root> show route brief 
root> show route detail 
root> show route protocol static 
root> show route protocol ospf 
root> show route instance 

root> configure 
root# edit routing-instances MYTEST 
root# set instance-type vrf
Configure static routes:
root> configure 
root# edit routing-options
root# set static route 0.0.0.0/0 next-hop 10.10.10.2

Configure OSPF::
root> configure 
root# edit protocols ospf
root# set area 0 interface em0
root# commit and-quit 
root>
root> show ospf neighbor
```

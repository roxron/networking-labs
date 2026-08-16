# 16 Multicast Routing

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/IPV6/16 Multicast Routing`  
> Original source context: 01 CBTNUGGETS / IPV6. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure Multicast Routing:
R1(config)# ipv6 multicast-routing 
R1(config)# ipv6 pim rp-address 2001:DB8:2222::2
R1(config)#

R2(config)# ipv6 multicas-routing 
R2(config)# ipv6 pim rp-address 2001:DB8:2222::2 
R2(config)#

R3(config)# ipv6 multicas-routing 
R3(config)# ipv6 pim rp-address 2001:DB8:2222::2
R3(config)# interface G0/2
R3(config-if)# ipv6 mld join-group ff08::6783

R4(config)# ipv6 multicas-routing 
R4(config)# ipv6 pim rp-address 2001:DB8:2222::2 
R4(config)#

R1# show ipv6 pim interface 
R1# show ipv6 mld interface
R1# show ipv6 pim tunnel | section Tunnel1|Tunnel2
R1# show ipv6 pim group-map ff00::/8
R1# show ipv6 mld groups 
R1# show ipv6 mroute
R1# ping ff08::6783
```

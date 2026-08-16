# 05 IPv6 Summarization

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/IPV6/05 IPv6 Summarization`  
> Original source context: 01 CBTNUGGETS / IPV6. Content is preserved as historical study material; validate commands against the target platform and release.

```text
For EIGPR:
R1(config)# interface g0/0 
R1(config-if)# ipv6 summary-address eighrp 1 2001:db8:1000:45a::/63

For OSPF: 
R1(config)# ipv6 router ospf 1 
R1(config-rtr)# area 1 range 2001:DB8:1000:A000::/56
```

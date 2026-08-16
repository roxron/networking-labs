# 13 BGP ORF

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/BGP/13 BGP ORF`  
> Original source context: 01 CBTNUGGETS / BGP. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Outbound Route Filtering:
On ISP site:
ISP1(config)# router bgp 500
ISP1(config-router)# neighbor 1.1.1.1 capability orf prefix-list receive

on Customer site:
R1# clear ip bgp 2.2.2.2 in prefix-filter
```

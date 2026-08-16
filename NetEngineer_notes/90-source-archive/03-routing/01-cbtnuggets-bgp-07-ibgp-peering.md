# 07 iBGP peering

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/BGP/07 iBGP peering`  
> Original source context: 01 CBTNUGGETS / BGP. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# router bgp 500
R1(config-router)# neighbor 2.2.2.2 remote-as 500
R1(config-router)# neighbor 2.2.2.2 update-source lo0
R1(config-router)# no synchronization
```

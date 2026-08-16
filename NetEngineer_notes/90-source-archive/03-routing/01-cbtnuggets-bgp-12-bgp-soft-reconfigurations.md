# 12 BGP Soft Reconfigurations

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/BGP/12 BGP Soft Reconfigurations`  
> Original source context: 01 CBTNUGGETS / BGP. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Soft Reconfiguration:
R1# clear ip bgp 2.2.2.2 soft out 
R1# clear ip bgp 2.2.2.2 soft in

R1(config)# router bgp 200
R1(config-router)# neighbor 2.2.2.2 soft-reconfiguration inbound

Route Refresh:
R1# clear ip bgp 2.2.2.2 soft in
```

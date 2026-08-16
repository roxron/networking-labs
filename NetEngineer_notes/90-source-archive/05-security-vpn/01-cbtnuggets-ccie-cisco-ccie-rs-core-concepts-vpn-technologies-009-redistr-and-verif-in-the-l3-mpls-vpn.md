# 009 Redistr and Verif in the L3 MPLS VPN

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS Core Concepts - VPN Technologies/009 Redistr and Verif in the L3 MPLS VPN`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS Core Concepts - VPN Technologies. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Redistribute OSPF CE routes ing to MBGP VPN4:
!
PE1(config)# router bgp 65536  
PE1(config-router)# address-family ipv4 vrf 101:ACME 
PE1(config-router)# redistribute ospf 101 vrf 101:ACME 
!
Redistribute BGP VPN4 routes in to CE OSPF:
!
PE1(config)# router ospf vrf 101:ACME
PE1(config-router)# redistribute bgp 65536 subnets
```

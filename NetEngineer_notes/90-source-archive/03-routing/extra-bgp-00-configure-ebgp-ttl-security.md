# 00 Configure eBGP TTL Security

> Imported source note. Provenance: `NetEngineer_Journal/Extra/BGP/00 Configure eBGP TTL Security`  
> Original source context: Extra / BGP. Content is preserved as historical study material; validate commands against the target platform and release.

```text
!
R1(config)# router bgp 500
R1(config-router)# neighbor 192.168.1.2 ttl-security hop 2
```

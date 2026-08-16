# 02 LDP Router-ID and Transport Addrs

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/MPLS/02 LDP Router-ID and Transport Addrs`  
> Original source context: 01 CBTNUGGETS / MPLS. Content is preserved as historical study material; validate commands against the target platform and release.

```text
See LDP Router ID:
R3# show mpls ldp discovery detail

Change LDP router-ID:
R3(config)# mpls ldp router-id g0/0 force

Configure Transport address:
R3(config)# int g0/0
R3(config-if)# mpls ldp discovery transport-address interface
```

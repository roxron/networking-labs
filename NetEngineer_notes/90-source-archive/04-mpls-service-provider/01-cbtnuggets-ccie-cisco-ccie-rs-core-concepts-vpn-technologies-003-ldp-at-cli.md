# 003 LDP at CLI

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS Core Concepts - VPN Technologies/003 LDP at CLI`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS Core Concepts - VPN Technologies. Content is preserved as historical study material; validate commands against the target platform and release.

```text
P2# show mpls ldp neighbors 
P2# show mpls interfaces 
P2# show mpls ldp bindings local 
P2# show mpls ldp bindings 192.168.0.3 32
P2# 
!
P2(config)# access-list 1 permit host 192.168.0.3 
P2(config)# end
P2# debug mpls ldp bindings prefix-acl 1 
!
P2# show mpls ldp discovery detail
```

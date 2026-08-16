# 005 Other Basic OSPF Configs

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIS-ENT (JN0-343) - OSPF/005 Other Basic OSPF Configs`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIS-ENT (JN0-343) - OSPF. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Interface Types:
!
root> edit 
root# set protocols ospf area 1 interface ge-0/0/2.0 interface-type p2p 
root# commit and-quit 
!
root> show ospf neighbor 
root> show ospf interface 
!
!
Metric: 
!
root> edit 
root# set protocol ospf reference-bandwidth 1000 
!
root# set protocol ospf area 1 interface ge-0/0/0.0 metric 5
!
Verify:
!
root> show ospf statistics
```

# 004 OSPF LSA Types

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIS-ENT (JN0-343) - OSPF/004 OSPF LSA Types`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIS-ENT (JN0-343) - OSPF. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Verify OSPF:
!
root> show route protocol ospf 
root> show ospf database 
root> show ospf database detail 
!
Configure: 
!
Redistribution: 
!
root> edit 
root# set policy-options policy-statement 2ospf term match-direct-route from protocol direct route-filter 172.16.1.0/24 exact 
root# set policy-options policy-statement 2ospf term match-direct-route then accept 
root# set protocols ospf export 2ospf 
root# commit and-quit
!
```

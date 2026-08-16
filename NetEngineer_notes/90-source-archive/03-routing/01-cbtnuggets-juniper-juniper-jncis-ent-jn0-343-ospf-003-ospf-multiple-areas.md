# 003 OSPF Multiple Areas

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIS-ENT (JN0-343) - OSPF/003 OSPF Multiple Areas`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIS-ENT (JN0-343) - OSPF. Content is preserved as historical study material; validate commands against the target platform and release.

```text
root> edit 
root# set protocols ospf area 0 interface ge-0/0/0.0 
root# set protocols ospf area 2 interface ge-0/0/1.0 
root# set protocols ospf area 2 interface lo0.0 passive 
root# set routing-options router-id 172.16.1.3 
root# commit and-quit 
!
Verify OSPF:
!
root> show ospf neighbor 
!
root> show ospf interface 
!
root> show ospf overview 
!
root> show route protocol ospf
```

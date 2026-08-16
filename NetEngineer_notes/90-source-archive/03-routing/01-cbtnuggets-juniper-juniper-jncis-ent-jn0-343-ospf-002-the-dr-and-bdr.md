# 002  The DR and BDR

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIS-ENT (JN0-343) - OSPF/002  The DR and BDR`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIS-ENT (JN0-343) - OSPF. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Verify OSPF parameters:
!
root> show ospf detail 
!
root> show ospf overview 
!
root> clear ospf neighbor 10.0.0.1 
!
!
Set OSPF-Router-ID:
!
root> edit 
root# set routing-options router-id 1.1.1.1
root# commit and-quit 
!
Set OSPF Priority: 
!
root> edit 
root# set protocol ospf area 0 interface ge-0/0/0.0 priority 64 
root# commit 
!
```

# 006 Configuring STP-RSTP

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIS-ENT (JN0-343) - Layer 2/006 Configuring STP-RSTP`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIS-ENT (JN0-343) - Layer 2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
root> show spanning-tree bridge
!
root> edit 
root# delete protocol stp 
root# set protocol rstp 
root# commit and-quit
!
root> show spanning-tree bridge
!
root> show spanning-tree interface 
!
root> show spanning-tree statistics interface 
!
root> show spanning-tree statistics vlan 
!
root> edit 
root# set protocols rstp bridge-priority 4k 
root# commit
```

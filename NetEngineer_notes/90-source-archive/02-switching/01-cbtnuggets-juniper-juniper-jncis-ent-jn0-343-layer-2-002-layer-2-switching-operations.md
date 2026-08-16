# 002 Layer 2 Switching Operations

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIS-ENT (JN0-343) - Layer 2/002 Layer 2 Switching Operations`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIS-ENT (JN0-343) - Layer 2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
root> show route 
!
root> show pfe next-hop 
!
root> show system processes | match "pid|eswd" 
!
root> show interface terse 
!
root> edit 
root# set interfaces interface-range SW1 member ge-0/0/2
root# set interfaces interface-range SW1 member ge-0/0/4
!
root# set interfaces interface-range SW1 member-range ge-0/0/2 to ge-0/0/9 
!
root# set interfaces interface-range SW1 unit 0 family ethernet-switching 
root# commit 
!
root> show interface ge-0/0/2 extensive 
!
root> clear ethernet-switching table 
!
root> edit ethernet-switching-options 
root# set static vlan default mac f0:e2:a5:cc:15:3b next-hop ge-0/0/2.0 
root# commit and-quit 
!
root> show ethernet-switching table
```

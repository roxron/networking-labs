# 003  VLANs

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIS-ENT (JN0-343) - Layer 2/003  VLANs`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIS-ENT (JN0-343) - Layer 2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
root> edit 
root# set vlans default vlan-id 100
!
root# commit and-quit 
!
root> show vlans 
!
root> edit 
root# set vlans v10 vlan-id 10 
root# set vlans v20 vlan-id 20 
root# commit 
!
root> show vlans 
!
root> edit 
root# set interfaces ge-0/0/2 unit 0 family ethernet-switching port-mode access 
root# set interfaces ge-0/0/2 unit 0 family ethernet-switching vlan members v10 
root# commit and-quit 
!
root> edit 
root# set interfaces ge-0/0/23 unit 0 family ehternet-switching port-mode trunk 
root# set interfaces ge-0/0/23 unit 0 family ehternet-switching vlan members v10
root# set interfaces ge-0/0/23 unit 0 family ehternet-switching vlan members v20
```

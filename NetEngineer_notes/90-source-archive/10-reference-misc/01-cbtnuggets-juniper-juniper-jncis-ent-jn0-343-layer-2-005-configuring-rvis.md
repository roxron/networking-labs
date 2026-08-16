# 005 Configuring RVIs

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIS-ENT (JN0-343) - Layer 2/005 Configuring RVIs`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIS-ENT (JN0-343) - Layer 2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
root> edit 
root# set vlan DATA10 vlan-id 10 
root# set intefaces ge-0/0/2 unit 0 family ehternet-switching port-mode access
root# set intefaces ge-0/0/2 unit 0 family ehternet-switching members DATA10 
root# set intefaces vlan unit 10 family inet address 10.10.10.1/24 
root# set vlans DATA10 l3-interface vlan.10 
root# commit and-quit 
!
root> show interfaces terse 
!
root> show route 
!
root> ping 10.10.10.100 
!
```

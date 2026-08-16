# 004 Voice and Native VLANs

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIS-ENT (JN0-343) - Layer 2/004 Voice and Native VLANs`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIS-ENT (JN0-343) - Layer 2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
root> show vlans
!
root> edit 
root# set vlans VOICE vlan-id 10 
root# set vlans DATA vlan-id 20 
!
root# commit check 
!
root# edit ehternet-switching-options 
root# set voip inteface ge-0/0/2 vlan VOICE 
root# set voip inteface ge-0/0/2 forwarding-class expedite-forwarding 
root# commit check 
!
root> edit 
root# set inteface ge-0/0/2 unit 0 family ethernet-switching port-mode access
root# set inteface ge-0/0/2 unit 0 family ethernet-switching vlan members DATA 
root# commit and-quit 
!
root> edit 
root# set interfaces ge-0/0/23 unit 0 family ethernet-switching port-mode trunk 
root# set interfaces ge-0/0/23 unit 0 family ethernet-switching vlan members DATA 
root# set interfaces ge-0/0/23 unit 0 family ethernet-switching vlan members VOICE
root# commit and-quit 
!
root> show vlan 
!
!
root> edit 
root# set interfaces ge-0/0/23 unit 0 family ethernet-switching native-vlan-id default
root# commit and-quit
```

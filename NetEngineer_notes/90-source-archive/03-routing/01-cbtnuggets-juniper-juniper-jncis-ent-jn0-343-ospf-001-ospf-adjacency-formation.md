# 001 OSPF Adjacency Formation

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIS-ENT (JN0-343) - OSPF/001 OSPF Adjacency Formation`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIS-ENT (JN0-343) - OSPF. Content is preserved as historical study material; validate commands against the target platform and release.

```text
root> edit system  
root# set host-name R1 
root# set root-authentication plain-text-password 
root# exit 
!
root# edit interface ge-0/0/0 unit 9 family inet address 10.10.10.1/24
root# commit 
!
root> edit 
root# set protocols ospf area 0 interface ge-0/0/0.0 
root# commit and-quit 
!
!
root> edit protocol ospf
root# set traceoptions file TRACE-OSPF 
root# set traceoptiong flag normal 
root# set area 0 interface ge-0/0/0.0 
root# commit and-quit 
!
!
Verify: 
!
root> show ospf neighbor 
root> show ospf interface
```

# 05 EtherType ACLs

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CIsco ASA/06 Controlling Network Access/05 EtherType ACLs`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CIsco ASA / 06 Controlling Network Access. Content is preserved as historical study material; validate commands against the target platform and release.

```text
EtherType ACLs:
!
access-list my-ether ethertype permit bpdu 
access-list my-ether ethertype permit mpls-unicast
access-list my-ether in interface inside 
!
```

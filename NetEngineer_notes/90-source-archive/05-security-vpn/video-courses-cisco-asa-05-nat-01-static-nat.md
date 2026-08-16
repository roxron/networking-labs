# 01 Static NAT

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CIsco ASA/05 NAT/01 Static NAT`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CIsco ASA / 05 NAT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Static NAT:
!
asa(config)# object network InsideServer 
asa(config-network-object)# host 10.1.1.2 
asa(config-network-object)# nat (inside,outside) static 100.10.2.23
!
show xlate
!
asa(config)# access-list OUTSIDE_TO_INSIDE extended permit ip any host 10.1.1.2
asa(config)# access-group OUTSIDE_TO_INSIDE in interface outside
!
```

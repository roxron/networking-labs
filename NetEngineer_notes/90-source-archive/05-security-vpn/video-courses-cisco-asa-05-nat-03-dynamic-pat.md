# 03 Dynamic PAT

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CIsco ASA/05 NAT/03 Dynamic PAT`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CIsco ASA / 05 NAT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
PAT:
!
asa(config)# object network PAT
asa(config-network-object)# subnet 192.168.10.0 255.255.255.0
asa(config-network-object)# nat (inside,outside) dynamic interface 
asa(config-network-object)# end
!
!
Port Rediraction:
!
asa(config)# object network host-a 
asa(config-network-object)# host 10.1.1.11 
asa(config-network-object)# nat (inside,outside) static interface service tcp 80 80
!
```

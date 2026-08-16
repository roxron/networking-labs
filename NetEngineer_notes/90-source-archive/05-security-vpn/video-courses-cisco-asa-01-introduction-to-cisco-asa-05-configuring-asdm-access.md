# 05 Configuring ASDM Access

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CIsco ASA/01 IntroDuction to Cisco ASA/05 Configuring ASDM Access`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CIsco ASA / 01 IntroDuction to Cisco ASA. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure ASDM Acess:
!
asa(config)# http server enable 
asa(config)# http 10.1.1.0 255.255.255.0 inside
! 
asa(config)# asdm image disk0:/asdm-731.bin
!
```

# 001 Intial Config

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/PaloAlto/001 Intial Config`  
> Original source context: 01 CBTNUGGETS / PaloAlto. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure system IP address:
!
admin@PA-VM# set deviceconfig system ip-address 192.168.1.10 netmask 255.255.255.0
admin@PA-VM# commit 
!
!
COnfigure Default Route:
!
admin@PA-VM# set deviceconfig system default-gateway 192.168.1.1
!
!
Configure DNS:
!
admin@PA-VM# set deviceconfig system dns-setting servers primary 1.1.1.1
!
!
Configure Type of IP address static:
!
admin@PA-VM# set deviceconfig system type static 
!
```

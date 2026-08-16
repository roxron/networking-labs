# 01 Hostname, Domain name, Passwords

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CIsco ASA/04 Basic Settings/01 Hostname, Domain name, Passwords`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CIsco ASA / 04 Basic Settings. Content is preserved as historical study material; validate commands against the target platform and release.

```text
asa(config)# hostname ASA1
!
ASA1(config)# domain-name ciscoasa.lab
!
!
Configure telnet password:
!
asa(config)# password cisco
!
!
Configure enable password:
!
asa(config)# enable password cisco
!
!
Configuring the Master key:
!
asa(config)# key config-key password-encryption 
asa(config)# password encryption aes
```

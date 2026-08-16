# 05 Add User

> Imported source note. Provenance: `NetEngineer_Journal/08 DAVID BOMBAL/Cumulus + Ansible Automation/05 Add User`  
> Original source context: 08 DAVID BOMBAL / Cumulus + Ansible Automation. Content is preserved as historical study material; validate commands against the target platform and release.

```text
!
$ sudo add useradd -m student1 
$ id student1
!
$ sudo passwd student1
!
$ sudo usermod -a -G sudo student1
!
```

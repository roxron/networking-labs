# 01 Start up Configure Switch ports

> Imported source note. Provenance: `NetEngineer_Journal/08 DAVID BOMBAL/Cumulus + Ansible Automation/01 Start up Configure Switch ports`  
> Original source context: 08 DAVID BOMBAL / Cumulus + Ansible Automation. Content is preserved as historical study material; validate commands against the target platform and release.

```text
!
ifconfig
!
$ sudo nano /etc/network/interfaces
!
auto swp1
iface swp1

auto swp2
iface swp2
!
!
$ cat /etc/network/interfaces 
!
$ sudo ifreload -a
!
$ ip link show swp1 
$ sudo ifup swp1 
!
```

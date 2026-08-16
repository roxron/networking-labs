# 011 Physical Switch Port

> Imported source note. Provenance: `NetEngineer_Journal/08 DAVID BOMBAL/Cumulus + Ansible Automation/011 Physical Switch Port`  
> Original source context: 08 DAVID BOMBAL / Cumulus + Ansible Automation. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Enable L3 on the Interface:
!
auto swp1 
iface swp1
 address 10.1.1.1/30
 address 2001:db8::1/32
!
!
Restart networking 
!
$ sudo ifreload -a 
$ sudo service networking restart 
!
$ tail /var/log/switchd.log 
!
$ ip route show 
!
$ sudo decode-syseeprom
```

# 07 Configure IP address Eth0

> Imported source note. Provenance: `NetEngineer_Journal/08 DAVID BOMBAL/Cumulus + Ansible Automation/07 Configure IP address Eth0`  
> Original source context: 08 DAVID BOMBAL / Cumulus + Ansible Automation. Content is preserved as historical study material; validate commands against the target platform and release.

```text
!
$ sudo nano /etc/network/interfaces
!
auto eth0 
iface eth0 
 address 10.0.1.25/24
 gateway 10.0.1.254
```

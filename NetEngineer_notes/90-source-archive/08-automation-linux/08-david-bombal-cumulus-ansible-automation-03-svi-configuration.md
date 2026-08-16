# 03 SVI Configuration

> Imported source note. Provenance: `NetEngineer_Journal/08 DAVID BOMBAL/Cumulus + Ansible Automation/03 SVI Configuration`  
> Original source context: 08 DAVID BOMBAL / Cumulus + Ansible Automation. Content is preserved as historical study material; validate commands against the target platform and release.

```text
!
$ sudo nano /etc/network/interfaces 
!
auto bridge.1 
iface bridge.1
 address 192.168.1.1/24
!
$ sudo ifreload -a
!
```

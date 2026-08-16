# 02 Bridge Configuration

> Imported source note. Provenance: `NetEngineer_Journal/08 DAVID BOMBAL/Cumulus + Ansible Automation/02 Bridge Configuration`  
> Original source context: 08 DAVID BOMBAL / Cumulus + Ansible Automation. Content is preserved as historical study material; validate commands against the target platform and release.

```text
!
$ sudo nano /etc/network/interfaces
!
auto bridge
iface bridge 
 bridge-vlan-aware yes 
 bridge-ports swp1 swp2
 bridge-pvid 1 
 bridge-stp on 
!
$ sudo ifreload -a
$ ifconfig 
!
$ brctl show 
!
$ mstpctl showport bridge 
$ mstpctl showbridge 
!
```

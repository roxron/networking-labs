# 015 Untagged Access Ports

> Imported source note. Provenance: `NetEngineer_Journal/08 DAVID BOMBAL/Cumulus + Ansible Automation/015 Untagged Access Ports`  
> Original source context: 08 DAVID BOMBAL / Cumulus + Ansible Automation. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure untagged Access ports:
!
auto bridge 
iface bridge 
 bridge-vlan-aware yes
 bridge-ports swp1 swp2
 bridge-vids 100 200
 bridge-stp on

auto swp1 
iface swp1
 bridge-access 100 

auto swp2
iface swp2
 bridge-access 200
```

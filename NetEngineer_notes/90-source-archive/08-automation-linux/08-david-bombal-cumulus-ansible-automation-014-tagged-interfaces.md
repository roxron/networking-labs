# 014 Tagged Interfaces

> Imported source note. Provenance: `NetEngineer_Journal/08 DAVID BOMBAL/Cumulus + Ansible Automation/014 Tagged Interfaces`  
> Original source context: 08 DAVID BOMBAL / Cumulus + Ansible Automation. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure VLANs on all tagged Interfaces:
!
auto bridge 
iface bridge 
 bridge-vlan-aware yes
 bridge-porst swp1 swp2 swp3
 bridge-vids 100 200 
 bridge-pvid 1
 bridge-stp on 

Allow specific VLAN on the Trunk:
!
auto swp3 
iface swp3 
 bridge-vids 200
```

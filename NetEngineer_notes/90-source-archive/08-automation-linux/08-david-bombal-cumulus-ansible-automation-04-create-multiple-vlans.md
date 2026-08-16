# 04 Create Multiple VLANs

> Imported source note. Provenance: `NetEngineer_Journal/08 DAVID BOMBAL/Cumulus + Ansible Automation/04 Create Multiple VLANs`  
> Original source context: 08 DAVID BOMBAL / Cumulus + Ansible Automation. Content is preserved as historical study material; validate commands against the target platform and release.

```text
auto bridge 
iface bridge 
 bridge-vlan-aware yes
 bridge-ports swp1 swp2 swp3
 bridge-vids 10 20 
 bridge-pvid 1
 bridge-stp on

auto swp1
iface swp1


auto swp2
iface swp2
 bridge-access 10 

auto swp3
iface swp3
 bridge-access 20 

auto bridge.10
iface bridge.10
 address 192.168.10.1/24
!
$ sudo ifreload -a
!
```

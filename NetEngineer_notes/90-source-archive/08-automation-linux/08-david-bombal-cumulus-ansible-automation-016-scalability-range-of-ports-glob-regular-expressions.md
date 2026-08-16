# 016 Scalability - range of ports, glob, regular expressions

> Imported source note. Provenance: `NetEngineer_Journal/08 DAVID BOMBAL/Cumulus + Ansible Automation/016 Scalability - range of ports, glob, regular expressions`  
> Original source context: 08 DAVID BOMBAL / Cumulus + Ansible Automation. Content is preserved as historical study material; validate commands against the target platform and release.

```text
auto bridge
iface bridge 
 bridge-ports glob swp1-5

or 

auto bond0 
iface bond0 
 bond-slaves regex swp[6-9]

Test Regex at regexpal.com
```

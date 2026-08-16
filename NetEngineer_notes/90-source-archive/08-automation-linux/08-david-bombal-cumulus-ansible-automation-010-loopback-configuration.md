# 010 Loopback Configuration

> Imported source note. Provenance: `NetEngineer_Journal/08 DAVID BOMBAL/Cumulus + Ansible Automation/010 Loopback Configuration`  
> Original source context: 08 DAVID BOMBAL / Cumulus + Ansible Automation. Content is preserved as historical study material; validate commands against the target platform and release.

```text
auto lo
iface lo inet loopback
 address 10.2.1.1/32
 address 2001:da8::1/128
```

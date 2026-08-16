# 08 dhcp

> Imported source note. Provenance: `NetEngineer_Journal/08 DAVID BOMBAL/Cumulus + Ansible Automation/08 dhcp.conf`  
> Original source context: 08 DAVID BOMBAL / Cumulus + Ansible Automation. Content is preserved as historical study material; validate commands against the target platform and release.

```text
option cumulus-provision-url code 239 = text;

subnet 172.0.24.0 netmask 255.255.255.0 {
 range 172.0.24.20 172.0.24.200;
 option default-url = "http://172.0.24.14/onie-installer";
 option cumulus-provision-url "http://10.99.0.1/configure_switch.sh";

}
```

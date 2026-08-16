# 012 Configuring BOND Link Aggregation

> Imported source note. Provenance: `NetEngineer_Journal/08 DAVID BOMBAL/Cumulus + Ansible Automation/012 Configuring BOND Link Aggregation`  
> Original source context: 08 DAVID BOMBAL / Cumulus + Ansible Automation. Content is preserved as historical study material; validate commands against the target platform and release.

```text
!
$ sudo nano /etc/network/interfaces 
!
auto swp6 
iface swp6

auto swp7
iface swp7

auto bond0 
iface bond0
 bond-slaves swp6 swp7
 bond-mode 802.3ad
 bond-miimon 100 
 bond-use-carrier 1
 bond-lacp-rate 1 
 bond-min-links 1 
 bond-xmit-hash-policy layer3+4
!
$ sudo ifup bond0
!
Verify BOND:
!
$ cat /proc/net/bonding/bond0
$ ip link show bond0
!
Check Log:
$ tail /var/log/syslog 
!
```

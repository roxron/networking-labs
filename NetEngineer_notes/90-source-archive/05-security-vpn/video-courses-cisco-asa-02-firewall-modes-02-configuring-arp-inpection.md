# 02 Configuring ARP Inpection

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CIsco ASA/02 Firewall Modes/02 Configuring ARP Inpection`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CIsco ASA / 02 Firewall Modes. Content is preserved as historical study material; validate commands against the target platform and release.

```text
ARP Inspection:
!
asa(config)# arp outside 10.1.1.99 0001.5c32.6c81
!
asa(config)# arp-inspection outside enable no-flood
!
```

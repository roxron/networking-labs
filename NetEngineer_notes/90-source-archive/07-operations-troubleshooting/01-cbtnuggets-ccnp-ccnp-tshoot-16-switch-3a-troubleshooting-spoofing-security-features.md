# 16 Switch%3a Troubleshooting Spoofing Security Features

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/16 Switch%3a Troubleshooting Spoofing Security Features`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Switch: Troubleshooting Spoofing Security Features:
!
ANTI-SPOOFING: WHAT CAN GO WRONG?:
!
> DHCP SNOOPING MISCONFIGURATION (MISSED TRUST ON TRUNK, DHCP SERVER)
> ARP INSPECTION MISCONFIGURATION (MISSIED TRUST ON TRUNK, MISSED GLOBAL)
> TECH-SAVVY USERS/ MOVING DEVICES (IP SOURCE GUARD)
!
- show run <interface>
- show ip dhcp snooping binding 
- show ip verify source 
!
```

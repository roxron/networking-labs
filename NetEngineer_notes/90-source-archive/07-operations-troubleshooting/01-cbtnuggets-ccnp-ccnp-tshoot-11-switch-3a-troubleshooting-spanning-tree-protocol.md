# 11 Switch%3a Troubleshooting Spanning Tree Protocol

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/11 Switch%3a Troubleshooting Spanning Tree Protocol`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Switch: Troubleshooting Spanning Tree Protocol:
!
HOw STP Finds the Best PAth 
!
1. Elect The Root Bridge
2. Find the Best Path to the Root 
   - Lowest Cost 
   - Lowest Bridge ID 
   - Lowest Port Number 
3. Block whatever is left over 
!
!
STP: What Can Go Wrong?:
!
> MAC address flapping / Broadcast Storm
> Temporary Portfast Loop (Short Duration)
> BPDU Filter/Root Guard Incorrectly Applied 
> Wrong Root Bridge Elected 
> Misconfguration (Eherchannel, Native VLAN)
!
```

# 17  Switch%3a Troubleshooting Private VLANs

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/17  Switch%3a Troubleshooting Private VLANs`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Switch: Troubleshooting Private VLANs:
!
Private VLANs:
!
> Isolated 
> Community 
> Promiscuous
!
Private VLANs: What Can Go Wrong?:
!
> Protected Port Misconfiguration (LightWeight Private VLANS)
> Misunderstanding Private VLAN Ruls
   - Intra-community Communication Only
   - Isolated Ports = Promiscuous Only
> Private VLAN host Association Misconfigured 
!
- show run <interface>
- show vlan private-vlan 
- show interface <int> switchport 
!
```

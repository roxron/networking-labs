# 03 VLAN Trunking Protocol

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP SWITCH/03 VLAN Trunking Protocol.txt`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Chapter 5. VLAN Trunking Protocol:
!
 VTP Configuration:
!
SW1(config)# vtp version 2 
SW1(config)# vtp domain CCNP
SW1(config)# vtp mode server
SW1(config)# vtp password cisco
!
!
Configure VTP modes:
!
SW1(config)# vtp mode client 
!
SW1(config)# vtp mode transperent 
!
!
Verify VTP:
!
SW1# show vtp status 
SW1# show vtp password 
!
!
Enabling VTP Pruning:
!
SW1(config)# vtp pruning
!
!
Troubleshooting VTP:
!
show vtp status 
show vlan brief 
show interface G0/0 switchport 
show interface G0/0 pruning 
!
!
```

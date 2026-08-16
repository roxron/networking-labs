# 03 Implement and Troubleshoot VLANs

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS v5 All-In-One 2.0 Layer 2 Technologies/03 Implement and Troubleshoot VLANs`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS v5 All-In-One 2.0 Layer 2 Technologies. Content is preserved as historical study material; validate commands against the target platform and release.

```text
4. Implement and Troubleshoot VLANs
!
Configure VOICE VLAN:
!
SW1(config)# interface g0/10
SW1(config-if)# switchport mode access
SW1(config-if)# switchport voice vlan 10 
SW1(config-if)#

Erase VLAN database:
!
SW1# delete flash:vlan.dat 
SW1# 

VLAN TYPES: NORMAL 1 to 1005,  EXTENDED  1006 to 4096, VOICE VLAN 

Verify VLANS:
SW1# show vlan brief 
SW1# show interface G0/4 switchport 
SW1# show interface trunk
```

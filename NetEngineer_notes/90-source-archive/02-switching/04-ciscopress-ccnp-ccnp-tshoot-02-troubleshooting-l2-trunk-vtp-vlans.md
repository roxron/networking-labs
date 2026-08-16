# 02 Troubleshooting L2 Trunk, VTP, VLANS

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP TSHOOT/02 Troubleshooting L2 Trunk, VTP, VLANS`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
!
Check Mac Adress table:
!
SW1# show mac address-table
SW1# clear mac address-table dynamic
!
!
Switch Trunk Troubleshooting:
!
SW1# show interfaces G0/0 switchport 
SW1# show interfaces trunk
SW1# show interfaces gigabitethernet 0/1 switchport | include Administrative Mode
!
!
Command Reference:
!
show mac address-table [dynamic]

clear mac address-table dynamic

show vlan brief

show interfaces trunk

show interfaces interface_type interface_number switchport

show vtp status

show vtp password
```

# 00 MAC Address Table Examination

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP SWITCH/00 MAC Address Table Examination.txt`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
MAC Address Table Examination:
!
CAM table MAC Address Aging time:
!
Switch(config)# mac address-table aging-time 500 (seconds)
!
!
Configure Static MAC Address:
!
Switch(config)# mac address-table static 0000.1111.aaaa vlan 20 interface G0/25
!
!
Managing Switching Tables:
!
show mac address-table
show mac address-table dynamic
show mac address-table dynamic address 0050.8b11.54da
show mac address-table dynamic interface gig1/0/29
show mac address-table count
clear mac address-table dynamic
!
!
!
TCAM Operation:
!
show platform tcam utilization
!
!
!
SDM Templates:
!
Switch# show sdm prefer
!
COnfigure SDM mode:
!
Switch(config)# sdm prefer template
!
```

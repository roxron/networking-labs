# 04 Trunking  Implement and Troubleshoot

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS v5 All-In-One 2.0 Layer 2 Technologies/04 Trunking_ Implement and Troubleshoot`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS v5 All-In-One 2.0 Layer 2 Technologies. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Trunking: Implement and Troubleshoot:
!
SW1# show cdp neighbor
SW1# show interface g0/25 switchport 
SW1# show interface g0/25 trunk 


Check VTP protocol:
!
SW1# show vtp status 
SW1# show vtp 
SW!# show vtp password
!
Turn off VTP:
!
SW1(config)# vtp mode off
!
Configure VTP version 3:
!
SW1(config)# vtp mode server 
SW1(config)# vtp version 3
SW1(config)# vtp pruninng 
!
SW1(config)# interface G0/25
SW1(config-if)# swithport trunk prunning vlan remove 2
```

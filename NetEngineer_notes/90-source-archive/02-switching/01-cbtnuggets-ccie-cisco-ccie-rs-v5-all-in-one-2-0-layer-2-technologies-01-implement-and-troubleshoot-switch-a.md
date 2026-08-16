# 01 Implement and Troubleshoot Switch Administration

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS v5 All-In-One 2.0 Layer 2 Technologies/01 Implement and Troubleshoot Switch Administration`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS v5 All-In-One 2.0 Layer 2 Technologies. Content is preserved as historical study material; validate commands against the target platform and release.

```text
MANAGING MAC ADDRESS TABLE:
!
SW1# show mac address-table count 
SW1# show mac address-table aging-time 
!
SW1# clear mac address-table dynamic 


ERRORDISABLE RECOVERY:
!
SW1# show interface status 
!
SW1(config)# interface g0/6 
SW1(config-if)# shutdown
SW1(config-if)# no shutdown 
SW1(config-if)#
!
!
Cinfigure errordisable recovey:
!
SW1(config)# errordisable recovery cause psecure-violation 
SW1(config)# errordisable recovery interval 30 
SW1(config)#


L2 MTU 
!
SW1(config)# system mtu 1500
```

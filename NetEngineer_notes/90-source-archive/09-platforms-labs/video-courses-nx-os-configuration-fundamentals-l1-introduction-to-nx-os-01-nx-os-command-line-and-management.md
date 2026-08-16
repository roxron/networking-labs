# 01 NX-OS Command Line and Management

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/NX-OS Configuration Fundamentals/L1 Introduction to NX-OS/01 NX-OS Command Line and Management`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / NX-OS Configuration Fundamentals / L1 Introduction to NX-OS. Content is preserved as historical study material; validate commands against the target platform and release.

```text
NX-OS Command Line and Management:
!
NX1# switchto vdc F1DC1
!
NX1-D1DC1# show module
!
NX1-D1DC1# show run interface Ethernet 7/48 
!
NX1-D1DC1# conf t 
NX1-D1DC1(config)# interface Ethernet7/48
NX1-D1DC1(config-if)# no switchport 
NX1-D1DC1(config-if)# ip address 192.168.1.1/23 
NX1-D1DC1(config-if)# exit
!
NX1# show running-config vlan
!
NX1# show int management 0 
!
```

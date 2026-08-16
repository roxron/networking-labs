# 01 Cisco IOS time saving commands and tips

> Imported source note. Provenance: `NetEngineer_Journal/08 DAVID BOMBAL/01 Cisco IOS time saving commands and tips`  
> Original source context: 08 DAVID BOMBAL. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Video 1:
!
show run 
 --more--
/face 
/vty 
/0$
!
show run | begin ospf 
!
show run 
+face 
+0$ 
!
terminal length 0
!
show run | redirect flash:/test.cfg 
!
show flash: | include test 
!
more flash:/test.cfg
! 
more flash:/vlan.dat
__________________________________________
!
Video 2:
!
show run linenum
show run linenum | include 157
show run linenum | include ___157 
show run linenum | begin 145 
show run brief
!
RegEx:
!
show run | include i
show run | include ^i 
show run | include 2$ 
show run | include \.
show run | include \.8 
show run | include 87|255
show run | include 87|255|Technical 
!
show run | section ospf 
show run | section vty 
show run interface g0/0
show run all
!
(config)# default interface G0/1
!
____________________________________________
!
Video 3:
!
show interfaces status
reload in 10 
reload cancel 
show proceses cpu history 
!
_________________________________________________
!
Video 4:
!
show interfaces trunk 
!
S1(config-if)# switchport host
_________________________________________________
!
Video 5:
!
SW1# show control-plane host open-ports
!
SW1# who 
!
SW1# systat all
!
SW1# dir 
____________________________________________________
!
Video 6:
!
SW1# copy run  flash0: 
!
SW1# configure replace flash0:/run1.cfg 
!
SW1# more flash0:/run2.cfg | begin back 
________________________________________________
!
Video 7:
!
R1# conf t revert timer 1 
!
R1(config)# archive 
R1(config-archive)# path flash0:backup1.cfg 
R1(config-archive)#
!
R1# config confirm 
!
_____________________________________
!
Video 8: 
!
SW1# show cdp entry * protocol 
___________________________________________
!
Video 9:
!
SW1# show platform pm if-numbers 
SW1# show platform 
SW1# show platform pm platform-block 
SW1# show platform port-asic stats drop 
SW1# show platform port-asic stats equeue 
SW1# show platform tcam utilization asic all
```

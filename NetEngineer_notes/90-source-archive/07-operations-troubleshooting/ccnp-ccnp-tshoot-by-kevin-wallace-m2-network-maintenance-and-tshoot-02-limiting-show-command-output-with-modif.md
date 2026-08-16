# 02 Limiting show Command Output with Modifiers

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CCNP/CCNP TSHOOT by Kevin Wallace/M2  Network Maintenance and Tshoot/02 Limiting show Command Output with Modifiers`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CCNP / CCNP TSHOOT by Kevin Wallace / M2  Network Maintenance and Tshoot. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Limiting show Command Output with Modifiers:
!
R1# show ip route 10.0.3.0/24
R1# show ip route 10.1.0.0 longer-prefixes
!
R1# show runnig-config /line
!
R1# show processes cpu 
!
R1# show processes cpu | include Spanning-tree 
R1# show processes cpu | include ^CPU|^ PID|Spannig-tree 
!
R1# show ip interface Brief | exclude unassigned 
!
R1# show running-config | begin router 
!
R1# show run | section router
!
R1# show tech-support | redirect flash:TECH-SUP
!
R1# more flash:TECH-SUP
!
R1# show ip interface brief | tee flash:INTERFACE_BRIEF 
!
R1# show version | append flash:INTERFACE_BRIEF
!
Create Alias:
!
R1(config# alias exec int show ip interface brief | exclude uassigned 
!
R1# int
```

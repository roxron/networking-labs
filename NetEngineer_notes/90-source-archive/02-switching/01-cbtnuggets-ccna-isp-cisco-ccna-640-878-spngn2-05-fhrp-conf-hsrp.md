# 05 FHRP   Conf HSRP

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA ISP/Cisco CCNA 640-878 SPNGN2/05 FHRP_  Conf HSRP`  
> Original source context: 01 CBTNUGGETS / CCNA ISP / Cisco CCNA 640-878 SPNGN2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
HSRP Base Configuration:
!
Step1: CREATE STANDBY GROUP 
Step2: REASSIGN IP ADDRESS
Step3: VERIFY 
!
R1(config)# interface G0/0
R1(config-if)# standby 1 ip 192.168.1.1
R1(config-if)# standby 1 priority 90
R1(config-if)# standby 1 preempt 
R1(config-if)# standby 1 track S2/0 50 
!
R1# show standby 
!
on IOS-XR
!
XR1(config)# int gi0/1/0/1
XR1(config-if)# ip address 192.168.1.3/24
R1(config-if)# commit
R1(config-if)# exit
R1(config)# router hsrp 
R1(config-hsrp)# interface g0/1/0/1
R1(config-hsrp-if)# hsrp 1 ipv4 192.168.1.1
R1(config-hsrp-if)# hsrp 1 priority 100
R1(config-hsrp-if)# hsrp 1 preempt 
R1(config-hsrp-if)# hsrp 1 track G0/1/0/2 50
!
XR1# show hsrp
```

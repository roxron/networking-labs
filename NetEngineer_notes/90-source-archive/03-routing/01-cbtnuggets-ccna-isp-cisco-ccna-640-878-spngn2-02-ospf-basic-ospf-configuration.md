# 02 OSPF  Basic OSPF Configuration

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA ISP/Cisco CCNA 640-878 SPNGN2/02 OSPF_ Basic OSPF Configuration`  
> Original source context: 01 CBTNUGGETS / CCNA ISP / Cisco CCNA 640-878 SPNGN2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure OSPF on IOS:
!
R1(config)# router ospf 1 
R1(config-router)# router-id 1.1.1.1
R1(config-router)# network 192.168.1.0 0.0.0.255 area 0
R1(config-router)# network 172.16.0.0 0.0.255.255 area 0
R1(config-router)# network 0.0.0.0 255.255.255.255 area 0
!
R2(config)# router ospf 1
R2(config-router)# router-id 2.2.2.2 
R2(config-router)# exit
R1(config)# interface g0/0
R1(config-if)# ip ospf 1 area 0
R1(config-if)# exit
!
!
!
Configure OSPF on IOS-XR:
!
XR1# conft t
XR1(config)# router ospf 1
XR1(config-ospf)# area 0
XR1(config-ospf-ar)# interface g0/1/0/1
XR1(config-ospf-ar)# interface g0/1/0/2
XR1(config-ospf-ar)# commit
!
!
!
!
Enable OSPF Authentication between IOS and IOS-XR:
R1(config)# interface g0/0
R1(config-if)# ip ospf authentication message-digest 
R1(config-if)# ip ospf message-digest-key 1 md5 cisco 
!
!
XR1(config)# router ospf 1
XR1(config-ospf)# area 0
XR1(coffig-ospf-ar)# interface g0/1/0.1
XR1(config-ospf-ar-if)# authentication message-digest 
XR1(config-ospf-ar-if)# message-digest-key 1 md5 cisco
```

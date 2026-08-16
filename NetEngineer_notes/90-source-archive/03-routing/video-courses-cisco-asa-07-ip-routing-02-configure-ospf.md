# 02 Configure OSPF

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CIsco ASA/07 IP Routing/02 Configure OSPF`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CIsco ASA / 07 IP Routing. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure OSPFv2:
!
ASA(config)# router ospf 2 
ASA(config-rtr)# network 10.0.0.0 255.0.0.0 area 0
!
!
OSPF Redistributing with Route-map:
!
ASA(config)# route-map MYMAP permit 
ASA(config-route-map)# match metric 1 
ASA(config-route-map)# set metric 5 
ASA(config-route-map)# set metric-type type-1 
!
ASA(config)# router ospf 2 
ASA(config-rtr)# redistribure ospf 1 route-map MYMAP
!
!
OSPF Autheintication:
!
ASA(config)# router ospf 1
ASA(config-rtr)# area 0 authentication message-digest 
!
ASA(config)# interface G0/1
ASA(config-if)# nameif inside
ASA(config-if)# ospf message-digest-key 1 md5 supersecret
ASA(config-if)# ospf authentication message-digest 
!
!
!
Configure OSPFv3:
!
ipv6 router ospf 10 
interface G0/0
 nameif outside 
 security-level 100 
 ipv6 address 3001::1/64 
 ipv6 enable 
 ipv6 ospf cost 100 
 ipv6 ospf 100 area 10 instance 200 
!
!
!
Monitor and Troubleshoot OSPF:
!
ASA1# show route 
ASA1# show ospf neighbors 
ASA1# show ospf interface brief
ASA1# show ospf database 
ASA1# debug ospfv2 ?
ASA1# debug ospfv3 ? 
!
!
```

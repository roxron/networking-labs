# 03 Configure EIGRP

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CIsco ASA/07 IP Routing/03 Configure EIGRP`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CIsco ASA / 07 IP Routing. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring EIGRP:
!
ASA(config)# router eigrp 10 
ASA(config-rtr)# no auto-summary 
ASA(config-rtr)# network 10.10.1.0 255.255.255.0 
!
!
Route Filtering int EIGRP:
!
ASA(config)# access-list EIGRP_FILTER standard deny 10.1.12.0 255.255.255.0 
ASA(config)# access-list EIGRP_FILTER standard permit any 
!
router eigrp 10 
 distribute-list EIGRP_FILTER in interface inside 
!
!
EIGRP Authentication:
!
inteface G0/1
 authentication key eigrp 10 supersecret key-id 1 
 autjentication mode eigrp 10 md5 
!
!
Verify EIGRP:
!
ASA# show eigrp topology 
ASA# show eigrp neighbors 
ASA# show eigrp interface
ASA# show eigrp traffic
ASA# show eigrp events 
ASA# show route eigrp 
ASA# debug eigrp ? 
!
```

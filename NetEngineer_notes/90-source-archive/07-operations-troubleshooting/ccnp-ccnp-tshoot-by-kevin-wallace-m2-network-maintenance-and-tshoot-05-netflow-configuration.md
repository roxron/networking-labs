# 05 NetFlow Configuration

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CCNP/CCNP TSHOOT by Kevin Wallace/M2  Network Maintenance and Tshoot/05 NetFlow Configuration`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CCNP / CCNP TSHOOT by Kevin Wallace / M2  Network Maintenance and Tshoot. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure NetFlow:
!
NetFlow Collector Application: 
1> Live Action
!
!
Netflow Config:
!
R1(config)# intervace G0/1
R1(config-if)# ip flow ingress 
R1(config-if)# ip flow egress 
!
!
Verify Flow:
!
R1# show ip cache flow 
!
!
Setup Netflow Collector:
!
R1(config)# ip flow-export source lo0
R1(config)# ip flow-export version 9 
R1(config)# ip flow-eport destination 192.168.1.50 9996
```

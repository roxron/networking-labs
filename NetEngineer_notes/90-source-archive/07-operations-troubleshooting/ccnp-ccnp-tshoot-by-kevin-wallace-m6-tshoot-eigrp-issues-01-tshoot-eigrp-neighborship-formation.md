# 01 Tshoot EIGRP Neighborship Formation

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CCNP/CCNP TSHOOT by Kevin Wallace/M6 Tshoot EIGRP Issues/01 Tshoot EIGRP Neighborship Formation`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CCNP / CCNP TSHOOT by Kevin Wallace / M6 Tshoot EIGRP Issues. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Common EIGRP Neighborship Formation Issues:
!
> Interface's IP address in wront subnet (IPv4) 
> Interface administratively shut down
> Interface not participationg in EIGRP process 
> Interface Configure as Passive 
> Failed authentication 
> Filtering of EIGRP packets 
> Mismatched AS number 
> Mismatched K values 
!
Verify EIGRP:
!
R1# show ip eigrp topology 
R1# show ip eigrp interface 
R1# show ip eigrp interface G0/0 detail 
R1# show ip eigrp neighbors
R1#
```

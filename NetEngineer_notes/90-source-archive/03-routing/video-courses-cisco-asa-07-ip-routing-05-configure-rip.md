# 05 Configure RIP

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CIsco ASA/07 IP Routing/05 Configure RIP`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CIsco ASA / 07 IP Routing. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Cofnguring RIP:
!
router rip 
 network 10.0.0.0 
 passive-interface inside 
 default-information originate 
 version 2 
 no auto-summary 
!
!
Verify RIP;
!
ASA# show route rip
ASA# debug ip rip database 
ASA# debug ip rip events 
ASA# debug ip rip routing
```

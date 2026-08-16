# 06 Time-Based ACLs

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CIsco ASA/06 Controlling Network Access/06 Time-Based ACLs`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CIsco ASA / 06 Controlling Network Access. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Time-Based ACLs:
!
asa(config)# time-range work-hours 
asa(config)# absolute start 10:00 01 March 2015 end 13:00 01 March 2015
!
asa(config)# access-list 101 extended permit tcp any host 10.1.1.55 eq ssh time-range work-hours
!
```

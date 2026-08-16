# 01 Introduction to ACL

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CIsco ASA/06 Controlling Network Access/01 Introduction to ACL`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CIsco ASA / 06 Controlling Network Access. Content is preserved as historical study material; validate commands against the target platform and release.

```text
ACL Example:
!
asa(config)# access-list OUTSIDE permit tcp host 100.1.1.14 host 10.1.1.2 eq www
asa(config)# access-list OUTSIDE deny tcp host 100.1.2.22 host 209.165.200.225 eq www
asa(config)# access-list OUTSIDE permit tcp host 100.1.1.98 host 10.1.1.2 eq www
!
asa(config)# access-group OUTSIDE in interface outside
!
!
Verify:
!
asa# show connection 
asa# show interface outside
asa# show access-list inside
```

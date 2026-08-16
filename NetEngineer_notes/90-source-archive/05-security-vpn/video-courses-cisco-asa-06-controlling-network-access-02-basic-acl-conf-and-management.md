# 02 Basic ACL Conf and Management

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CIsco ASA/06 Controlling Network Access/02 Basic ACL Conf and Management`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CIsco ASA / 06 Controlling Network Access. Content is preserved as historical study material; validate commands against the target platform and release.

```text
ACL Example:
!
asa(config)# access-list OUTSIDE permit tcp host 100.10.2.22 host 10.1.1.2 eq www
asa(config)# access-group OUTSIDE in interface outside 
!
!
ICMP Access List 
!
asa(config)# icmp permit host 100.10.2.22 outside 
!
!
Global Access Rules
!
asa(config)# access-list 101 permit tcp any host 10.10.20.20 eq www
asa(config)# access-list 101 global
!
!
Insert specific ACE line:
!
asa(config)# access-list 101 line 5 permit tcp any host 10.1.1.20 eq ssh
!
```

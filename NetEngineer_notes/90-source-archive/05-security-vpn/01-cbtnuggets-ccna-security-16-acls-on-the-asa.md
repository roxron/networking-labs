# 16 ACLs on the ASA

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/16 ACLs on the ASA`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Access List with time range: 
!
time-range During-the-week
 periodic weekdays 08:00 to 17:00
access-list outside_access_in line 1 extended permit tcp any object dmz-server-real-ip eq http time-range During-the-week 
access-group outside_access_in in interface outside
!
!
show time-range 
show access-list 
!
!
!
Access List with Object Group:
!
object-group network 3-servers 
 network-object object Server1
 network-object object Server2
 network-object object Server3
!
object-group service 3-services tcp 
 port-object eq http 
 port-object eq https
 port-object eq ssh 
!
access-list outside_access-in line 1 extended permit tcp any object-group 3-servers object-group 3-services
!
show conn
!
!
Permit traffic between interfaces with the same security levels:
!
same-security-traffic permit inter-interface 
!
!
```

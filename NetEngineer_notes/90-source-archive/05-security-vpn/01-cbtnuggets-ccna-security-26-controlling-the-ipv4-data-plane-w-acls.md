# 26 Controlling the IPv4 Data-plane w ACLs

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/26 Controlling the IPv4 Data-plane w ACLs`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure ACL with object group:
!
object-group network GoogleServices
 host 74.125.224.176
 host 74.125.224.179
 exit
!
!
access-list 100 deny tcp any object-group GoogleServices eq 80
access-list 100 permit ip any any 
!
interface g0/1
 ip access-group 100 in
```

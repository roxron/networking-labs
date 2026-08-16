# 28 AAA on the ASA

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/28 AAA on the ASA`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configre-AAA:
!
aaa-server OUR-GROUP protocol radius 
aaa-server OUR-GROUP (inside) host 10.0.0.50
 key cisco
 radius-common-pw cisco
exit 
!
!
Test AAA: 
!
ASA1# test aaa-server authentication 
!
!
!
aaa authentication ssh console OUR-GROUP
!
!
!
Permit end user to the services on dmz with AAA:
!
access-list outside_authentication line 1 extended permit tcp any object dmz-server eq http 
username bob_the_user password FeSFEnefNFEkeF encryped privilege 2
username bob_the_user attributes 
 service-type remote-access
exit 
aaa authentication match outside_authentication outside LOCAL
!
ASA# show uauth 
!
!
Configure Global timeout:
!
timeout uauth 01:00:00 absolute 
timeout uauth 00:05:00 inactive 
!
!
!
Enable ACL Per User Override:
!
access-group outside_access_in in interface outside per-user-override
!
```

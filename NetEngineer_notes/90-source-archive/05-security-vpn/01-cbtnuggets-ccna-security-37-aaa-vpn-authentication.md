# 37 AAA VPN Authentication

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/37 AAA VPN Authentication`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure AAA Server on ASA:
!
aaa-server RAD-GROUP protocol radius
aaa-server RAD-GROUP (outside) host 192.168.1.175
 key cisco
 radius-common-pw cisco
exit
!
!
!
Apply Radius Group to Tunnel-group:
!
tunnel-group admin-con-profile general-attributes
 authentication-server-group RAD-GROUP
!
!
!
Enable Multi-Factor-AUTH:
!
tunnel-group sales-con-profile general-attributes
 secondary-authentication-server-group RAD-GROUP
!
```

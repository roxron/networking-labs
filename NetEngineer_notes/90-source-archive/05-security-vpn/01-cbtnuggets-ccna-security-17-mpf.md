# 17 MPF

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/17 MPF`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Modular Policy Framework (MPF):
!
Permit Application:
!
access-list dmz_mpc permit tcp any any eq ftp 
!
class-map FTP-Class-MAP
 match access-list dmz_mpc
!
policy-map FTP-Policy-MAP
 class FTP-Class-MAP
  inspect ftp 
!
service-policy FTP-Policy-MAP interface dmz
!
!
!
QoS with MPF:
!
priority-queue inside
!
class-map VOIP 
 match dscp 46
!
class-map TELNET
 match port tcp eq telnet 
!
policy-map inside-policy 
 class VOIP 
  priority 
 class TELNET
  police output 8000 1500 conform-action transmit exceed-action drop 
!
service-policy inside-policy interface inside
!
!
!
Tweaking TCP connections with MPF:
!
class-map TCP-Sessions
 match port tcp range 1 65000
!
policy-map Conn-Limits
 class TCP-Sessions 
  set connection conn-max 500 embryonic-conn-max 50
  set connection timeout embryonic 0:50:00 half-closed 0:10:00
!
service-policy Conn-Limits interface outside 
!
!
!
```

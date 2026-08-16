# 20 Virtual Firewall contexts

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/20 Virtual Firewall contexts`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Backup current config:
!
ASA(config)# copy startup-config backup-4-2.txt
!
!
Verify current mode for Virtual Firewall:
!
ASA# show mode
!
!
Change to multiple mode:
!
ASA(config)# mode multiple
!
!
Verify the System config:
!
ASA# show running-config
!
!
Change to the specific context:
!
ASA# changeto context admin 
!
!
Change back to context System:
!
ASA# changeto context system 
!
!
Verify the admin config:
!
ASA# more flash:/admin.cfg
!
!
!
Create addtional context:
!
mac-address auto 
!
class Silver 
 limit-resource xlates 75 
 limit-resource asdm 2
 limit-resource hosts 100
 limit-resource conns 1000
 limit-resource ssh 5 
 limit-resource telnet 2
!
context Ctx-2 
 member Silver 
 allocate-interface GigabitEthernet2 ctx2_inside invisible
 allocate-interface GogibitEthernet3 ctx2_outside invisible 
 config-url disk0:/ctx2.cfg
!
!
```

# 07 IOS FIlrewall Fundamentals

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/07 IOS FIlrewall Fundamentals`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring Reflexive ACL:
!
R1(config)# ip access-list extended GOIN_OUT 
R1(config-ext-nacl)# permit tcp any any reflect REMEMBER 
R1(config-ext-nacl)# permit udp any any reflect REMEMBER 
R1(config-ext-nacl)# permit icmp any any reflect REMEMBER
R1(config-ext-nacl)# permit ip any any reflect REMEMBER 
R1(config-ext-nacl)# exit
R1(config)# ip access-list extended GOING_IN
R1(config-ext-nacl)# evaluate REMEMBER 
R1(config-ext-nacl)# deny ip any any log 
R1(config-ext-nacl)# exit
R1(config)# interface g0/0
R1(config-if)# ip access-group GOING_OUT out 
R1(config-if)# ip access-group GOING_IN in 
!
R1# show ip access-list
! 
!
Configuring CBAC:
!
R1(config)# ip access-list extended DENY 
R1(config-ext-nacl)# deny ip any any log 
R1(config-ext-nacl)# exit
R1(config)# interface G0/0 
R1(config-if)# ip access-group DENY in
R1(config-if)# exit
R1(config)# ip inspect name REMEMBER TCP 
R1(config)# ip inspect name REMEMBER UDP
R1(config)# ip inspect name REMEMBER ICMP 
R1(config)# interface G0/0
R1(config-if)# ip inspect REMEMBER out 
R1(config-if)# end
R1# show ip inspect interfaces
R1# show ip inspect session 
R1#
```

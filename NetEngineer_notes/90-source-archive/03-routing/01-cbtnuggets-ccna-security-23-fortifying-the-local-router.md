# 23 Fortifying the local router

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/23 Fortifying the local router`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Show commands:
!
R1# show privilege 
!
R1(config)# enable secret level 15 0 cisco123
R1(config)# enable secret level 15 5 $@#@#jhuhg43.fUHF.2423.!!2,.#@
R1(config)# enable secret 5 $@#@#jhuhg43.fUHF.2423.!!2,.#@
!
!
R1(config)# enable secret level 4 0 pass4level4
R1(config)# privilege exec level 4 ping 
!
!
Alias:
!
R1# show alias 
!
R1(config)# alias exec c config t
!
!
Secure Lines:
!
R1(config)# line console 0
R1(config-line)#password cisco
R1(config-line)# login 
R1(config-line)# line aux 0
R1(config-line)# password cisco
R1(config-line)# login 
R1(config-line)# line vty 0 4
R1(config-line)# password cisco
R1(config-line)# login 
!
R1(config)# service password-encryption
!
!
!
Using Local Database:
!
R1(config)# username admin privilege 15 secret 0 cisco123
R1(config)# username user privilege 5 secret 0 cisco5
!
R1(config)# line vty 0 15
R1(config-line)# login local 
R1(config-line)# exit 
!
!
!
AAA: 
!
R1(config)# aaa new-model
!
R1(config)# aaa authentication login default local 
!
R1(config)# aaa authorization exec default local
!
R1(config)# aaa authorization console 
!
R1# debug aaa
!
!
Custome method list:
!
R1(config)# aaa authentication login CON-AUTHEN group tacacs+ enable 
R1(config)# aaa authorization exec CON-AUTHOR none
!
R1(config)# line vty 0 15
R1(config-line)# login authentication AUTH 
!
!
!
Enforce minimum length passwords:
!
R1(config)# security passwords min-lenth 8 
!
!
!
protect from brute force attacks:
!
R1(config)# aaa local authentication attempts max-fail 3
R1(config)# 
!
R1# show aaa local user lockout 
!
R1# clear aaa local user lockout all 
!
!
!
Block users with failture attempts: 

R1(config)# login block-for 300 attemts 10 within 30 
!
R1# show login
!
!
!
Enable HTTPS connection to the Router:
!
R1(config)# ip domain name ciscolab.lab
R1(config)# cryto key genarate rsa general-key modulus 1024
R1(config)# ip http secure-server
R1(config)# ip http authentication local
R1(config)# line vty 0 15
R1(config-line)# transport input ssh 
R1(config-line)# end
!

!
```

# 13 Fortifying the Local Router

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/13 Fortifying the Local Router`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Objectives:
- Enable Secret 
- Usernames
- Privilege Levels
- locking down Access Methods
- AAA
!
Configuring Enaable Secret:
!
R1> enable
R1# show privilege
R1# conf t 
R1(config)# enable secret level 15 0 cisco123
R1(config)# enable secret level 15 5 cisco123
R1(config)# enable secret 5 cisco123
R1(config)# enable secret level 4 0 pass4level4
R1(config)# enable secret level 4 5 password4lowerlevels
!
R1(config)# privilege exec level 4 ping show ip interface brief
!
R1# show alias
R1# 
!
Secure Lines: 
!
R1(config)# line console 0
R1(config-line)# password cisco
R1(config-line)# login 
R1(config-line)# exit
!
R1(config)# line aux 0
R1(config-line)# password cisco
R1(config-line)# login 
R19config-line)# exit
!
R1(config)# line vty 0 15 
R1(config-line)# password cisco
R1(config-line)# login 
R1(config-line)# exit
R1(config)# service password-encryption 
!
R1# who 

Create Username:
!
R1(config)# username rustem privilege 15 secret 5 cisco
R1(config)# username admin privilege 4 secret 0 user1pass
!
R1(config)# line console 0 
R1(config-line)# login local
R1(config-line)# line  aux 0
R1(config-line)# login local 
R1(config-line)# line vty 0 15 
R1(config-line)# login local 
!

Configuring AAA:
!
R1(config)# aaa new-model 
R1(config)# aaa authentication login default local 
R1(config)# aaa authorization exec default local 
R1(config)# aaa authorization console 
!
R1# debug aaa authentication 
R1# debug aaa authrization 
!
!
Create custom AUTH & AUTHOR lists:
!
R1(config)# aaa authenticaation login CON_AUTHEN group tacacs+ enable 
R1(config)# aaa authorizatiopn exec CON_AUTHOR none
!
R1(config)# line console 0
R1(config-line)# login authentication CON_AUTHEN
R1(config-line)# authorization exec CON_AUTHOR
!
!
Enforce the minimal length of password:
!
R1(config)# security passwords min-length 8
!
Max auth attempts:
!
R1(config)# aaa local authentication attemps max-fail 3
!
R1# show aaa local user lockout 
R1# clear aaa local user lockout all 
R1# 
!
Block an user for certain amout of time:
!
R1(config)# login block-for 300 attempts 10 within 60
!
!
Configure HTTP and HTTPS for managing a router:
!
R1(config)# ip domain-name ccna.lab
R1(config)# crypto key generate rsa general-key modulus 1024
R1(config)# ip http server 
R1(config)# ip http secure-server 
R1(config)# ip http authentication local 
R1(config)# line vty  0 15 
R1(config-line)# transport input ssh
R1#
```

# 14 Using AAA

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/14 Using AAA`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure AAA:
!
R1(config)# enable secret cisco
R1(config)# username rustem privilege 15 secret cisco
!
R1(config)# aaa new-model 
!
R1(config)# tacacs-server host 192.168.1.252
R1(config)# tacacs-server key cisco123
!
R1(config)# aaa authentication login default group tacacs= local
!
R1(config)# aaa authentication login FREE-BIRD none
!
R1(config)# line console 0
R1(config-line)# login authentication FREE-BIRD
!
R1(config)# aaa authorization commands 1 TAC1 group tacacs+ local
R1(config)# aaa authorization commands 15 TAC15 group tacacs+ local
R1(config)# aaa authorization commands config-commands
!
R1(config)# aaa accounting commands 1 TAC-act1 start-stop group tacacs+
R1(config)# aaa accounting commands 15 TAC-act15 start-stop group tacacs+
!
R1(config)# line vty 0 15
R1(config-line)# authorization commands 1 TAC1
R1(config-line)# authorization commands 15 TAC15
R1(config-line)# accounting 1 TAC-act1
R1(config-line)# accounting 15 TAC-act15 
!
Verify AAA:
R1# debug tacacs 
R1# debug aaa authentication 
R1# debug aaa authrization 
R1# debug aaa accounting
```

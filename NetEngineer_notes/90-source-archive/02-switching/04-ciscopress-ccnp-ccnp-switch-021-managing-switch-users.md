# 021 Managing Switch Users

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP SWITCH/021 Managing Switch Users.txt`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Chapter 22. Managing Switch Users:
!
Configuring Authentication:
!
Switch(config)# aaa new-model
Switch(config)# username lastresort  password  MySecretP@ssw0rd
Switch(config)# tacacs-server host 192.168.10.10 key t@c@csk3y
Switch(config)# tacacs-server host 192.168.10.11 key t@c@csk3y
Switch(config)# aaa group server tacacs+ myauthservers
Switch(config-sg)# server 192.168.10.10
Switch(config-sg)# server 192.168.10.11
Switch(config-sg)# exit
Switch(config)# aaa authentication login myauth group myauthservers local
Switch(config)# line vty 0 15
Switch(config-line)# login authentication myauth
!
!
Configuring Authorization;
!
Switch(config)# aaa authorization exec default group myauthservers none
!
!
Configuring Accounting:
!
Switch(config)# aaa accounting exec default start-stop group myauthservers
Switch(config)# aaa accounting commands 15 default start-stop group myauthservers
```

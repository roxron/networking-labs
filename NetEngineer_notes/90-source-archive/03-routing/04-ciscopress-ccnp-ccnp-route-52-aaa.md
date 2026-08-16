# 52 AAA

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/52 AAA`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
AAA Configuration for Authenticating Remote Logins:
!
aaa new-model
aaa authentication login ADMIN group tacacs+ local
!
username kevin secret cisco
!
tacacs server CISCO-ACS
address ipv4 192.168.0.40
key cisco
!
line vty 0 4
login authentication ADMIN


Addional:
Configure AAA Authentication with TACACS+ server

aaa new-model
!
tacacs server MYTACACS
 address ipv4 192.168.0.2
 key gns3
!
aaa group server tacacs+ AUTH_GROUP
 server name MYTACACS
!
aaa authentication login default group AUTH_GROUP local
aaa authentication enable default group AUTH_GROUP enable
!
line console 0
 login authentication default 
!
line vty 0 15
 login authentication default 
 transport input ssh
```

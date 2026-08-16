# Basic Configuration Commands1

> Imported source note. Provenance: `NetEngineer_Journal/Basic Configuration Commands1`  
> Original source context: Journal root. Content is preserved as historical study material; validate commands against the target platform and release.

```text
username logmein privilege 15 secret nologin
vrf definition MGMT
 rd 1:1
 !
 address-family ipv4
 exit-address-family
!
ip domain-name ccnpswitch.lab
ip domain lookup
ip name-server vrf MGMT 10.100.0.6  
!
crypto key generate  rsa  general-keys modulus 1024
!
aaa new-model
!
tacacs server TAC1
 address ipv4 10.100.0.5
 key gns3
!
tacacs server TAC2
 address ipv4 10.100.0.4
 key gns3
!
aaa group server tacacs+ AAA_TAC
 server name TAC1
 server name TAC2
 ip vrf forwarding MGMT
aaa authentication login AUTH group AAA_TAC
!
line con 0
 privilege level 15
login authentication AUTH
line aux 0
line vty 0 4
 privilege level 15
 transport input telnet ssh
 login authentication AUTH
line vty 5 15
 privilege level 15
 transport input telnet ssh
 login authentication AUTH
!
clock timezone EDT -5
clock summer-time EDT recurring
!
ntp server vrf MGMT 10.100.0.1 prefer key 1
ntp authentication-key 1 md5 cisco
ntp authenticate
ntp trusted-key 1
!
ip access-list standard SNMP_MANAGER
 permit host 10.100.0.10
 exit
!
snmp-server view ALL iso included
snmp-server group SNMP v3 priv read ALL access SNMP_MANAGER
snmp-server user RUSTEM SNMP v3 auth md5 cisco12345 priv des cisco12345
snmp-server host 10.100.0.10 version 3 priv RUSTEM
!
interface GigabitEthernet3/3
 description Connection to MNGT 
 no switchport
 vrf forwarding MGMT
```

# OOB Prep Config for Cisco Network Devices

> Imported source note. Provenance: `NetEngineer_Journal/OOB Prep Config for Cisco Network Devices`  
> Original source context: Journal root. Content is preserved as historical study material; validate commands against the target platform and release.

```text
enable secret nologin 
username logmein privilege 15 secret nologin
service password-encryption 
service timestamps log datetime msec
banner login #UNAUTHORIZED ACCESS PROHIBTED!#
ip domain lookup
ip domain name dcp.lab
ip name-server vrf MNGT 10.100.0.10
crypto key generate rsa general-keys modulus 1024
ip ssh  version 2
ip ssh authentication-retries 1
ip ssh  time-out 30
aaa new-model
radius server RADIUS		
address ipv4 10.100.0.10 auth-port 1812 acct-port 1813
key nologin
exit
aaa group  server radius AAA_RAD
server name RADIUS
ip vrf  forwarding MNGT
exit
aaa authentication login AUTH group AAA_RAD local
ip access-list standard MNGT_ONLY
permit 10.100.0.0 0.0.0.255
exit
line console 0
logging synchronous
login  authentication AUTH
exit
line  vty 0 15
transport input  ssh 
no access-class MNGT_ONLY in	
login authentication AUTH
exit
exit
copy running-config startup-config	
!
!
vrf definition MNGT
rd  1:1
address-family  ipv4
exit
exit
interface g3/0
description Connection to MNGT
no switchport
vrf forwarding MNGT 
no shutdown 

create user "freeradius"@"localhost" identified by "roxron";

grant all on radius.* to "freeradius"@"localhost" identified by "radius123";

test  aaa group AAA_RAD rustem roxron legacy
```

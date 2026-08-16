# Basic Configuration Commands

> Imported source note. Provenance: `NetEngineer_Journal/Basic Configuration Commands`  
> Original source context: Journal root. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Basic Secure Configurations:
!
1: Enable Secret 
!
2: Username with 15 Priv
!
3: Service Password-encryption 
!
4: Service Timestamp 
!
5: Banner on Login
!
6: Domain Lookup 
!
7: Domain Name 
!
8: Name Server 
!
9: Generate RSA
!
10: SSH : Version, Timeouts, Retries 
!
11: Enable AAA
!
12: Configure Raduis or TACACS+
!
13: AAA Group
!
14: AAA Authentication 
!
15: Consle and VTY line Logins 
!
16: Make sure All Network Devices only will be accessed by MNGT IP network
!
!
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
address ipv4 10.100.0.10
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
access-class MNGT_ONLY in	
login authentication AUTH
exit
exit
copy running-config startup-config
```

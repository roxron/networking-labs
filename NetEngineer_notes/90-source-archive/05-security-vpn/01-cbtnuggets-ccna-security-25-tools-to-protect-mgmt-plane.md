# 25 Tools to Protect MGMT Plane

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/25 Tools to Protect MGMT Plane`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Parser Views:
!
R1(config)# aaa new-model 
R1(config)# enable view 
R1# show parser view
!
R1(config)# parser view help-desk 
R1(config-view)# secret cisco-hd
R1(config-view)# commands exec include all show ip 
R1(config-view)# commands exec include show version 
R1(config-view)# commands exec include show
R1(config-view)# commands exec include logout
R1(config-view)# username bob view help-desk priviledge 15 secret cisco-bob 
R1(config-view)# exit
R1(config)# aaa authentication login VTY-Authen	local
R1(config)# aaa authorization exec VTY-Author local 
R1(config)# line vty 0 15
R1(config-line)# login authentication VTY-Authen 
R1(config-line)# authorization exec VTY-Author 
!
!
!
Control Plane Host: 
!
R1(config)# control-plane host 
R1(config-cp-host)# management interface fa2/0 allow ssh http https 
!
!
!
Cisco Configuration Professional (CCP)
!
R1(config)# ip http server
R1(config)# ip http secure-server
R1(config)# ip http authentication local 
R1(config)# username admin privilege 15 secret cisco 
!
!
!
Security Audit:
!
Perform within CCP!
!
!
!
NTPv3, OOB Syslog, Unicast RPF.
!
!
!
SNMPv3
!
!
!
Secure Boot
!
R1(config)# secure boot-image
R1(config)# secure boot-config
!
R1# show secure bootset 
!
```

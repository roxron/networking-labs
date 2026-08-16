# 27 AAA Review Assessment

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/27 AAA Review Assessment`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1# show clock 

* - not authorotative 
. - authorotative, but not sync
( ) - authorotative 
!
!
!
SNMPv3:
!
R1(config)# access-list 1 permit host 192.168.1.92
!
R1(config)# snmp-server group OUR-GROUP v3 priv read write 
!
R1(config)# snmp-server user admin OUR-GROUP v3 auth sha Nugget!23 priv aes 256 Nugget!23 access 1
!
R1# show snmp 
!
!
Move ping command to level 7:
!
R1(config)# privilege exec level 7 ping 
!
R1(config)# username bob secret Nugget!23 
R1(config)# username bob privilege 7 
!
!
!
Configure Auto-command:
!
R1(config)# username bob autocommand ping 
!
R1(config)# usename bob nohangup 
!
R1# who 
R1# clear line 3
!
```

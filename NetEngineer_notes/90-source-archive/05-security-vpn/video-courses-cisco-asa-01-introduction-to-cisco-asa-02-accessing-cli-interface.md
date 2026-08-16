# 02 Accessing CLI interface

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CIsco ASA/01 IntroDuction to Cisco ASA/02 Accessing CLI interface`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CIsco ASA / 01 IntroDuction to Cisco ASA. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Initial Configuration:
!
Console
Managemr Port ( has default IP address 192.168.1.1/24 
!
!
Configure Telnet CLI Access:
!
asa(config)# telnet 10.1.1.0 255.255.255.0 inside
!
!
Configure SSH CLI Access:
!
asa(config)# crypto key generate rsa modulus 1024
asa(config)# ssh 10.1.1.0 255.255.255.0 inside
asa(config)# ssh version 2
asa(config)# write memory 
!
Configure Local AAA:
!
asa(config)# aaa authentication ssh console LOCAL
asa(config)# username admin password ciscoasa12345
!
```

# 19 Active-Standby Failover

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/19 Active-Standby Failover`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring Active:
!
Configure Interfaces for failover:
!
ASA(config)# interface g0/3
ASA(config-if)# no shut 
!
ASA(config)# interface g0/4
ASA(config)# no shutdown
!
!
Configure interface for subnets:
!
ASA(config)# interface g0/1 
ASA(config)# ip address 172.16.0.1 255.255.25.0 standby 172.16.0.2
!
ASA(config)# interface G0/0
ASA(config-if)# ip address 10.0.0.1 255.255.255.240 standby 10.0.0.2
!
!
Failover LAN
! 
ASA(config)# failover lan interface fail-1 g0/3
ASA(config)# failover interface ip fail-1 10.1.1.1 255.255.255.252 standby 10.1.1.2
ASA(config)# failover key cisco 
!
!
Stateful failover:
!
ASA(config)# failover link fail-2 g0/4
ASA(config)# failover interface ip fail-2 10.2.2.1 255.255.255.252 standby 10.2.2.2
!
!
Failover MAC addresses configured:
!
ASA(config)# failover mac address G0/1 0000.1111.2222 0000.3333.4444
!
!
Replicate HTTP: 
!
ASA(config)# failover replication http
!
!
Set Primary:
!
ASA(config)# failover lan unit primary
!
!
Change the Prompt:
!
ASA(config)# prompt hostname priority state
!
!
Enable Failover:
!
ASA(config)# failover
!
!
Verification:
!
ASA# show failover 
!
!
!
Configuring Standby:
!
ASA1(config)# interface G0/3
ASA1(config-if)# no shutdown
ASA1(config-if)# failover lan inteface fail-1 g0/3
ASA1(config-if)# failover interface ip fail-1 10.1.1.1 255.255.255.252 stanby 10.1.1.2 
ASA1(config-if)# failover key cisco
ASA1(config-if)# failover lan unit secondary 
ASA1(config-if)# failover 
!
!
!
Manually switch failover state:
!
ASA(config)# no failover active 
!
!
```

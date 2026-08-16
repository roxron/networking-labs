# 21 Active Active Failover

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/21 Active Active Failover`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring primary failover:
!
ASA1/Ctx-1(config)# changeto context system 
!
ASA1(config)# failover group 1
ASA1(config-fover-group)# primary
ASA1(config-fover-group)# preemt 120 
ASA1(config-fover-group)# exit 
ASA1(config)#
!
ASA1(config)# failover group 2 
ASA1(config-fover-group)# secondary 
ASA1(config-fover-group)# preempt 120
ASA1(config-fover-group)# exit
ASA1(config)# 
!
!
ASA1(config)# context Ctx-1 
ASA1(config-ctx)# join-faiover-group 1
!
ASA1(config)# contex Ctx-2
ASA1(config-ctx)# join-faiover-group 2
!
!
Configuring LAN failover:
!
ASA1(config)# interface g4 
ASA1(config-if)# no shutdown 
!
ASA1(config)# interface g5
ASA1(config-if)# no shutdown 
!
ASA1(config)# failover lan unit primary 
!
ASA1(config)# failover lan interface fail-config g4 
!
ASA1(config)# failover link fail-state g5
!
ASA1(config)# failover interface ip fail-config 1.1.1.1 255.255.255.252 standby 1.1.1.2
ASA1(config)# failover interface ip fail-state 2.2.2.1 255.255.255.252 standby 2.2.2.2
!
ASA1(config)# prompt hostnane context state 
!
!
Configuring contexts: 
!
ASA1(config)# changeto contexst Ctx-1
ASA1/Ctx-1(config)# 
!
ASA1/Ctx-1(config)# interface g1
ASA1/Ctx-1(config-if)# ip address 10.0.0.1 255.255.255.0 standby 10.0.0.2 
!
ASA1/Ctx-1(config)# interface g3 
ASA1/Ctx-1(config-if)# mac-address 0000.1111.2222 standby 0000.2222.3333
ASA1/Ctx-1(config-if)# ip address 192.168.1.171 255.255.255.0 standby 192.168.1.181
ASA1/Ctx-1(config)#
!
!
ASA1/Ctx-1(config)# changeto context Cxt-2
ASA1/Ctx-2(config)#
!
ASA1/Ctx-2(config)# interface g2
ASA1/Ctx-2(config-if)# ip address 10.2.2.1 255.255.255.0 standby 10.2.2.2 
!
ASA1/Ctx-2(config)# interface g3 
ASA1/Ctx-2(config-if)# mac-address 1111.1111.2222 standby 1111.2222.3333
ASA1/Ctx-2(config-if)# ip address 192.168.1.172 255.255.255.0 standby 192.168.1.182
ASA1/Ctx-2(config)#
!
ASA1/Ctx-2(config)# changeto context system 
!
ASA1(config)# write mem all
!
!
ASA1(config)# show failover state
!
ASA1(config)# show failover 
!
!
!
Configuring Secondary failover:
!
ASA2(config)# show interface ip brief 
ASA2(config)# show mode 
ASA2(config)# dir *.cfg
ASA2(config)# del *.cfg 
!
ASA2(config)# interface g4
ASA2(config-if)# no shutdown
!
ASA2(config)# failover lan interface fail-config g4
ASA2(config)# failover interface ip fail-config 1.1.1.1 255.255.255.252 standby 1.1.1.2
ASA2(config)# failover 
!
!
ASA1(config)# prompt hostname priority context state 
!
!
!
Configuring ASR groups:
!
failover exec active interface g1
 failover exec active asr-group 1
failover exec active interface g3
 failover exec active asr-group 2
!
!
Configuring ASA to be active for both groups:
!
ASA1/pri/act(config)# failover active
!
!
Configuring ASA to be active for specific group:
!
ASA1/pri/act/config)# failover active group 2
!
!
```

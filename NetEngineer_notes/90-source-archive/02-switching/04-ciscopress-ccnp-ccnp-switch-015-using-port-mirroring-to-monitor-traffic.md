# 015 Using Port Mirroring to Monitor Traffic

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP SWITCH/015 Using Port Mirroring to Monitor Traffic.txt`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Chapter 16. Using Port Mirroring to Monitor Traffic
!
Local SPAN Configuration:
!
Switch(config)# monitor session 1 source interface gigabitethernet1/0/1 both
Switch(config)# monitor session 1 destination interface gigabitethernet1/0/48
!
SPAN Filter:
!
Switch(config)# monitor session 1 filter vlan 10
!
Remote SPAN Configuration:
!
SW1(config)# vlan 99 
SW1(config-vlan)# remote-span 
SW1(config-vlan)# exit
SW1(config)# monitor session 1 source interface G0/1 both 
SW1(config)# monitor session 1 destination remote vlan 99
!
SW2(config)# vlan 99 
SW2(config-vlan)# remote-span 
SW2(config-vlan)# exit
SW2(config)# monitor session 1 source remote vlan 99 
SW2(config)# monitor session 1 destination interface G0/5 both 
!
Managing SPAN Sessions:
!
Switch# show running-config | include monitor
Switch# show monitor
```

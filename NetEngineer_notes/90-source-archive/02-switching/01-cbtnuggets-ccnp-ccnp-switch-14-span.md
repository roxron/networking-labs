# 14 SPAN

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP SWITCH/14 SPAN`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
SPAN Configuration:
SW2(config)# monitor session 1 source interface G0/10 
SW2(config)# monitor session 1 destiation interface G0/5

SW2# show monitor session 1 

RSPAM Configuration:
SW2(config)# vlan 99
SW2(config-vlan)# remote-span 
SW2(config-vlan)# exit
SW2(config)# monitor session 1 source interface G0/10 
SW2(config)# monitor session 1 destination remote vlan 99 reflector-port G0/24

SW1(config)# vlan 99 
SW1(config-vlan)# remote-spam
SW1(config-vlan)# exit
SW1(config)# monitor session 1 source remote vlan 99
SW1(config)# monitor session 1 destination interface G0/5
SW1(confgi)#
```

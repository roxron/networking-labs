# 06 Switchport Monitoring with SPAN and RSPAN

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/06 Switchport Monitoring with SPAN and RSPAN`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
SPAN Configuration:
S1(config)# monitor session 1 source interface g0/5 both 
S1(config)# monitor session 1 destination g0/10 

RSPAN Configuration:
S1(config)# vlan 999 
S1(config-vlan)# remote-span
S1(config-vlan)# exit
S1(config)# monitor session 1 source interface G0/5 
S1(config)# monitor destination remote vlan 999 reflector-port g0/24
!
S2(config)# vlan 999
S2(config-vlan)# remote-span 
S1(config-vlan)# exit
S1(config)# monitor session 2 source remote vlan 999 
S1(config)# monitor session 2 destination g0/10
```

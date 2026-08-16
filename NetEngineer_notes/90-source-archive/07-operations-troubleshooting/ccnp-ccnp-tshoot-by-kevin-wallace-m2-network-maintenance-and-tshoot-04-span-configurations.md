# 04 SPAN Configurations

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CCNP/CCNP TSHOOT by Kevin Wallace/M2  Network Maintenance and Tshoot/04 SPAN Configurations`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CCNP / CCNP TSHOOT by Kevin Wallace / M2  Network Maintenance and Tshoot. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Confugre SPAN:
!
SW1(config)# monitor session 1 source interface G0/0 both 
SW1(config)# monitor session 1 destination interface G0/10 
!
SW1# show monitor sesion 1
!
!
Configure Remote SPAN:
!
SW1(config)# vlan 50 
SW1(config-vlan)# remote-span
!
SW1(config)# monitor session 2 source interface G0/0
SW1(config)# monitor session 2 destination remote vlan 50 
!
!
SW2(config)# vlan 50 
SW2(config-vlan)# remote-span 
!
SW2(config)# monitor session 2 source remote vlan 50 
SW2(config)# monitor session 2 destination interface g0/10 
!
```

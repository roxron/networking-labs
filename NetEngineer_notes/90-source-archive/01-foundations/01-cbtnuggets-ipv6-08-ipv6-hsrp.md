# 08 IPV6 HSRP

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/IPV6/08 IPV6 HSRP`  
> Original source context: 01 CBTNUGGETS / IPV6. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# interface G0/0
R1(config-if)# standby version 2
R1(config-if)# standby 1 ipv6 fe80::20
R1(config-if)# standby 1 priority 101
R1(config-if)# standby 1 preempt 
R1(config-if)# exit

R2(config)# inteface g0/0
R2(config-if)# standby version 2
R2(config-if)# standby 1 ipv6 fe80::20
R2(config-if)# standby 1 priority 99
R2(config-if)# standby 1 preempt 

R1# show standby 
R1# show standby brief
```

# 07 HSRP

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN2/07 HSRP`  
> Original source context: 03 NETACAD / ICDN2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring HSRP
setup active gateway
R1(config)# interface G0/0
R1(config-if)# ip address 10.0.1.2 255.255.255.0
R1(config-if)# standby version 2
R1(config-if)# standby 1 ip 10.0.1.1 
R1(config-if)# standby 1 priority 150
R1(config-if)# standby 1 preempt 
R1(config-if)# no shutdown

setup standby gateway:
R2(config)# interface G0/0
R2(config-if)# ip address 10.0.1.3 255.255.255.0
R2(config-if)# standby version 2
R2(config-if)# standby ip 10.0.1.1 
R2(config-if)# no shutdown 

Verify HSRP:
R1# show standby 
R2# show standby brief

R1# debug standby packets
```

# 07 FHRP Configuration

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP SWITCH/07 FHRP Configuration`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure HSRP:
on Active
SW1(config)# interface vlan 10
SW1(config-if)# standby 10 ip 192.168.10.1
SW1(config-if)# standby 10 priority 150
SW1(config-if)# standby 10 preempt delay reload 60 
SW1(config-if)# standby 10 track G0/1 20
SW2(config-if)# standby 10 timers msec 200 msec 700 
On Standby
SW2(config)# interface vlan 10 
SW2(config-if)# standby 10 ip 192.168.10.1
SW2(config-if)# standby 10 track G0/1 20
SW2(config-if)# standby 10 preempt delay reload 60
SW2(config-if)# standby 10 timers msec 200 msec 700

SW1# show standby 
SW1# show standby brief



Configure VRRP:
On Master:
SW1(config)#inteface vlan 5
SW1(config-if)# vrrp 5 ip 192.168.5.1
SW1(config-if)# vrrp 5 priority 110
SW1(config-if)# vrrp 5 preempt delay reload 60
SW1(config-if)# vrrp 5 timers advertise msec 50
SW2(config)# exit
SW1(config)# track 50 interface G0/1 line-protocol
SW2(config)# interface vlan 5 
SW2(config-if)# vrrp 5 track 50 decrement 20
On BAckup
SW2(config)# interface vlan 5
SW2(config-if)# vrrp 5 ip 192.168.5.1 
SW2(config-if)# vrrp 5 preempt delay reload 60
SW2(config-if)# vrrp 5 timers learn 

SW1# show vrrp 


Configuring GLBP:
On AVG/AVF
SW1(config)# inteface vlan 30
SW1(config-if)# glbp 30 ip 192.168.30.1
SW1(config-if)# glbp 30 priority 150 
SW1(config-if)# glbp 30 timers msec 50 msec 150
SW1(config-if)# 

On AVF
SW2(config)# interface vlan 30 
SW2(config-if)# glbp 30 ip 192.168.30.1
SW2(config-if)# glbp 30 timers msec 50 msec 150 
SW2(config-if)# 

SW1# show glbp
```

# 017 Layer 3 High Availability

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP SWITCH/017 Layer 3 High Availability.txt`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Chapter 18. Layer 3 High Availability:
!
HSRP Configuration:
!
SW1(config)# interface G0/0
SW1(config-if)# standby 10 priority 110 
SW1(config-if)# standby 10 ip 10.0.10.1 
SW1(config-if)# standby 10 timers msec 1 msec 3
SW1(config-if)# standby 10 preemt 
SW1(config-if)# standby 10 authentication cisco
or 
SW1(config-if)# standby 10 authentication md5 key-string cisco
!
SW1(config-if)# standby 10 track 1 decrement 20
!
SW1(config-if)# standby version 2 
SW1(config-if)# standby ipv6 autoconfig 
!
Verify HSRP:
!
SW1# show standby 
SW1# show standby brief 
!
!
Virtual Router Redundancy Protocol:
!
Switch-A(config)# interface vlan 50
Switch-A(config-if)# ip address 192.168.1.10 255.255.255.0
Switch-A(config-if)# vrrp 1 priority 200
Switch-A(config-if)# vrrp 1 ip 192.168.1.1
Switch-A(config-if)# vrrp 2 priority 100
Switch-A(config-if)# no vrrp 2 preempt
Switch-A(config-if)# vrrp 2 ip 192.168.1.2
!
Switch-B(config)# interface vlan 50
Switch-B(config-if)# ip address 192.168.1.11 255.255.255.0
Switch-B(config-if)# vrrp 1 priority 100
Switch-B(config-if)# no vrrp 1 preempt
Switch-B(config-if)# vrrp 1 ip 192.168.1.1
Switch-B(config-if)# vrrp 2 priority 200
Switch-B(config-if)# vrrp 2 ip 192.168.1.2
!
Verify VRRP:
!
Switch-A# show vrrp 
Switch-A# show vrrp brief 
!
!
Gateway Load Balancing Protocol:
!
Switch-A(config)# interface vlan 50
Switch-A(config-if)# ip address 192.168.1.10 255.255.255.0
Switch-A(config-if)# glbp 1 priority 200
Switch-A(config-if)# glbp 1 preempt
Switch-A(config-if)# glbp 1 ip 192.168.1.1
!
Switch-B(config)# interface vlan 50
Switch-B(config-if)# ip address 192.168.1.11 255.255.255.0
Switch-B(config-if)# glbp 1 priority 150
Switch-B(config-if)# glbp 1 preempt
Switch-B(config-if)# glbp 1 ip 192.168.1.1
!
Switch-C(config)# interface vlan 50
Switch-C(config-if)# ip address 192.168.1.12 255.255.255.0
Switch-C(config-if)# glbp 1 priority 100
Switch-C(config-if)# glbp 1 ip 192.168.1.1
!
Switch-A# show glbp 
Switch-A# show glbp brief 
Switch-A# show glbp brief all
```

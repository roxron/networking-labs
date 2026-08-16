# 06 First-Hop Redundancy

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/BOOKS/CCNP SWITCH by Richard Froom/06 First-Hop Redundancy`  
> Original source context: 07 SAFARI ONLINE / BOOKS / CCNP SWITCH by Richard Froom. Content is preserved as historical study material; validate commands against the target platform and release.

```text
HSRP Charactiristics:
Dst. IP address: v1: 224.0.0.2 V2: 224.0.0.102 
UDP: 1985 
! 
Configuring and Tuning HSRP:
!
R1(config)# interface ethernet 0/1
R1(config-if)# ip address 192.168.1.3 255.255.255.0
R1(config-if)# standby 1 ip 192.168.1.1
!
R2(config)# interface ethernet 0/1
R2(config-if)# ip address 192.168.1.2 255.255.255.0
R2(config-if)# standby 1 ip 192.168.1.1
!
!
Configure R2’s HSRP group 1 with priority
!
R2(config)# interface ethernet 0/1
R2(config-if)# standby 1 priority 110
!
!
Configure R1’s and R2’s Ethernet 0/1 HSRP group 1 interfaces with preemption:
!
R1(config)# interface ethernet 0/1
R1(config-if)# standby 1 preempt
!
R2(config)# interface ethernet 0/1
R2(config-if)# standby 1 preempt
!
!
Verify HSRP:
!
R1# show standby 
R1# show standby brief 
!
!
Load Sharing with HSRP:
!
Switch1(config)# spanning-tree vlan 10 root primary
Switch1(config)# spanning-tree vlan 20 root secondary
Switch1(config)# interface vlan 10
Switch1(config-if)# ip address 10.1.10.3 255.255.255.0
Switch1(config-if)# standby 10 ip 10.1.10.1
Switch1(config-if)# standby 10 priority 110
Switch1(config-if)# standby 10 preempt
Switch1(config-if)# exit
Switch1(config-if)# interface vlan 20
Switch1(config-if)# ip address 10.1.20.3 255.255.255.0
Switch1(config-if)# standby 20 ip 10.1.20.1
Switch1(config-if)# standby 20 priority 90
Switch1(config-if)# standby 20 preempt
!
Switch2(config)# spanning-tree vlan 10 root secondary
Switch2(config)# spanning-tree vlan 20 root primary
Switch2(config)# interface vlan 10
Switch2(config-if)# ip address 10.1.10.3 255.255.255.0
Switch2(config-if)# standby 10 ip 10.1.10.1
Switch2(config-if)# standby 10 priority 90
Switch2(config-if)# exit
Switch2(config-if)# interface vlan 20
Switch2(config-if)# ip address 10.1.20.3 255.255.255.0
Switch2(config-if)# standby 20 ip 10.1.20.1
Switch2(config-if)# standby 20 priority 110
Switch2(configif)# standby 20 preempt
!
!
The Need for Interface Tracking with HSRP:
!
R2(config)# interface ethernet 0/1
R2(config-if)# ip address 192.168.10.2
R2(config-if)# standby 10 ip 192.168.10.1
R2(config-if)# standby 10 priority 110
R2(config-if)# standby 10 preempt
R2(config-if)# standby 10 track ethernet1/1 20
!
R2# show track
!
!
HSRP and Object Tracking:
!
R2(config)# ip sla 10
R2(config-ip-sla)# icmp-echo 192.168.3.2
R2(config-ip-sla-echo)# frequency 5
R2(config-ip-sla-echo)# ip sla schedule 10 life forever start-time now
!
R2(config)# track 100 ip sla 10
!
R2(config)# interface ethernet 0/1
R2(config-if)# standby 1 track 100 decrement 20
!
R2# show track
!
!
Configuring HSRP Authentication
!
Plain-text authentication:
!
Switch(config-if)# standby group authentication string
!
!
MD5 authentication:
!
Switch(config-if)# standby group authentication md5 key-string [0 | 7] string
!
!
To configure MD5 authentication using key chains:
!
Switch(config)# key chain HSRP
Switch(config-keychain)# key 1
Switch(config-keychain-key)# key-string [0 | 7] string
Switch(config-keychain-key)# exit
Switch(config)# interface Vlan 10 
Switch(config-if)# standby group authentication md5 key-chain HSRP
!
!
Tuning HSRP Timers:
!
switch(config)# interface vlan 10
switch(config-if)# ip address 10.1.1.2 255.255.255.0
switch(config-if)# standby 10 ip 10.1.1.1
switch(config-if)# standby 10 priority 110
switch(config-if)# standby 10 preempt
switch(config-if)# standby 10 timers msec 200 msec 750
switch(config-if)# standby 10 preempt delay minimum 225
!
!
HSRP Versions:
!
Switch(config-if) standby version 2
!
!
!
The Virtual Router Redundancy Protocol (VRRP):
!
VRRP Dst. IP address: 224.0.0.18 
VRRP Protocol Number: 112 
Default Timers: hello interval is 1, Hold time id 3.
!
Configuring VRRP:
!
R1(config)# interface ethernet 0/1
R1(config-if)# ip address 192.168.1.3 255.255.255.0
R1(config-if)# vrrp 1 ip 192.168.1.1
!
R2(config)# interface ethernet 0/1
R2(config-if)# ip address 192.168.1.2 255.255.255.0
R2(config-if)# vrrp 1 ip 192.168.1.1
!
R2(config-if)# vrrp 1 priority 110
!
Verify VRRP:
!
show vrrp 
show vrrp brief
!
!
VRRP Authentication:
!
R1(config)# interface ethernet 0/1
R1(config-if)# vrrp 1 authentication md5 key-string MyVRRP
!
!
Tracking and VRRP:
!
R2(config)#track 1 interface ethernet 0/0 line-protocol
!
R2(config)#interface ethernet 0/1
R2(config-if)#vrrp 1 track 1 decrement 20
!
!
!
Gateway Load Balancing Protocol (GLBP):
!
Dst Ip address: 224.0.0.102 UDP port 3222
!
Configure GLBP:
!
R1(config)# interface ethernet 0/1
R1(config-if)# ip address 192.168.1.3 255.255.255.0
R1(config-if)# glbp 1 ip 192.168.1.1
!
R2(config)# interface ethernet 0/1
R2(config-if)# ip address 192.168.1.2 255.255.255.0
R2(config-if)# glbp 1 ip 192.168.1.1
!
!
R1(config)# interface ethernet 0/1
R1(config-if)# glbp 1 priority 110
R1(config-if)# glbp 1 preempt
!
R2(config)# interface ethernet 0/1
R2(config-if)# glbp 1 preempt
!
Verify GLBP:
!
show glbp 
!
!
GLBP Load-Balancing:
!
SW1(config-if)# glbp 1 load-balancing round-robin 
!
!
GLBP Authentication:
!
Router(config)# interface Ethernet0/1
Router(config-if)# ip address 10.0.0.1 255.255.255.0
Router(config-if)# glbp 1 authentication md5 key-string d00b4r987654321a
Router(config-if)# glbp 1 ip 10.0.0.10
!
!
Tracking and GLBP:
!
S1(config)# track 1 interface GigabitEthernet0/1 line-protocol
S1(config)# track 2 interface GigabitEthernet0/2 line-protocol
S1(config-track)# interface GigabitEthernet 0/0
S1(config-if)# ip address 192.168.1.2 255.255.255.0
S1(config-if)# glbp 1 ip 192.168.1.1
S1(config-if) # glbp 1 priority 110
S1(config-if)# glbp 1 preempt
S1(config-if)# glbp 1 weighing 110 lower 20 upper 50
S1(config-if)# glbp 1 weighing track 1 decrement 50
S1(config-if)# glbp 1 weighing  track 2 decrement 50
!
!
```

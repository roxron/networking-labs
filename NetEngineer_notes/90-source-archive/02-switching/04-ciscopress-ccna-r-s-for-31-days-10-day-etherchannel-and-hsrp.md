# 10 Day EtherChannel and HSRP

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNA R&S for 31 days/10 Day EtherChannel and HSRP`  
> Original source context: 04 CISCOPRESS / CCNA R&S for 31 days. Content is preserved as historical study material; validate commands against the target platform and release.

```text
EtherChannel and HSRP:
!
Configuring EtherChannel:
!
Sw2(config)# interface range g0/1-2
Sw2(config-if-range)# channel-group 1 mode on
Sw2(config-if-range)# interface port-channel 1
Sw2(config-if)# switchport mode trunk
Sw2(config-if)# switchport trunk native vlan 86
Sw2(config-if)# switchport trunk allowed vlan 1,10,20,86
!
!
Verifying the EtherChannel Configuration:
!
Sw2# show run
Sw2# show etherchannel summary 
Sw2# show interface fa0/1 switchport 
Sw2# 
!
!
!
HSRP Configuration and Verification:
!
Configuring HSRP:
!
R1(config)# interface g0/0
R1(config-if)# ip address 10.1.1.1 255.255.0.0
R1(config-if)# standby 1 ip 10.1.1.254
R1(config-if)# standby 1 priority 200
R1(config-if)# standby 1 preempt
!
R2(config)# interface g0/0
R2(config-if)# ip address 10.1.1.2 255.255.0.0
R2(config-if)# standby 1 ip 10.1.1.254
!
!
Verifying HSRP:
!
R1# show standby 
R1# show standby brief 
!
!
Configuring HSRP Load Balancing:
!
R1# show run | begin interface G
interface GigabitEthernet0/0
no ip address
duplex auto
speed auto
!
interface GigabitEthernet0/0.10
encapsulation dot1Q 10
ip address 10.1.10.1 255.255.255.0
standby version 2
standby 1 ip 10.1.10.254
standby 1 priority 150
standby 1 preempt
!
interface GigabitEthernet0/0.20
encapsulation dot1Q 20
ip address 10.1.20.1 255.255.255.0
standby version 2
standby 1 ip 10.1.20.254
!
!
R2# show run | begin interface G
interface GigabitEthernet0/0
no ip address
duplex auto
speed auto
!
interface GigabitEthernet0/0.10
encapsulation dot1Q 10
ip address 10.1.10.2 255.255.255.0
standby version 2
standby 1 ip 10.1.10.254
!
interface GigabitEthernet0/0.20
encapsulation dot1Q 20
ip address 10.1.20.2 255.255.255.0
standby version 2
standby 1 ip 10.1.20.254
standby 1 priority 150
standby 1 preempt
!
```

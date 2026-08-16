# 018  Securing Switch Access

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP SWITCH/018  Securing Switch Access.txt`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Chapter 19. Securing Switch Access:
!
Port Security:
!
Switch(config-if)# switchport port-security
Switch(config-if)# switchport port-security maximum 5
Switch(config-if)# switchport port-security mac-address sticky
Switch(config-if)# switchport port-security mac-address 00AA.51AC.0085
Switch(config-if)# switchport port-security violation protect
!
Switch# clear port-security all
Switch# show port-security interface gigabitethernet 1/0/11
Switch# show interfaces status err-disabled
Switch# show port-security
!
!
Port-Based Authentication 802.1X
!
802.1X Configuration:
!
Switch(config)# aaa new-model
Switch(config)# radius-server host 10.1.1.1 key BigSecret
Switch(config)# radius-server host 10.1.1.2 key AnotherBigSecret
Switch(config)# aaa authentication dot1x default group radius
Switch(config)# dot1x system-auth-control
Switch(config)# interface range gigabitethernet1/0/1 - 40
Switch(config-if)# switchport access vlan 10
Switch(config-if)# switchport mode access
Switch(config-if)# dot1x port-control auto
!
Switch# show dot1x all 
!
!
Using Storm Control:
!
Switch(config)# interface gigabitethernet1/0/1
Switch(config-if)# storm control broadcast level 50
Switch(config-if)# storm control multicast level pps 50k
Switch(config-if)# storm control unicast level 20 10
Switch(config-if)# storm-control action {shutdown | trap}
!
Verify Storm Control:
!
Switch# show storm-control 
!
!
Limit access to HTTPS interface:
!
Switch(config)# ip http secure server
Switch(config)# access-list 1 permit 10.100.50.0 0.0.0.255
Switch(config)# ip http access-class 1
!
Secure VTY line:
!
Switch(config)# access-list 10 permit 192.168.199.10
Switch(config)# access-list 10 permit 192.168.201.100
Switch(config)# line vty 0 15
Switch(config-line)# access-class 10 in
Switch# show user all
!
```

# 06 L3SW+ Etherchannel

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP SWITCH/06 L3SW+ Etherchannel`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
L3 Etherchannel Configuration:
SW2(config)# interface port-channel 1
SW2(config-if)# no switchport 
SW2(config-if)# ip address 172.16.0.1 255.255.255.0
SW2(config-if)# exit
SW2(config)# interface range G0/0-1
SW2(config-if-range)# no switchport
Sw2(config-if-range)# channel-group 1 mode desirable
SW2(config-if-range)# 

SW2# show etherchannel summary 
SW2# show etherchannel load-balance
SW1# show lacp counters
SW1# show lacp neighbors 

Configure Etherchannel Load-balance:
SW2(config)# port-channel load-balance src-mac




default interface range g0/0-3
interface range g0/0-3
switchport trunk encapsulation dot1q
switchport mode trunk
switchport trunk native vlan 2
switchport nonegotiate
channel-group 1 mode auto 
exit
vlan 2
name NATIVE
exit
interface port-channel 1
switchport trunk encapsulation dot1q
switchport mode trunk
switchport trunk native vlan 2
switchport nonegotiate
exit
```

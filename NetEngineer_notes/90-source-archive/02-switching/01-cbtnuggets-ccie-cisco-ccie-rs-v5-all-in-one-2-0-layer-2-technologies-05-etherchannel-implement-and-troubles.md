# 05 Etherchannel  Implement and Troubleshoot

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS v5 All-In-One 2.0 Layer 2 Technologies/05 Etherchannel_ Implement and Troubleshoot`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS v5 All-In-One 2.0 Layer 2 Technologies. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Etherchannel: Implement and Troubleshoot:
!
Configuring L2 PAGP:
!
SW1(config)# interface range F0/0-1
SW1(config-if-range)# channel-group 1 mode desirable 
SW1(config-if-range)# 
!
!
SW2(config)# interface range F0/0-1
SW2(config-if-range)# channel-group 1 mode auto
SW2(config-if-range)# 
!
SW1# show etherchannel summary 
SW1# show pagp counters 
SW1# show pagp neighbors

!
!
Configuring L2 LACP:
!
SW1(config)# interface range F0/0-1
SW1(config-if-range)# channel-group 1 mode active
SW1(config-if-range)# 
!
!
SW2(config)# interface range F0/0-1
SW2(config-if-range)# channel-group 1 mode passive
SW2(config-if-range)# 
!
!
SW1# show lacp counters 
SW1# show lacp neighbors
!
!
Configuring L3 Etherchannel:
!
SW1(config)# interface port-channel 10
SW1(config-if)# no switchport 
SW1(config-if)# ip address 10.1.1.1 255.255.255.0
SW1(config-if)# no shutdown 
!
SW1(config)# interface range F0/0-1
SW1(config-if-range)# no switchport 
SW1(config-if-range)# channel-group 10 mode desirable
!
!
!
SW2(config)# interface port-channel 10
SW2(config-if)# no switchport 
SW2(config-if)# ip address 10.1.1.2 255.255.255.0
SW2(config-if)# no shutdown 
!
SW2(config)# interface range F0/0-1
SW2(config-if-range)# no switchport 
SW2(config-if-range)# channel-group 10 mode auto 
!
Configure STP Etherchaneel misconfiguration feature:
!
SW1(config)# spanning-tree etherchannel guard misconfig
```

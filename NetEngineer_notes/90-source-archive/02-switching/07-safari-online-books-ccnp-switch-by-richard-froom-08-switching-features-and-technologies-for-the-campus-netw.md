# 08 Switching Features and Technologies for the Campus Network

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/BOOKS/CCNP SWITCH by Richard Froom/08 Switching Features and Technologies for the Campus Network`  
> Original source context: 07 SAFARI ONLINE / BOOKS / CCNP SWITCH by Richard Froom. Content is preserved as historical study material; validate commands against the target platform and release.

```text
This chapter covers the following Cisco Catalyst switch features:
 Discovery protocols
 Unidirectional Link Detection 
 Power over Ethernet 
 SDM templates Monitoring features 
 IP SLA
!
!
Discovery Protocols:
!
Basic Configuration of LLDP:
!
To Enable LLDP:
!
SW1(config)# lldp run 
!
!
Disable LLDP on the interface:
!
SW1(config-if)# no lldp receive
SW1(config-if)# no lldp transmit
!
!
Verify LLDP:
!
SW1# show lldp 
SW1# show lldp neighbors 
SW1# show lldp neighbors detail 
SW1# show lldp traffic
!
!
!
Unidirectional Link Detection:
!
UDLD Configuration:
!
udld enable
udld aggressive
!
show udld neighbors
show udld GigabitEthenet1/34
udlc reset
!
!
!
Power over Ethernet:
!
Configuring and Verifying PoE:
!
Enable PoE on interface:
!
SW1(config-if)# power inline auto 
!
Disable PoE:
!
SW1(config-if)# power inline never
!
Verify PoE:
!
SW1# show power inline 
!
!
! 
SDM Templates:
!
SW1# show sdm 
!
SW1# show platform tcam utilization
!
Change SDM Template:
!
SW1(config)# sdm prefer dual-ipv4-and-ipv6 default 
!
!
!
Monitoring Features:
!
SPAN Configuration:
!
Switch1(config)# monitor session 1 source interface GigabitEthernet 0/1
Switch1(config)# monitor session 1 destination interface GigabitEthernet 0/2
Switch1# show monitor
!
!
RSPAN Configuration:
!
SW1(config)# vlan 100
SW1(config-vlan)# name RSPAN-VLAN
SW1(config-vlan)# remote-span
SW1(config-vlan)# exit
SW1(config)# monitor session 2 source interface GigabitEthernet0/1
SW1(config)# monitor session 2 destination remote vlan 100
!
SW2(config)# vlan 100
SW2(config-vlan)# name RSPAN-VLAN
SW2(config-vlan)# remote-span
SW2(config-vlan)# exit
SW2(config)# monitor session 2 destination interface GigabitEthernet 0/2
SW2(config)# monitor session 2 source remote vlan 100
!
SW2# show monitor
!
show vlan remote-span
!
!
!
IP SLA:
!
IP SLA Configuration ICMP-Echo:
!
Switch(config)# ip sla 12
Switch(config-ip-sla)# icmp-echo 192.168.139.134
Switch(config-ip-sla-echo)# frequency 30
Switch(config-ip-sla-echo)# exit
Switch(config)# ip sla schedule 5 start-time now life forever
Switch(config)# end
!
!
Verify IP SLA:
!
Switch# show ip sla configuration 12
Switch# show ip sla statistics 
Switch# show ip sla summary 
!
!
IP SLA Operation with Responder:
!
Configuring Authentication for IP SLA:
!
Switch(config)# key chain MYKEY
Switch(config-keychain)# key 1
Switch(config-keychain-key)# key-string SuperSecretPWD
Switch(config)# ip sla key-chain MYKEY
!
!
IP SLA Example for UDP Jitter:
!
Switch(config)# ip sla 1
Switch(config-ip-sla-jitter)# udp-jitter 192.168.1.2 65000 num-packets 20
Switch(config-ip-sla-jitter)# request-data-size 160
Switch(config-ip-sla-jitter)# frequency 30
Switch(config-ip-sla-jitter)# exit
Switch(config)# ip sla schedule 1 start-time after 00:05:00
!
Router(config)# ip sla responder
!
```

# 014 IP SLA

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP SWITCH/014 IP SLA.txt`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring IP SLA:
!
Configure IP SLA Responder:
!
SW1(config)# ip sla responder 
!
Protect IP SLA with Authentication:
!
SW1(config)# key chain SLA 
SW1(config-keychain)# key 1
SW1(config-keychain-key)# key-string cisco
!
SW1(config)# ip sla key-chain SLA
!
Using IP SLA:
!
Switch(config)# ip sla 100
Switch(config-ip-sla)# icmp-echo 172.25.226.1
Switch(config-ip-sla)# frequency 5
Switch(config-ip-sla)# exit
Switch(config)# ip sla schedule 100 life forever start-time now
!
Switch# show ip sla configuration
Switch# show ip sla statistics aggregated
Switch# show ip sla statistics 100
Switch# show ip sla summary 
!
Configure IP SLA for HSRP:
!
Switch-A(config)# ip sla 10
Switch-A(config-ip-sla)# icmp-echo 192.168.70.1
Switch-A(config-ip-sla)# frequency 5
Switch-A(config-ip-sla)# exit
Switch-A(config)# ip sla schedule 10 life forever start-time now
Switch-A(config)# track 1 ip sla 10 reachability
Switch-A(config)# interface vlan10
Switch-A(config-if)# ip address 192.168.1.3 255.255.255.0
Switch-A(config-if)# standby 1 priority 120
Switch-A(config-if)# standby 1 track 1 decrement 30
Switch-A(config-if)# standby 1 preempt
Switch-A(config-if)# no shutdown
!
```

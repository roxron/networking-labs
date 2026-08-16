# 08  Aggregating Switch Links

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP SWITCH/08  Aggregating Switch Links.txt`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Chapter 10. Aggregating Switch Links:
!
Configuring EtherChannel Load Balancing:
!
SW1(config)# port-channel load-balance src-dst-ip 
!
SW1# show etherchanel load-balance 
!
Configure PAgP:
!
SW1(config)# interface range g0/0-3 
SW1(config-if)# channel-protocol pagp 
SW1(config-if)# channel-group 1 mode desirable no-silent 
!
Configure LACP:
!
SW1(config)# lacp system-priority 100 
SW1(config)# interface range g0/0-3
SW1(config-if)# channel-protocol lacp 
SW1(config-if)# channel-group 1 mode active 
SW1(config-if)# lacp port-priority 100 
SW1(config-if)# exit 
!
Avoiding Misconfiguration with EtherChannel Guard:
!
SW1(config)# spanning-tree etherchannel guard misconfig 
!
SW1# show interface status err-disabled 
!
Troubleshooting an EtherChannel:
!
show etherchannel summary 
show etherchannel port 
show etherchannel port-channel 
show etherchannel detail 
show etherchannel load-balance 
show etherchannel port-channel 
show pagp neighbor 
show lacp neighbor 
show lacp sys-id 
show running-config interface port-channel 1
show interface G0/0 etherchannel
!
```

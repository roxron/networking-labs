# 016 Understanding High Availability

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP SWITCH/016 Understanding High Availability.txt`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
!
Configuring the Redundancy Mode:
!
RPR:
!
Switch(config)# redundancy 
Switch(config-reg)# mode rpr 
!
RPR+:
!
Switch(config)# redundancy
Switch(config-red)# mode rpr-plus 
!
SSO:
!
Switch(config)# redundancy
Switch(config-red)# mode sso 
!
Verify Redundancy:
!
Switch# show redundancy states 
!
!
Configuring Supervisor Synchronization:
!
Switch(config)# redundancy
Switch(config-red)# main-cpu
!
Switch(config-r-mc)# auto-sync {startup-config | config-register | bootvar}
!
Nonstop Forwarding:
!
BGP:
!
SW1(config)# router bgp 100 
SW1(config-router)# bgp graceful-restart
!
EIGRP:
!
SW1(config)# route eigrp 10
SW1(config-router)# nfs 
!
OSPF:
!
SW1(config)# router ospf 5 
SW1(config-router)# nfs 
!
ISIS:
!
SW1(config)# router isis 
SW1(config-router)# nfs cisco
SW1(config-router)# nfs interval 1 
SW1(config-router)# nfs t3 manual 
SW1(config-router)# nfs interface wait 10 
!
```

# 14 Switch%3a Troubleshooting HSRP, VRRP, GLBP

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/14 Switch%3a Troubleshooting HSRP, VRRP, GLBP`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Switch: Troubleshooting HSRP, VRRP, GLBP:
!
UNDERSTANDING AND COMPARING THE FHRP PLAYERS:
!
COMMON GROUND:
!
> REDUNDANCY FOCUS
> VIRTUAL IP AND MAC 
> KEEPALIVE TIMERS
!
> HSRP's UNIQUE FEATURES
  - CISCO Propratary 
> VRRP's UNIQUE FEATURES
  - Industry Standard 
> GLBP's UNIQUE FEATURES
  - CISCO Propratary 
  - Multiple MACs 
!
!
FHRP: What Can Go Wrong?:
!
> (FYI) TIMERS MOVE FAST IF YOU SHUTDOWN (RESIGN)
> FHRP CAN BE INTERGRATED WITH OBJECT TRACKING (SHOW TRACK)
> MACS: GLBP:0007.b400, VRRP:0000.5e HSRP:0000.0c
> VERIFYING STATUS / CONFIGURATION 
!
HSRP:
show standby brief 
show standby <int> 
!
VRRP:
show vrrp brief 
show vrrp int <int> 

GLBP:
show glbp brief 
show glbp <int> 
!
Client 
- verify client arp cache 
- debug standby terse 
- verify track object 
- verify ip information 
!
```

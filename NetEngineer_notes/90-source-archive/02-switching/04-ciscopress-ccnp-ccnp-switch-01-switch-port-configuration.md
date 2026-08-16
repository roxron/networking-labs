# 01 Switch Port Configuration

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP SWITCH/01 Switch Port Configuration.txt`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Switch Port Configuration:
!
Switch(config)# interface gigabitethernet 1/0/14
!
Interface Ranges:
!
Switch(config)# interface range gigabitethernet 1/0/3 , gigabitethernet 1/0/7,gigabitethernet 1/0/9 , gigabitethernet 1/0/48
!
interface range gigabitethernet 1/0/1 - 48
!
!
COnfigure Interface Group (Macro)
!
Switch(config)# define interface-range MyGroup gig 2/0/1, gig 2/0/3 – 2/0/5 , gig3/0/1 , gig 3/0/10, gig 3/0/32 – 3/0/48
Switch(config)# interface range macro MyGroup
!
!
Identifying Ports:
!
Switch(config)# interface gigabitethernet 2/0/11
Switch(config-if)# description Printer in Bldg A, room 213
!
!
Port Speed:
!
Switch(config-if)# speed {10 | 100 | 1000 | auto}
!
!
Port Duplex Mode:
!
Switch(config-if)# duplex {auto | full | half}
!
!
Example:
!
Switch(config)# interface gigabitethernet 3/0/1
Switch(config-if)# speed auto
Switch(config-if)# duplex auto
Switch(config-if)# interface gigabitethernet 3/0/2
Switch(config-if)# speed 100
Switch(config-if)# duplex full
!
!
!
Managing Error Conditions on a Switch Port:
!
Switch(config)# [no] errdisable detect cause [all | cause-name]
!
!
Automatically Recover from Error Conditions:
!
Switch(config)# errdisable recovery cause [all | cause-name]
!
Switch(config)# errdisable recovery interval seconds
!
Example:
!
Switch(config)# errdisable recovery cause inline-power
Switch(config)# errdisable recovery interval 3600
!
!
!
Enable and Use the Switch Port:
!
Switch(config-if)# no shutdown
show interfaces
show interfaces status
!
!
!
Troubleshooting Port Connectivity:
!
Switch# show interfaces gigabitethernet 1/0/1
Switch# show interface status err-disabled
!
!
!
 CDP vs. LLDP:
!
Cisco Discovery protocol:
!
show cdp neighbors 
show cdp neighbors detail 
show cdp neighbors g0/1/1
!
Disable CDP Globally:
!
Switch(config)# no cdp run 
!
Disable CDP on Interface:
!
Switch(config-if)# no cdp enable 
!
!
!
Link Layer Discovery Protocol:
!
show lldp 
!
Globally:
!
lldp run
or 
no lldp run
!
show lldp neighbors
show lldp neighbors g0/1 detail 
!
!
On Interface:
Switch(config-if)# [no] lldp {receive | transmit}
!
!
!
Using Power over Ethernet:
!
Configuring PoE:
!
Switch(config-if)# power inline {auto | static} [max milliwatts]
!
Example:
!
Switch(config)# interface gigabitethernet1/0/1
Switch(config-if)# power inline auto max 6000
!
Switch(config-if)# power inline auto max 15400
!
!
Disable PoE
!
Switch(config-if)# power inline never
!
!
Verify PoE:
!
Switch# show power inline
Switch1# show power inline gigabitethernet1/0/5
Switch1# show power inline gigabitethernet1/0/5 detail
```

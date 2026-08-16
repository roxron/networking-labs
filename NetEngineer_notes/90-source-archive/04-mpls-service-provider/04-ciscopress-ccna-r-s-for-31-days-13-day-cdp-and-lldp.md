# 13 Day CDP and LLDP

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNA R&S for 31 days/13 Day CDP and LLDP`  
> Original source context: 04 CISCOPRESS / CCNA R&S for 31 days. Content is preserved as historical study material; validate commands against the target platform and release.

```text
CDP and LLDP:
!
CDP Configuration:
!
R1# show cdp interface 
R1# show cdp neighbors
R1# show cdp neighbors detail 
!
!
Disable CDP on the device:
!
R1(config)# no cdp run
!
!
Disabling CDP on an Interface:
!
R1(config)# interface G0/0
R1(config-if)# no cdp enable 
!
!
Adjust the time for CDP advertisement:
!
R1(config)# cdp timer 10 
R1(config)# cdp holdtime 30 
!
!
CDP Verification:
!
S1# show cdp 
S1# show cdo neighbors 
S1# show cdp interface 
S1# show cdp neighbors detail
S1# show cdp traffic 
!
!
!
LLDP Configuration:
!
Enable LLDP globally:
!
R1(config)# lldp run
!
!
Disable LLDP on an interface:
!
R1(config)# interface g0/0
R1(config-if)# no lldp transmit 
R1(config-if)# no lldp receive 
!
!
Adjust the time for LLDP advertisements:
!
R1(config)# lldp timer 10
R1(config)# holdtime 30 
R1(config)# lldp reinit 1 
!
LLDP Verification:
!
R1# show lldp 
R1# show lldp interface 
R1# show lldp neighbors
R1# show lldp neighbors detail 
R1# show lldp traffic 
R1#
```

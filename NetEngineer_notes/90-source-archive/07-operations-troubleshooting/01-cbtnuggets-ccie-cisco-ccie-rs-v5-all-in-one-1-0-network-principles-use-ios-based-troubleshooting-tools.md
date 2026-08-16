# Use IOS Based Troubleshooting Tools

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS v5 All-In-One 1.0 Network Principles/Use IOS Based Troubleshooting Tools`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS v5 All-In-One 1.0 Network Principles. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Setup Debug conditions
R1# debug condition interface S1/2
R1# debug condition username Cisco1

R1# ping 

R1# traceroute

Create Aliases:
R1(config)# alias exec sib show ip interface brief | exclude unas
R1(config)# end
R1# show alias 
 
Put this debug command in alway on 
R1# debug ip routing 

R1# who

If you connected via SSH then use this to see debugging on the screen
R1# terminal monitor

R1# show ip protocols
R1# show cdp neighbor 
R1# show run | section interface 
R1# show processes cpu sort
R1# show processes cpu history 
R1# show log
```

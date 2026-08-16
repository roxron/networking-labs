# 02 VTP

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/BOOKS/CCNP SWITCH by Richard Froom/02 VTP`  
> Original source context: 07 SAFARI ONLINE / BOOKS / CCNP SWITCH by Richard Froom. Content is preserved as historical study material; validate commands against the target platform and release.

```text
VLAN Trunking Protocol:
!
Configuring and Verifying VTP:
!
VTP mode Server:
!
S1(config)# vtp password Cisco
S1(config)# vtp mode server
S1(config)# vtp domain CCNP 
S1(config)# vtp version 2
!
!
VTP mode Client:
!
S2(config)# vtp password Cisco 
S2(config)# vtp mode client 
S2(config)# vtp domain CCNP 
S2(config)# vtp version 2
!
!
VTP mode Transparent:
!
S3(config)# vtp password Cisco
S3(config)# vtp mode transparent
S3(config)# vtp domain CCNP 
S3(config)# vtp version 2
!
!
Verify VTP:
!
show vtp status 
show vtp password 
show vtp counters
```

# 54 NTP

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/54 NTP`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
NTP Server and NTP Client Sample Topology
!
Server:
R1# conf term
R1(config)# ntp authentication-key 1 md5 $3cretKEY
R1(config)# ntp authenticate
R1(config)# ntp trusted-key 1
R1(config)# ntp master 1
!
!
Client:
R2# conf term
R2(config)# ntp authentication-key 1 md5 $3cretKEY
R2(config)# ntp authenticate
R2(config)# ntp trusted-key 1
R2(config)# ntp server 172.16.0.1 key 1
!
!
Verification of Current NTP Status:
R1# show ntp status
R1# show ntp associations detail
```

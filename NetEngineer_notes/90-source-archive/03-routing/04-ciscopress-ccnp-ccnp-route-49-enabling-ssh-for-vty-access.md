# 49 Enabling SSH for VTY Access

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/49 Enabling SSH for VTY Access`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Enabling SSH for VTY Access:
hostname R1
ip domain-name 1ExamAMonth.com
!
crypto key generate rsa modulus 2014
!
username kevin privilege 15 secret cisco
!
access-list 1 permit 10.1.1.0 0.0.0.255
access-list 1 deny
any log
!
line vty 0 15
access-class 1 in
login local
transport input ssh
```

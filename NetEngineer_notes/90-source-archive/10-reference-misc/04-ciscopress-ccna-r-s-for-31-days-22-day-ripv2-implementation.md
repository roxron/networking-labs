# 22 Day RIPv2 Implementation

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNA R&S for 31 days/22 Day RIPv2 Implementation`  
> Original source context: 04 CISCOPRESS / CCNA R&S for 31 days. Content is preserved as historical study material; validate commands against the target platform and release.

```text
RIPv2 Implementation:
!
!
RIPv1 Configuration:
!
R1(config)# router rip
R1(config-router)# network 192.168.1.0
R1(config-router)# network 192.168.2.0
!
R2(config)# router rip
R2(config-router)# network 192.168.2.0
R2(config-router)# network 192.168.3.0
R2(config-router)# network 192.168.4.0
!
R3(config)# router rip
R3(config-router)# network 192.168.4.0
R3(config-router)# network 192.168.5.0
!
!
RIPv1 Verification and Troubleshooting:
!
R1# show ip route 
R1# show ip protocols
R1# show ip rip database 
R1# debug ip rip 
!
!
Configure Passive Interfaces:
!
R2(config)# router rip
R2(config-router)# passive-interface GigabitEthernet 0/0
!
!
Default Routing and RIPv1:
!
R2(config)# router rip
R2(config-router)# default-information originate
!
!
!
RIPv2 Configuration:
!
R1(config)# router rip
R1(config-router)# version 2
R1(config-router)# no auto-summary 
R1(config-router)# network 172.16.10.0 
!
!
RIPv2 Verification and Troubleshooting:
!
R1# show ip interface brief 
R1# show ip protocols 
R1# show ip route rip
R1# show ip rip database 
R1# debug ip rip
```

# 17 Day Fine-Tuning and Troubleshooting OSPF

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNA R&S for 31 days/17 Day Fine-Tuning and Troubleshooting OSPF`  
> Original source context: 04 CISCOPRESS / CCNA R&S for 31 days. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Fine-Tuning and Troubleshooting OSPF:
!
Modifying OSPFv2:
!
Redistributing a Default Route:
!
R1(config)# ip route 0.0.0.0 0.0.0.0 Serial 0/1/0
R1(config)# router ospf 10
R1(config-router)# default-information originate
!
!
Modifying Hello and Dead Intervals:
!
R1(config)# interface serial 0/0/0
R1(config-if)# ip ospf hello-interval 5
R1(config-if)# ip ospf dead-interval 20
R1(config-if)# end
!
!
Controlling the DR/BDR Election:
!
R1(config)# interface gigabitethernet 0/0
R1(config-if)# ip ospf priority 200
!
R2(config)# interface gigabitethernet 0/0
R2(config-if)# ip ospf priority 100
!
R1# clear ip ospf process 
R2# xlear ip ospf process 
!
!
!
Modifying OSPFv3:
!
Propagating a Default Route in OSPFv3:
!
R2(config)# ipv6 route ::/0 serial 0/1/0
R2(config)# ipv6 router ospf 10
R2(config-rtr)# default-information originate
R2(config-rtr)# end
!
!
Configuring Hello and Dead Intervals in OSPFv3:
!
R2(config)# interface s0/0/0
R2(config-if)# ipv6 ospf hello-interval 5
R2(config-if)# ipv6 ospf dead-interval 20
R2(config-if)# end
!
```

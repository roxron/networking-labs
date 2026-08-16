# 14 Day Fine-Tuning and Troubleshooting EIGRP

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNA R&S for 31 days/14 Day Fine-Tuning and Troubleshooting EIGRP`  
> Original source context: 04 CISCOPRESS / CCNA R&S for 31 days. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Modifying the EIGRP for IPv4 Configuration:
!
Enabling Automatic Summarization:
!
R1(config)# router eigrp 1
R1(config-router)# auto-summary
R2(config)# router eigrp 1
R2(config-router)# auto-summary
R3(config)# router eigrp 1
R3(config-router)# auto-summary
!
!
Propagating an IPv4 Default Route:
!
R2(config)# ip route 0.0.0.0 0.0.0.0 Serial0/1/0
R2(config)# router eigrp 1
R2(config-router)# redistribute static
!
!
Modifying the Bandwidth:
!
R1(config)# interface serial 0/0/0
R1(config-if)# bandwidth 64
R2(config)# interface serial 0/0/0
R2(config-if)# bandwidth 64
R2(config-if)# interface serial 0/0/1
R2(config-if)# bandwidth 1024
R3(config)# interface serial 0/0/1
R3(config-if)# bandwidth 1024
!
!
Modifying Hello Intervals and Hold Times:
!
R1(config)# interface s0/0/0
R1(config-if)# ip hello-interval eigrp 1 60
R1(config-if)# ip hold-time eigrp 1 180
!
R2(config)# interface s0/0/0
R2(config-if)# ip hello-interval eigrp 1 60
R2(config-if)# ip hold-time eigrp 1 180
!
!
!
Modifying EIGRP for IPv6:
!
Propagating a Default Route in EIGRP for IPv6:
!
R2(config)# ipv6 route ::/0 serial 0/1/0
R2(config)# ipv6 router eigrp 100
R2(config-rtr)# redistribute static
R2(config-rtr)# end
!
!
Modifying the Bandwidth Utilization:
!
R1(config)# interface serial 0/0/0
R1(config-if)# ipv6 bandwidth-percent eigrp 100 40
R2(config)# interface serial 0/0/0
R2(config-if)# ipv6 bandwidth-percent eigrp 100 40
!
!
Configuring EIGRP for IPv6 Hello and Hold Times:
!
R1(config)# interface serial 0/0/0
R1(config-if)# ipv6 hello-interval eigrp 100 50
R1(config-if)# ipv6 hold-time eigrp 100 50
!
!
!
EIGRP Troubleshooting Commands:
!
R1# show ip eigrp interface 
R1# show ip eigrp interface detail 
R1# show ip protocols 
R1# show ip eigrp neighbors
R1# show ip route eigrp 
R1# show ip eigrp topology
```

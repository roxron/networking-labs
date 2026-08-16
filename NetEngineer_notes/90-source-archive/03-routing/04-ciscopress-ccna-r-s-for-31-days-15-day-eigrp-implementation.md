# 15 Day EIGRP Implementation

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNA R&S for 31 days/15 Day EIGRP Implementation`  
> Original source context: 04 CISCOPRESS / CCNA R&S for 31 days. Content is preserved as historical study material; validate commands against the target platform and release.

```text
EIGRP Implementation:
!
EIGRP for IPv4 Configuration:
!
R1(config)# router eigrp 1
R1(config-router)# network 172.16.0.0
R1(config-router)# network 192.168.10.0
!
R2(config)# router eigrp 1
R2(config-router)# network 172.16.0.0
R2(config-router)# network 192.168.10.0
!
R3(config)# router eigrp 1
R3(config-router)# network 192.168.1.0
R3(config-router)# network 192.168.10.0
!
!
Configuring Router IDs for EIGRP:
!
R1(config)# router eigrp 1
R1(config-router)# eigrp router-id 1.1.1.1
!
R2(config)# router eigrp 1
R2(config-router)# eigrp router-id 2.2.2.2
!
R3(config)# router eigrp 1
R3(config-router)# eigrp router-id 3.3.3.3
!
!
EIGRP for IPv4 Verification:
!
R1# show ip protocols
R1# show ip eigrp neighbors
R1# show ip eigrp topology 
R1# show ip roite eigrp 
R1# show ip eigrp topology all-links 
!
!
!
EIGRP for IPv6 Configuration:
!
2(config)# ipv6 unicast-routing
R2(config)# ipv6 router eigrp 100
R2(config-rtr)# eigrp router-id 2.2.2.2
R2(config-rtr)# no shutdown
R2(config-rtr)# interface g0/0
R2(config-if)# ipv6 eigrp 100
R2(config-if)# interface s0/0/0
R2(config-if)# ipv6 eigrp 100
R2(config-if)# interface s0/0/1
R2(config-if)# ipv6 eigrp 100
R2(config-if)# end
!
!
EIGRP for IPv6 Verification
!
R2# show ipv6 protocols 
R2# show ipv6 eigrp neighbors
R2# show ipv6 route eigrp 
R2# show ipv6 eigrp topology 
R2# show ipv6 eigrp topology all-links
```

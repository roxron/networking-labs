# 23 Day Static and Default Route Configuration

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNA R&S for 31 days/23 Day Static and Default Route Configuration`  
> Original source context: 04 CISCOPRESS / CCNA R&S for 31 days. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Static and Default Route Configuration:
!
Static Route Configuration with Next-Hop Parameter:
!
R1(config)# ip route 172.16.1.0 255.255.255.0 172.16.2.1
R1(config#) ip route 192.168.0.0 255.255.255.0 172.16.2.1 
!
!
IPv4 Static Routes Using the Exit Interface Parameter:
!
R2(config)# ip route 172.16.3.0 255.255.255.0 serial 0/0/0
R2(config)# ip route 192.168.1.0 255.255.255.0 serial 0/0/1
!
!
IPv4 Default Route Configuration:
!
R2(config)# ip route 0.0.0.0 0.0.0.0 serial 0/1/0
!
!
Verifying IPv4 Static route:
!
R1# show ip route 
R1# show ip route static 
R1# show ip route 192.168.0.0 
!
!
!
IPv6 Static Routing:
!
IPv6 Static Route Configuration:
!
ipv6 route 2001:DB8:1:3::/64 Serial0/0/0 
!
!
IPv6 Default Route Configuration:
!
R1(config)# ipv6 route ::/0 serial 0/0/0
!
!
Veryfing IPv6 Routes:
!
R1# show ipv6 route
R1# show ipv6 route static
```

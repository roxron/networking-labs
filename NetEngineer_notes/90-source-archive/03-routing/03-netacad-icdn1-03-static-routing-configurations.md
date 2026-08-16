# 03 Static Routing Configurations

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN1/03 Static Routing Configurations.txt`  
> Original source context: 03 NETACAD / ICDN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure a Next-Hop Static route:
R1(config)# ip route 192.168.0.0 255.255.255.0 172.16.1.2
R1(config)# ip route 192.168.1.0 255.255.255.0 172.16.1.2
R1(config)# ip route 192.168.2.0 255.255.255.0 172.16.1.2


Configure a Directly Connected Static Route:
R1(config)# ip route 172.16.0.0 255.255.255.0 S0/0/0
R1(config)# ip route 172.16.1.0 255.255.255.0 S0/0/0
R1(config)# ip route 192.168.10.0 255.255.255.0 S0/0/1

Configure a Fully Specified Static route:
R1(config)# ip route 172.16.10.0 255.255.255.0 G0/1 10.0.0.2 
R1(config)# ip route 172.16.11.0 255.255.255.0 G0/1 10.0.0.2
R1(config)# ip route 172.16.12.0 255.255.255.0 G0/1 10.0.0.2

Verify a Static Route:
R1# show ip route
R1# show ip route static 
R1# show ip route 192.168.1.1

Configure a Default Static Route:
R1(config)# ip route 0.0.0.0 0.0.0.0 192.168.1.1
R1(config)# ip route 0.0.0.0 0.0.0.0 S0/0/0
R1(config)# ip route 0.0.0.0 0.0.0.0 g0/0 192.168.0.1 


Configure a Next-Hop IPv6 Static Route:
R1(config)# ipv6 route 2001:db8:acad:1::/64 2001:db8:acad:A::1

Configure a Directly Connected IPv6 Static Route:
R1(config)# ipv6 route 2001:db8:acad:2::/64 S0/0/0

Configure a Fully Specified IPv6 Static route:
R1(config)# ipv6 route 2001:db8:acad:10::/64 S0/0/0 FE80::2 

Verify a IPv6 Static Route:
R1# show ipv6 route 
R1# show ipv6 route static
R1# show ipv6 route 2001:db8:acad:10::


Configure a Default IPv6 Static Route:
R1(config)# ipv6 route ::/0 2001:db8:acad:1::1


Configure an IPv4 Floating Static Route:
R1(config)# 192.168.10.0 255.255.255.0 S0/0/0 
R1(config)# 192.168.10.0 255.255.255.0 S0/0/1 5


Configure an IPv6 Floating Static Route:
R1(config)# ipv6 route ::/0 s0/0/0 
R1(config)# ipv6 route ::/0 S0/0/1 5
```

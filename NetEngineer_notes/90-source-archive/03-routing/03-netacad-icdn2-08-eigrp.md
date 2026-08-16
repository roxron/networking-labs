# 08 EIGRP

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN2/08 EIGRP`  
> Original source context: 03 NETACAD / ICDN2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring EIGRP:

R1(config)# router eigrp 1
R1(config-router)# eigrp router-id 1.1.1.1
R1(config-router)# network 192.168.0.1 0.0.0.3
R1(config-router)# network 10.0.1.0 0.0.0.255
R1(config-router)# passive-interface G0/0

R2(config)# router eigrp 1
R2(config-router)# eigrp router-id 2.2.2.2
R2(config-router)# network 192.168.0.1 0.0.0.3
R2(config-router)# network 10.0.2.0 0.0.0.255
R2(config-router)# passive-interface G0/0

Verify EIGRP:
R1# show ip protocols
R1# show ip eigrp neighbors
R1# show ip eigrp topology
R1# show ip route
R1# show ip eigrp topology all-links 
R1# debug eigrp fsm


Configure EIGRTP for IPv6 

R1(config)# ipv6 unicast-routing 
R1(config)# ipv6 router eigrp 1
R1(config-rtr)# eigrp router-id 1.1.1.1
R1(config-rtr)# no shutdown 
R1(config-rtr)# passive-interface G0/0
R1(config-rtr)# exit
R1(config)# interface S0/0/0
R1(config-if)# ipv6 eigrp 1
R1(config-if)# interface S0/0/1
R1(config-if)# ipv6 eigrp 1

Verify EIGRP for IPv6 
R1# show ipv6 eigrp neighbors
R1# show ipv6 eigrp topology 
R1# show ipv6 protocols
R1# show ipv6 route


Configuring EIGRP Automatic Summarization:
R1(config)# router eigrp 1
R1(config-router)# auto-summary

Propagating a Default Static Route:
R1(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.1 
R1(config)# router eigrp 1
R1(config-router)# redistrebute static

EIGRP for IPv6: Default Route:
R1(config)# ip route ::/0 Serial S0/0/0 
R1(config)# ipv6 router eigrp 1 
R1(config-rtr)# redistribute static 

EIGRP Bandwidth Utilization:
R1(config)# interface S0/0/0
R1(config-if)# ip bandwidth-percent eigrp 1 30 
R1(config-if)# ipv6 bandwidth-percent eigrp 1 30

Configure Hello and Hold Timers:
R1(config)# interface S0/0/0
R1(config-if)# ip hello-interval eigrp 1 50 
R1(config-if)# ip hold-time eigrp 1 150

R1(config)# interface S0/0/0 
R1(config-if)# ipv6 hello-interval eigrp 1 50 
R1(config-if)# ipv6 hold-time eigrp 1 150 

Load Balancing IPv4
Set maximum paths:
R1(config)# router eigrp 1 
R1(config-router)# maximum-path 6 
R1(config-router)# variance 2
R1(config-router)# traffic-share balanced 

K value modification:
R1(config)# eigrp 1
R1(config-router)# metric weights 0 1 0 1 0 0 

How to calculate composed EIGRP metric:
((10,000,000/bandwidth)+(sum of delay/10))x256=Metric
```

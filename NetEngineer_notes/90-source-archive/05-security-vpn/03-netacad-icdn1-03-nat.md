# 03 NAT

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN1/03 NAT.txt`  
> Original source context: 03 NETACAD / ICDN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure Static NAT:
R2(config)# ip nat inside source static 192.168.10.100 200.100.50.10
R1(config)# interface S0/0/0
R1(config-if)# ip nat outside 
R1(config-if)# ip nat inside

Verify Static NAT:
R1# show ip nat translations 
R1# show ip nat statistics
R1# clear ip nat counters

Configure Dynamic NAT:
R1(config)# ip nat pool NAT-POOL1 200.100.51.2 200.100.51.14 netmask 255.255.255.240 
R1(config)# access-list 1 permit 192.168.0.0 0.0.0.255 
R1(config)# ip nat inside source list 1 pool NAT-POOL1
R1(config)# interface S0/0/0 
R1(config-if)# ip nat outside 
R1(config-if)# exit
R1(config)# interface G0/0
R1(config-if)# ip nat inside

Verify Dynaimic NAT:
R1# show ip nat translations verbose
R1# show ip nat statistic 
R1# clear ip nat translations *
R1# show running-config

Configure PAT:
R1(config)# ip nat pool PUBLIC-POOL 200.100.50.1 200.100.50.14 
R1(config)# access-list 1 permit 192.168.0.0 0.0.1.255
R1(config)# ip nat inside source list 1 pool PUBLIC-POOL overload
R1(config)# interface S0/0/0 
R1(config-if)# ip nat outside
R1(config-if)# exit
R1(config)# interface G0/0
R1(config-if)# ip nat outside

Configuring PAT for a Single Public IPv4 Address:
R1(config)# access-list 1 permit 192.168.0.0 0.0.1.255
R1(config)# ip nat inside source list 1 interface S0/0/0 overload


Configuring Port Forwarding with IOS:
R1(config)# ip nat inside source static tcp 192.168.10.254 80 200.100.50.2 8080

Verify NAT:
R1# show runnig-config
R1# show ip nat statistics 
R1# show ip nat translation 
R1# clear ip nat statistics
R1# clear ip nat translations* 
R1# debug ip nat
```

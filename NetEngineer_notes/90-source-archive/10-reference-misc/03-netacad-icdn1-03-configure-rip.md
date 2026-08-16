# 03 Configure RIP

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN1/03 Configure RIP.txt`  
> Original source context: 03 NETACAD / ICDN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure a RIPv1
R1(config)# router rip
R1(config-router)# network 192.168.0.0
R1(config-router)# network 192.168.1.0

Verify RIP routing:
R1#show ip protocols
R1#show ip route 

Configure a RIPv2:
R1(config)#router rip 
R1(config-router)# version 2

Disable Auto Summarization:
R1(config)# router rip 
R1(config-router)# no auto-summary 

Configure a Passive Interface:
R1(config)# router rip 
R1(Config-router)# passive-interface G0/0 


Propagate a default route:
R1(config)# ip route 0.0.0.0 0.0.0.0 s0/0/1
R1(config)$ default-information originate

Additional verification commands:
R1# debug ip rip 
R1# clear ip route *
```

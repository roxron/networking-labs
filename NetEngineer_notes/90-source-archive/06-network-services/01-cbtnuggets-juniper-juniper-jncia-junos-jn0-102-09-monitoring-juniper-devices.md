# 09 Monitoring Juniper Devices

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIA-Junos JN0-102/09 Monitoring Juniper Devices`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIA-Junos JN0-102. Content is preserved as historical study material; validate commands against the target platform and release.

```text
show chassis environment 
show chassis ?
show configurations
show interface terse

monitor interfaces traffic
monitor start MYLOG
traceroute 192.168.2.100
ping 172.16.0.1 

set services rpm probe customerA test icmp-test probe-interval 15
set services rpm probe customerA test icmp-test probe-type icmp-ping-timestamp
set services rpm probe customerA test icmp-test hardware-timestamp 
set services rpm probe customerA test icmp-test target address 192.168.2.100
set services rpm probe customerA test icmp-test thresholds ingress-time 3000
set services rpm probe customerA test icmp-test traps ingress-time-exceeded

root> show services rpm probe-results
```

# 14 IP SLA

> Imported source note. Provenance: `NetEngineer_Journal/02 NETWORK LESSONS/CCNP/CCNP ROUTE/14 IP SLA`  
> Original source context: 02 NETWORK LESSONS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
ICMP_ECHO 

R1(config)# ip sla 1
R1(config-ip-sla)# icmp-echo 192.168.10.5
R1(config-ip-sla-echo)# frequency 10
R1(config-ip-sla-echo)# exit
R1(config)# ip sla schedule 1 start-time now life forever

R1# show ip sla configuration 
R1# show ip sla statistics 


UDP jiter Operations

R1(config)# ip sla 2
R1(config-ip-sla)# udp-jitter 192.168.15.2 16384 codec g711alaw
R1(config-ip-sla-jitter)# frequency 30 
R1(config-ip-sla-jitter)# tos 184

R1(config)# ip sla scherdule 2 life forever start-time now


R2(config)# ip sla responder
```

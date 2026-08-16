# 14 IP SLA

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN2/14 IP SLA`  
> Original source context: 03 NETACAD / ICDN2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
IP SLA Configuration:
ICMP Example:
R1(config)# ip sla 1
R1(config-ip-sla)# icmp-echo 192.168.1.2
R1(config-ip-sla-echo)# timeout 1500
R1(config-ip-sla-echo)# frequency 3
R1(config-ip-sla-echo)# request-data-size 200
R1(config-ip-sla-echo)# exit
R1(config-ip-sla)# exit
R1(config)# ip sla 2
R1(config-ip-sla)# icmp-echo 192.168.2.2
R1(config-ip-sla-echo)# timeout 1500
R1(config-ip-sla-echo)# frequency 3
R1(config-ip-sla-echo)# request-data-size 200
R1(config-ip-sla-echo)# exit
R1(config-ip-sla)# exit
R1(config)# ip sla schedule 1 life forever start-time now
R1(config)# ip sla schedule 2 life forever start-time now

R1# show ip sla application 
R1# show ip sla statistics
R1# show ip sla configuration 

Configure TRACK
R1(config)# track 1 rtr 1
R1(config-track)# exit
R1(config)# track 2 rtr 2
R1(config-track)# exit
R1(config)# ip route 10.0.0.0 255.255.255.0 192.168.1.2 track 1
R1(config)# ip route 10.0.0.0 255.255.255.0 192.168.2.2 track 2
```

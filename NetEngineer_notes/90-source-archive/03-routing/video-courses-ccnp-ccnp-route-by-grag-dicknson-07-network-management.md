# 07 Network Management

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CCNP/CCNP_ROUTE by Grag Dicknson/07 Network Management`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CCNP / CCNP_ROUTE by Grag Dicknson. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure NETFLOW V9
!
R1(config)# flow record NETFLOW_RECORD
R1(config-flow-record)# match ipv4 tos
R1(config-flow-record)# match ipv4 protocol
R1(config-flow-record)# match ipv4 source address 
R1(config-flow-record)# match ipv4 destination address 
R1(config-flow-record)# match transport source-port 
R1(config-flow-record)# match transport destination-port 
R1(config-flow-record)# match interface input 
R1(config-flow-record)# collect interface output 
R1(config-flow-record)# collect counter bytes 
R1(config-flow-record)# collect counter packets
R1(config-flow-record)# exit
!
R1(config)# flow exporter NETFLOW_EXPORT 
R1(config-flow-exporter)# destination 192.168.151.25
R1(config-flow-exporter)# source G0/0 
R1(config-flow-exporter)# transport udp 2055 
!
R1(config)# flow monitor NETFLOW_MONITOR 
R1(config-flow-monitor)# record NETFLOW_RECORD 
R1(config-flow-monitor)# exporter NETFLOW_EXPORT 
R1(config-flow-monitor)# cache timeout active 60
R1(config-flow-monitor)#
!
R1(config)# interface G0/1
R1(config-if)# ip flow monitor NETFLOW_MONITOR
```

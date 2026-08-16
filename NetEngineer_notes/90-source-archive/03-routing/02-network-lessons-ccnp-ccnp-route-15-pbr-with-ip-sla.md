# 15 PBR with IP SLA

> Imported source note. Provenance: `NetEngineer_Journal/02 NETWORK LESSONS/CCNP/CCNP ROUTE/15 PBR with IP SLA`  
> Original source context: 02 NETWORK LESSONS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# ip sla 1 
R1(config-ip-sla)# icmp-echo 80.0.0.2 source-interface G0/0
R1(config-ip-sla-echo)#threshhold 50
R1(config-ip-sla-echo)# timeout 100
R1(config-ip-sla-echo)# frequency 1
R1(config)-ip-sla-echo)# exit
R1(config)# ip sla schedule 1 life forever start-time now 
R1(config)# track 1 ip sla 1 

R1(config)# ip access-list extended HTTP_TRAFFIC 
R1(config-ext-nacl)# permit tcp 50.0.0.0 0.0.0.255 host 8.8.8.10 eq 80
R1(config-ext-nacl)# exit

R1(config)# route-map PBR permit 10
R1(config-route-map)# match ip address HTTP_TRAFFIC
R1(config-route-map)# set ip next-hop verify-availability 80.0.0.2 1 track 1

R1(config)# interface G0/2
R1(config-if)# ip policy route-map PBR


R1# show route-map 
R1# show ip policy 
R1# debug ip policy
```

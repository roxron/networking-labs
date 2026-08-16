# 25 IP SLA

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/25 IP SLA`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring an ICMP Echo Operation on Router R1:
R1# conf t
R1(config)# ip sla 11
R1(config-ip-sla)# icmp?
icmp-echo
icmp-jitter
R1(config-ip-sla)# icmp-echo 10.1.3.99 source-ip 10.1.1.9
R1(config-ip-sla)# frequency 60
R1(config-ip-sla)# exit
R1(config)# ip sla schedule 11 start-time now life forever
!
Verify IP SLA:
show ip sla configuration
show ip sla statistics


Tracking SLA Operations to Influence Routing:
!
onfiguring a Static Route to Track an IP SLA Operation:
R1# conf t
R1(config)# track 2 ip sla 11 state
R1(config-track)# delay up 90 down 90
R1(config-track)# exit
R1(config)# ip route 10.1.234.0 255.255.255.0 s0/0/1 track 2
R1(config)# end
R1#
!
!
Configuring PBR to Track an IP SLA:
R1 PBR Configuration:
interface Fastethernet 0/0
ip address 10.1.1.9 255.255.255.0
ip policy route-map PC2-over-low-route
!
route-map PC2-over-low-route permit
match ip address 101
set ip next-hop verify-availability 10.1.14.4 1 track 2
!
access-list 101 permit ip host 10.1.1.2 10.1.3.0 0.0.0.255
!
```

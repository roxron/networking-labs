# 24 Configure PBR

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/24 Configure PBR`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1 PBR Configuration:
interface Fastethernet 0/0
ip address 10.1.1.9 255.255.255.0
ip policy route-map PC2-over-low-route
!
route-map PC2-over-low-route permit
match ip address 101
set ip next-hop 10.1.14.4
!
access-list 101 permit ip host 10.1.1.2 10.1.3.0 0.0.0.255
!
!
Verify PBR:
R1# traceroute 10.1.3.99
R1# show ip policy 
R1# debug ip policy
R1# show route-map


Applying PBR to Locally Created Packets:
R1(config)# ip local policy route-map LOCAL_TRAFFIC
```

# 06 IS-IS Filtering

> Imported source note. Provenance: `NetEngineer_Journal/02 NETWORK LESSONS/IS-IS/06 IS-IS Filtering`  
> Original source context: 02 NETWORK LESSONS / IS-IS. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Distribute-list Inbound filtering:
R2(config)# ip access-list standard R1_L0
R2(config-std-nacl)# deny 192.168.10.0 0.0.0.255
R2(config-std-nacl)# permit any
R2(config-std-nacl)# exit
R2(config)# router isis 
R2(config-router)# distribute-list R1_L0 in 


Level 1 to Level 2 filtering:
R3(config)# ip access-list extended R1_L0
R3(config-ext-nacl)# deny ip 192.168.10.0 0.0.0.255 any
R3(config-ext-nacl)# permit ip any any

R3(config)# route-map L1_L2_FILTER permit 10
R3(config-route-map)# match ip address R1_L0

R3(config)# router isis 
R3(config-router)# reditribute isis ip level-1 into level-2 route-map L1_L2_FILTER
```

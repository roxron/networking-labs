# 07 IS IS route Leaking

> Imported source note. Provenance: `NetEngineer_Journal/02 NETWORK LESSONS/IS-IS/07 IS_IS route Leaking`  
> Original source context: 02 NETWORK LESSONS / IS-IS. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Leak Level-2 route into Level-1 to prevent sub-optimal routing:
R4(config)# ip access-list extended NET_172.30.10.0
R4(config-ext-nacl)# permit ip 172.30.10.0 0.0.0.255 any 

R4(config)# route-map ROUTE_LEAKING permit 10
R4(config-route-map)# match ip address NET_172.30.10.0

R4(config)# router isis
R4(config-router)# redistribute isis ip level-2 into level-1 route-map ROUTE_LEAKING
```

# 17 Tweaking BGP

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/BGP/17 Tweaking BGP`  
> Original source context: 01 CBTNUGGETS / BGP. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Improving BGP:

1: Use the:
R1(config)# ip tcp path-mtu-discovery

2: Use BGP peer Groups. (See next file).

3: Increase input queues (hold-queue in):
R1(config)# interface G0/0
R1(config-if)# hold-queue 1000 in

4: Tune BGP scanner time / Advertisement interval:
R1(config)# router bgp 500
R1(config-router)# bgp scan-time 30
R1(config-router)# neighbor 1.1.1.1 advertisement-interval 15


5: Set a Maximum prefix limit:
R1(config-router)# neighbor 1.1.1.1 maximum-prefix 5000
```

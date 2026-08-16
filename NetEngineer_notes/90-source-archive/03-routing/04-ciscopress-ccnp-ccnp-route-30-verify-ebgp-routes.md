# 30 Verify eBGP routes

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/30 Verify eBGP routes`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Verification Commands for eBGP-Learned Routes:
--------------------------------------------------------------------------------
       Verification Step                  Command

1 List possible default routes            show ip bgp 0.0.0.0 0.0.0.0

2 List possible routes, per prefix        show ip bgp prefix [ subnet-mask ]

3 List routes learned from one neighbor,  show ip bgp neighbors ip-address received-routes
before any inbound filtering is applied

4 List routes learned from a specific      show ip bgp neighbors ip-address routes
neighbor that passed any inbound filters

5 Lists routes advertised to a neighbor    show ip bgp neighbors ip-address advertised-routes
after applying outbound filtering

6 List the number of prefixes learned per   show ip bgp summary
neighbor
```

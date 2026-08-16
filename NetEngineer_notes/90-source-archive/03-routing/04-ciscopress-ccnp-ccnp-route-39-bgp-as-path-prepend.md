# 39 BGP AS Path Prepend

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/39 BGP AS_Path Prepend`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Prepending Additional ASNs to the AS_Path:
First, E2's new configuration
route-map add-two-asns permit 10
set as-path prepend 3 3
router bgp 11
neighbor 192.168.1.6 route-map add-two-asns in
```

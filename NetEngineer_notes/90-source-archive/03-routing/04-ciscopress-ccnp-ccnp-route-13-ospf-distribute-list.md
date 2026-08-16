# 13 OSPF Distribute-list

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/13 OSPF Distribute-list`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
On Router R3:
ip prefix-list filter-1 seq 5 deny 10.16.1.0/24
ip prefix-list filter-1 seq 10 permit 0.0.0.0/0 le 32
!
router ospf 3
distribute-list prefix filter-1 in
```

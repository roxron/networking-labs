# 08 Named EIGRP

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/08 Named EIGRP`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
!Router R1 Configuration
router eigrp R1DEMO
!
address-family ipv4 unicast autonomous-system 1
!
af-interface default
hello-interval 2
hold-time 10
passive-interface
exit-af-interface
!
af-interface Serial1/0
no passive-interface
exit-af-interface
!
topology base
variance 2
exit-af-topology
network 0.0.0.0
exit-address-family
!
address-family ipv6 unicast autonomous-system 2
!
topology base
variance 2
exit-af-topology
exit-address-family
```

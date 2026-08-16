# 53 SNMP

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/53 SNMP`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Securing SNMPv1 and SNMPv2c:
!
R1(config)# snmp-server community $3cr3T ro 10
R1(config)# snmp-server community c1$c0 rw 10
R1(config)# access-list 10 permit host 10.1.1.1
```

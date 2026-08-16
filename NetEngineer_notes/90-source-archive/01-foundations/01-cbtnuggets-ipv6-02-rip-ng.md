# 02 RIP ng

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/IPV6/02 RIP ng`  
> Original source context: 01 CBTNUGGETS / IPV6. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Show Commands:
R1# show run | include ipv6
R1# Show ipv6 interface G0/0
R1# 

Configure RIPng 
R1(config)# interface g0/0
R1(config-if)# ipv6 rip RIPNG enable
R1(config-if)# interface g0/1
R1(config-if)# ipv6 rip RIPNG enable

R1# show ipv6 protocols
R1# show ipv6 rip
R1# show ipv6 rip next-hops
R1# show ipv6 rip database
R1# show ipv6 route rip
R1# debug ipv6 rip

Default route in RIPng:
R1(config)# interface G0/0
R1(config-if)# ipv6 rip RIPNG default-information originate

R1(config)# interface G0/1
R1(config-if)# ipv6 rip RIPNG default-information originate
```

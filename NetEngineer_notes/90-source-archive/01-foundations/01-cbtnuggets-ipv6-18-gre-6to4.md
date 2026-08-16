# 18 GRE & 6to4

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/IPV6/18 GRE & 6to4`  
> Original source context: 01 CBTNUGGETS / IPV6. Content is preserved as historical study material; validate commands against the target platform and release.

```text
IPv6 over GRE:
PE1(config)# interface Tunnel 1
PE1(config-if)# tunnel source loopback0
PE1(config-if)# tunnel destination 2.2.2.2
PE1(config-if)# ipv6 address fe80::1 link-local
PE1(config-if)# ipv6 address 2001:DB8:AAAA:D1::1/64
PE1(config-if)# exit

PE2(config)# interface Tunnel 1
PE2(config-if)# tunnel source loopback0
PE2(config-if)# tunnel destination 1.1.1.1
PE2(config-if)# ipv6 address fe80::2 link-local
PE2(config-if)# ipv6 address 2001:DB8:AAAA:D1::2/64
PE2(config-if)# exit


Auto 6to4: 
PE1(config)# interface tunnel 35
PE1(config-if)# tunnel source 0
PE1(config-if)# ipv6 address 2002:101:101::/128
PE1(config-if)# tunnel mode ipv6ip 6to4
PE1(config-if)# exit
PE1(config)# ipv6 route 2002::/16 tunnel 35

PE1(config)# interface tunnel 35
PE1(config-if)# tunnel source 0
PE1(config-if)# ipv6 address 2002:202:202::/128
PE1(config-if)# tunnel mode ipv6ip 6to4
PE1(config-if)# exit
PE1(config)# ipv6 route 2002::/16 tunnel 35
```

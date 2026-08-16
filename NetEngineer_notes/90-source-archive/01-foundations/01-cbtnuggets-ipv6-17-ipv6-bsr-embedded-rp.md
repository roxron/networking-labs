# 17 IPV6 BSR & Embedded RP

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/IPV6/17 IPV6 BSR & Embedded RP`  
> Original source context: 01 CBTNUGGETS / IPV6. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Bootstrap Router Protocol:
R1(config)# no ipv6 pim rp-address 2001:DB8:A002:2222::100
R1(config)# end
R1# clear ipv6 pim topology

R4(config)# ipv6 pim bsr candidate bsr 2001:DB8:A004:4444::100 priority 5
R4# show ipv6 pim bsr election 

R1(config)# ipv6 pim bsr candidate rp 2001:Db8:A001:1111:100
R1(config)# end
R1# show ipv6 pim bsr candidate-rp 
end

Embedded RP:
R2(config)# ipv6 pim rp-address 2001:DB8:A002:2222::100

R3(config)# interface G0/2
R3(config-if)# ipv6 mld join-group ff78:0240:2001:DB8:A002:2222::6783
```

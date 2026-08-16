# 12 Prefix Delegation

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/IPV6/12 Prefix Delegation`  
> Original source context: 01 CBTNUGGETS / IPV6. Content is preserved as historical study material; validate commands against the target platform and release.

```text
ISP site:
R1(config)# ipv6 local pool cust-pool1 2001:DB8:2:8000::/49 56 
R1(config)# ipv6 dhcp pool ISP-Pool 
R1(config-dhcpv6)# prefix-delegation pool cust-pool1 lifetime infinite infinite
R1(config-dhcpv6)# exit
R1(config)# interface G0/2
R1(config-if)# ipv6 dhcp server ISP-Pool

R1# show ipv6 local pool
R1# show ipv6 dhcp pool 
R1# show ipv6 dhcp binding 


Customer Site:
R2(config)# interface G0/0
R2(config-if)#ipv6 dhcp client pd FROM_ISP
R2(config-if)# exit
R2(config)# interface g0/1
R2(config-if)# ipv6 address FROM_ISP ::0:0:0:0:1/64

R2# show  ipv6  general-prefix
R2# show ipv6 dhcp interface
```

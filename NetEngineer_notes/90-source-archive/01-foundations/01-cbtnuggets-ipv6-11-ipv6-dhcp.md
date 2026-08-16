# 11 IPV6 DHCP

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/IPV6/11 IPV6 DHCP`  
> Original source context: 01 CBTNUGGETS / IPV6. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Statefull DHCPv6:
R1(config)# ipv6 dhcp pool OURPOOL 
R1(config-dhcpv6)# address prefix 2001db8:1::/64
R1(config-dhcpv6)# dns-server 2001:db8:2::100
R1(config-dhcpv6)# domain-name CBTNuggets.com
R1(config-dhcpv6)# exit
R1(config)# interface G0/0
R1(config-if)# ipv6 dhcp server OURPOOL
R1(config-if)# ipv6 nd managed-config-flag
R1(config-if)# exit

R1# show ipv6 dhcp pool 
R1# show ipv6 dhcp binding 
R1# show ipv6 dhcp interface

Stateless DHCPv6:
R1(config)# ipv6 dhcp pool MYPOOL
R1(config-dhcpv6)# dns-server 2001:DB8:2::100
R1(config-dhcpv6)# domain-name ccnp.net
R1(config-dhcpv6)# exit
R1(config)# interface G0/0
R1(config-if)# ipv6 dhcp server MYPOOL
R1(config-if)# ipv6 nd other-config-flag
R1(config-if)# exit

DHCP Relay:
R2(config)# interface G0/0
R2(config-if)# ipv6 dhcp relay destination 2001:db8:12::2 g0/1

R2# debug ipv6 dhcp relay
```

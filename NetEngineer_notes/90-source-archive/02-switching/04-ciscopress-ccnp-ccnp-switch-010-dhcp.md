# 010 DHCP

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP SWITCH/010 DHCP.txt`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure IPv4 DHCP Server:
!
Switch(config)# interface vlan10
Switch(config-if)# ip address 192.168.1.1 255.255.255.0
Switch(config-if)# no shutdown
Switch(config-if)# exit
Switch(config)# ip dhcp excluded-address 192.168.1.2 192.168.1.5S
witch(config)# ip dhcp pool Users
Switch(dhcp-config)# network 192.168.1.0 255.255.255.0
Switch(dhcp-config)# default-router 192.168.1.1
Switch(dhcp-config)# exit
!
Monitor DHCP Server:
!
show ip dhcp binding 
!
clear ip dhcp binding 
!
Configuring a Manual Address Binding:
!
debug ip dhcp server 
!
Switch(config)# ip dhcp pool my-pc
Switch(dhcp-config)# host 192.168.1.99 255.255.255.0
Switch(dhcp-config)# client-identifier 0100.50b6.5bc0.b5
Switch(dhcp-config)# exit
Switch(config)# exit
!
Configuring DHCP Options:
!
Switch(dhcp-config)# option 150 ip 10.10.10.10
!
Configuring a DHCP Relay:
!
Switch(config)# interface vlan5
Switch(config-if)# ip address 192.168.1.1 255.255.255.0
Switch(config-if)# ip helper-address 192.168.199.4
Switch(config-if)# exit
!
Configuring DHCP to Support IPv6:
!
Switch(config)# ipv6 dhcp pool v6-users
Switch(config-dhcpv6)# address prefix 2001:db8:a::/64
Switch(config-dhcpv6)# dns-server 2001:db8:c12::10
Switch(config-dhcpv6)# domain-name mydomain.com
Switch(config-dhcpv6)# exit
Switch(config)# interface vlan 5
Switch(config-if)# ipv6 address 2001:db8:a::1/64
Switch(config-if)# ipv6 dhcp server v6-users
Switch(config-if)# no shutdown
!
DHCPv6 Lite:
!
Switch(config)# ipv6 dhcp pool v6-users
Switch(config-dhcpv6)# dns-server 2001:db8:c12::10
Switch(config-dhcpv6)# domain-name mydomain.com
Switch(config-dhcpv6)# exit
Switch(config)# interface vlan 5
Switch(config-if)# ipv6 address 2001:db8:a::1/64
Switch(config-if)# ipv6 dhcp server v6-users
Switch(config-if)# ipv6 nd other-config-flag
Switch(config-if)# no shutdown
!
Configuring a DHCPv6 Relay Agent:
!
Switch(config-if)# ipv6 dhcp relay destination 2900:1111:FFFF:dddd::1DD1
!
Verifying IPv6 DHCP Operation:
!
Switch# show ipv6 dhcp pool
Switch# show ipv6 dhcp binding
Switch# clear ipv6 dhcp binding 
!
```

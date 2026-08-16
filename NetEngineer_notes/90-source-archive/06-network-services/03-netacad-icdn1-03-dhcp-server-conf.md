# 03 DHCP Server Conf.

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN1/03 DHCP Server Conf..txt`  
> Original source context: 03 NETACAD / ICDN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring DHCPv4 Step1: Excluding IPv4 Addresses:
R1(config)# ip dhcp excluded-address 192.168.0.1 192.168.0.10
R1(config)# ip dhcp excluded-address 192.168.9.254

Configuring DHCPv4 Step2: Configuring a DHCPv4 Pool:
R1(config)# ip dhcp pool DHCP1
R1(dhcp-config)# network 192.168.0.0 255.255.255.0
R1(dhcp-config)# default-router 192.168.0.254
R1(dhcp-config)# dns-server 192.168.10.100
R1(dhcp-config)# domain-name example.com
R1(dhcp-config)# end
R1#

Disabling DHCPv4 
R1(config)# no service dhcp

Verifing DHCPv4:
R1# show running-config | selection dhcp
R1# show ip dhcp binding
R1# show ip dhcp server statistics
R1# show ip dhcp pool 
R1# show ip dhcp conflict 

Configure DHCPv4 Relay Address:
R1(config)# interface G0/0
R1(config-if)# ip helper-address 192.168.100.5


Configuring Basic DHCPv4 on a Switch Topology:
The same as on the Router but need to change switch template to IP routing:
Change the SDM Preference (Cisco Switch Database Manager):
R1# show sdm prefer
R1(config)# sdm prefer lanbase-routing
R1(config)# ip routing 
R1(config)# exit
R1#

Configuring a Router as a DHCP Client:
R1(config)# interface G0/0
R1(config-if)# ip address dhcp 
R1(config-if)# no shutdown

Debugging DHCPv4:
R1(config)# access-list 100 permit udp any any eq 67
R1(config)# access-list 100 permit udp any any eq 68
R1# debug ip packet 100

R1# debug ip dhcp server events



SLAAC and DHCPv6:
Reset SLAAC
R1(config-if)# no ipv6 nd managed-config-flag
R1(config-if)# no ipv6 nd other-config-flag

Stateless DHCPv6 Option:
R1(config-if)# ipv6 nd other-config-flag

Stateful DHCPv6 (DHCPv6 only):
R1(config-if)# ipv6 nd managed-config-flag


Configuring a Router as stateless DHCPv6 Server:
R1(config)# ipv6 unicast-routing
R1(config)# ipv6 dhcp pool IPv6-STATELESS
R1(config-dhcpv6)# dns-server 2001:db8:cafe:aaaa::5
R1(config-dhcpv6)# domain-name example.com
R1(config-dhcpv6)# exit
R1(config)# interface g0/1 
R1(config-if)# ipv6 address 2001:db8:cafe:1::1/64
R1(config-if)# ipv6 dhcp server IPv6-STATELESS
R1(config-if)# ipv6 nd other-config-flag
R1(config-if)# exit


Configuring a Router as a Stateless DHCPv6 Client:
R1(config)# interface g0/1
R1(config-if)# ipv6 enable
R1(config-if0# ipv6 address autoconfig

Verifying Stateless DHCPv6:
R1# debug ipv6 dhcp detail
R1# show ipv6 dhcp pool
R1# show ipv6 inteface g0/0
R1# show running-config


Configuring a Router as a Stateful DHCPv6 Server:
R1(config)# ipv6 unicast-routing
R1(config)# ipv6 dhcp pool IPV6-STATEFUL
R1(config-dhcpv6)# address prefix 2001:DB8:CAFE:1::/64 lifetime infinite
R1(config-dhcpv6)# dns-server 2001:DB8:CAFE:aaaa::5
R1(config-dhcpv6)# domain-name example.com
R1(config-dhcpv6)# exit
R1(config)# interface G0/1
R1(config-if)# ipv6 address 2001:DB8:CAFE:1::1/64
R1(congig-if)# ipv6 address FE80::1 link-local
R1(config-if)# ipv6 dhcp server IPV6-STATEFUL
R1(config-if)# ipv6 nd managed-config-flag
R1(config-if0# exit

Configuring a Router as a Stateful DHCPv6 Client:
R2(config)# interface g0/1
R2(config-if)# ipv6 enable
R2(config-if)# ipv6 address dhcp


Configuring a Router as a DHCPv6 Relay Agent:
R1(config)# interface g0/0
R1(config-if)# ipv6 dhcp relay destination 2001:DB8:CAFE:AAAA::5
R1(config-if)# end
R1# show ipv6 dhcp interface g0/0
```

# 7 Day DHCP and DNS

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNA R&S for 31 days/7 Day DHCP and DNS`  
> Original source context: 04 CISCOPRESS / CCNA R&S for 31 days. Content is preserved as historical study material; validate commands against the target platform and release.

```text
DHCP and DNS:
!
Configuring a Router as a DHCPv4 Server:
!
!Configure IP addresses that you want excluded from the DHCPv4 pool of addresses
R1(config)# ip dhcp excluded-address 192.168.10.1 192.168.10.9
R1(config)# ip dhcp excluded-address 192.168.10.254
R1(config)# ip dhcp excluded-address 192.168.11.1 192.168.11.9
R1(config)# ip dhcp excluded-address 192.168.11.254
!
R1(config)# ip dhcp pool LAN-POOL-10
R1(dhcp-config)# network 192.168.10.0 255.255.255.0
R1(dhcp-config)# default-router 192.168.10.1
R1(dhcp-config)# dns-server 192.168.50.195 209.165.202.158
R1(dhcp-config)# domain-name cisco.com
R1(dhcp-config)# lease 2
R1(dhcp-config)# netbios-name-server 192.168.10.254
R1(dhcp-config)# ip dhcp pool LAN-POOL-11
R1(dhcp-config)# network 192.168.11.0 255.255.255.0
R1(dhcp-config)# default-router 192.168.11.1
R1(dhcp-config)# dns-server 192.168.50.195 209.165.202.158
R1(dhcp-config)# domain-name cisco.com
R1(dhcp-config)# lease 2
R1(dhcp-config)# netbios-name-server 192.168.11.254
R1(dhcp-config)# end
!
!
Disable DHCP service:
!
R1(config)# no service dhcp 
!
!
Verifying DHCPv4 Operation:
!
R1# show ip dhcp binding 
R1# show ip dhcp server statistics 
R1# show ip dhcp pool 
!
!
MS Windows DHCPv4 Client Configuration:
!
C:\> ipconfig /all
C:\> ipconfig /release 
C:\> ipconfig /renew
!
!
Configuring a Router to Relay DHCPv4 Requests:
!
R1(config)# interface gigabitethernet 0/0
R1(config-if)# ip helper-address 192.168.11.5
!
!
To specify additional ports:
!
R1(config)# ip forward-protocols udp 
!
!
Configuring a Router as a DHCPv4 Client:
!
BRANCH(config)# interface g0/1
BRANCH(config-if)# ip address dhcp
BRANCH(config-if)# no shutdown
!
!
!
DHCPv6:
!
Stateless DHCPv6:
!
Router(config-if)# ipv6 nd other-config-flag
!
!
Stateful DHCPv6:
!
Router(config-if)# ipv6 nd managed-config-flag
!
!
Configuring a Router as a Stateless DHCPv6 Server:
!
R1(config)# ipv6 unicast-routing
R1(config)# ipv6 dhcp pool O-FLAG-SET
R1(config-dhcpv6)# dns-server 2001:db8:acad:1::5
R1(config-dhcpv6)# domain-name cisco.com
R1(config-dhcpv6)# exit
R1(config)# interface g0/1
R1(config-if)# ipv6 address 2001:db8:1:1::1/64
R1(config-if)# ipv6 dhcp server O-FLAG-SET
R1(config-if)# ipv6 nd other-config-flag
R1(config-if)# end
R1# show ipv6 dhcp pool
!
!
Configuring an Interface as a stateless DHCPv6 Client:
!
R3(config)# interface g0/1
R3(config-if)# ipv6 enable
R3(config-if)# ipv6 address autoconfig
R3(config-if)# end
R3# show ipv6 interface g0/1
!
!
Configuring a Router as a Stateful DHCPv6 Server:
!
R1(config)# ipv6 unicast-routing
R1(config)# ipv6 dhcp pool M-FLAG-SET
R1(config-dhcpv6)# address prefix 2001:db8:1:1::/64 lifetime infinite infinite
R1(config-dhcpv6)# dns-server 2001:db8:acad:1::5
R1(config-dhcpv6)# domain-name cisco.com
R1(config-dhcpv6)# exit
R1(config)# interface g0/1
R1(config-if)# ipv6 address 2001:db8:1:1::1/64
R1(config-if)# ipv6 nd managed-config-flag
R1(config-if)# end
!
Verify DHCPv6:
!
R1# show ipv6 dhcp pool 
R1# show ipv6 dhcp binding 
!
!
Configuring an Interface as a stateful DHCPv6 Client:
!
R3(config)# interface g0/1
R3(config-if)# ipv6 enable
R3(config-if)# ipv6 address dhcp
R3(config-if)# end
R3# show ipv6 interface g0/1
!
!
!
DNS:
Just theory
!
No Commands
```

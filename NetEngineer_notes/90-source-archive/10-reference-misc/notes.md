# notes

> Imported source note. Provenance: `NetEngineer_Journal/notes`  
> Original source context: Journal root. Content is preserved as historical study material; validate commands against the target platform and release.

```text
router eigrp 1 
no auto-summary 
network 0.0.0.0
end

 switchport trunk encapsulation dot1q
 switchport trunk native vlan 2
 switchport mode trunk
 switchport nonegotiate

		
vlan 2 
name NATIVE
vlan 3 
name NET_M
vlan 10
name SWA1_L
vlan 20 
name SWA2_L
vlan 30
name SWA3_L
end


vlan 2 
name NATIVE
vlan 3 
name NET_M
vlan 10
name SWA1_L
end


vlan 2 
name NATIVE
vlan 3 
name NET_M
vlan 20 
name SWA2_L
end


vlan 2 
name NATIVE
vlan 3 
name NET_M
vlan 30
name SWA3_L
end














172.16.0.0    172.16.0.0    172.16.0.0
172.16.64.0   172.16.32.0   172.16.16.0
172.16.128.0  172.16.64.0   172.16.32.0
172.16.192.0  172.16.96.0   172.16.48.0
              172.16.128.0  172.16.64.0
              172.16.160.0  172.16.80.0
              172.16.192.0  172.16.96.0    172.16.96.0
              172.16.224.0  172.16.112.0   172.16.108.0
                            172.16.128.0   172.16.116.0 





 no neighbor 192.168.255.2 remote-as 500
 no neighbor 192.168.255.2 update-source Loopback101
 no neighbor 192.168.255.3 remote-as 500
 no neighbor 192.168.255.3 update-source Loopback101
 no neighbor 192.168.255.11 remote-as 500
 no neighbor 192.168.255.11 update-source Loopback101
 no neighbor 192.168.255.11 next-hop-self
 no neighbor 192.168.255.12 remote-as 500
 no neighbor 192.168.255.12 update-source Loopback101
 no neighbor 192.168.255.12 next-hop-self
 no neighbor 192.168.255.13 remote-as 500
 no neighbor 192.168.255.13 update-source Loopback101
 no neighbor 192.168.255.13 next-hop-self
 no neighbor 192.168.255.14 remote-as 500
 no neighbor 192.168.255.14 update-source Loopback101
 no neighbor 192.168.255.14 next-hop-self

 no neighbor 192.168.255.1 remote-as 500
 no neighbor 192.168.255.1 update-source Loopback101
 no neighbor 192.168.255.3 remote-as 500
 no neighbor 192.168.255.3 update-source Loopback101

 no neighbor 192.168.255.1 remote-as 500
 no neighbor 192.168.255.1 update-source Loopback101
 no neighbor 192.168.255.2 remote-as 500
 no neighbor 192.168.255.2 update-source Loopback101


no ip route 80.0.0.0 255.255.248.0 Null0





Network Engineering, Network Design, Network Security, Network Automation, Remote Support, Project Management, Technical Support, Strong troubleshooting skills, Verbal and written communication, Routed Protocols: IPv4, IPv6, CLNS, IP Multicast
Routing Protocols: BGP, MP-BGP, OSPFv2&v3, IS-IS, EIGRP, RIP, PIM-SM, SSM, MPLS
Switching Technologies: VLAN,VLAN Trunking, Inter-VLAN Routing, STP, MST, EtherChannel, VTP, L2/L3 Switching, Port security, DHCP Snooping, IPSG, Dynamic ARP Inspection, 802.1x
  Routers, Switches, Firewalls,
LAN and WAN technologies, Ethernet, DSL, Frame Relay, MPLS, Cabling CAT5e,6, Fiber Optics
VPN Technologies: GRE, DMVPN, IPSEC, OpenVPN L3VPN MPLS, L2VPN MPLS
Subnetting, VLSM, IP addressing management
Network Monitoring: SNMP, PRTG, ZABBIX, Netflow, Syslog Traffic Analyzer: Wireshark, TCPdump
Network Emulation Software: Cisco VIRL, GNS3, EVE-NG
IP Services: NAT/PAT, DHCP, DNS, IP SLA, PBR, Route-Map, Prefix-list
Firewalls: Cisco ASA, PaloAlto, Ubuntu UFW
Cisco Experience (8 years)
Opertating Systems: Ubuntu Linux, Cisco IOS,
Network tools: ping, traceroute, nmap, nslookup, etc.
Vendors: Cisco, Juniper, Ubiquiti

YUghbn2143$$
```

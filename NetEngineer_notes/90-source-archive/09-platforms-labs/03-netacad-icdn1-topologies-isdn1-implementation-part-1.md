# ISDN1 Implementation Part 1

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN1/TOPOLOGIES/ISDN1 Implementation Part 1.txt`  
> Original source context: 03 NETACAD / ICDN1 / TOPOLOGIES. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Topology: 3 - Routers: ISP, R1 and R2, 2 L3-Switches: MS1 and MS2

Connections:
ISP G0/0 to R1 G0/0 Net: 100.50.25.0/30      2001:DB8:ACAD:000A::/64
ISP G0/1 to R2 G0/0 Net: 100.50.25.4/30      2001:DB8:ACAD:000B::/64
Local NETS:                              
ISP Lo0:            Net: 110.120.130.0/24    2001:DB8:ACAD:AAAA::/64
ISP Lo1:            Net: 110.120.131.0/24    2001:DB8:ACAD:BBBB::/64

R1 G0/1 to R2 G0/1  Net: 100.50.25.8/30      2001:DB8:ACAD:000C::/64
R1 G0/2 to MS1 G0/0 Net: 100.50.25.12/30     2001:DB8:ACAD:000D::/64
R2 G0/2 to MS2 G0/0 Net: 100.50.25.16/30     2001:DB8:ACAD:000E::/64

MS1 G0/1 to MS2 G0/1 TRUNK LINK ALLOWED VLANS: 10 20 30 40 50

ALL VLANS ARE ON PRIVITE NETWORKS: 
VLAN10 - NATIVE       Net: NO IP NETWORK      Summary NET:
VLAN20 - MANAGE       Net: 192.168.0.0/24 >>>>> 00000000
VLAN30 - DATA         Net: 192.168.1.0/24 >>>>> 00000001             
VLAN40 - VOICE        Net: 192.168.2.0/24 >>>>> 00000010     >> 192.168.0.0/22  255.255.252.0  0.0.3.255
VLAN50 - PRODUCTION   Net: 192.168.3.0/24 >>>>> 00000011

IPv6 Addressing implemetation for VLANS:
VLAN10 - NATIVE       
VLAN20 - MANAGE       Net: 2001:DB8:ACAD:0001::/64
VLAN30 - DATA         Net: 2001:DB8:ACAD:0002::/64
VLAN40 - VOICE        Net: 2001:DB8:ACAD:0003::/64
VLAN50 - PRODUCTION   Net: 2001:DB8:ACAD:0004::/64

PUBLIC POOL FOR NAT overload Translations:
200.100.50.0/29 200.100.50.1 - 200.100.50.6 255.255.255.248 Lst octet in bin: 11111000
```

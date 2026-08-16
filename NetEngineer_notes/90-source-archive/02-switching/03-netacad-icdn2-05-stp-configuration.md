# 05 STP Configuration

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN2/05 STP Configuration`  
> Original source context: 03 NETACAD / ICDN2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
STP:
Configure Port Cost:
S1(config)# interface F0/1
S1(config-if)# spannig-tree cost 25

Verify STP:
S1# show spanning-tree 
S1# show spanning-tree summary

Spanning Tree Configuration:
PVST+
Configuring the Bridge ID:
Method 1:
S1(config)# spanning-tree VLAN 1 priority 24576
S2(config)# spanning-tree VLAN 1 priority 28672
or
Method 2:
S1(config)# spanning-tree VLAN 1 root primary
S2(config)# spanning-tree VLAN 1 root secondary

Configuring PortFast (Edge Port) and BPDUGUARD 
Enable on the interface:
S1(config)#interface F0/24
S1(config-if)# spanning-tree portfast
S1(config-if)# spanning-tree bpduguard enable
Enable Globaly:
S1(config)# spannig-tree port-fast bpduguard default
S1(config)# spannig-tree port-fast default


PVST+ Load Balancing
There are VLANS 10 and 20 
S1 is Root Bridge for 10 
S2 is Root Bridge for 20 
Configurations:
S1(config)# spanning-tree vlan 10 priority 4096
S1(config)# spanning-tree vlan 20 priortiy 8192
and 
S2(config)# spanning-tree vlan 20 priority 4096
S2(config)# spanning-tree vlan 10 priority 8192

Configuring Rapid PVST+
S1(config)# spanning-tree mode rapid-pvst
S1(config)# interface F0/1
S1(config-if)# spanning-tree link-type point-to-point
S1(config-if)# end
S1# clear spanning-tree detected-protocols
```

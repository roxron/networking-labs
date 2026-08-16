# IP networks Table

> Imported source note. Provenance: `NetEngineer_Journal/TOPOLOGIES/OSPF 3 Tier Hierarchical/IP networks Table`  
> Original source context: TOPOLOGIES / OSPF 3 Tier Hierarchical. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1# Directly Connected:
Gateway of last resort is 50.0.0.1 to network 0.0.0.0

      10.0.0.0/8 is variably subnetted, 15 subnets, 4 masks
C        10.0.0.0/29 is directly connected, GigabitEthernet0/0
C        10.0.0.8/30 is directly connected, GigabitEthernet0/1
C        10.0.0.12/30 is directly connected, GigabitEthernet0/2
C        10.0.0.24/30 is directly connected, GigabitEthernet0/3
C        10.0.0.28/30 is directly connected, GigabitEthernet0/4
      50.0.0.0/8 is variably subnetted, 2 subnets, 2 masks
C        50.0.0.0/30 is directly connected, GigabitEthernet0/5



R2# Directly Connected:
      10.0.0.0/8 is variably subnetted, 13 subnets, 4 masks
C        10.0.0.0/29 is directly connected, GigabitEthernet0/0
C        10.0.0.8/30 is directly connected, GigabitEthernet0/1
C        10.0.0.16/30 is directly connected, GigabitEthernet0/2

R3# Directly Connected:
      10.0.0.0/8 is variably subnetted, 15 subnets, 4 masks
C        10.0.0.0/29 is directly connected, GigabitEthernet0/0
C        10.0.0.12/30 is directly connected, GigabitEthernet0/2
C        10.0.0.20/30 is directly connected, GigabitEthernet0/1
C        10.0.0.32/30 is directly connected, GigabitEthernet0/3
C        10.0.0.36/30 is directly connected, GigabitEthernet0/4
      60.0.0.0/8 is variably subnetted, 2 subnets, 2 masks
C        60.0.0.0/30 is directly connected, GigabitEthernet0/5


R4# Directly Connected:
      10.0.0.0/8 is variably subnetted, 13 subnets, 4 masks
C        10.0.0.0/29 is directly connected, GigabitEthernet0/0
C        10.0.0.16/30 is directly connected, GigabitEthernet0/2
C        10.0.0.20/30 is directly connected, GigabitEthernet0/1

SWC1# Directly Connected:
      10.0.0.0/8 is variably subnetted, 22 subnets, 5 masks
C        10.0.0.24/30 is directly connected, GigabitEthernet0/0
C        10.0.0.32/30 is directly connected, GigabitEthernet0/1
C        10.0.1.0/30 is directly connected, Port-channel3
C        10.0.1.4/30 is directly connected, Port-channel1
C        10.0.1.8/30 is directly connected, Port-channel2


SWC2# Directly Connected:
      10.0.0.0/8 is variably subnetted, 22 subnets, 5 masks
C        10.0.0.28/30 is directly connected, GigabitEthernet0/0
C        10.0.0.36/30 is directly connected, GigabitEthernet0/1
C        10.0.1.0/30 is directly connected, Port-channel3
C        10.0.1.12/30 is directly connected, Port-channel2
C        10.0.1.16/30 is directly connected, Port-channel1


SWD1# Directly Connected:
      10.0.0.0/8 is variably subnetted, 10 subnets, 3 masks
C        10.0.1.4/30 is directly connected, Port-channel1
C        10.0.1.12/30 is directly connected, Port-channel2
C        10.0.1.20/30 is directly connected, Port-channel3
      172.16.0.0/16 is variably subnetted, 12 subnets, 2 masks
C        172.16.100.0/24 is directly connected, Vlan100
C        172.16.101.0/24 is directly connected, Vlan101
C        172.16.102.0/24 is directly connected, Vlan102
C        172.16.103.0/24 is directly connected, Vlan103
C        172.16.104.0/24 is directly connected, Vlan104
C        172.16.105.0/24 is directly connected, Vlan105

SWD2# Directly Connected:
      10.0.0.0/8 is variably subnetted, 10 subnets, 3 masks
C        10.0.1.8/30 is directly connected, Port-channel2
C        10.0.1.16/30 is directly connected, Port-channel1
C        10.0.1.20/30 is directly connected, Port-channel3
      172.16.0.0/16 is variably subnetted, 12 subnets, 2 masks
C        172.16.100.0/24 is directly connected, Vlan100
C        172.16.101.0/24 is directly connected, Vlan101
C        172.16.102.0/24 is directly connected, Vlan102
C        172.16.103.0/24 is directly connected, Vlan103
C        172.16.104.0/24 is directly connected, Vlan104
C        172.16.105.0/24 is directly connected, Vlan105
```

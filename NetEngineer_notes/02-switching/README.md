# Switching

## Safe Layer 2 build order

1. Document VLAN IDs, names, subnets, gateways, native VLAN, and allowed VLANs.
2. Create VLANs before assigning access ports.
3. Configure access ports explicitly; add edge protections only on true edge ports.
4. Configure both ends of trunks with matching native and allowed VLANs.
5. Build EtherChannels from identically configured members, preferably with LACP.
6. Deliberately place the STP root and secondary root on distribution/core switches.
7. Verify MAC learning, STP state, trunk VLANs, and channel membership before adding redundancy.

```ios
vlan <VLAN_ID>
 name <VLAN_NAME>
!
interface <ACCESS_INTERFACE>
 description <ENDPOINT>
 switchport mode access
 switchport access vlan <VLAN_ID>
 spanning-tree portfast
 spanning-tree bpduguard enable
!
interface range <MEMBER_RANGE>
 shutdown
 switchport mode trunk
 switchport trunk native vlan <NATIVE_VLAN>
 switchport trunk allowed vlan <VLAN_LIST>
 channel-group <GROUP> mode active
 no shutdown
!
interface port-channel <GROUP>
 switchport mode trunk
 switchport trunk native vlan <NATIVE_VLAN>
 switchport trunk allowed vlan <VLAN_LIST>
```

Use PortFast/BPDU Guard only where a bridge is not expected. EtherChannel members need compatible speed, duplex, VLAN, trunk, and STP settings; configure the port-channel consistently. Cisco documents these constraints in its [EtherChannel guide](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr2-fwd/etherchannel/etherchannel-configuration-guide/m_ethernetchannel.html) and warns that native VLAN mismatches can create loops in its [trunk guide](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9400/software/release/17-9/configuration_guide/vlan/b_179_vlan_9400_cg/configuring_vlan_trunks.html).

## Verify and rollback

```ios
show vlan brief
show interfaces trunk
show interfaces switchport
show etherchannel summary
show lacp neighbor
show spanning-tree root
show spanning-tree inconsistentports
show mac address-table dynamic
```

If a new redundant link causes instability, shut the new link or port-channel first, preserve console access, and compare both ends. Never “fix” a loop by globally disabling STP.

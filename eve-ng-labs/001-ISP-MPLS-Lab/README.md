# ISP MPLS Core Lab

## Lab Purpose

This EVE-NG lab builds a redundant service-provider MPLS backbone. Six provider (P) routers form the transit core, and two provider-edge (PE) routers are dual-homed to that core. The lab focuses on underlay reachability, MPLS label distribution, path redundancy, and preparation for services such as MPLS Layer 3 VPNs.

The addressing and links in this document are taken from [ISP-MPLS-Lab-Diagram.drawio](./ISP-MPLS-Lab-Diagram.drawio). The diagram does not show CE routers, customer networks, VRFs, routing process numbers, or BGP autonomous-system numbers; those are therefore outside the current topology.

## Topology Overview

```text
                         PE1                              PE2
                      /       \                        /       \
                     /         \                      /         \
                   P1-----------P2------------------+           |
                   | \         / |                              |
                   |   \     /   |                              |
                   |     \ /     |                              |
                   |     / \     |                              |
                   |   /     \   |                              |
                   | /         \ |                              |
                   P3-----------P4------------------+           |
                                | \                /            |
                                |   \            /              |
                                |     P5--------P6               |
                                |    /  \        /               |
                                +---+    +------+----------------+
```

Logical adjacencies:

- P1, P2, P3, and P4 form a full mesh of six point-to-point links.
- P2 and P4 each connect to both P5 and P6.
- P5 and P6 have a direct link between them.
- PE1 is dual-homed to P1 and P3.
- PE2 is dual-homed to P2 and P4.
- All transit links use `/30` IPv4 subnets.
- All routers use `/32` Loopback0 addresses as stable router and LDP identifiers.

## Devices and Their Roles

| Device | Role | Loopback0 | Function |
|---|---|---|---|
| P1 | Provider core | `10.0.50.1/32` | Transit router and PE1 attachment point |
| P2 | Provider core | `10.0.50.2/32` | Transit router and PE2 attachment point |
| P3 | Provider core | `10.0.50.3/32` | Transit router and alternate PE1 attachment point |
| P4 | Provider core | `10.0.50.4/32` | Transit router and alternate PE2 attachment point |
| P5 | Provider core | `10.0.50.5/32` | Additional redundant transit router |
| P6 | Provider core | `10.0.50.6/32` | Additional redundant transit router |
| PE1 | Provider edge | `10.0.52.1/32` | Service edge dual-homed to P1 and P3 |
| PE2 | Provider edge | `10.0.52.2/32` | Service edge dual-homed to P2 and P4 |

## Interface and IP Addressing

### P-Router Core Links

| Link | Subnet | Side A | Address | Side B | Address |
|---|---|---|---|---|---|
| P1–P2 | `10.0.0.0/30` | P1 Gi0/0 | `10.0.0.1/30` | P2 Gi0/0 | `10.0.0.2/30` |
| P1–P3 | `10.0.0.4/30` | P1 Gi0/1 | `10.0.0.5/30` | P3 Gi0/1 | `10.0.0.6/30` |
| P2–P4 | `10.0.0.8/30` | P2 Gi0/1 | `10.0.0.9/30` | P4 Gi0/1 | `10.0.0.10/30` |
| P3–P4 | `10.0.0.12/30` | P3 Gi0/0 | `10.0.0.13/30` | P4 Gi0/0 | `10.0.0.14/30` |
| P1–P4 | `10.0.0.16/30` | P1 Gi0/2 | `10.0.0.17/30` | P4 Gi0/2 | `10.0.0.18/30` |
| P2–P3 | `10.0.0.20/30` | P2 Gi0/2 | `10.0.0.21/30` | P3 Gi0/2 | `10.0.0.22/30` |
| P2–P5 | `10.0.0.24/30` | P2 Gi0/3 | `10.0.0.25/30` | P5 Gi0/0 | `10.0.0.26/30` |
| P2–P6 | `10.0.0.28/30` | P2 Gi0/4 | `10.0.0.29/30` | P6 Gi0/1 | `10.0.0.30/30` |
| P4–P6 | `10.0.0.32/30` | P4 Gi0/3 | `10.0.0.33/30` | P6 Gi0/0 | `10.0.0.34/30` |
| P4–P5 | `10.0.0.36/30` | P4 Gi0/4 | `10.0.0.37/30` | P5 Gi0/1 | `10.0.0.38/30` |
| P5–P6 | `10.0.0.40/30` | P5 Gi0/2 | `10.0.0.41/30` | P6 Gi0/2 | `10.0.0.42/30` |

### PE-to-P Links

| Link | Subnet | PE Interface | PE Address | P Interface | P Address |
|---|---|---|---|---|---|
| PE1–P1 | `10.0.1.0/30` | PE1 Gi0/0 | `10.0.1.1/30` | P1 Gi0/3 | `10.0.1.2/30` |
| PE1–P3 | `10.0.1.4/30` | PE1 Gi0/1 | `10.0.1.5/30` | P3 Gi0/3 | `10.0.1.6/30` |
| PE2–P2 | `10.0.1.8/30` | PE2 Gi0/0 | `10.0.1.9/30` | P2 Gi0/3 | `10.0.1.10/30` |
| PE2–P4 | `10.0.1.12/30` | PE2 Gi0/1 | `10.0.1.13/30` | P4 Gi0/3 | `10.0.1.14/30` |

> [!IMPORTANT]
> The diagram assigns Gi0/3 on P2 and P4 to both a P-router link and a PE link. Specifically, P2 Gi0/3 appears on P2–P5 and PE2–P2, while P4 Gi0/3 appears on P4–P6 and PE2–P4. A physical router interface cannot carry both point-to-point subnets unless subinterfaces or a shared segment are intentionally used. Before deploying the lab, change one interface in each conflicting pair (for example, use P2 Gi0/5 and P4 Gi0/5 for the PE links) and update the EVE-NG cabling and configuration accordingly.

### Addressing Summary

| Address Block | Use |
|---|---|
| `10.0.0.0/24` | P-to-P point-to-point links (`10.0.0.0/30` through `10.0.0.40/30`) |
| `10.0.1.0/24` | PE-to-P point-to-point links (`10.0.1.0/30` through `10.0.1.12/30`) |
| `10.0.50.0/23` | Reserved by the diagram for P-router loopbacks; used addresses are `10.0.50.1–10.0.50.6/32` |
| `10.0.52.0/23` | Reserved by the diagram for PE-router loopbacks; used addresses are `10.0.52.1–10.0.52.2/32` |

## Technologies and Protocols Used

- IPv4 point-to-point addressing with `/30` prefixes
- `/32` router loopbacks
- An interior gateway protocol (IGP), such as OSPF or IS-IS, for underlay reachability
- MPLS forwarding on all P-to-P and PE-to-P links
- Label Distribution Protocol (LDP)
- Equal-cost multipath (ECMP), where supported by the chosen IGP metrics
- Fast rerouting through redundant physical paths
- ICMP and traceroute for data-plane verification

The diagram defines the physical and Layer 3 design but does not explicitly name an IGP. The examples below use single-area OSPF as the reference implementation.

## Lab Objectives

1. Cable the 15 point-to-point links shown in the diagram.
2. Configure every physical interface and Loopback0 address.
3. Establish an IGP adjacency on every transit link.
4. Advertise all eight loopbacks through the provider IGP.
5. Enable MPLS on all P-to-P and PE-to-P links.
6. Establish LDP sessions throughout the provider network.
7. Verify label-switched paths between PE1 and PE2.
8. Observe ECMP paths through the redundant core.
9. Test convergence after individual links or P routers fail.
10. Prepare the PE routers for later MP-BGP and VPN service configuration.

## Configuration Tasks

### 1. Resolve the Interface Conflicts

Correct the duplicate P2 Gi0/3 and P4 Gi0/3 assignments noted above. The remaining examples assume the physical interfaces have been made unique.

### 2. Configure Base IPv4 Addressing

Configure the hostname, Loopback0, and point-to-point interfaces on each router.

```cisco
hostname P1
!
interface Loopback0
 ip address 10.0.50.1 255.255.255.255
!
interface GigabitEthernet0/0
 description TO-P2
 ip address 10.0.0.1 255.255.255.252
 no shutdown
```

Repeat this task using the addressing tables. Confirm that all directly connected neighbors respond to pings before configuring routing.

### 3. Configure the Provider IGP

Use a single OSPF area for the reference lab. Set each router ID to its Loopback0 address, make interfaces passive by default, and enable OSPF only on required transit links.

```cisco
router ospf 1
 router-id 10.0.50.1
 passive-interface default
 no passive-interface GigabitEthernet0/0
 no passive-interface GigabitEthernet0/1
 no passive-interface GigabitEthernet0/2
 no passive-interface GigabitEthernet0/3
 network 10.0.0.0 0.0.0.255 area 0
 network 10.0.1.0 0.0.0.255 area 0
 network 10.0.50.1 0.0.0.0 area 0
```

Include only the interfaces present on each router. PE loopbacks are in the `10.0.52.0/23` allocation and must also be advertised.

### 4. Enable MPLS and LDP

Use Loopback0 as the stable LDP identifier and enable MPLS on every provider-facing interface.

```cisco
mpls label protocol ldp
mpls ldp router-id Loopback0 force
!
interface GigabitEthernet0/0
 mpls ip
```

Apply `mpls ip` to each active P-to-P and PE-to-P interface. Do not apply it to future customer-facing interfaces unless the service design specifically requires it.

### 5. Validate Redundant Forwarding

- Confirm PE1 has IGP and label-switched reachability to PE2 Loopback0.
- Record the normal route and MPLS label stack.
- Shut down one core link at a time and measure convergence.
- Shut down one of each PE's uplinks and verify that the alternate path carries traffic.
- Restore each interface after its test.

### 6. Optional Service Extension

After the MPLS underlay is stable, add CE routers and customer-facing PE interfaces. MP-BGP VPNv4, VRFs, route distinguishers, route targets, and PE-to-CE routing can then be layered onto the topology. Those parameters are not specified in the current diagram.

## Verification Commands

### Interfaces and IGP

```cisco
show ip interface brief
show interfaces description
show ip ospf neighbor
show ip ospf interface brief
show ip route ospf
show ip route 10.0.52.1
show ip route 10.0.52.2
```

### MPLS and LDP

```cisco
show mpls interfaces
show mpls ldp discovery
show mpls ldp neighbor
show mpls ldp bindings
show mpls forwarding-table
```

### End-to-End and Redundancy Tests

From PE1:

```cisco
ping 10.0.52.2 source 10.0.52.1
traceroute 10.0.52.2 source 10.0.52.1
show ip route 10.0.52.2
show ip cef 10.0.52.2 detail
```

From PE2:

```cisco
ping 10.0.52.1 source 10.0.52.2
traceroute 10.0.52.1 source 10.0.52.2
show ip route 10.0.52.1
show mpls forwarding-table 10.0.52.1 32
```

During a failure test:

```cisco
configure terminal
interface GigabitEthernet0/0
 shutdown
end
show ip ospf neighbor
show ip route 10.0.52.2
show mpls forwarding-table
```

Restore the tested interface with `no shutdown` when finished.

## Expected Results

- All configured physical interfaces reach the `up/up` state.
- Each point-to-point interface can ping its directly connected neighbor.
- OSPF reaches the `FULL` state on each active provider link.
- Every router learns all remote P and PE loopbacks through the IGP.
- LDP establishes a neighbor relationship over every MPLS-enabled adjacency.
- Each router has local and remote label bindings for provider loopbacks.
- PE1 can ping and trace to `10.0.52.2` using `10.0.52.1` as its source.
- PE2 can ping and trace to `10.0.52.1` using `10.0.52.2` as its source.
- Multiple equal-cost next hops appear where the topology and OSPF costs permit ECMP.
- Traffic reconverges over an alternate path after any single non-partitioning link failure.
- No customer or VPN routes appear because the current diagram defines only the provider underlay.

## Troubleshooting Notes

| Symptom | Likely Cause | Checks and Corrective Actions |
|---|---|---|
| Interface cannot be configured as documented | Duplicate Gi0/3 assignments on P2 or P4 | Correct the diagram/cabling by selecting unused physical interfaces |
| Direct neighbor ping fails | Incorrect address, mask, cabling, or shutdown state | Compare both ends with the link table and check `show interfaces description` |
| OSPF adjacency does not form | Area, subnet, timer, network type, or MTU mismatch | Use `show ip ospf interface` on both ends and compare settings |
| Loopback is missing from the IGP | Missing or incorrect OSPF network statement | Check `show ip protocols` and the local OSPF database |
| LDP neighbor is absent | MPLS enabled on only one side or LDP ID unreachable | Check `show mpls interfaces`, LDP discovery, and the IGP route to the peer loopback |
| Route exists but no label is installed | LDP has not advertised/bound the FEC | Inspect `show mpls ldp bindings` and `show mpls forwarding-table` |
| PE-to-PE ping fails | Missing return route or incorrect source | Verify both PE loopbacks are present on every router and use a sourced ping |
| Only one path is installed | Unequal OSPF cost or platform ECMP limit | Compare cumulative costs and inspect `maximum-paths` support/settings |
| Failure test causes loss of reachability | Alternate adjacency or label-switched path was not established | Verify the alternate IGP/LDP path before shutting the primary link |
| Traceroute does not display labels | Platform behavior or MPLS TTL propagation setting | Confirm forwarding through MPLS tables; label display is image-dependent |

Troubleshoot in layers: physical interfaces, directly connected IPv4 reachability, IGP adjacencies, loopback routes, LDP neighbors, label forwarding entries, and finally PE-to-PE traffic.

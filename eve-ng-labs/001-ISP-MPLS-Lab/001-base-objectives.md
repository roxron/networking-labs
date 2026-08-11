# Task 001 — Build the MPLS Provider Underlay

## Purpose

Build the routed and label-switched foundation for the ISP lab. Six P routers form a redundant core, while PE1 and PE2 are dual-homed to different pairs of P routers. Completing this task provides the underlay required by all later customer and VPN exercises.

## Prerequisites

- An EVE-NG topology matching [ISP-MPLS-Lab-Diagram.drawio](./ISP-MPLS-Lab-Diagram.drawio)
- Router images that support IPv4 routing, OSPF, MPLS, and LDP
- Console access to P1–P6, PE1, and PE2
- Unique physical interfaces assigned to every point-to-point link

## Topology Overview

- P1, P2, P3, and P4 form a six-link full mesh.
- P2 and P4 each connect to P5 and P6.
- P5 and P6 connect directly.
- PE1 connects to P1 and P3.
- PE2 connects to P5 and P6.
- All physical links use `/30` subnets.
- Loopback0 addresses use `/32` masks.

## Devices and Roles

| Device | Role | Loopback0 |
|---|---|---|
| P1 | Provider core and PE1 attachment | `10.0.50.1/32` |
| P2 | Provider core | `10.0.50.2/32` |
| P3 | Provider core and PE1 attachment | `10.0.50.3/32` |
| P4 | Provider core | `10.0.50.4/32` |
| P5 | Provider core and PE2 attachment | `10.0.50.5/32` |
| P6 | Provider core and PE2 attachment | `10.0.50.6/32` |
| PE1 | Provider edge | `10.0.52.1/32` |
| PE2 | Provider edge | `10.0.52.2/32` |

## Interface and IP Addressing

### P-to-P Links

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
| PE2–P5 | `10.0.1.8/30` | PE2 Gi0/0 | `10.0.1.9/30` | P5 Gi0/3 | `10.0.1.10/30` |
| PE2–P6 | `10.0.1.12/30` | PE2 Gi0/1 | `10.0.1.13/30` | P6 Gi0/3 | `10.0.1.14/30` |

## Technologies and Protocols

- IPv4
- OSPF area 0 as the reference IGP
- MPLS forwarding
- LDP
- ECMP and redundant path convergence

## Objectives

1. Configure all router identities and interfaces.
2. Establish OSPF adjacencies on every provider link.
3. Advertise all P and PE loopbacks.
4. Enable MPLS on every provider-facing physical interface.
5. Establish LDP sessions throughout the topology.
6. Verify a label-switched path between PE1 and PE2.
7. Test convergence after a single link failure.

## Configuration Tasks

### 1. Configure Base Interfaces

Configure every loopback and physical interface shown in the topology. The physical-interface descriptions identify both the neighboring router and its interface.

#### P1

```cisco
hostname P1
!
interface Loopback0
 description Router ID
 ip address 10.0.50.1 255.255.255.255
!
interface GigabitEthernet0/0
 description Link to P2 G0/0
 ip address 10.0.0.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 description Link to P3 G0/1
 ip address 10.0.0.5 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2
 description Link to P4 G0/2
 ip address 10.0.0.17 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/3
 description Link to PE1 G0/0
 ip address 10.0.1.2 255.255.255.252
 no shutdown
```

#### P2

```cisco
hostname P2
!
interface Loopback0
 description Router ID
 ip address 10.0.50.2 255.255.255.255
!
interface GigabitEthernet0/0
 description Link to P1 G0/0
 ip address 10.0.0.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 description Link to P4 G0/1
 ip address 10.0.0.9 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2
 description Link to P3 G0/2
 ip address 10.0.0.21 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/3
 description Link to P5 G0/0
 ip address 10.0.0.25 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/4
 description Link to P6 G0/1
 ip address 10.0.0.29 255.255.255.252
 no shutdown
```

#### P3

```cisco
hostname P3
!
interface Loopback0
 description Router ID
 ip address 10.0.50.3 255.255.255.255
!
interface GigabitEthernet0/0
 description Link to P4 G0/0
 ip address 10.0.0.13 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 description Link to P1 G0/1
 ip address 10.0.0.6 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2
 description Link to P2 G0/2
 ip address 10.0.0.22 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/3
 description Link to PE1 G0/1
 ip address 10.0.1.6 255.255.255.252
 no shutdown
```

#### P4

```cisco
hostname P4
!
interface Loopback0
 description Router ID
 ip address 10.0.50.4 255.255.255.255
!
interface GigabitEthernet0/0
 description Link to P3 G0/0
 ip address 10.0.0.14 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 description Link to P2 G0/1
 ip address 10.0.0.10 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2
 description Link to P1 G0/2
 ip address 10.0.0.18 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/3
 description Link to P6 G0/0
 ip address 10.0.0.33 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/4
 description Link to P5 G0/1
 ip address 10.0.0.37 255.255.255.252
 no shutdown
```

#### P5

```cisco
hostname P5
!
interface Loopback0
 description Router ID
 ip address 10.0.50.5 255.255.255.255
!
interface GigabitEthernet0/0
 description Link to P2 G0/3
 ip address 10.0.0.26 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 description Link to P4 G0/4
 ip address 10.0.0.38 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2
 description Link to P6 G0/2
 ip address 10.0.0.41 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/3
 description Link to PE2 G0/0
 ip address 10.0.1.10 255.255.255.252
 no shutdown
```

#### P6

```cisco
hostname P6
!
interface Loopback0
 description Router ID
 ip address 10.0.50.6 255.255.255.255
!
interface GigabitEthernet0/0
 description Link to P4 G0/3
 ip address 10.0.0.34 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 description Link to P2 G0/4
 ip address 10.0.0.30 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2
 description Link to P5 G0/2
 ip address 10.0.0.42 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/3
 description Link to PE2 G0/1
 ip address 10.0.1.14 255.255.255.252
 no shutdown
```

#### PE1

```cisco
hostname PE1
!
interface Loopback0
 description Router ID
 ip address 10.0.52.1 255.255.255.255
!
interface GigabitEthernet0/0
 description Link to P1 G0/3
 ip address 10.0.1.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 description Link to P3 G0/3
 ip address 10.0.1.5 255.255.255.252
 no shutdown
```

#### PE2

```cisco
hostname PE2
!
interface Loopback0
 description Router ID
 ip address 10.0.52.2 255.255.255.255
!
interface GigabitEthernet0/0
 description Link to P5 G0/3
 ip address 10.0.1.9 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 description Link to P6 G0/3
 ip address 10.0.1.13 255.255.255.252
 no shutdown
```

#### Base Interface Verification

Run the following commands on every router after configuring its interfaces:

```cisco
show ip interface brief | exclude unassigned
show interfaces description | include up
show ip route connected
show interfaces stats | exclude disabled
```

Expected checks:

- Every configured physical interface and Loopback0 appears in `show ip interface brief`.
- Every configured physical interface is `up/up`.
- The interface descriptions identify the correct neighboring device and interface.
- Every local `/30` transit network and `/32` loopback appears as connected or local in the routing table.
- Enabled interfaces show packet counters rather than a disabled state.

> [!NOTE]
> Command output filtering is case-sensitive on some IOS releases. If `| include up` or `| exclude disabled` produces unexpected output, run the unfiltered command and inspect the complete result.

#### Directly Connected Neighbor Troubleshooting

Run the applicable ping block from each router. These tests validate every directly connected physical link before OSPF or MPLS is configured.

##### P1 Neighbor Pings

```cisco
ping 10.0.0.2
ping 10.0.0.6
ping 10.0.0.18
ping 10.0.1.1
```

##### P2 Neighbor Pings

```cisco
ping 10.0.0.1
ping 10.0.0.10
ping 10.0.0.22
ping 10.0.0.26
ping 10.0.0.30
```

##### P3 Neighbor Pings

```cisco
ping 10.0.0.14
ping 10.0.0.5
ping 10.0.0.21
ping 10.0.1.5
```

##### P4 Neighbor Pings

```cisco
ping 10.0.0.13
ping 10.0.0.9
ping 10.0.0.17
ping 10.0.0.34
ping 10.0.0.38
```

##### P5 Neighbor Pings

```cisco
ping 10.0.0.25
ping 10.0.0.37
ping 10.0.0.42
ping 10.0.1.9
```

##### P6 Neighbor Pings

```cisco
ping 10.0.0.33
ping 10.0.0.29
ping 10.0.0.41
ping 10.0.1.13
```

##### PE1 Neighbor Pings

```cisco
ping 10.0.1.2
ping 10.0.1.6
```

##### PE2 Neighbor Pings

```cisco
ping 10.0.1.10
ping 10.0.1.14
```

Each ping should return a success rate of 100 percent. If a ping fails:

1. Compare the local and remote IP addresses with the interface table.
2. Confirm that both interfaces use mask `255.255.255.252`.
3. Check that both interfaces are `up/up` and have `no shutdown` configured.
4. Confirm the EVE-NG cable connects the interfaces named in their descriptions.
5. Check ARP resolution with `show ip arp <neighbor-address>`.
6. Use `show interfaces <interface>` to check encapsulation, errors, drops, and line-protocol state.

### 2. Configure OSPF

Use Loopback0 as the router ID. Keep loopbacks passive and enable adjacency formation only on transit interfaces.

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

Adapt the interfaces and loopback network statement for each router. PE loopbacks are in `10.0.52.0/23`.

### 3. Configure MPLS and LDP

```cisco
mpls label protocol ldp
mpls ldp router-id Loopback0 force
!
interface GigabitEthernet0/0
 mpls ip
```

Apply `mpls ip` to all P-to-P and PE-to-P interfaces.

### 4. Test Resiliency

- Run a sourced ping and traceroute between the PE loopbacks.
- Record the normal IGP next hops and MPLS forwarding entry.
- Shut one link at a time and verify that traffic reconverges.
- Restore the interface before testing another failure.

## Verification Commands

```cisco
show ip interface brief
show interfaces description
show ip ospf neighbor
show ip ospf interface brief
show ip route ospf
show mpls interfaces
show mpls ldp discovery
show mpls ldp neighbor
show mpls ldp bindings
show mpls forwarding-table
```

PE1-to-PE2 test:

```cisco
ping 10.0.52.2 source 10.0.52.1
traceroute 10.0.52.2 source 10.0.52.1
show ip route 10.0.52.2
show ip cef 10.0.52.2 detail
```

## Expected Results

- Every configured physical interface is `up/up`.
- OSPF neighbors reach the `FULL` state.
- All routers learn the eight provider loopbacks.
- LDP neighbors form on every MPLS-enabled adjacency.
- MPLS forwarding entries exist for remote loopbacks.
- PE1 and PE2 reach each other's loopbacks with sourced pings.
- Traffic uses an alternate path after a single non-partitioning link failure.

## Troubleshooting Notes

| Symptom | Checks |
|---|---|
| Direct ping fails | Check cabling, IP mask, interface state, and peer address |
| OSPF neighbor is missing | Compare area, timers, network type, authentication, and MTU |
| Loopback route is missing | Check the OSPF network statement and passive-interface design |
| LDP neighbor is missing | Confirm `mpls ip` on both ends and IGP reachability to LDP IDs |
| Route exists without a label | Inspect LDP bindings and the MPLS forwarding table |
| Failure causes isolation | Verify the alternate IGP and LDP path before the shutdown test |

## Completion Checklist

- [ ] All interface addresses configured
- [ ] All direct-neighbor pings successful
- [ ] All expected OSPF adjacencies established
- [ ] All provider loopbacks reachable
- [ ] All expected LDP sessions established
- [ ] PE1-to-PE2 label-switched forwarding verified
- [ ] Single-link failure test completed
- [ ] Final configurations saved

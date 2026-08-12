# Task 003 — Add PE3 to the MPLS Core and CEtest VPN

## Purpose

Add PE3 as a third provider-edge router and integrate it into every layer built in Tasks 001 and 002:

1. Physical and IPv4 connectivity
2. IS-IS Level 2 underlay routing
3. MPLS and LDP transport
4. Provider-AS iBGP and VPNv4
5. The `CEtest` MPLS Layer 3 VPN

The **Added PE3** page in [ISP-MPLS-Lab-Diagram.drawio](./ISP-MPLS-Lab-Diagram.drawio) defines PE3's physical links and Loopback0 address. This task adds Loopback2 `192.168.2.1/24` to extend the established CEtest addressing sequence.

## Prerequisites

- [Task 001](./001-base-objectives.md) completed
- [Task 002](./002-PE-to-PE-iBGP-CEtest-VRF.md) completed
- Existing IS-IS, LDP, MPLS, iBGP VPNv4, and CEtest operation verified
- PE1 CEtest network `192.168.0.0/24` reachable from PE2
- PE2 CEtest network `192.168.1.0/24` reachable from PE1
- PE3 added to EVE-NG with at least two Ethernet interfaces
- P2 Gi0/5 and P5 Gi0/4 available for the new links

> [!NOTE]
> The current `001-ISP-MPLS-Lab.unl` export contains P1–P6, PE1, and PE2, but not PE3. Add PE3 and its two links in EVE-NG during this task, then export an updated `.unl` file so the downloadable lab matches the **Added PE3** diagram page.

## Topology Change

```text
                       PE3
              Lo0 10.0.52.3/32
              Lo2 192.168.2.1/24
                  /          \
       10.0.1.16/30          10.0.1.20/30
                /              \
        P2 Gi0/5                P5 Gi0/4
          .18                      .22
             \                    /
                    MPLS core
```

PE3 is dual-homed across the provider core:

- PE3 Gi0/0 connects to P2 Gi0/5.
- PE3 Gi0/1 connects to P5 Gi0/4.
- Both links participate in IS-IS Level 2, MPLS, and LDP.
- PE3 Loopback0 is its IS-IS-reachable BGP and LDP endpoint.
- PE3 Loopback2 represents its locally attached CEtest network.

## Devices and Roles

| Device | Change in This Task |
|---|---|
| PE3 | New PE; joins IS-IS, LDP, provider AS `65000`, VPNv4, and CEtest |
| P2 | Adds a provider-facing link to PE3 on Gi0/5 |
| P5 | Adds a provider-facing link to PE3 on Gi0/4 |
| PE1 | Adds PE3 as an iBGP IPv4 and VPNv4 neighbor |
| PE2 | Adds PE3 as an iBGP IPv4 and VPNv4 neighbor |
| P1, P3, P4, P6 | No configuration change; used for end-to-end validation |

## Addressing and Protocol Parameters

| Parameter | Value |
|---|---|
| PE3 Loopback0 | `10.0.52.3/32` |
| PE3–P2 subnet | `10.0.1.16/30` |
| PE3 Gi0/0 | `10.0.1.17/30` |
| P2 Gi0/5 | `10.0.1.18/30` |
| PE3–P5 subnet | `10.0.1.20/30` |
| PE3 Gi0/1 | `10.0.1.21/30` |
| P5 Gi0/4 | `10.0.1.22/30` |
| PE3 IS-IS NET | `49.0001.B000.0000.0003.00` |
| IS-IS process tag | `CORE` |
| IS-IS level | Level 2-only |
| LDP router ID | PE3 Loopback0, `10.0.52.3` |
| Provider BGP AS | `65000` |
| PE3 VRF | `CEtest` |
| PE3 CEtest RD | `65000:3` |
| CEtest import/export RT | `65000:100` |
| PE3 Loopback2 | `192.168.2.1/24` |
| PE3 CEtest prefix | `192.168.2.0/24` |

## Technologies and Protocols

- IPv4 point-to-point addressing
- IS-IS Level 2 with wide metrics
- MPLS forwarding
- LDP label distribution
- Loopback-sourced iBGP in AS `65000`
- MP-BGP VPNv4
- Three-PE full-mesh iBGP
- VRF, RD, and route-target processing
- MPLS Layer 3 VPN forwarding

## Objectives

1. Configure PE3 and both directly attached P-router interfaces.
2. Verify direct IPv4 connectivity on both new links.
3. Add PE3 to the IS-IS Level 2 topology.
4. Advertise PE3 Loopback0 throughout the provider core.
5. Establish LDP sessions from PE3 to P2 and P5.
6. Verify MPLS label-switched paths between PE3 and both existing PEs.
7. Expand the iBGP full mesh from two to three PE routers.
8. Establish PE3's VPNv4 sessions with PE1 and PE2.
9. Add PE3's `192.168.2.0/24` network to CEtest.
10. Verify all three CEtest networks from every PE.
11. Confirm P routers remain free of CEtest routes and BGP configuration.

## Configuration Tasks

### 1. Capture the Pre-Change State

Record the working state before adding PE3.

On PE1 and PE2:

```cisco
show isis neighbors
show mpls ldp neighbor
show bgp vpnv4 unicast all summary
show ip route vrf CEtest
```

On P2 and P5:

```cisco
show ip interface brief | exclude unassigned
show isis neighbors
show mpls ldp neighbor
```

### 2. Configure Base Interfaces

Use interface descriptions in the same format as Task 001: `Link to <router> <interface>`.

#### PE3 Complete Base Interface Configuration

```cisco
hostname PE3
!
interface Loopback0
 description Router ID
 ip address 10.0.52.3 255.255.255.255
!
interface GigabitEthernet0/0
 description Link to P2 G0/5
 ip address 10.0.1.17 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 description Link to P5 G0/4
 ip address 10.0.1.21 255.255.255.252
 no shutdown
```

#### P2 Incremental Interface Configuration

```cisco
interface GigabitEthernet0/5
 description Link to PE3 G0/0
 ip address 10.0.1.18 255.255.255.252
 no shutdown
```

#### P5 Incremental Interface Configuration

```cisco
interface GigabitEthernet0/4
 description Link to PE3 G0/1
 ip address 10.0.1.22 255.255.255.252
 no shutdown
```

#### Base Interface Verification

Run on PE3, P2, and P5:

```cisco
show ip interface brief | exclude unassigned
show interfaces description | include up
show ip route connected
show interfaces stats | exclude disabled
```

Verify the new links in both directions:

PE3:

```cisco
ping 10.0.1.18
ping 10.0.1.22
```

P2:

```cisco
ping 10.0.1.17
```

P5:

```cisco
ping 10.0.1.21
```

Do not configure IS-IS until all four pings succeed.

### 3. Add PE3 to IS-IS

#### PE3 IS-IS Configuration

```cisco
router isis CORE
 net 49.0001.B000.0000.0003.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback0
!
interface Loopback0
 ip router isis CORE
!
interface GigabitEthernet0/0
 ip router isis CORE
 isis network point-to-point
!
interface GigabitEthernet0/1
 ip router isis CORE
 isis network point-to-point
```

#### P2 IS-IS Addition

```cisco
interface GigabitEthernet0/5
 ip router isis CORE
 isis network point-to-point
```

#### P5 IS-IS Addition

```cisco
interface GigabitEthernet0/4
 ip router isis CORE
 isis network point-to-point
```

#### IS-IS Verification

PE3 must form two Level 2 adjacencies:

```cisco
show clns protocol
show clns interface
show isis neighbors
show isis neighbors detail
show isis database
show isis topology
show ip route isis
```

Expected incremental results:

| Router | New Neighbor | Updated Total |
|---|---|---:|
| PE3 | P2 and P5 | 2 |
| P2 | PE3 | 6 |
| P5 | PE3 | 5 |

Verify PE3 Loopback0 from every relevant router:

```cisco
show ip route 10.0.52.3
ping 10.0.52.3
```

On PE3, verify both existing PE loopbacks with a Loopback0 source:

```cisco
ping 10.0.52.1 source 10.0.52.3
ping 10.0.52.2 source 10.0.52.3
traceroute 10.0.52.1 source 10.0.52.3
traceroute 10.0.52.2 source 10.0.52.3
```

### 4. Add PE3 to MPLS and LDP

#### PE3 MPLS and LDP Configuration

```cisco
mpls ip
mpls label protocol ldp
mpls ldp router-id Loopback0 force
!
interface GigabitEthernet0/0
 mpls ip
!
interface GigabitEthernet0/1
 mpls ip
```

#### P2 MPLS Addition

```cisco
interface GigabitEthernet0/5
 mpls ip
```

#### P5 MPLS Addition

```cisco
interface GigabitEthernet0/4
 mpls ip
```

#### MPLS and LDP Verification

Use MPLS- and LDP-specific commands:

```cisco
show mpls interfaces
show mpls ldp parameters
show mpls ldp discovery
show mpls ldp neighbor
show mpls ldp neighbor detail
show mpls ldp bindings
show mpls forwarding-table
```

Expected incremental results:

| Router | New LDP Peer | Updated Total |
|---|---|---:|
| PE3 | P2 and P5 | 2 |
| P2 | PE3 | 6 |
| P5 | PE3 | 5 |

Run MPLS LSP pings:

PE3:

```cisco
ping mpls ipv4 10.0.52.1/32
ping mpls ipv4 10.0.52.2/32
```

PE1:

```cisco
ping mpls ipv4 10.0.52.3/32
```

PE2:

```cisco
ping mpls ipv4 10.0.52.3/32
```

All MPLS echo requests must succeed before BGP is configured.

### 5. Expand the Provider iBGP Full Mesh

All three PEs remain in provider AS `65000`. With no route reflector, every PE must have a direct iBGP session to every other PE.

#### PE3 BGP Configuration

```cisco
router bgp 65000
 bgp router-id 10.0.52.3
 bgp log-neighbor-changes
 neighbor 10.0.52.1 remote-as 65000
 neighbor 10.0.52.1 description iBGP to PE1 Loopback0
 neighbor 10.0.52.1 update-source Loopback0
 neighbor 10.0.52.2 remote-as 65000
 neighbor 10.0.52.2 description iBGP to PE2 Loopback0
 neighbor 10.0.52.2 update-source Loopback0
 !
 address-family ipv4 unicast
  neighbor 10.0.52.1 activate
  neighbor 10.0.52.2 activate
 exit-address-family
 !
 address-family vpnv4
  neighbor 10.0.52.1 activate
  neighbor 10.0.52.1 send-community extended
  neighbor 10.0.52.2 activate
  neighbor 10.0.52.2 send-community extended
 exit-address-family
```

#### PE1 BGP Addition

```cisco
router bgp 65000
 neighbor 10.0.52.3 remote-as 65000
 neighbor 10.0.52.3 description iBGP to PE3 Loopback0
 neighbor 10.0.52.3 update-source Loopback0
 !
 address-family ipv4 unicast
  neighbor 10.0.52.3 activate
 exit-address-family
 !
 address-family vpnv4
  neighbor 10.0.52.3 activate
  neighbor 10.0.52.3 send-community extended
 exit-address-family
```

#### PE2 BGP Addition

```cisco
router bgp 65000
 neighbor 10.0.52.3 remote-as 65000
 neighbor 10.0.52.3 description iBGP to PE3 Loopback0
 neighbor 10.0.52.3 update-source Loopback0
 !
 address-family ipv4 unicast
  neighbor 10.0.52.3 activate
 exit-address-family
 !
 address-family vpnv4
  neighbor 10.0.52.3 activate
  neighbor 10.0.52.3 send-community extended
 exit-address-family
```

#### iBGP Verification

Run on every PE:

```cisco
show ip bgp summary
show bgp vpnv4 unicast all summary
show bgp vpnv4 unicast all neighbors
show tcp brief | include 10.0.52.
```

Older IOS alternatives:

```cisco
show ip bgp vpnv4 all summary
show ip bgp vpnv4 all neighbors
```

Each PE must show two established IPv4 iBGP neighbors and two established VPNv4 neighbors:

| Local PE | Expected Peers |
|---|---|
| PE1 | PE2 `10.0.52.2`, PE3 `10.0.52.3` |
| PE2 | PE1 `10.0.52.1`, PE3 `10.0.52.3` |
| PE3 | PE1 `10.0.52.1`, PE2 `10.0.52.2` |

### 6. Add CEtest to PE3

#### Create the VRF

```cisco
ip vrf CEtest
 rd 65000:3
 route-target import 65000:100
 route-target export 65000:100
```

#### Configure the Test Customer Network

```cisco
interface Loopback2
 description CEtest network at PE3
 ip vrf forwarding CEtest
 ip address 192.168.2.1 255.255.255.0
```

#### Originate the Prefix

```cisco
router bgp 65000
 address-family ipv4 vrf CEtest
  network 192.168.2.0 mask 255.255.255.0
 exit-address-family
```

#### Local VRF Verification

```cisco
show ip vrf
show ip vrf detail CEtest
show ip vrf interfaces
show ip route vrf CEtest connected
show bgp ipv4 unicast vrf CEtest
```

PE3 must show `192.168.2.0/24` as connected and locally originated in CEtest BGP.

### 7. Verify Three-Site CEtest Route Exchange

Run on PE1, PE2, and PE3:

```cisco
show bgp vpnv4 unicast all
show bgp vpnv4 unicast all labels
show ip route vrf CEtest
show bgp ipv4 unicast vrf CEtest
```

Expected CEtest routes:

| PE | Local Connected Prefix | Remote VPNv4 Prefixes |
|---|---|---|
| PE1 | `192.168.0.0/24` | `192.168.1.0/24`, `192.168.2.0/24` |
| PE2 | `192.168.1.0/24` | `192.168.0.0/24`, `192.168.2.0/24` |
| PE3 | `192.168.2.0/24` | `192.168.0.0/24`, `192.168.1.0/24` |

Verify the data plane from each PE.

PE1:

```cisco
ping vrf CEtest 192.168.1.1 source 192.168.0.1
ping vrf CEtest 192.168.2.1 source 192.168.0.1
traceroute vrf CEtest 192.168.2.1 source 192.168.0.1
```

PE2:

```cisco
ping vrf CEtest 192.168.0.1 source 192.168.1.1
ping vrf CEtest 192.168.2.1 source 192.168.1.1
traceroute vrf CEtest 192.168.2.1 source 192.168.1.1
```

PE3:

```cisco
ping vrf CEtest 192.168.0.1 source 192.168.2.1
ping vrf CEtest 192.168.1.1 source 192.168.2.1
traceroute vrf CEtest 192.168.0.1 source 192.168.2.1
traceroute vrf CEtest 192.168.1.1 source 192.168.2.1
```

Inspect forwarding resolution on PE3:

```cisco
show ip cef vrf CEtest 192.168.0.0 255.255.255.0 detail
show ip cef vrf CEtest 192.168.1.0 255.255.255.0 detail
show mpls forwarding-table
```

### 8. Verify P-Router Isolation

Run on P2 and P5, and optionally on every P router:

```cisco
show running-config | section router bgp
show ip route 192.168.2.0 255.255.255.0
show ip route 10.0.52.3
show mpls forwarding-table 10.0.52.3 32
```

Expected behavior:

- No BGP process is configured on a P router.
- `192.168.2.0/24` is absent from the global P-router routing table.
- `10.0.52.3/32` is present through IS-IS.
- An MPLS forwarding entry exists for PE3's Loopback0 FEC.

## Expected Results

- PE3's two physical links are `up/up`.
- PE3 forms Level 2 IS-IS adjacencies with P2 and P5.
- Every provider router learns `10.0.52.3/32` through IS-IS.
- PE3 forms LDP sessions with P2 and P5.
- MPLS LSP pings succeed between PE3 and both existing PEs.
- The provider iBGP topology is a complete three-node mesh.
- All six directional PE-to-PE VPNv4 peer relationships are established.
- PE3 advertises `65000:3:192.168.2.0/24` with RT `65000:100`.
- PE1 and PE2 import `192.168.2.0/24` into CEtest.
- PE3 imports the PE1 and PE2 CEtest routes.
- All six directed inter-PE VRF ping tests succeed.
- P routers carry PE3's transport route and labels but no CEtest routes.

## Troubleshooting Notes

| Symptom | Likely Cause | Corrective Action |
|---|---|---|
| New link is down | Incorrect EVE-NG cable or shutdown interface | Verify PE3–P2/P5 cabling, interfaces, and `no shutdown` |
| Direct ping fails | Incorrect `/30` address or mask | Compare both endpoints with the addressing table |
| PE3 has only one IS-IS neighbor | IS-IS missing or mismatched on one new link | Check `ip router isis CORE`, Level 2 mode, point-to-point type, and MTU |
| Other routers lack `10.0.52.3/32` | Loopback0 is not enabled in IS-IS | Configure `ip router isis CORE` and keep Loopback0 passive |
| PE3 LDP peer is missing | MPLS enabled on only one end or LDP ID unreachable | Check `mpls ip`, LDP discovery, and the IS-IS route to `10.0.52.3` |
| MPLS LSP ping fails | Missing FEC binding or LFIB entry | Inspect LDP bindings and MPLS forwarding on every hop |
| PE3 iBGP session is `Active` | Loopback reachability, remote AS, or update source is wrong | Verify sourced pings, AS `65000`, and Loopback0 update source |
| PE1/PE2 has no PE3 session | Reciprocal PE3 neighbor missing | iBGP configuration must exist on both endpoints |
| IPv4 iBGP is up but VPNv4 is down | PE3 not activated under VPNv4 | Activate each peer and send extended communities on both ends |
| PE3 local `/24` is absent | Loopback2 not in CEtest or exact route missing | Check VRF interface membership and connected route |
| PE1/PE2 lacks `192.168.2.0/24` | RT mismatch or VPNv4 session failure | Verify RT `65000:100`, VPNv4 routes, and extended communities |
| PE3 lacks an existing CEtest route | Full mesh incomplete | Verify PE3 has direct VPNv4 sessions with both PE1 and PE2 |
| VRF route exists but ping fails | VPN label or CEF resolution problem | Inspect VPNv4 labels, VRF CEF, LDP, and LFIB entries |
| CEtest route appears on P router | Customer route leaked into IS-IS | Remove redistribution; P routers need only infrastructure routes |

## Completion Checklist

- [ ] PE3 added and connected to P2 and P5 in EVE-NG
- [ ] PE3 Loopback0 configured as `10.0.52.3/32`
- [ ] Both new `/30` links configured and verified bidirectionally
- [ ] PE3 NET configured as `49.0001.B000.0000.0003.00`
- [ ] PE3–P2 and PE3–P5 IS-IS adjacencies are Up
- [ ] PE3 Loopback0 reachable throughout the provider core
- [ ] MPLS enabled globally on PE3
- [ ] MPLS enabled on all four new link endpoints
- [ ] PE3–P2 and PE3–P5 LDP sessions operational
- [ ] MPLS LSP pings succeed between all PEs
- [ ] PE3 added to provider AS `65000`
- [ ] Three-PE IPv4 iBGP full mesh established
- [ ] Three-PE VPNv4 full mesh established
- [ ] Extended communities enabled on every new VPNv4 session
- [ ] CEtest created on PE3 with RD `65000:3`
- [ ] CEtest RT `65000:100` imported and exported
- [ ] PE3 Loopback2 configured as `192.168.2.1/24`
- [ ] `192.168.2.0/24` advertised into CEtest BGP
- [ ] All three CEtest prefixes installed on every PE
- [ ] All inter-PE VRF pings successful
- [ ] P routers remain BGP-free and contain no CEtest prefixes
- [ ] Final configurations saved

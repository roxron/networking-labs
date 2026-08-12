# Task 004 — Add Redundant VPNv4 Route Reflectors

## Purpose

Add RR101 and RR102 as redundant route reflectors in provider AS `65000`, migrate PE1–PE3 from a full-mesh iBGP design to route-reflector clients, and preserve CEtest VPN service throughout the change.

The migration is deliberately make-before-break:

1. Build and verify both RR underlays.
2. Enable IS-IS, MPLS, and LDP.
3. Establish new iBGP and VPNv4 sessions without removing any PE-to-PE session.
4. Prove that both RRs learn and reflect all CEtest routes.
5. Prove each PE retains routes and forwarding when its direct PE sessions are administratively disabled.
6. Restore the direct sessions and review the evidence.
7. Remove direct PE-to-PE sessions one PE at a time.
8. Validate the final redundant RR topology.

## Prerequisites

- [Task 001](./001-base-objectives.md) completed
- [Task 002](./002-PE-to-PE-iBGP-CEtest-VRF.md) completed
- [Task 003](./003-add-PE3-MPLS-iBGP-CEtest-VRF.md) completed
- The route-reflector EVE-NG topology: [001-ISP-MPLS-Lab_Added-RR-nodes.unl](./lab_files/001-ISP-MPLS-Lab_Added-RR-nodes.unl)
- PE1, PE2, and PE3 operating in a full iBGP mesh in AS `65000`
- Every PE advertising its CEtest `/24` through VPNv4
- All three CEtest prefixes reachable from every PE
- P2 Gi0/6 and P4 Gi0/5 available
- Two router images added as RR101 and RR102

> [!NOTE]
> The `Added-RR-nodes` export contains P1–P6, PE1–PE3, RR101, and RR102 with 19 point-to-point networks. Use this topology milestone for Task 004.

## Topology Change

```text
                     RR101                         RR102
              Lo0 10.0.52.101/32           Lo0 10.0.52.102/32
                    G0/0                           G0/0
               10.0.1.25                     10.0.1.29
                      |                              |
             10.0.1.24/30                  10.0.1.28/30
                      |                              |
               10.0.1.26                     10.0.1.30
                  P2 G0/6                        P4 G0/5
                      \                            /
                       +------ MPLS core --------+

              RR101 <---------- iBGP ----------> PE1, PE2, PE3
              RR102 <---------- iBGP ----------> PE1, PE2, PE3
```

RR101 and RR102 are independent redundant route reflectors. Every PE is a client of both RRs. The RRs do not need to be clients of each other because each receives every PE route directly. No RR-to-RR session is required in this design.

## Devices and Roles

| Device | Change in This Task |
|---|---|
| RR101 | New VPNv4 route reflector connected to P2 |
| RR102 | New VPNv4 route reflector connected to P4 |
| P2 | Adds Gi0/6 toward RR101 |
| P4 | Adds Gi0/5 toward RR102 |
| PE1 | Becomes a client of RR101 and RR102; direct PE sessions are later removed |
| PE2 | Becomes a client of RR101 and RR102; direct PE sessions are later removed |
| PE3 | Becomes a client of RR101 and RR102; direct PE sessions are later removed |
| Other P routers | No configuration change; continue as MPLS transit routers |

## Addressing and Protocol Parameters

| Parameter | RR101 | RR102 |
|---|---|---|
| Loopback0 | `10.0.52.101/32` | `10.0.52.102/32` |
| Physical interface | Gi0/0 | Gi0/0 |
| Physical address | `10.0.1.25/30` | `10.0.1.29/30` |
| Attached P router | P2 Gi0/6 | P4 Gi0/5 |
| P-router address | `10.0.1.26/30` | `10.0.1.30/30` |
| Link subnet | `10.0.1.24/30` | `10.0.1.28/30` |
| IS-IS NET | `49.0001.C000.0000.0101.00` | `49.0001.C000.0000.0102.00` |
| LDP router ID | `10.0.52.101` | `10.0.52.102` |
| BGP AS | `65000` | `65000` |
| BGP router ID | `10.0.52.101` | `10.0.52.102` |
| Cluster ID | `10.0.52.101` | `10.0.52.102` |

> [!NOTE]
> The diagram specifies the RR names, physical addressing, and loopbacks. This task assigns unique IS-IS NETs using a dedicated `C000` system-ID family, consistent with the existing `A000` P-router and `B000` PE-router convention.

## BGP Migration States

| State | PE-to-PE Sessions | PE-to-RR Sessions | Purpose |
|---|---:|---:|---|
| Initial | 3 undirected sessions | 0 | Existing three-PE full mesh |
| Parallel | 3 | 6 | Introduce both RRs without removing the working path |
| Validation | Temporarily disabled per PE | 6 | Prove routes and traffic work through the RRs |
| Final | 0 | 6 | Redundant route-reflector design |

## Technologies and Protocols

- IPv4 point-to-point addressing
- IS-IS Level 2 with wide metrics
- MPLS forwarding and LDP
- Loopback-sourced iBGP in AS `65000`
- MP-BGP VPNv4
- BGP route reflection
- Originator ID and cluster list loop prevention
- Redundant route-reflector clients
- Make-before-break control-plane migration

## Objectives

1. Configure RR101, RR102, and their attached P-router interfaces.
2. Add both RRs to IS-IS Level 2.
3. Establish MPLS and LDP on both RR links.
4. Verify labeled reachability between every PE and both RR loopbacks.
5. Configure RR101 and RR102 in provider AS `65000`.
6. Establish IPv4 iBGP and VPNv4 sessions from every PE to both RRs.
7. Configure PE1–PE3 as VPNv4 route-reflector clients.
8. Verify both RRs receive all three CEtest VPNv4 routes.
9. Verify every PE receives reflected routes while the old full mesh remains active.
10. Test RR-only operation before deleting any PE-to-PE neighbor.
11. Remove the direct PE full mesh in controlled stages.
12. Verify redundant service operation after either RR fails.

## Configuration Tasks

### 1. Capture the Pre-Migration Baseline

Save configurations and record the existing control and data plane on PE1, PE2, and PE3:

```cisco
show ip bgp summary
show bgp vpnv4 unicast all summary
show bgp vpnv4 unicast all
show bgp vpnv4 unicast all labels
show ip route vrf CEtest
```

Run the existing CEtest tests:

PE1:

```cisco
ping vrf CEtest 192.168.1.1 source 192.168.0.1
ping vrf CEtest 192.168.2.1 source 192.168.0.1
```

PE2:

```cisco
ping vrf CEtest 192.168.0.1 source 192.168.1.1
ping vrf CEtest 192.168.2.1 source 192.168.1.1
```

PE3:

```cisco
ping vrf CEtest 192.168.0.1 source 192.168.2.1
ping vrf CEtest 192.168.1.1 source 192.168.2.1
```

Do not begin the migration unless all sessions and all six directed VRF pings succeed.

### 2. Configure Base Interfaces

#### RR101

```cisco
hostname RR101
!
interface Loopback0
 description Router ID
 ip address 10.0.52.101 255.255.255.255
!
interface GigabitEthernet0/0
 description Link to P2 G0/6
 ip address 10.0.1.25 255.255.255.252
 no shutdown
```

#### P2 Addition

```cisco
interface GigabitEthernet0/6
 description Link to RR101 G0/0
 ip address 10.0.1.26 255.255.255.252
 no shutdown
```

#### RR102

```cisco
hostname RR102
!
interface Loopback0
 description Router ID
 ip address 10.0.52.102 255.255.255.255
!
interface GigabitEthernet0/0
 description Link to P4 G0/5
 ip address 10.0.1.29 255.255.255.252
 no shutdown
```

#### P4 Addition

```cisco
interface GigabitEthernet0/5
 description Link to RR102 G0/0
 ip address 10.0.1.30 255.255.255.252
 no shutdown
```

#### Interface Verification

Run on RR101, RR102, P2, and P4:

```cisco
show ip interface brief | exclude unassigned
show interfaces description | include up
show ip route connected
show interfaces stats | exclude disabled
```

Verify both links in both directions:

RR101:

```cisco
ping 10.0.1.26
```

P2:

```cisco
ping 10.0.1.25
```

RR102:

```cisco
ping 10.0.1.30
```

P4:

```cisco
ping 10.0.1.29
```

### 3. Add RR101 and RR102 to IS-IS

#### RR101

```cisco
router isis CORE
 net 49.0001.C000.0000.0101.00
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
```

#### P2 Addition

```cisco
interface GigabitEthernet0/6
 ip router isis CORE
 isis network point-to-point
```

#### RR102

```cisco
router isis CORE
 net 49.0001.C000.0000.0102.00
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
```

#### P4 Addition

```cisco
interface GigabitEthernet0/5
 ip router isis CORE
 isis network point-to-point
```

#### IS-IS Verification

```cisco
show clns protocol
show clns interface
show isis neighbors
show isis neighbors detail
show isis database
show isis topology
show ip route isis
```

Expected new adjacencies:

| Router | New Neighbor | Updated Total |
|---|---|---:|
| RR101 | P2 | 1 |
| P2 | RR101 | 7 |
| RR102 | P4 | 1 |
| P4 | RR102 | 6 |

Verify both RR loopbacks from every PE:

```cisco
ping 10.0.52.101 source Loopback0
ping 10.0.52.102 source Loopback0
show ip route 10.0.52.101
show ip route 10.0.52.102
```

### 4. Enable MPLS and LDP

#### RR101

```cisco
mpls ip
mpls label protocol ldp
mpls ldp router-id Loopback0 force
!
interface GigabitEthernet0/0
 mpls ip
```

#### P2 Addition

```cisco
interface GigabitEthernet0/6
 mpls ip
```

#### RR102

```cisco
mpls ip
mpls label protocol ldp
mpls ldp router-id Loopback0 force
!
interface GigabitEthernet0/0
 mpls ip
```

#### P4 Addition

```cisco
interface GigabitEthernet0/5
 mpls ip
```

#### MPLS and LDP Verification

Use only MPLS- and LDP-specific commands:

```cisco
show mpls interfaces
show mpls ldp parameters
show mpls ldp discovery
show mpls ldp neighbor
show mpls ldp neighbor detail
show mpls ldp bindings
show mpls forwarding-table
```

Expected new LDP sessions:

| Router | New LDP Peer | Updated Total |
|---|---|---:|
| RR101 | P2 | 1 |
| P2 | RR101 | 7 |
| RR102 | P4 | 1 |
| P4 | RR102 | 6 |

Run from PE1, PE2, and PE3:

```cisco
ping mpls ipv4 10.0.52.101/32
ping mpls ipv4 10.0.52.102/32
```

Run from RR101 and RR102:

```cisco
ping mpls ipv4 10.0.52.1/32
ping mpls ipv4 10.0.52.2/32
ping mpls ipv4 10.0.52.3/32
```

All MPLS LSP pings must succeed before BGP onboarding.

### 5. Configure the Route Reflectors

The RRs carry no customer VRFs. They reflect labeled VPNv4 routes and preserve the originating PE as the BGP next hop.

#### RR101

```cisco
router bgp 65000
 bgp router-id 10.0.52.101
 bgp cluster-id 10.0.52.101
 bgp log-neighbor-changes
 neighbor 10.0.52.1 remote-as 65000
 neighbor 10.0.52.1 description PE1 VPNv4 client
 neighbor 10.0.52.1 update-source Loopback0
 neighbor 10.0.52.2 remote-as 65000
 neighbor 10.0.52.2 description PE2 VPNv4 client
 neighbor 10.0.52.2 update-source Loopback0
 neighbor 10.0.52.3 remote-as 65000
 neighbor 10.0.52.3 description PE3 VPNv4 client
 neighbor 10.0.52.3 update-source Loopback0
 !
 address-family ipv4 unicast
  neighbor 10.0.52.1 activate
  neighbor 10.0.52.1 route-reflector-client
  neighbor 10.0.52.2 activate
  neighbor 10.0.52.2 route-reflector-client
  neighbor 10.0.52.3 activate
  neighbor 10.0.52.3 route-reflector-client
 exit-address-family
 !
 address-family vpnv4
  neighbor 10.0.52.1 activate
  neighbor 10.0.52.1 send-community extended
  neighbor 10.0.52.1 route-reflector-client
  neighbor 10.0.52.2 activate
  neighbor 10.0.52.2 send-community extended
  neighbor 10.0.52.2 route-reflector-client
  neighbor 10.0.52.3 activate
  neighbor 10.0.52.3 send-community extended
  neighbor 10.0.52.3 route-reflector-client
 exit-address-family
```

#### RR102

```cisco
router bgp 65000
 bgp router-id 10.0.52.102
 bgp cluster-id 10.0.52.102
 bgp log-neighbor-changes
 neighbor 10.0.52.1 remote-as 65000
 neighbor 10.0.52.1 description PE1 VPNv4 client
 neighbor 10.0.52.1 update-source Loopback0
 neighbor 10.0.52.2 remote-as 65000
 neighbor 10.0.52.2 description PE2 VPNv4 client
 neighbor 10.0.52.2 update-source Loopback0
 neighbor 10.0.52.3 remote-as 65000
 neighbor 10.0.52.3 description PE3 VPNv4 client
 neighbor 10.0.52.3 update-source Loopback0
 !
 address-family ipv4 unicast
  neighbor 10.0.52.1 activate
  neighbor 10.0.52.1 route-reflector-client
  neighbor 10.0.52.2 activate
  neighbor 10.0.52.2 route-reflector-client
  neighbor 10.0.52.3 activate
  neighbor 10.0.52.3 route-reflector-client
 exit-address-family
 !
 address-family vpnv4
  neighbor 10.0.52.1 activate
  neighbor 10.0.52.1 send-community extended
  neighbor 10.0.52.1 route-reflector-client
  neighbor 10.0.52.2 activate
  neighbor 10.0.52.2 send-community extended
  neighbor 10.0.52.2 route-reflector-client
  neighbor 10.0.52.3 activate
  neighbor 10.0.52.3 send-community extended
  neighbor 10.0.52.3 route-reflector-client
 exit-address-family
```

### 6. Add Both RRs to Every PE

Do not remove or shut down any existing PE neighbor in this step.

#### PE1 Addition

```cisco
router bgp 65000
 neighbor 10.0.52.101 remote-as 65000
 neighbor 10.0.52.101 description iBGP to RR101 Loopback0
 neighbor 10.0.52.101 update-source Loopback0
 neighbor 10.0.52.102 remote-as 65000
 neighbor 10.0.52.102 description iBGP to RR102 Loopback0
 neighbor 10.0.52.102 update-source Loopback0
 !
 address-family ipv4 unicast
  neighbor 10.0.52.101 activate
  neighbor 10.0.52.102 activate
 exit-address-family
 !
 address-family vpnv4
  neighbor 10.0.52.101 activate
  neighbor 10.0.52.101 send-community extended
  neighbor 10.0.52.102 activate
  neighbor 10.0.52.102 send-community extended
 exit-address-family
```

#### PE2 Addition

```cisco
router bgp 65000
 neighbor 10.0.52.101 remote-as 65000
 neighbor 10.0.52.101 description iBGP to RR101 Loopback0
 neighbor 10.0.52.101 update-source Loopback0
 neighbor 10.0.52.102 remote-as 65000
 neighbor 10.0.52.102 description iBGP to RR102 Loopback0
 neighbor 10.0.52.102 update-source Loopback0
 !
 address-family ipv4 unicast
  neighbor 10.0.52.101 activate
  neighbor 10.0.52.102 activate
 exit-address-family
 !
 address-family vpnv4
  neighbor 10.0.52.101 activate
  neighbor 10.0.52.101 send-community extended
  neighbor 10.0.52.102 activate
  neighbor 10.0.52.102 send-community extended
 exit-address-family
```

#### PE3 Addition

```cisco
router bgp 65000
 neighbor 10.0.52.101 remote-as 65000
 neighbor 10.0.52.101 description iBGP to RR101 Loopback0
 neighbor 10.0.52.101 update-source Loopback0
 neighbor 10.0.52.102 remote-as 65000
 neighbor 10.0.52.102 description iBGP to RR102 Loopback0
 neighbor 10.0.52.102 update-source Loopback0
 !
 address-family ipv4 unicast
  neighbor 10.0.52.101 activate
  neighbor 10.0.52.102 activate
 exit-address-family
 !
 address-family vpnv4
  neighbor 10.0.52.101 activate
  neighbor 10.0.52.101 send-community extended
  neighbor 10.0.52.102 activate
  neighbor 10.0.52.102 send-community extended
 exit-address-family
```

### 7. Verify the Parallel BGP State

At this stage, each PE has four iBGP peers: two other PEs and two RRs. Each RR has three PE clients.

Run on all PEs and both RRs:

```cisco
show ip bgp summary
show bgp vpnv4 unicast all summary
show bgp vpnv4 unicast all neighbors
show tcp brief | include 10.0.52.
```

Run on RR101 and RR102:

```cisco
show bgp vpnv4 unicast all
show bgp vpnv4 unicast all labels
show bgp vpnv4 unicast all neighbors 10.0.52.1 advertised-routes
show bgp vpnv4 unicast all neighbors 10.0.52.2 advertised-routes
show bgp vpnv4 unicast all neighbors 10.0.52.3 advertised-routes
```

Each RR must:

- Have three established VPNv4 client sessions.
- Learn `192.168.0.0/24`, `192.168.1.0/24`, and `192.168.2.0/24` with their RDs and VPN labels.
- Preserve RT `65000:100`.
- Advertise each client-originated route to the other two clients.

On each PE, confirm both RR sessions are established and all CEtest routes remain installed:

```cisco
show bgp vpnv4 unicast all summary
show bgp vpnv4 unicast all
show ip route vrf CEtest
show bgp ipv4 unicast vrf CEtest
```

The BGP best path may remain the direct PE-learned path while the full mesh exists. This is acceptable. The next step proves that reflected alternatives work before direct sessions are removed.

### 8. Prove RR-Only Learning Before Removing the Full Mesh

Test one PE at a time. Administratively shut only its direct PE neighbors, validate RR-learned routes and forwarding, and then restore the sessions before testing the next PE. Do not test multiple PEs simultaneously.

#### Test PE1

```cisco
router bgp 65000
 neighbor 10.0.52.2 shutdown
 neighbor 10.0.52.3 shutdown
```

Verify PE1:

```cisco
show bgp vpnv4 unicast all summary
show bgp vpnv4 unicast all
show ip route vrf CEtest
ping vrf CEtest 192.168.1.1 source 192.168.0.1
ping vrf CEtest 192.168.2.1 source 192.168.0.1
```

PE1 must retain established sessions to both RRs, learn both remote routes, and pass both pings. Restore the direct peers:

```cisco
router bgp 65000
 no neighbor 10.0.52.2 shutdown
 no neighbor 10.0.52.3 shutdown
```

Wait for both direct sessions to reestablish before continuing.

#### Test PE2

```cisco
router bgp 65000
 neighbor 10.0.52.1 shutdown
 neighbor 10.0.52.3 shutdown
```

Verify PE2:

```cisco
show bgp vpnv4 unicast all summary
show bgp vpnv4 unicast all
show ip route vrf CEtest
ping vrf CEtest 192.168.0.1 source 192.168.1.1
ping vrf CEtest 192.168.2.1 source 192.168.1.1
```

Restore the direct peers:

```cisco
router bgp 65000
 no neighbor 10.0.52.1 shutdown
 no neighbor 10.0.52.3 shutdown
```

#### Test PE3

```cisco
router bgp 65000
 neighbor 10.0.52.1 shutdown
 neighbor 10.0.52.2 shutdown
```

Verify PE3:

```cisco
show bgp vpnv4 unicast all summary
show bgp vpnv4 unicast all
show ip route vrf CEtest
ping vrf CEtest 192.168.0.1 source 192.168.2.1
ping vrf CEtest 192.168.1.1 source 192.168.2.1
```

Restore the direct peers:

```cisco
router bgp 65000
 no neighbor 10.0.52.1 shutdown
 no neighbor 10.0.52.2 shutdown
```

### 9. Migration Go/No-Go Checkpoint

Proceed only if all conditions are true:

- [ ] Both RRs have three established PE client sessions.
- [ ] Both RRs contain all three CEtest VPNv4 routes.
- [ ] Every PE has two established RR sessions.
- [ ] Every PE passed its isolated RR-only learning test.
- [ ] All six directed CEtest pings succeeded during the tests.
- [ ] No P router learned a CEtest prefix.
- [ ] Current configurations are saved or backed up.

If any condition fails, keep the direct PE full mesh and troubleshoot the RR path. Do not proceed to neighbor removal.

### 10. Remove the Direct PE Full Mesh

Remove direct PE neighbors one router at a time. After each PE, validate its RR sessions, routes, and pings before proceeding.

#### Remove Direct Peers from PE1

```cisco
router bgp 65000
 no neighbor 10.0.52.2
 no neighbor 10.0.52.3
```

Validate PE1:

```cisco
show bgp vpnv4 unicast all summary
show ip route vrf CEtest
ping vrf CEtest 192.168.1.1 source 192.168.0.1
ping vrf CEtest 192.168.2.1 source 192.168.0.1
```

#### Remove Direct Peers from PE2

```cisco
router bgp 65000
 no neighbor 10.0.52.1
 no neighbor 10.0.52.3
```

Validate PE2:

```cisco
show bgp vpnv4 unicast all summary
show ip route vrf CEtest
ping vrf CEtest 192.168.0.1 source 192.168.1.1
ping vrf CEtest 192.168.2.1 source 192.168.1.1
```

#### Remove Direct Peers from PE3

```cisco
router bgp 65000
 no neighbor 10.0.52.1
 no neighbor 10.0.52.2
```

Validate PE3:

```cisco
show bgp vpnv4 unicast all summary
show ip route vrf CEtest
ping vrf CEtest 192.168.0.1 source 192.168.2.1
ping vrf CEtest 192.168.1.1 source 192.168.2.1
```

> [!IMPORTANT]
> `no neighbor <address>` removes that neighbor from every address family. This is intentional because direct PE-to-PE IPv4 and VPNv4 sessions are both being retired. The RR neighbors must remain configured.

### 11. Verify the Final Route-Reflector Topology

On each PE:

```cisco
show ip bgp summary
show bgp vpnv4 unicast all summary
show bgp vpnv4 unicast all
show bgp vpnv4 unicast all labels
show ip route vrf CEtest
show bgp ipv4 unicast vrf CEtest
```

Expected PE neighbor state:

| PE | Remaining iBGP Peers |
|---|---|
| PE1 | RR101 `10.0.52.101`, RR102 `10.0.52.102` |
| PE2 | RR101 `10.0.52.101`, RR102 `10.0.52.102` |
| PE3 | RR101 `10.0.52.101`, RR102 `10.0.52.102` |

On each RR:

```cisco
show bgp vpnv4 unicast all summary
show bgp vpnv4 unicast all
show bgp vpnv4 unicast all labels
```

Each RR must have exactly three PE clients and all three CEtest routes.

### 12. Test Route-Reflector Redundancy

Test only one RR failure at a time. On RR101:

```cisco
router bgp 65000
 shutdown
```

On every PE, verify the RR102 session, all CEtest routes, and inter-site pings remain operational. Restore RR101:

```cisco
router bgp 65000
 no shutdown
```

Wait for all three RR101 client sessions to reestablish. Then repeat the test on RR102:

```cisco
router bgp 65000
 shutdown
```

Restore RR102 after validation:

```cisco
router bgp 65000
 no shutdown
```

If the IOS image does not support BGP process `shutdown`, shut the three PE neighbors individually and restore them after the test.

## Expected Results

- RR101 forms IS-IS and LDP adjacencies with P2.
- RR102 forms IS-IS and LDP adjacencies with P4.
- Every PE has labeled reachability to both RR loopbacks.
- Both RRs establish IPv4 iBGP and VPNv4 sessions with PE1–PE3.
- Both RRs learn and reflect all three CEtest VPNv4 routes.
- Route reflection preserves each originating PE as the VPNv4 next hop.
- Every PE passes the RR-only learning test before direct sessions are removed.
- The direct PE full mesh is removed without losing CEtest reachability.
- Final PEs have two redundant RR peers and no direct PE peers.
- A single RR failure does not remove remote CEtest routes or interrupt tested forwarding.
- P routers remain BGP-free and contain no CEtest routes.

## Rollback Procedure

If service fails after direct PE sessions are removed, restore the original full mesh on the affected PEs using the neighbor configurations from Task 003. At minimum, restore the reciprocal neighbor on both endpoints, activate it under IPv4 unicast and VPNv4, and enable extended communities under VPNv4.

After rollback:

```cisco
show bgp vpnv4 unicast all summary
show ip route vrf CEtest
```

Repeat all CEtest pings and investigate the RR sessions while the direct mesh carries service.

## Troubleshooting Notes

| Symptom | Likely Cause | Corrective Action |
|---|---|---|
| RR physical link is down | Incorrect cable, interface, address, or shutdown state | Verify diagram endpoints, `/30` addresses, and `no shutdown` |
| RR IS-IS adjacency is absent | Missing IS-IS interface command or network-type mismatch | Verify `ip router isis CORE` and point-to-point mode on both ends |
| RR loopback is unreachable | Loopback not advertised by IS-IS | Enable IS-IS on Loopback0 and keep it passive |
| RR LDP session is absent | MPLS missing on one link endpoint | Verify global and interface `mpls ip`, LDP ID, and IGP reachability |
| PE-to-RR BGP is `Active` | Loopback reachability, AS, or update source is incorrect | Verify sourced ping, AS `65000`, and Loopback0 update source |
| RR learns routes but does not reflect them | Client command missing under VPNv4 | Configure `route-reflector-client` for every PE under VPNv4 |
| Reflected routes lack route targets | Extended communities are not sent | Configure `send-community extended` on PE and RR VPNv4 neighbors |
| PE receives only its local CEtest route | Both RR paths absent or rejected | Inspect RR advertised routes, originator ID, cluster list, and PE sessions |
| Route is present but VRF ping fails | VPN next hop or label is unresolved | Check PE-loopback IS-IS route, LDP binding, VPN label, and VRF CEF |
| Routes disappear during direct-peer test | RR onboarding is incomplete | Restore direct peers and fix RR learning before migration |
| One RR failure removes routes | PE has only one functioning RR or alternate path is not installed | Restore the failed RR, then verify both sessions and reflected paths |
| RR contains a CEtest VRF | RR was configured as a service PE unnecessarily | Remove the VRF; RRs reflect VPNv4 routes without importing them |
| P router learns a CEtest route | Customer route leaked into IS-IS | Remove redistribution and preserve the BGP-free core |

## Completion Checklist

- [ ] RR101 and RR102 added to EVE-NG
- [ ] RR101–P2 and RR102–P4 links configured and verified
- [ ] Unique RR Loopback0 addresses configured
- [ ] Unique IS-IS NETs configured
- [ ] RR IS-IS Level 2 adjacencies operational
- [ ] Both RR loopbacks reachable from every PE
- [ ] MPLS enabled globally and on both new links
- [ ] RR LDP adjacencies operational
- [ ] MPLS LSP pings succeed between all PEs and both RRs
- [ ] RR101 configured with three VPNv4 clients
- [ ] RR102 configured with three VPNv4 clients
- [ ] Every PE has sessions to both RRs
- [ ] Both RRs contain all three CEtest VPNv4 routes
- [ ] Every PE passed a controlled RR-only route-learning test
- [ ] Migration go/no-go checklist completed
- [ ] Direct PE-to-PE neighbors removed in stages
- [ ] Final PEs have only RR101 and RR102 as provider iBGP peers
- [ ] All CEtest routes installed on every PE
- [ ] All six directed CEtest pings successful
- [ ] RR101 failure test successful
- [ ] RR102 failure test successful
- [ ] P routers remain BGP-free
- [ ] Route-reflector EVE-NG topology imported from `lab_files`
- [ ] Final configurations saved

# Task 004 — Add Redundant `inet-vpn` Route Reflectors

## Purpose

Add RR101 and RR102 as redundant route reflectors in AS `65000`, migrate PE1–PE3 from a full-mesh iBGP design to route-reflector clients, and preserve CEtest service with a make-before-break procedure.

## Prerequisites

- Tasks [001](./001-base-objectives.md), [002](./002-PE-to-PE-iBGP-CEtest-VRF.md), and [003](./003-add-PE3-MPLS-iBGP-CEtest-VRF.md) completed
- PE1–PE3 in a working `inet-vpn` full mesh
- All three CEtest `/24` routes reachable from every PE
- P2 `ge-0/0/6` and P4 `ge-0/0/5` available
- Two new vMX nodes named RR101 and RR102
- The `.unl` milestone is pending: `lab_files/002-ISP-MPLS-Juniper-Lab_added-RR-nodes.unl`

## Topology Change

```text
                    RR101                              RR102
             lo0.0 10.0.52.101/32              lo0.0 10.0.52.102/32
           ge-0/0/0 10.0.1.25                 ge-0/0/0 10.0.1.29
                      |                                  |
               10.0.1.24/30                      10.0.1.28/30
                      |                                  |
      P2 ge-0/0/6 10.0.1.26          P4 ge-0/0/5 10.0.1.30
                       \                                /
                        +--------- MPLS core ----------+

       PE1, PE2, and PE3 are clients of both route reflectors
```

| Parameter | RR101 | RR102 |
|---|---|---|
| `lo0.0` | `10.0.52.101/32` | `10.0.52.102/32` |
| RR interface | `ge-0/0/0`, `10.0.1.25/30` | `ge-0/0/0`, `10.0.1.29/30` |
| P interface | P2 `ge-0/0/6`, `10.0.1.26/30` | P4 `ge-0/0/5`, `10.0.1.30/30` |
| ISO NET | `49.0001.c000.0000.0101.00` | `49.0001.c000.0000.0102.00` |
| AS | `65000` | `65000` |
| Cluster ID | `10.0.52.101` | `10.0.52.102` |

Each RR receives every PE route directly, so an RR-to-RR session is not required. The RRs participate in IS-IS/LDP for consistent provider-node reachability, but they do not carry customer traffic in the intended topology.

## Migration States

| State | Direct PE sessions | PE-to-RR sessions | Purpose |
|---|---:|---:|---|
| Initial | 3 | 0 | Existing full mesh |
| Parallel | 3 | 6 | Introduce both RRs safely |
| Validation | Temporarily deactivated per PE | 6 | Prove RR-only learning |
| Final | 0 | 6 | Redundant reflected topology |

## Objectives

1. Add both RRs to IPv4, IS-IS, MPLS, and LDP.
2. Establish `inet-vpn` iBGP from every PE to both RRs.
3. Reflect all three CEtest routes from both clusters.
4. Prove RR-only learning before deleting direct PE sessions.
5. Retire the full mesh and test either RR failing.

## 1. Capture the Baseline

On each PE:

```junos
show bgp summary
show route table bgp.l3vpn.0
show route table CEtest.inet.0
```

Run all six directed CEtest pings from Task 003. Do not migrate unless every peer and ping is working.

## 2. Configure Interfaces

### RR101

```junos
set system host-name RR101
set routing-options router-id 10.0.52.101
set interfaces lo0 unit 0 description "Router ID"
set interfaces lo0 unit 0 family inet address 10.0.52.101/32
set interfaces lo0 unit 0 family iso address 49.0001.c000.0000.0101.00
set interfaces ge-0/0/0 description "Link to P2 ge-0/0/6"
set interfaces ge-0/0/0 unit 0 family inet address 10.0.1.25/30
set interfaces ge-0/0/0 unit 0 family iso
```

### P2 addition

```junos
set interfaces ge-0/0/6 description "Link to RR101 ge-0/0/0"
set interfaces ge-0/0/6 unit 0 family inet address 10.0.1.26/30
set interfaces ge-0/0/6 unit 0 family iso
```

### RR102

```junos
set system host-name RR102
set routing-options router-id 10.0.52.102
set interfaces lo0 unit 0 description "Router ID"
set interfaces lo0 unit 0 family inet address 10.0.52.102/32
set interfaces lo0 unit 0 family iso address 49.0001.c000.0000.0102.00
set interfaces ge-0/0/0 description "Link to P4 ge-0/0/5"
set interfaces ge-0/0/0 unit 0 family inet address 10.0.1.29/30
set interfaces ge-0/0/0 unit 0 family iso
```

### P4 addition

```junos
set interfaces ge-0/0/5 description "Link to RR102 ge-0/0/0"
set interfaces ge-0/0/5 unit 0 family inet address 10.0.1.30/30
set interfaces ge-0/0/5 unit 0 family iso
```

Commit and verify direct pings in both directions:

```junos
show interfaces terse | match "ge-|lo0"
show route protocol direct
```

- RR101 ↔ P2: `10.0.1.25` / `10.0.1.26`
- RR102 ↔ P4: `10.0.1.29` / `10.0.1.30`

## 3. Add the RRs to IS-IS

RR101:

```junos
set protocols isis level 1 disable
set protocols isis interface lo0.0 passive
set protocols isis interface ge-0/0/0.0 point-to-point
```

P2:

```junos
set protocols isis interface ge-0/0/6.0 point-to-point
```

RR102:

```junos
set protocols isis level 1 disable
set protocols isis interface lo0.0 passive
set protocols isis interface ge-0/0/0.0 point-to-point
```

P4:

```junos
set protocols isis interface ge-0/0/5.0 point-to-point
```

Commit and verify:

```junos
show isis adjacency
show isis database
show route protocol isis
```

Every PE must learn both RR `/32` loopbacks, and each RR must learn all three PE loopbacks.

## 4. Enable MPLS and LDP

RR101:

```junos
set interfaces ge-0/0/0 unit 0 family mpls
set protocols mpls interface ge-0/0/0.0
set protocols ldp transport-address router-id
set protocols ldp interface ge-0/0/0.0
```

P2:

```junos
set interfaces ge-0/0/6 unit 0 family mpls
set protocols mpls interface ge-0/0/6.0
set protocols ldp interface ge-0/0/6.0
```

RR102:

```junos
set interfaces ge-0/0/0 unit 0 family mpls
set protocols mpls interface ge-0/0/0.0
set protocols ldp transport-address router-id
set protocols ldp interface ge-0/0/0.0
```

P4:

```junos
set interfaces ge-0/0/5 unit 0 family mpls
set protocols mpls interface ge-0/0/5.0
set protocols ldp interface ge-0/0/5.0
```

Verify:

```junos
show ldp neighbor
show ldp session
show route table inet.3
show route table mpls.0
```

From each PE:

```junos
ping mpls ldp 10.0.52.101/32
ping mpls ldp 10.0.52.102/32
```

## 5. Configure the Route Reflectors

On Junos, the `cluster` statement on a BGP group makes that group a route-reflector client group. The two unique cluster IDs provide independent reflection paths.

### RR101

```junos
set routing-options autonomous-system 65000
set protocols bgp group PE-CLIENTS type internal
set protocols bgp group PE-CLIENTS local-address 10.0.52.101
set protocols bgp group PE-CLIENTS family inet-vpn unicast
set protocols bgp group PE-CLIENTS cluster 10.0.52.101
set protocols bgp group PE-CLIENTS neighbor 10.0.52.1 description "PE1 inet-vpn client"
set protocols bgp group PE-CLIENTS neighbor 10.0.52.2 description "PE2 inet-vpn client"
set protocols bgp group PE-CLIENTS neighbor 10.0.52.3 description "PE3 inet-vpn client"
```

### RR102

```junos
set routing-options autonomous-system 65000
set protocols bgp group PE-CLIENTS type internal
set protocols bgp group PE-CLIENTS local-address 10.0.52.102
set protocols bgp group PE-CLIENTS family inet-vpn unicast
set protocols bgp group PE-CLIENTS cluster 10.0.52.102
set protocols bgp group PE-CLIENTS neighbor 10.0.52.1 description "PE1 inet-vpn client"
set protocols bgp group PE-CLIENTS neighbor 10.0.52.2 description "PE2 inet-vpn client"
set protocols bgp group PE-CLIENTS neighbor 10.0.52.3 description "PE3 inet-vpn client"
```

Commit only after `commit check` succeeds.

## 6. Add Both RRs to Every PE

Use one client-side group on each PE. The RRs contain the `cluster` statements; the clients do not.

### PE1

```junos
set protocols bgp group VPN-RR type internal
set protocols bgp group VPN-RR local-address 10.0.52.1
set protocols bgp group VPN-RR family inet-vpn unicast
set protocols bgp group VPN-RR neighbor 10.0.52.101 description "inet-vpn to RR101"
set protocols bgp group VPN-RR neighbor 10.0.52.102 description "inet-vpn to RR102"
```

### PE2

```junos
set protocols bgp group VPN-RR type internal
set protocols bgp group VPN-RR local-address 10.0.52.2
set protocols bgp group VPN-RR family inet-vpn unicast
set protocols bgp group VPN-RR neighbor 10.0.52.101 description "inet-vpn to RR101"
set protocols bgp group VPN-RR neighbor 10.0.52.102 description "inet-vpn to RR102"
```

### PE3

```junos
set protocols bgp group VPN-RR type internal
set protocols bgp group VPN-RR local-address 10.0.52.3
set protocols bgp group VPN-RR family inet-vpn unicast
set protocols bgp group VPN-RR neighbor 10.0.52.101 description "inet-vpn to RR101"
set protocols bgp group VPN-RR neighbor 10.0.52.102 description "inet-vpn to RR102"
```

Commit and retain the direct `PE-FULL-MESH` group during validation.

## 7. Verify the Parallel State

On both RRs:

```junos
show bgp summary
show bgp group PE-CLIENTS
show route table bgp.l3vpn.0
show route receive-protocol bgp 10.0.52.1 table bgp.l3vpn.0
show route advertising-protocol bgp 10.0.52.2 table bgp.l3vpn.0
```

Each RR must have three established peers and learn one CEtest VPN route originated by each PE.

On each PE:

```junos
show bgp summary
show route table CEtest.inet.0
show route table bgp.l3vpn.0 extensive
```

Each PE should temporarily have four established peers: two PEs and two RRs. Multiple paths may exist for the same VPN NLRI; only the best usable route is active.

## 8. Prove RR-Only Learning

Test one PE at a time. On the selected PE, deactivate its direct full-mesh group while keeping both RR sessions active:

```junos
deactivate protocols bgp group PE-FULL-MESH
show | compare
commit check
commit
```

Verify:

```junos
show bgp summary
show route table CEtest.inet.0
show route table CEtest.inet.0 protocol bgp extensive
```

Run that PE's two remote CEtest pings. Confirm the BGP route shows a cluster list containing either `10.0.52.101` or `10.0.52.102`.

Restore the direct group before testing the next PE:

```junos
activate protocols bgp group PE-FULL-MESH
commit
```

Repeat on PE1, PE2, and PE3. Stop the migration if any remote route or ping disappears.

## 9. Go/No-Go Checkpoint

Proceed only if:

- Both RRs have three established `inet-vpn` clients.
- Each RR has all three CEtest VPN routes.
- Each PE retains both remote routes with its direct group deactivated.
- All six directed CEtest pings work using RR-only learning.
- Each PE has been restored to the parallel state.

## 10. Remove the Direct PE Full Mesh

Remove the old group from one PE at a time. Review and commit each PE separately:

```junos
delete protocols bgp group PE-FULL-MESH
show | compare
commit check
commit
```

After each commit, confirm two RR peers remain established, both remote CEtest routes remain, and the two remote pings succeed. Complete PE1, then PE2, then PE3.

## 11. Verify the Final Topology

Each PE:

```junos
show bgp summary
show bgp group VPN-RR
show route table CEtest.inet.0
show route table bgp.l3vpn.0 extensive
```

Each RR:

```junos
show bgp summary
show bgp group PE-CLIENTS
show route table bgp.l3vpn.0 extensive
```

Expected final state:

- Every PE has exactly two BGP peers: RR101 and RR102.
- Every RR has exactly three BGP peers: PE1, PE2, and PE3.
- No PE-to-PE session remains.
- All CEtest routes and all six directed pings remain working.

## 12. Test RR Redundancy

Deactivate one RR neighbor at a time on a selected PE:

```junos
deactivate protocols bgp group VPN-RR neighbor 10.0.52.101
commit
show bgp summary
show route table CEtest.inet.0
```

Run both remote CEtest pings, then restore it:

```junos
activate protocols bgp group VPN-RR neighbor 10.0.52.101
commit
```

Repeat for `10.0.52.102`. Never deactivate both RR neighbors simultaneously during this test.

## Rollback

If the final design fails, restore the original full-mesh neighbors using the Task 003 `PE-FULL-MESH` commands on all three PEs. Commit, verify the three direct sessions and all CEtest routes, then troubleshoot the RR groups without removing the restored path.

## Troubleshooting

- For a PE-to-RR session failure, verify IS-IS reachability, AS `65000`, `local-address`, and `family inet-vpn` on both sides.
- If an RR receives but does not reflect routes, verify the `cluster` statement is on `PE-CLIENTS`.
- If a PE rejects a reflected route, inspect originator ID and cluster list with `show route table bgp.l3vpn.0 extensive`.
- If routes exist but CEtest does not import them, compare `target:65000:100` and the routing-instance configuration.
- If traffic fails with correct routes, verify PE-to-PE LDP transport in `inet.3` and `mpls.0`; RRs are control-plane nodes and are not the intended customer data path.
- Use `show log messages | match RPD_BGP` for BGP events.

## Completion Checklist

- [ ] RR101 and RR102 have correct interfaces, loopbacks, and ISO NETs.
- [ ] Both RRs are reachable through IS-IS and LDP.
- [ ] Each RR has three established `inet-vpn` clients.
- [ ] Each PE has two established RR sessions.
- [ ] RR-only operation was proven on each PE before deletion.
- [ ] Direct `PE-FULL-MESH` groups were removed from all PEs.
- [ ] All three CEtest routes remain present on every PE.
- [ ] All six directed CEtest pings succeed.
- [ ] Either RR can be deactivated without service loss.

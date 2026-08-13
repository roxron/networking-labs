# Task 003 — Add PE3 to the MPLS Core and CEtest VPN

## Purpose

Add PE3 and integrate it into the IPv4, IS-IS, MPLS/LDP, iBGP `inet-vpn`, and CEtest layers built in Tasks 001 and 002.

## Prerequisites

- [Task 001](./001-base-objectives.md) and [Task 002](./002-PE-to-PE-iBGP-CEtest-VRF.md) completed
- Working CEtest connectivity between PE1 and PE2
- A new vMX named PE3 with at least `ge-0/0/0` and `ge-0/0/1`
- P2 `ge-0/0/5` and P5 `ge-0/0/4` available
- The `.unl` milestone is pending: `lab_files/002-ISP-MPLS-Juniper-Lab_added-PE3.unl`

## Topology Change

```text
                         PE3
                lo0.0 10.0.52.3/32
                lo0.2 192.168.2.1/24
                  /                  \
      ge-0/0/0 .17                  .21 ge-0/0/1
        10.0.1.16/30              10.0.1.20/30
              /                        \
 P2 ge-0/0/5 .18                  .22 ge-0/0/4 P5
```

| Parameter | Value |
|---|---|
| PE3 `lo0.0` | `10.0.52.3/32` |
| PE3–P2 | PE3 `ge-0/0/0` `10.0.1.17/30`; P2 `ge-0/0/5` `10.0.1.18/30` |
| PE3–P5 | PE3 `ge-0/0/1` `10.0.1.21/30`; P5 `ge-0/0/4` `10.0.1.22/30` |
| PE3 ISO NET | `49.0001.b000.0000.0003.00` |
| Provider AS | `65000` |
| CEtest RD | `65000:3` |
| CEtest RT | `target:65000:100` |
| PE3 `lo0.2` | `192.168.2.1/24` |

## Objectives

1. Configure PE3 and its two P-facing links.
2. Extend IS-IS Level 2 and LDP to PE3.
3. Verify labeled reachability to PE1 and PE2.
4. Expand the PE iBGP full mesh from two to three nodes.
5. Add PE3 to CEtest and verify all three customer networks.
6. Confirm P routers remain free of BGP and VPN routes.

## 1. Capture the Baseline

On PE1 and PE2:

```junos
show isis adjacency
show ldp session
show bgp summary
show route table CEtest.inet.0
```

On P2 and P5:

```junos
show interfaces terse | match ge-
show isis adjacency
show ldp neighbor
```

## 2. Configure Interfaces

### PE3

```junos
set system host-name PE3
set routing-options router-id 10.0.52.3
set interfaces lo0 unit 0 description "Router ID"
set interfaces lo0 unit 0 family inet address 10.0.52.3/32
set interfaces lo0 unit 0 family iso address 49.0001.b000.0000.0003.00
set interfaces ge-0/0/0 description "Link to P2 ge-0/0/5"
set interfaces ge-0/0/0 unit 0 family inet address 10.0.1.17/30
set interfaces ge-0/0/0 unit 0 family iso
set interfaces ge-0/0/1 description "Link to P5 ge-0/0/4"
set interfaces ge-0/0/1 unit 0 family inet address 10.0.1.21/30
set interfaces ge-0/0/1 unit 0 family iso
```

### P2 addition

```junos
set interfaces ge-0/0/5 description "Link to PE3 ge-0/0/0"
set interfaces ge-0/0/5 unit 0 family inet address 10.0.1.18/30
set interfaces ge-0/0/5 unit 0 family iso
```

### P5 addition

```junos
set interfaces ge-0/0/4 description "Link to PE3 ge-0/0/1"
set interfaces ge-0/0/4 unit 0 family inet address 10.0.1.22/30
set interfaces ge-0/0/4 unit 0 family iso
```

Commit, then verify:

```junos
show interfaces terse | match "ge-|lo0"
show interfaces descriptions
show route protocol direct
```

PE3:

```junos
ping 10.0.1.18 rapid count 5
ping 10.0.1.22 rapid count 5
```

P2 and P5 should respectively ping `10.0.1.17` and `10.0.1.21`.

## 3. Add PE3 to IS-IS

### PE3

```junos
set protocols isis level 1 disable
set protocols isis interface lo0.0 passive
set protocols isis interface ge-0/0/0.0 point-to-point
set protocols isis interface ge-0/0/1.0 point-to-point
```

### P2 and P5 additions

P2:

```junos
set protocols isis interface ge-0/0/5.0 point-to-point
```

P5:

```junos
set protocols isis interface ge-0/0/4.0 point-to-point
```

Commit and verify:

```junos
show isis adjacency
show isis adjacency detail
show isis database
show route protocol isis
```

PE3 must have two Level 2 adjacencies and routes to every P/PE loopback. Every existing router must learn `10.0.52.3/32`.

## 4. Add MPLS and LDP

### PE3

```junos
set interfaces ge-0/0/0 unit 0 family mpls
set interfaces ge-0/0/1 unit 0 family mpls
set protocols mpls interface ge-0/0/0.0
set protocols mpls interface ge-0/0/1.0
set protocols ldp transport-address router-id
set protocols ldp interface ge-0/0/0.0
set protocols ldp interface ge-0/0/1.0
```

### P2 addition

```junos
set interfaces ge-0/0/5 unit 0 family mpls
set protocols mpls interface ge-0/0/5.0
set protocols ldp interface ge-0/0/5.0
```

### P5 addition

```junos
set interfaces ge-0/0/4 unit 0 family mpls
set protocols mpls interface ge-0/0/4.0
set protocols ldp interface ge-0/0/4.0
```

Commit and verify on PE3:

```junos
show ldp neighbor
show ldp session
show ldp database
show route table inet.3
show route table mpls.0
ping mpls ldp 10.0.52.1/32
ping mpls ldp 10.0.52.2/32
```

Verify reverse LSP pings from PE1 and PE2 to `10.0.52.3/32`.

## 5. Expand the iBGP Full Mesh

All sessions negotiate only `inet-vpn`. Existing PE1–PE2 configuration remains in place.

### PE3

```junos
set routing-options autonomous-system 65000
set protocols bgp group PE-FULL-MESH type internal
set protocols bgp group PE-FULL-MESH local-address 10.0.52.3
set protocols bgp group PE-FULL-MESH family inet-vpn unicast
set protocols bgp group PE-FULL-MESH neighbor 10.0.52.1 description "iBGP inet-vpn to PE1 lo0.0"
set protocols bgp group PE-FULL-MESH neighbor 10.0.52.2 description "iBGP inet-vpn to PE2 lo0.0"
```

### PE1 addition

```junos
set protocols bgp group PE-FULL-MESH neighbor 10.0.52.3 description "iBGP inet-vpn to PE3 lo0.0"
```

### PE2 addition

```junos
set protocols bgp group PE-FULL-MESH neighbor 10.0.52.3 description "iBGP inet-vpn to PE3 lo0.0"
```

Commit and verify on every PE:

```junos
show bgp summary
show bgp neighbor
show route table bgp.l3vpn.0
```

Each PE should have two established internal peers. If a peer remains Active, verify mutual loopback reachability and the configured `local-address`.

## 6. Add CEtest to PE3

```junos
set interfaces lo0 unit 2 description "CEtest network at PE3"
set interfaces lo0 unit 2 family inet address 192.168.2.1/24
set routing-instances CEtest instance-type vrf
set routing-instances CEtest interface lo0.2
set routing-instances CEtest route-distinguisher 65000:3
set routing-instances CEtest vrf-target target:65000:100
set routing-instances CEtest vrf-table-label
```

Commit and verify:

```junos
show route instance CEtest
show interfaces terse routing-instance CEtest
show route table CEtest.inet.0
show route table bgp.l3vpn.0 extensive
```

As in Task 002, the direct `192.168.2.0/24` is exported through the `vrf-target` policy; no BGP `network` statement is required.

## 7. Verify Three-Site CEtest

Every PE should have its local route as Direct and the other two as BGP routes:

```junos
show route table CEtest.inet.0
show route table CEtest.inet.0 protocol bgp extensive
show route table bgp.l3vpn.0 extensive
```

PE1:

```junos
ping routing-instance CEtest 192.168.1.1 source 192.168.0.1 rapid count 5
ping routing-instance CEtest 192.168.2.1 source 192.168.0.1 rapid count 5
```

PE2:

```junos
ping routing-instance CEtest 192.168.0.1 source 192.168.1.1 rapid count 5
ping routing-instance CEtest 192.168.2.1 source 192.168.1.1 rapid count 5
```

PE3:

```junos
ping routing-instance CEtest 192.168.0.1 source 192.168.2.1 rapid count 5
ping routing-instance CEtest 192.168.1.1 source 192.168.2.1 rapid count 5
```

## 8. Verify P-Router Isolation

On P2 and P5:

```junos
show bgp summary
show route 192.168.0.0/16 longer
show route table bgp.l3vpn.0
show route table inet.3
show route table mpls.0
```

The first three commands should show no BGP process, customer prefixes, or VPN table. `inet.3` and `mpls.0` should contain provider transport state.

## Expected Results

- PE3 has two IS-IS and two LDP adjacencies.
- All routers learn `10.0.52.3/32`; PE3 learns every existing loopback.
- LDP LSP tests succeed between PE3 and both existing PEs.
- Every PE has two established `inet-vpn` peers.
- Every `CEtest.inet.0` contains all three `/24` networks.
- All six directed CEtest pings succeed.
- P routers remain BGP-free and customer-route-free.

## Troubleshooting

- For missing IS-IS adjacency, check `family iso` and point-to-point configuration on both ends.
- For missing LDP adjacency, check `family mpls`, MPLS, and LDP on both ends.
- For BGP Active, check `lo0.0` reachability, AS, local address, and `inet-vpn` family.
- For a missing customer route, compare the RD/RT and confirm `lo0.2` is assigned to CEtest.
- For failed traffic with valid routes, inspect `inet.3`, `mpls.0`, VPN labels, and `vrf-table-label`.

## Completion Checklist

- [ ] PE3, P2, and P5 interfaces are correctly addressed.
- [ ] PE3 has two Level 2 IS-IS adjacencies.
- [ ] PE3 has two LDP neighbors and labeled reachability to PE1/PE2.
- [ ] The three PEs form a full `inet-vpn` iBGP mesh.
- [ ] PE3 exports `192.168.2.0/24` into CEtest.
- [ ] Every PE has all three CEtest routes.
- [ ] All six directed CEtest pings succeed.
- [ ] P routers contain no customer routes or BGP configuration.

# Task 001 — Build the Juniper MPLS Provider Underlay

## Purpose

Build the routed and label-switched foundation for the ISP lab. Six P routers form a redundant core; PE1 and PE2 are dual-homed at opposite sides. The task uses IS-IS Level 2, MPLS, and LDP on Juniper vMX.

## Prerequisites

- Juniper vMX running Junos `14.1R4.8`
- An EVE-NG topology matching [ISP-MPLS-Lab-Diagram.drawio](./ISP-MPLS-Lab-Diagram.drawio)
- Eight vMX nodes named P1–P6, PE1, and PE2
- The base `.unl` file is pending and should eventually be saved as `lab_files/002-ISP-MPLS-Juniper-Lab.unl`
- `ge-0/0/0` through the highest required interface available on each vMX

## Topology and Addressing

### Loopbacks

| Device | Role | `lo0.0` |
|---|---|---|
| P1 | Core and PE1 attachment | `10.0.50.1/32` |
| P2 | Core | `10.0.50.2/32` |
| P3 | Core and PE1 attachment | `10.0.50.3/32` |
| P4 | Core | `10.0.50.4/32` |
| P5 | Core and PE2 attachment | `10.0.50.5/32` |
| P6 | Core and PE2 attachment | `10.0.50.6/32` |
| PE1 | Provider edge | `10.0.52.1/32` |
| PE2 | Provider edge | `10.0.52.2/32` |

### P-to-P Links

| Link | Subnet | Side A | Address | Side B | Address |
|---|---|---|---|---|---|
| P1–P2 | `10.0.0.0/30` | P1 `ge-0/0/0` | `10.0.0.1/30` | P2 `ge-0/0/0` | `10.0.0.2/30` |
| P1–P3 | `10.0.0.4/30` | P1 `ge-0/0/1` | `10.0.0.5/30` | P3 `ge-0/0/1` | `10.0.0.6/30` |
| P2–P4 | `10.0.0.8/30` | P2 `ge-0/0/1` | `10.0.0.9/30` | P4 `ge-0/0/1` | `10.0.0.10/30` |
| P3–P4 | `10.0.0.12/30` | P3 `ge-0/0/0` | `10.0.0.13/30` | P4 `ge-0/0/0` | `10.0.0.14/30` |
| P1–P4 | `10.0.0.16/30` | P1 `ge-0/0/2` | `10.0.0.17/30` | P4 `ge-0/0/2` | `10.0.0.18/30` |
| P2–P3 | `10.0.0.20/30` | P2 `ge-0/0/2` | `10.0.0.21/30` | P3 `ge-0/0/2` | `10.0.0.22/30` |
| P2–P5 | `10.0.0.24/30` | P2 `ge-0/0/3` | `10.0.0.25/30` | P5 `ge-0/0/0` | `10.0.0.26/30` |
| P2–P6 | `10.0.0.28/30` | P2 `ge-0/0/4` | `10.0.0.29/30` | P6 `ge-0/0/1` | `10.0.0.30/30` |
| P4–P6 | `10.0.0.32/30` | P4 `ge-0/0/3` | `10.0.0.33/30` | P6 `ge-0/0/0` | `10.0.0.34/30` |
| P4–P5 | `10.0.0.36/30` | P4 `ge-0/0/4` | `10.0.0.37/30` | P5 `ge-0/0/1` | `10.0.0.38/30` |
| P5–P6 | `10.0.0.40/30` | P5 `ge-0/0/2` | `10.0.0.41/30` | P6 `ge-0/0/2` | `10.0.0.42/30` |

### PE-to-P Links

| Link | Subnet | PE side | Address | P side | Address |
|---|---|---|---|---|---|
| PE1–P1 | `10.0.1.0/30` | PE1 `ge-0/0/0` | `10.0.1.1/30` | P1 `ge-0/0/3` | `10.0.1.2/30` |
| PE1–P3 | `10.0.1.4/30` | PE1 `ge-0/0/1` | `10.0.1.5/30` | P3 `ge-0/0/3` | `10.0.1.6/30` |
| PE2–P5 | `10.0.1.8/30` | PE2 `ge-0/0/0` | `10.0.1.9/30` | P5 `ge-0/0/3` | `10.0.1.10/30` |
| PE2–P6 | `10.0.1.12/30` | PE2 `ge-0/0/1` | `10.0.1.13/30` | P6 `ge-0/0/3` | `10.0.1.14/30` |

## Objectives

1. Configure system names, loopbacks, and point-to-point interfaces.
2. Establish IS-IS Level 2 adjacencies on every provider link.
3. Advertise every router loopback.
4. Enable MPLS and LDP on provider-facing interfaces.
5. Verify labeled reachability between PE1 and PE2.
6. Test convergence after a link failure.

## 1. Base Interface Configuration

Each physical unit uses both `family inet` and `family iso`. `family mpls` is added in the MPLS section.

### P1

```junos
set system host-name P1
set routing-options router-id 10.0.50.1
set interfaces lo0 unit 0 description "Router ID"
set interfaces lo0 unit 0 family inet address 10.0.50.1/32
set interfaces lo0 unit 0 family iso address 49.0001.a000.0000.0001.00
set interfaces ge-0/0/0 description "Link to P2 ge-0/0/0"
set interfaces ge-0/0/0 unit 0 family inet address 10.0.0.1/30
set interfaces ge-0/0/0 unit 0 family iso
set interfaces ge-0/0/1 description "Link to P3 ge-0/0/1"
set interfaces ge-0/0/1 unit 0 family inet address 10.0.0.5/30
set interfaces ge-0/0/1 unit 0 family iso
set interfaces ge-0/0/2 description "Link to P4 ge-0/0/2"
set interfaces ge-0/0/2 unit 0 family inet address 10.0.0.17/30
set interfaces ge-0/0/2 unit 0 family iso
set interfaces ge-0/0/3 description "Link to PE1 ge-0/0/0"
set interfaces ge-0/0/3 unit 0 family inet address 10.0.1.2/30
set interfaces ge-0/0/3 unit 0 family iso
```

### P2

```junos
set system host-name P2
set routing-options router-id 10.0.50.2
set interfaces lo0 unit 0 description "Router ID"
set interfaces lo0 unit 0 family inet address 10.0.50.2/32
set interfaces lo0 unit 0 family iso address 49.0001.a000.0000.0002.00
set interfaces ge-0/0/0 description "Link to P1 ge-0/0/0"
set interfaces ge-0/0/0 unit 0 family inet address 10.0.0.2/30
set interfaces ge-0/0/0 unit 0 family iso
set interfaces ge-0/0/1 description "Link to P4 ge-0/0/1"
set interfaces ge-0/0/1 unit 0 family inet address 10.0.0.9/30
set interfaces ge-0/0/1 unit 0 family iso
set interfaces ge-0/0/2 description "Link to P3 ge-0/0/2"
set interfaces ge-0/0/2 unit 0 family inet address 10.0.0.21/30
set interfaces ge-0/0/2 unit 0 family iso
set interfaces ge-0/0/3 description "Link to P5 ge-0/0/0"
set interfaces ge-0/0/3 unit 0 family inet address 10.0.0.25/30
set interfaces ge-0/0/3 unit 0 family iso
set interfaces ge-0/0/4 description "Link to P6 ge-0/0/1"
set interfaces ge-0/0/4 unit 0 family inet address 10.0.0.29/30
set interfaces ge-0/0/4 unit 0 family iso
```

### P3

```junos
set system host-name P3
set routing-options router-id 10.0.50.3
set interfaces lo0 unit 0 description "Router ID"
set interfaces lo0 unit 0 family inet address 10.0.50.3/32
set interfaces lo0 unit 0 family iso address 49.0001.a000.0000.0003.00
set interfaces ge-0/0/0 description "Link to P4 ge-0/0/0"
set interfaces ge-0/0/0 unit 0 family inet address 10.0.0.13/30
set interfaces ge-0/0/0 unit 0 family iso
set interfaces ge-0/0/1 description "Link to P1 ge-0/0/1"
set interfaces ge-0/0/1 unit 0 family inet address 10.0.0.6/30
set interfaces ge-0/0/1 unit 0 family iso
set interfaces ge-0/0/2 description "Link to P2 ge-0/0/2"
set interfaces ge-0/0/2 unit 0 family inet address 10.0.0.22/30
set interfaces ge-0/0/2 unit 0 family iso
set interfaces ge-0/0/3 description "Link to PE1 ge-0/0/1"
set interfaces ge-0/0/3 unit 0 family inet address 10.0.1.6/30
set interfaces ge-0/0/3 unit 0 family iso
```

### P4

```junos
set system host-name P4
set routing-options router-id 10.0.50.4
set interfaces lo0 unit 0 description "Router ID"
set interfaces lo0 unit 0 family inet address 10.0.50.4/32
set interfaces lo0 unit 0 family iso address 49.0001.a000.0000.0004.00
set interfaces ge-0/0/0 description "Link to P3 ge-0/0/0"
set interfaces ge-0/0/0 unit 0 family inet address 10.0.0.14/30
set interfaces ge-0/0/0 unit 0 family iso
set interfaces ge-0/0/1 description "Link to P2 ge-0/0/1"
set interfaces ge-0/0/1 unit 0 family inet address 10.0.0.10/30
set interfaces ge-0/0/1 unit 0 family iso
set interfaces ge-0/0/2 description "Link to P1 ge-0/0/2"
set interfaces ge-0/0/2 unit 0 family inet address 10.0.0.18/30
set interfaces ge-0/0/2 unit 0 family iso
set interfaces ge-0/0/3 description "Link to P6 ge-0/0/0"
set interfaces ge-0/0/3 unit 0 family inet address 10.0.0.33/30
set interfaces ge-0/0/3 unit 0 family iso
set interfaces ge-0/0/4 description "Link to P5 ge-0/0/1"
set interfaces ge-0/0/4 unit 0 family inet address 10.0.0.37/30
set interfaces ge-0/0/4 unit 0 family iso
```

### P5

```junos
set system host-name P5
set routing-options router-id 10.0.50.5
set interfaces lo0 unit 0 description "Router ID"
set interfaces lo0 unit 0 family inet address 10.0.50.5/32
set interfaces lo0 unit 0 family iso address 49.0001.a000.0000.0005.00
set interfaces ge-0/0/0 description "Link to P2 ge-0/0/3"
set interfaces ge-0/0/0 unit 0 family inet address 10.0.0.26/30
set interfaces ge-0/0/0 unit 0 family iso
set interfaces ge-0/0/1 description "Link to P4 ge-0/0/4"
set interfaces ge-0/0/1 unit 0 family inet address 10.0.0.38/30
set interfaces ge-0/0/1 unit 0 family iso
set interfaces ge-0/0/2 description "Link to P6 ge-0/0/2"
set interfaces ge-0/0/2 unit 0 family inet address 10.0.0.41/30
set interfaces ge-0/0/2 unit 0 family iso
set interfaces ge-0/0/3 description "Link to PE2 ge-0/0/0"
set interfaces ge-0/0/3 unit 0 family inet address 10.0.1.10/30
set interfaces ge-0/0/3 unit 0 family iso
```

### P6

```junos
set system host-name P6
set routing-options router-id 10.0.50.6
set interfaces lo0 unit 0 description "Router ID"
set interfaces lo0 unit 0 family inet address 10.0.50.6/32
set interfaces lo0 unit 0 family iso address 49.0001.a000.0000.0006.00
set interfaces ge-0/0/0 description "Link to P4 ge-0/0/3"
set interfaces ge-0/0/0 unit 0 family inet address 10.0.0.34/30
set interfaces ge-0/0/0 unit 0 family iso
set interfaces ge-0/0/1 description "Link to P2 ge-0/0/4"
set interfaces ge-0/0/1 unit 0 family inet address 10.0.0.30/30
set interfaces ge-0/0/1 unit 0 family iso
set interfaces ge-0/0/2 description "Link to P5 ge-0/0/2"
set interfaces ge-0/0/2 unit 0 family inet address 10.0.0.42/30
set interfaces ge-0/0/2 unit 0 family iso
set interfaces ge-0/0/3 description "Link to PE2 ge-0/0/1"
set interfaces ge-0/0/3 unit 0 family inet address 10.0.1.14/30
set interfaces ge-0/0/3 unit 0 family iso
```

### PE1

```junos
set system host-name PE1
set routing-options router-id 10.0.52.1
set interfaces lo0 unit 0 description "Router ID"
set interfaces lo0 unit 0 family inet address 10.0.52.1/32
set interfaces lo0 unit 0 family iso address 49.0001.b000.0000.0001.00
set interfaces ge-0/0/0 description "Link to P1 ge-0/0/3"
set interfaces ge-0/0/0 unit 0 family inet address 10.0.1.1/30
set interfaces ge-0/0/0 unit 0 family iso
set interfaces ge-0/0/1 description "Link to P3 ge-0/0/3"
set interfaces ge-0/0/1 unit 0 family inet address 10.0.1.5/30
set interfaces ge-0/0/1 unit 0 family iso
```

### PE2

```junos
set system host-name PE2
set routing-options router-id 10.0.52.2
set interfaces lo0 unit 0 description "Router ID"
set interfaces lo0 unit 0 family inet address 10.0.52.2/32
set interfaces lo0 unit 0 family iso address 49.0001.b000.0000.0002.00
set interfaces ge-0/0/0 description "Link to P5 ge-0/0/3"
set interfaces ge-0/0/0 unit 0 family inet address 10.0.1.9/30
set interfaces ge-0/0/0 unit 0 family iso
set interfaces ge-0/0/1 description "Link to P6 ge-0/0/3"
set interfaces ge-0/0/1 unit 0 family inet address 10.0.1.13/30
set interfaces ge-0/0/1 unit 0 family iso
```

### Base Verification

```junos
show interfaces terse | match "ge-|lo0"
show interfaces descriptions
show route protocol direct
show configuration interfaces | display set
```

Ping every directly connected neighbor before continuing. For example:

```junos
ping 10.0.0.2 rapid count 5
ping 10.0.1.2 rapid count 5
```

If a link fails, compare its address/mask and EVE-NG endpoints, then inspect:

```junos
show interfaces ge-0/0/0 extensive
show interfaces diagnostics optics ge-0/0/0
show log messages | match ge-0/0/0
```

vMX interfaces are enabled by default unless `disable` is configured. Remove an accidental disable with `delete interfaces ge-0/0/x disable`.

## 2. Configure IS-IS Level 2

The NET is already configured under `lo0.0 family iso`. On each router, disable Level 1 globally, make the loopback passive, and enable point-to-point IS-IS on every provider-facing unit.

### Common pattern

```junos
set protocols isis level 1 disable
set protocols isis interface lo0.0 passive
set protocols isis interface ge-0/0/x.0 point-to-point
```

Apply the following interface lists:

| Router | IS-IS interfaces |
|---|---|
| P1 | `lo0.0`, `ge-0/0/0.0`–`ge-0/0/3.0` |
| P2 | `lo0.0`, `ge-0/0/0.0`–`ge-0/0/4.0` |
| P3 | `lo0.0`, `ge-0/0/0.0`–`ge-0/0/3.0` |
| P4 | `lo0.0`, `ge-0/0/0.0`–`ge-0/0/4.0` |
| P5 | `lo0.0`, `ge-0/0/0.0`–`ge-0/0/3.0` |
| P6 | `lo0.0`, `ge-0/0/0.0`–`ge-0/0/3.0` |
| PE1 | `lo0.0`, `ge-0/0/0.0`, `ge-0/0/1.0` |
| PE2 | `lo0.0`, `ge-0/0/0.0`, `ge-0/0/1.0` |

Example for PE1:

```junos
set protocols isis level 1 disable
set protocols isis interface lo0.0 passive
set protocols isis interface ge-0/0/0.0 point-to-point
set protocols isis interface ge-0/0/1.0 point-to-point
```

Example for P2:

```junos
set protocols isis level 1 disable
set protocols isis interface lo0.0 passive
set protocols isis interface ge-0/0/0.0 point-to-point
set protocols isis interface ge-0/0/1.0 point-to-point
set protocols isis interface ge-0/0/2.0 point-to-point
set protocols isis interface ge-0/0/3.0 point-to-point
set protocols isis interface ge-0/0/4.0 point-to-point
```

Commit and verify:

```junos
show isis adjacency
show isis adjacency detail
show isis database
show isis interface
show route protocol isis
show route 10.0.52.1/32 exact
show route 10.0.52.2/32 exact
```

Expected adjacency counts are P1=4, P2=5, P3=4, P4=5, P5=4, P6=4, PE1=2, and PE2=2.

Troubleshoot with:

```junos
show configuration interfaces ge-0/0/x | display set
show configuration protocols isis | display set
show isis adjacency extensive
show log messages | match RPD_ISIS
```

Both ends require `family iso`, the same Level 2 capability, and matching point-to-point behavior.

## 3. Configure MPLS and LDP

Enable `family mpls`, MPLS, and LDP on each provider-facing interface. Do not enable them on `lo0.0`; LDP uses the router ID as its transport address.

### Common pattern

```junos
set interfaces ge-0/0/x unit 0 family mpls
set protocols mpls interface ge-0/0/x.0
set protocols ldp transport-address router-id
set protocols ldp interface ge-0/0/x.0
```

Use the same physical interface lists as the active IS-IS links. Configure `transport-address router-id` once per router.

Example for PE1:

```junos
set interfaces ge-0/0/0 unit 0 family mpls
set interfaces ge-0/0/1 unit 0 family mpls
set protocols mpls interface ge-0/0/0.0
set protocols mpls interface ge-0/0/1.0
set protocols ldp transport-address router-id
set protocols ldp interface ge-0/0/0.0
set protocols ldp interface ge-0/0/1.0
```

Example for P2:

```junos
set interfaces ge-0/0/0 unit 0 family mpls
set interfaces ge-0/0/1 unit 0 family mpls
set interfaces ge-0/0/2 unit 0 family mpls
set interfaces ge-0/0/3 unit 0 family mpls
set interfaces ge-0/0/4 unit 0 family mpls
set protocols mpls interface ge-0/0/0.0
set protocols mpls interface ge-0/0/1.0
set protocols mpls interface ge-0/0/2.0
set protocols mpls interface ge-0/0/3.0
set protocols mpls interface ge-0/0/4.0
set protocols ldp transport-address router-id
set protocols ldp interface ge-0/0/0.0
set protocols ldp interface ge-0/0/1.0
set protocols ldp interface ge-0/0/2.0
set protocols ldp interface ge-0/0/3.0
set protocols ldp interface ge-0/0/4.0
```

Commit and verify:

```junos
show ldp neighbor
show ldp session
show ldp database
show route table inet.3
show route table mpls.0
show mpls interface
show route forwarding-table family mpls
```

The direct LDP-neighbor counts should match the IS-IS adjacency counts. Remote loopbacks should appear in `inet.3` with LDP next hops.

### LSP tests

PE1:

```junos
ping 10.0.52.2 source 10.0.52.1 rapid count 5
ping mpls ldp 10.0.52.2/32
traceroute mpls ldp 10.0.52.2/32
```

PE2:

```junos
ping 10.0.52.1 source 10.0.52.2 rapid count 5
ping mpls ldp 10.0.52.1/32
traceroute mpls ldp 10.0.52.1/32
```

If LDP is down while IS-IS is up, confirm `family mpls`, `protocols mpls interface`, and `protocols ldp interface` are all present on both ends. Also verify that every router ID is unique and reachable in `inet.0`.

## 4. Test Resiliency

1. Start a repeated sourced ping between PE loopbacks.
2. Choose one core interface and record the current route and LDP next hop.
3. In configuration mode, enter `set interfaces ge-0/0/x disable` and commit.
4. Observe IS-IS convergence, `inet.3`, `mpls.0`, and ping loss.
5. Restore the link with `delete interfaces ge-0/0/x disable` and commit.

Never disable both links from the same PE during a single-link test.

## Expected Results

- All physical interfaces are up and directly connected pings succeed.
- Every provider link forms a Level 2 IS-IS adjacency.
- All router loopbacks are present in `inet.0` through IS-IS.
- Every provider interface runs MPLS and LDP.
- Remote loopbacks have labeled paths in `inet.3` and `mpls.0`.
- PE1 and PE2 pass IP and LDP LSP pings in both directions.
- Traffic reconverges after any single provider-link failure.

## Completion Checklist

- [ ] P1–P6, PE1, and PE2 have the correct host names and addresses.
- [ ] Every `lo0.0` has a unique IPv4 router ID and ISO NET.
- [ ] All direct-neighbor pings succeed.
- [ ] IS-IS runs Level 2-only on all provider links.
- [ ] Every loopback is learned throughout the core.
- [ ] MPLS and LDP are enabled on every provider-facing link.
- [ ] PE-to-PE LDP LSP tests succeed in both directions.
- [ ] A single-link failure reconverges successfully.
- [ ] All configurations are committed and saved in EVE-NG.

# Task 002 — PE-to-PE iBGP and CEtest VPN

## Purpose

Establish loopback-sourced iBGP between PE1 and PE2 in AS `65000`, exchange labeled VPN routes with the Junos `inet-vpn` address family, and build a Layer 3 VPN routing instance named `CEtest`.

`lo0.2` on each PE represents a locally attached customer network:

- PE1: `192.168.0.1/24`
- PE2: `192.168.1.1/24`

## Prerequisites

- [Task 001](./001-base-objectives.md) completed
- The base EVE-NG export is pending: `lab_files/002-ISP-MPLS-Juniper-Lab.unl`
- PE1 `lo0.0` (`10.0.52.1/32`) and PE2 `lo0.0` (`10.0.52.2/32`) reachable through IS-IS
- Working LDP paths between both PE loopbacks
- Juniper vMX running Junos `14.1R4.8`

## Design

```text
192.168.0.0/24                                      192.168.1.0/24
 PE1 lo0.2                                               PE2 lo0.2
      |                                                       |
 CEtest.inet.0                                           CEtest.inet.0
      |                                                       |
 10.0.52.1 ======== iBGP inet-vpn over MPLS ======== 10.0.52.2
                             AS 65000
```

| Parameter | PE1 | PE2 |
|---|---|---|
| `lo0.0` / BGP source | `10.0.52.1/32` | `10.0.52.2/32` |
| Peer | `10.0.52.2` | `10.0.52.1` |
| AS | `65000` | `65000` |
| Routing instance | `CEtest` | `CEtest` |
| Route distinguisher | `65000:1` | `65000:2` |
| Route target | `target:65000:100` | `target:65000:100` |
| Customer interface | `lo0.2` | `lo0.2` |
| Customer address | `192.168.0.1/24` | `192.168.1.1/24` |

The distinct route distinguishers make VPN routes globally unique. The common route target controls membership in the same VPN.

## Objectives

1. Verify the PE-to-PE IP and MPLS underlay.
2. Establish loopback-sourced iBGP with `family inet-vpn unicast`.
3. Create the `CEtest` VRF routing instance on both PEs.
4. Attach `lo0.2` to the routing instance.
5. Verify automatic export of the active direct customer route.
6. Verify VPN labels, imported routes, and end-to-end traffic.

## 1. Verify the Underlay

PE1:

```junos
ping 10.0.52.2 source 10.0.52.1 rapid count 5
ping mpls ldp 10.0.52.2/32
show route 10.0.52.2/32 exact
show route table inet.3 10.0.52.2/32 exact
```

PE2:

```junos
ping 10.0.52.1 source 10.0.52.2 rapid count 5
ping mpls ldp 10.0.52.1/32
show route 10.0.52.1/32 exact
show route table inet.3 10.0.52.1/32 exact
```

Do not continue unless the sourced IP and LDP LSP pings work both ways.

## 2. Configure iBGP and `inet-vpn`

Junos sources this internal group from `lo0.0`. The `inet-vpn` family carries the RD, IPv4 prefix, VPN label, and route-target extended community. No separate “send community” command is required.

### PE1

```junos
set routing-options autonomous-system 65000
set protocols bgp group PE-FULL-MESH type internal
set protocols bgp group PE-FULL-MESH local-address 10.0.52.1
set protocols bgp group PE-FULL-MESH family inet-vpn unicast
set protocols bgp group PE-FULL-MESH neighbor 10.0.52.2 description "iBGP inet-vpn to PE2 lo0.0"
```

### PE2

```junos
set routing-options autonomous-system 65000
set protocols bgp group PE-FULL-MESH type internal
set protocols bgp group PE-FULL-MESH local-address 10.0.52.2
set protocols bgp group PE-FULL-MESH family inet-vpn unicast
set protocols bgp group PE-FULL-MESH neighbor 10.0.52.1 description "iBGP inet-vpn to PE1 lo0.0"
```

Commit and verify:

```junos
show bgp summary
show bgp neighbor
show bgp neighbor 10.0.52.2
show route table bgp.l3vpn.0
```

On PE2, substitute neighbor `10.0.52.1`. The peer should be `Establ`, AS `65000`, and negotiate `inet-vpn`.

## 3. Create the CEtest Routing Instance

`vrf-table-label` installs a per-VRF label and allows the logical loopback interface to be used cleanly for the simulated VPN data plane.

### PE1

```junos
set interfaces lo0 unit 2 description "CEtest network at PE1"
set interfaces lo0 unit 2 family inet address 192.168.0.1/24
set routing-instances CEtest instance-type vrf
set routing-instances CEtest interface lo0.2
set routing-instances CEtest route-distinguisher 65000:1
set routing-instances CEtest vrf-target target:65000:100
set routing-instances CEtest vrf-table-label
```

### PE2

```junos
set interfaces lo0 unit 2 description "CEtest network at PE2"
set interfaces lo0 unit 2 family inet address 192.168.1.1/24
set routing-instances CEtest instance-type vrf
set routing-instances CEtest interface lo0.2
set routing-instances CEtest route-distinguisher 65000:2
set routing-instances CEtest vrf-target target:65000:100
set routing-instances CEtest vrf-table-label
```

Commit and verify locally:

```junos
show route instance CEtest
show interfaces terse routing-instance CEtest
show route table CEtest.inet.0
show route table bgp.l3vpn.0
```

### Junos Route Origination Behavior

There is no per-VRF BGP `network` command in this design. Assigning `lo0.2` to the VRF installs the connected `/24` in `CEtest.inet.0`. The `vrf-target` shorthand creates the default import/export policy, attaches `target:65000:100`, and exports eligible active routes to `bgp.l3vpn.0`.

## Verification

### Control Plane

```junos
show bgp summary
show route table bgp.l3vpn.0 extensive
show route table CEtest.inet.0
show route table CEtest.inet.0 protocol bgp extensive
show route advertising-protocol bgp 10.0.52.2 table bgp.l3vpn.0
show route receive-protocol bgp 10.0.52.2 table bgp.l3vpn.0
```

Use neighbor `10.0.52.1` on PE2. Confirm that the advertised VPN route carries a VPN label and `target:65000:100`.

Expected routes:

| Router | Direct | Remote BGP |
|---|---|---|
| PE1 | `192.168.0.0/24` | `192.168.1.0/24` |
| PE2 | `192.168.1.0/24` | `192.168.0.0/24` |

### Data Plane

PE1:

```junos
ping routing-instance CEtest 192.168.1.1 source 192.168.0.1 rapid count 5
traceroute routing-instance CEtest 192.168.1.1 source 192.168.0.1
```

PE2:

```junos
ping routing-instance CEtest 192.168.0.1 source 192.168.1.1 rapid count 5
traceroute routing-instance CEtest 192.168.0.1 source 192.168.1.1
```

Inspect forwarding and labels:

```junos
show route forwarding-table table CEtest
show route table mpls.0
show route table inet.3
```

## Expected Results

- The PE-to-PE iBGP session is established over the loopbacks.
- `inet-vpn` is negotiated.
- Each local `/24` is direct in `CEtest.inet.0` and present as a VPN route in `bgp.l3vpn.0`.
- Each PE imports the other `/24` using `target:65000:100`.
- VPN routes show an inner VPN label and use an LDP transport path.
- Both routing-instance pings succeed.
- P routers contain no CEtest route and run no BGP.

## Troubleshooting

- If BGP is down, verify loopback reachability, AS `65000`, local addresses, and `family inet-vpn` on both ends.
- If the local `/24` is absent, confirm `lo0.2` belongs to `CEtest` and is up.
- If a VPN route is advertised but not imported, compare route targets exactly.
- If the route imports but traffic fails, inspect `inet.3`, LDP sessions, `mpls.0`, and `vrf-table-label`.
- Use `show log messages | match RPD_BGP` for session events.

## Completion Checklist

- [ ] PE loopbacks pass IP and LDP LSP pings.
- [ ] iBGP is established and negotiates `inet-vpn`.
- [ ] `CEtest` exists on both PEs with unique RDs.
- [ ] Both instances use `target:65000:100` and `vrf-table-label`.
- [ ] Both `lo0.2` customer networks appear in `CEtest.inet.0`.
- [ ] Each PE imports the remote VPN route.
- [ ] Bidirectional routing-instance pings succeed.
- [ ] P routers remain free of customer routes and BGP.

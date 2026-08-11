# Task 002 — PE-to-PE iBGP and CEtest VRF

## Purpose

Establish loopback-sourced internal BGP between PE1 and PE2 in the common provider AS, enable the VPNv4 address family, and build a test MPLS Layer 3 VPN named `CEtest`. Loopback2 on each PE represents a locally attached customer network:

- PE1 CEtest network: `192.168.0.0/24`
- PE2 CEtest network: `192.168.1.0/24`

This task validates the MPLS VPN control plane and data plane before physical CE routers are added.

## Prerequisites

- [Task 001](./001-base-objectives.md) completed
- PE1 Loopback0 `10.0.52.1/32` reachable from PE2
- PE2 Loopback0 `10.0.52.2/32` reachable from PE1
- IS-IS routes installed for both PE loopbacks
- MPLS LDP label-switched paths available between the PE loopbacks
- MPLS LSP ping successful in both directions
- BGP and MPLS VPN support in the selected router image

## Topology Change

No physical link is added in this task. Loopback2 on each PE emulates a CE-facing customer subnet inside the `CEtest` VRF.

```text
192.168.0.0/24                                             192.168.1.0/24
 PE1 Loopback2                                                PE2 Loopback2
      |                                                            |
  VRF CEtest                                                   VRF CEtest
      |                                                            |
 PE1 Lo0 10.0.52.1 ===== iBGP VPNv4 over MPLS core ===== 10.0.52.2 Lo0 PE2
                              AS 65000
```

## Devices and Roles

| Device | Role in This Task |
|---|---|
| PE1 | iBGP peer in provider AS `65000`; originates the PE1 CEtest prefix |
| PE2 | iBGP peer in provider AS `65000`; originates the PE2 CEtest prefix |
| P1–P6 | MPLS transit routers; no BGP or VRF configuration is required |

## Addressing and VPN Parameters

| Parameter | PE1 | PE2 |
|---|---|---|
| Loopback0 | `10.0.52.1/32` | `10.0.52.2/32` |
| BGP AS | `65000` | `65000` |
| BGP router ID | `10.0.52.1` | `10.0.52.2` |
| BGP neighbor | `10.0.52.2` | `10.0.52.1` |
| VRF name | `CEtest` | `CEtest` |
| Route distinguisher | `65000:1` | `65000:2` |
| Import route target | `65000:100` | `65000:100` |
| Export route target | `65000:100` | `65000:100` |
| Loopback2 | `192.168.0.1/24` | `192.168.1.1/24` |
| Advertised prefix | `192.168.0.0/24` | `192.168.1.0/24` |

The unique route distinguishers make the VPNv4 routes unique. The matching route target causes each PE to import the other PE's route into `CEtest`.

## Provider AS Design

Both PEs use provider AS `65000`. This homogeneous design provides a consistent VPNv4 control plane and supports later expansion:

- Additional PE routers can join the same provider AS.
- Route reflectors can replace the full mesh as the PE population grows.
- Common AS-wide routing policy and filtering can be applied consistently.
- BGP confederations can be introduced later if the provider control plane requires internal subdivision.
- P routers remain BGP-free and continue to provide only IS-IS and MPLS transport.

With only two PEs, a direct iBGP session is sufficient. Standard iBGP does not advertise routes learned from one iBGP peer to another iBGP peer. Therefore, adding a third PE will require either a full iBGP mesh or route reflectors. A later task should introduce redundant route reflectors before the topology grows significantly.

## Technologies and Protocols

- Loopback-sourced iBGP
- MP-BGP VPNv4 address family
- MPLS Layer 3 VPN
- VRF route isolation
- Route distinguishers
- Extended-community route targets
- Per-VRF IPv4 BGP address family
- MPLS VPN labels

## Objectives

1. Verify PE Loopback0 reachability through the MPLS underlay.
2. Configure PE1 and PE2 in the common provider AS `65000`.
3. Establish loopback-sourced iBGP between the PEs.
4. Verify the IPv4 iBGP session before enabling VPNv4.
5. Activate the VPNv4 address family and extended communities.
6. Create the `CEtest` VRF on both PEs.
7. Place Loopback2 into `CEtest` on each PE.
8. Originate both CEtest `/24` networks into BGP.
9. Verify VPNv4 route and VPN-label exchange.
10. Verify end-to-end VRF connectivity through the MPLS core.

## Configuration Tasks

### 1. Verify the PE-to-PE Underlay

PE1:

```cisco
ping 10.0.52.2 source 10.0.52.1
ping mpls ipv4 10.0.52.2/32
show ip route 10.0.52.2
show mpls forwarding-table 10.0.52.2 32
```

PE2:

```cisco
ping 10.0.52.1 source 10.0.52.2
ping mpls ipv4 10.0.52.1/32
show ip route 10.0.52.1
show mpls forwarding-table 10.0.52.1 32
```

Do not continue until the sourced IP pings and MPLS LSP pings succeed in both directions.

### 2. Configure Loopback-Sourced iBGP

Both PEs belong to provider AS `65000`. Because the peers use Loopback0 rather than a physical interface, configure `update-source Loopback0` on both PEs. The IGP provides reachability between the loopbacks, so multihop configuration is not required for iBGP.

#### PE1

```cisco
router bgp 65000
 bgp router-id 10.0.52.1
 bgp log-neighbor-changes
 neighbor 10.0.52.2 remote-as 65000
 neighbor 10.0.52.2 description iBGP to PE2 Loopback0
 neighbor 10.0.52.2 update-source Loopback0
 !
 address-family ipv4 unicast
  neighbor 10.0.52.2 activate
 exit-address-family
```

#### PE2

```cisco
router bgp 65000
 bgp router-id 10.0.52.2
 bgp log-neighbor-changes
 neighbor 10.0.52.1 remote-as 65000
 neighbor 10.0.52.1 description iBGP to PE1 Loopback0
 neighbor 10.0.52.1 update-source Loopback0
 !
 address-family ipv4 unicast
  neighbor 10.0.52.1 activate
 exit-address-family
```

No IPv4 unicast prefixes need to be advertised between the PEs. Activating the address family at this stage provides a simple way to verify the base iBGP transport session.

### 3. Verify PE-to-PE iBGP

Run on PE1:

```cisco
show ip bgp summary
show ip bgp neighbors 10.0.52.2
show tcp brief | include 10.0.52.2
```

Run on PE2:

```cisco
show ip bgp summary
show ip bgp neighbors 10.0.52.1
show tcp brief | include 10.0.52.1
```

Expected results:

- The neighbor state is `Established`.
- Both PEs report local and remote AS `65000`.
- The session is identified as an internal BGP relationship.
- The local and foreign TCP endpoints use `10.0.52.1` and `10.0.52.2` on TCP port 179.
- A prefix count of `0` is expected before test networks are advertised.

### 4. Enable the VPNv4 Address Family

VPNv4 carries the route distinguisher, IPv4 prefix, MPLS VPN label, and extended-community route target.

#### PE1

```cisco
router bgp 65000
 address-family vpnv4
  neighbor 10.0.52.2 activate
  neighbor 10.0.52.2 send-community extended
 exit-address-family
```

#### PE2

```cisco
router bgp 65000
 address-family vpnv4
  neighbor 10.0.52.1 activate
  neighbor 10.0.52.1 send-community extended
 exit-address-family
```

Verify the VPNv4 session before creating the VRF:

```cisco
show bgp vpnv4 unicast all summary
show bgp vpnv4 unicast all neighbors
```

On older IOS images, use:

```cisco
show ip bgp vpnv4 all summary
show ip bgp vpnv4 all neighbors
```

### 5. Create the CEtest VRF

#### PE1

```cisco
ip vrf CEtest
 rd 65000:1
 route-target import 65000:100
 route-target export 65000:100
```

#### PE2

```cisco
ip vrf CEtest
 rd 65000:2
 route-target import 65000:100
 route-target export 65000:100
```

Verify VRF creation on both PEs:

```cisco
show ip vrf
show ip vrf detail CEtest
```

### 6. Configure the CEtest Loopback2 Interfaces

Apply the VRF before assigning the IP address. The `ip vrf forwarding` command removes an existing address from an interface.

#### PE1

```cisco
interface Loopback2
 description CEtest network at PE1
 ip vrf forwarding CEtest
 ip address 192.168.0.1 255.255.255.0
```

#### PE2

```cisco
interface Loopback2
 description CEtest network at PE2
 ip vrf forwarding CEtest
 ip address 192.168.1.1 255.255.255.0
```

Verify the connected VRF routes:

```cisco
show ip interface brief | include Loopback2
show ip vrf interfaces
show ip route vrf CEtest connected
```

### 7. Originate the CEtest Networks into BGP

#### PE1

```cisco
router bgp 65000
 address-family ipv4 vrf CEtest
  network 192.168.0.0 mask 255.255.255.0
 exit-address-family
```

#### PE2

```cisco
router bgp 65000
 address-family ipv4 vrf CEtest
  network 192.168.1.0 mask 255.255.255.0
 exit-address-family
```

Each `network` statement has an exact connected `/24` route in the corresponding VRF routing table.

## Verification Commands

### iBGP and VPNv4

```cisco
show ip bgp summary
show bgp vpnv4 unicast all summary
show bgp vpnv4 unicast all
show bgp vpnv4 unicast all labels
show bgp vpnv4 unicast all neighbors
```

Older IOS alternatives:

```cisco
show ip bgp vpnv4 all summary
show ip bgp vpnv4 all
show ip bgp vpnv4 all labels
```

### VRF Routes

Run on both PEs:

```cisco
show ip vrf
show ip vrf interfaces
show ip route vrf CEtest
show bgp ipv4 unicast vrf CEtest
```

PE1 should contain:

```text
192.168.0.0/24 - locally connected
192.168.1.0/24 - learned through MP-BGP VPNv4
```

PE2 should contain:

```text
192.168.1.0/24 - locally connected
192.168.0.0/24 - learned through MP-BGP VPNv4
```

### MPLS VPN Data Plane

From PE1:

```cisco
ping vrf CEtest 192.168.1.1 source 192.168.0.1
traceroute vrf CEtest 192.168.1.1 source 192.168.0.1
show ip cef vrf CEtest 192.168.1.0 255.255.255.0 detail
```

From PE2:

```cisco
ping vrf CEtest 192.168.0.1 source 192.168.1.1
traceroute vrf CEtest 192.168.0.1 source 192.168.1.1
show ip cef vrf CEtest 192.168.0.0 255.255.255.0 detail
```

## Expected Results

- PE1 and PE2 establish loopback-sourced iBGP in provider AS `65000` over the MPLS underlay.
- The IPv4 unicast and VPNv4 address families reach `Established`.
- Both peers send and receive extended communities.
- PE1 originates VPNv4 route `65000:1:192.168.0.0/24`.
- PE2 originates VPNv4 route `65000:2:192.168.1.0/24`.
- Both routes carry route target `65000:100`.
- Each PE imports the remote `/24` into its `CEtest` routing table.
- The remote route resolves through the PE Loopback0 transport label and a VPN label.
- VRF pings between `192.168.0.1` and `192.168.1.1` succeed in both directions.
- P routers remain unaware of the CEtest IPv4 routes and continue to switch labeled traffic.

## Troubleshooting Notes

| Symptom | Likely Cause | Corrective Action |
|---|---|---|
| iBGP neighbor is `Idle` | Missing route to remote PE loopback | Verify IS-IS route and sourced IP ping |
| iBGP neighbor is `Active` | Incorrect common AS, update source, or TCP reachability | Confirm both PEs use AS `65000`, compare neighbor definitions, and inspect TCP/179 |
| IPv4 iBGP is up but VPNv4 is down | VPNv4 neighbor is not activated on both PEs | Activate the neighbor under `address-family vpnv4` |
| VPNv4 routes lack route targets | Extended communities are not being sent | Configure `send-community extended` on both PEs |
| Local `/24` is absent from BGP | No exact route matches the `network` statement | Verify Loopback2 address, mask, VRF assignment, and connected route |
| Remote VPNv4 route is present but absent from CEtest | Import RT does not match the remote export RT | Verify both PEs use route target `65000:100` |
| Remote CEtest route has an unreachable next hop | PE loopback missing from IS-IS/LDP | Verify underlay route, LDP binding, and MPLS forwarding entry |
| VRF ping fails while routes exist | Missing VPN label or incorrect CEF resolution | Inspect VPNv4 labels and VRF CEF details |
| CEtest route appears on a P router | Customer route was leaked into IS-IS | Remove redistribution; P routers need only PE loopback transport routes |

## Completion Checklist

- [ ] PE Loopback0 sourced IP pings succeed in both directions
- [ ] PE Loopback0 MPLS LSP pings succeed in both directions
- [ ] PE1 provider AS `65000` configured
- [ ] PE2 provider AS `65000` configured
- [ ] Loopback-sourced iBGP session established
- [ ] VPNv4 address family established
- [ ] Extended communities enabled on both peers
- [ ] CEtest VRF created on both PEs
- [ ] Unique RDs and shared RT configured
- [ ] PE1 Loopback2 configured as `192.168.0.1/24`
- [ ] PE2 Loopback2 configured as `192.168.1.1/24`
- [ ] Both CEtest networks present in VPNv4 BGP
- [ ] Both remote routes imported into CEtest
- [ ] VRF ping succeeds in both directions
- [ ] P routers contain no CEtest routes
- [ ] Final configurations saved

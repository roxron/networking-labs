# Task 00 — Topology and addressing

[Main lab page](../README.md)

## Objective

Translate the EVE-NG node/interface inventory into an editable topology and a consistent ISP100 addressing plan. The final plan uses /30 links and Loopback100; earlier trial numbering and Loopback0 labels have been superseded.

## Build the diagram views

1. Match EVE-NG interfaces by `network_id` to discover both ends of each link.
2. Populate the empty draw.io page with all 16 routers, 30 links, and 60 physical interface labels. Rename it `Core diagram`.
3. Copy it to `ISP100 Core`. Add `.100` to P-to-P interface names and mark dot1Q VLAN 100. Leave PE-to-P interfaces physical and untagged.
4. Copy that view to `ISP100 IPv4`. Remove encapsulation text from this view, retain subinterface names, and add the subnet and endpoint labels below.
5. Add the ISP100 address block, VRF, RD, and route-target note. Add Loopback100 /32 labels beside every router.
6. Copy the IPv4 view to `ISP100 OSPF IGP`. Annotate area 0, P2P links, router IDs, routing contexts, passive policy, reference bandwidth, and LSA behavior.

The EVE-NG file supplies physical topology; the IPv4 view supplies the logical addressing overlay. The `.100` subinterfaces are configured inside the routers, not as additional EVE-NG links.

## Address-allocation rules

- ISP100 aggregate: `10.100.0.0/16`.
- Complete P1’s P-to-P links first, then P2’s, P3’s, and P4’s. Use `10.100.N.0/24` for the allocating core router PN. Sort its remaining neighbors by router number and allocate `.0/30`, `.4/30`, `.8/30`, and so on. Assign each link once.
- On P-to-P links, the lower-numbered router gets the lower usable address.
- PE13–PE16 use their respective `10.100.13.0/24` through `10.100.16.0/24` pools. Allocate `.0/30` to the lower-numbered connected P router and `.4/30` to the other. The PE gets the lower usable address on both links.
- P-router loopbacks use `10.100.20.N/32`; PE-router loopbacks use `10.100.21.N/32`, where N is the router number.
- An endpoint suffix such as `Gi0/0.100  .5` denotes the final octet of that interface’s address in the displayed link subnet.

## Complete link map

| Endpoint A and address | Endpoint B and address | Link subnet |
| --- | --- | --- |
| P1 `Gi0/0.100` — `10.100.1.1` | P2 `Gi0/0.100` — `10.100.1.2` | `10.100.1.0/30` |
| P1 `Gi0/1.100` — `10.100.1.5` | P3 `Gi0/1.100` — `10.100.1.6` | `10.100.1.4/30` |
| P1 `Gi0/2.100` — `10.100.1.9` | P4 `Gi0/2.100` — `10.100.1.10` | `10.100.1.8/30` |
| P1 `Gi0/3.100` — `10.100.1.13` | P5 `Gi0/0.100` — `10.100.1.14` | `10.100.1.12/30` |
| P1 `Gi0/5.100` — `10.100.1.17` | P6 `Gi0/1.100` — `10.100.1.18` | `10.100.1.16/30` |
| P1 `Gi0/4.100` — `10.100.1.21` | P9 `Gi0/0.100` — `10.100.1.22` | `10.100.1.20/30` |
| P1 `Gi0/6.100` — `10.100.1.25` | P10 `Gi0/1.100` — `10.100.1.26` | `10.100.1.24/30` |
| P2 `Gi0/2.100` — `10.100.2.1` | P3 `Gi0/2.100` — `10.100.2.2` | `10.100.2.0/30` |
| P2 `Gi0/1.100` — `10.100.2.5` | P4 `Gi0/1.100` — `10.100.2.6` | `10.100.2.4/30` |
| P2 `Gi0/3.100` — `10.100.2.9` | P7 `Gi0/0.100` — `10.100.2.10` | `10.100.2.8/30` |
| P2 `Gi0/5.100` — `10.100.2.13` | P8 `Gi0/1.100` — `10.100.2.14` | `10.100.2.12/30` |
| P2 `Gi0/6.100` — `10.100.2.17` | P9 `Gi0/1.100` — `10.100.2.18` | `10.100.2.16/30` |
| P2 `Gi0/4.100` — `10.100.2.21` | P10 `Gi0/0.100` — `10.100.2.22` | `10.100.2.20/30` |
| P3 `Gi0/0.100` — `10.100.3.1` | P4 `Gi0/0.100` — `10.100.3.2` | `10.100.3.0/30` |
| P3 `Gi0/5.100` — `10.100.3.5` | P5 `Gi0/1.100` — `10.100.3.6` | `10.100.3.4/30` |
| P3 `Gi0/3.100` — `10.100.3.9` | P6 `Gi0/0.100` — `10.100.3.10` | `10.100.3.8/30` |
| P3 `Gi0/4.100` — `10.100.3.13` | P11 `Gi0/0.100` — `10.100.3.14` | `10.100.3.12/30` |
| P3 `Gi0/6.100` — `10.100.3.17` | P12 `Gi0/1.100` — `10.100.3.18` | `10.100.3.16/30` |
| P4 `Gi0/5.100` — `10.100.4.1` | P7 `Gi0/1.100` — `10.100.4.2` | `10.100.4.0/30` |
| P4 `Gi0/3.100` — `10.100.4.5` | P8 `Gi0/0.100` — `10.100.4.6` | `10.100.4.4/30` |
| P4 `Gi0/6.100` — `10.100.4.9` | P11 `Gi0/1.100` — `10.100.4.10` | `10.100.4.8/30` |
| P4 `Gi0/4.100` — `10.100.4.13` | P12 `Gi0/0.100` — `10.100.4.14` | `10.100.4.12/30` |
| P5 `Gi0/2` — `10.100.13.2` | ISP100-PE13 `Gi1` — `10.100.13.1` | `10.100.13.0/30` |
| P6 `Gi0/2` — `10.100.13.6` | ISP100-PE13 `Gi2` — `10.100.13.5` | `10.100.13.4/30` |
| P7 `Gi0/2` — `10.100.14.2` | ISP100-PE14 `Gi1` — `10.100.14.1` | `10.100.14.0/30` |
| P8 `Gi0/2` — `10.100.14.6` | ISP100-PE14 `Gi2` — `10.100.14.5` | `10.100.14.4/30` |
| P9 `Gi0/2` — `10.100.15.2` | ISP100-PE15 `Gi1` — `10.100.15.1` | `10.100.15.0/30` |
| P10 `Gi0/2` — `10.100.15.6` | ISP100-PE15 `Gi2` — `10.100.15.5` | `10.100.15.4/30` |
| P11 `Gi0/2` — `10.100.16.2` | ISP100-PE16 `Gi1` — `10.100.16.1` | `10.100.16.0/30` |
| P12 `Gi0/2` — `10.100.16.6` | ISP100-PE16 `Gi2` — `10.100.16.5` | `10.100.16.4/30` |

## Loopbacks, router IDs, and expected neighbors

All loopbacks are `Loopback100`. OSPF router IDs use the loopback address without its /32 mask. LDP also selects Loopback100 in the appropriate routing context.

| Router | Routing context | Lo100 prefix | OSPF router ID | Expected OSPF/LDP peers |
| --- | --- | --- | --- | --- |
| P1 | VRF ISP100 | `10.100.20.1/32` | `10.100.20.1` | 7 |
| P2 | VRF ISP100 | `10.100.20.2/32` | `10.100.20.2` | 7 |
| P3 | VRF ISP100 | `10.100.20.3/32` | `10.100.20.3` | 7 |
| P4 | VRF ISP100 | `10.100.20.4/32` | `10.100.20.4` | 7 |
| P5 | VRF ISP100 | `10.100.20.5/32` | `10.100.20.5` | 3 |
| P6 | VRF ISP100 | `10.100.20.6/32` | `10.100.20.6` | 3 |
| P7 | VRF ISP100 | `10.100.20.7/32` | `10.100.20.7` | 3 |
| P8 | VRF ISP100 | `10.100.20.8/32` | `10.100.20.8` | 3 |
| P9 | VRF ISP100 | `10.100.20.9/32` | `10.100.20.9` | 3 |
| P10 | VRF ISP100 | `10.100.20.10/32` | `10.100.20.10` | 3 |
| P11 | VRF ISP100 | `10.100.20.11/32` | `10.100.20.11` | 3 |
| P12 | VRF ISP100 | `10.100.20.12/32` | `10.100.20.12` | 3 |
| ISP100-PE13 | GRT | `10.100.21.13/32` | `10.100.21.13` | 2 |
| ISP100-PE14 | GRT | `10.100.21.14/32` | `10.100.21.14` | 2 |
| ISP100-PE15 | GRT | `10.100.21.15/32` | `10.100.21.15` | 2 |
| ISP100-PE16 | GRT | `10.100.21.16/32` | `10.100.21.16` | 2 |

## Addressing checkpoint

Confirm 30 unique /30 subnets, 60 unique link addresses, and 16 unique loopback addresses. Every interface address must be a usable host in its displayed subnet. Confirm diagram labels match the base configuration before applying later stages.

Next: [Base interfaces and VRF](../ISP100/001-Base-interfaces/README.md).

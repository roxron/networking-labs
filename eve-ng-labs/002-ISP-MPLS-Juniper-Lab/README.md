# ISP MPLS Lab — Juniper vMX

## Overview

This is an expandable EVE-NG service-provider lab built with Juniper vMX routers. It begins with a redundant IS-IS and LDP underlay and grows through numbered MPLS Layer 3 VPN exercises.

The procedures target:

- Juniper vMX
- Junos `14.1R4.8`
- Junos `set` configuration syntax
- `ge-0/0/x` data interfaces
- `lo0.0` for router IDs and `lo0.2` for simulated customer networks

The EVE-NG `.unl` files have not been created yet. Add them to `lab_files/` as each topology milestone is built. The intended filenames are:

| Planned Lab File | Nodes | Links | Intended Tasks |
|---|---:|---:|---|
| `002-ISP-MPLS-Juniper-Lab.unl` | 8: P1–P6, PE1, PE2 | 15 | Tasks 001 and 002 |
| `002-ISP-MPLS-Juniper-Lab_added-PE3.unl` | 9: P1–P6, PE1–PE3 | 17 | Task 003 |
| `002-ISP-MPLS-Juniper-Lab_added-RR-nodes.unl` | 11: P1–P6, PE1–PE3, RR101, RR102 | 19 | Task 004 and later |

The visual topology is maintained in [ISP-MPLS-Lab-Diagram.drawio](./ISP-MPLS-Lab-Diagram.drawio).

## Lab Contents

- Six provider core routers: P1 through P6
- Three provider-edge routers after Task 003: PE1, PE2, and PE3
- Two redundant VPN route reflectors after Task 004: RR101 and RR102
- Seventeen point-to-point provider links after Task 003
- Dedicated `/32` loopbacks for router IDs and LDP transport addresses
- PE1 dual-homed to P1/P3, PE2 to P5/P6, and PE3 to P2/P5

## Learning Path

| Task | Topic | Status | Document |
|---:|---|---|---|
| 001 | Build and verify the routed MPLS provider underlay | Ready | [001-base-objectives.md](./001-base-objectives.md) |
| 002 | Establish PE-to-PE iBGP and build the CEtest VRF | Ready | [002-PE-to-PE-iBGP-CEtest-VRF.md](./002-PE-to-PE-iBGP-CEtest-VRF.md) |
| 003 | Add PE3 to the MPLS core, iBGP mesh, and CEtest VPN | Ready | [003-add-PE3-MPLS-iBGP-CEtest-VRF.md](./003-add-PE3-MPLS-iBGP-CEtest-VRF.md) |
| 004 | Add redundant VPN route reflectors and retire the PE full mesh | Ready | [004-add-redundant-VPNv4-route-reflectors.md](./004-add-redundant-VPNv4-route-reflectors.md) |

Future exercises can add physical CE routers, PE-to-CE eBGP, more VPN sites, routing policy, communities, prefix limits, IPv6/VPNv6, and fast reroute.

## Lab-Wide Objectives

1. Build a resilient IPv4 provider underlay.
2. Establish and troubleshoot IS-IS Level 2 adjacencies.
3. Configure MPLS and verify LDP label-switched paths.
4. Exchange customer routes with MP-BGP `inet-vpn`.
5. Build isolated Layer 3 VPN routing instances.
6. Validate the control plane and data plane during failures.
7. Expand the topology without disrupting the provider core.

## Addressing Overview

| Address Block | Purpose |
|---|---|
| `10.0.0.0/24` | P-to-P transit links |
| `10.0.1.0/24` | PE/RR-to-P transit links |
| `10.0.50.0/23` | P-router loopbacks |
| `10.0.52.0/23` | PE and RR loopbacks |
| `192.168.0.0/16` | Simulated customer networks |

## Junos Interface Convention

The copied Cisco topology used `Gi0/x`. This project maps those ports consistently:

| Original label | vMX label |
|---|---|
| `Gi0/0` | `ge-0/0/0` |
| `Gi0/1` | `ge-0/0/1` |
| `Gi0/2` | `ge-0/0/2` |
| `Gi0/n` | `ge-0/0/n` |
| `Loopback0` | `lo0.0` |
| `Loopback2` | `lo0.2` |

`fxp0` is the vMX management interface and is not part of the provider topology.

## Configuration Workflow

All examples are entered from configuration mode:

```junos
configure
set ...
show | compare
commit check
commit
```

Operational commands beginning with `show`, `ping`, or `traceroute` are run from operational mode. From configuration mode, prefix them with `run`.

## Repository Workflow

1. Update the Draw.io source when devices or links are added.
2. Add or update the corresponding numbered task document.
3. Build the topology milestone in EVE-NG and export its `.unl` file.
4. Place the export in `lab_files/` using the planned filename.
5. Complete and verify the exercise on Junos `14.1R4.8`.
6. Record any image-specific deviation in the relevant task file.

# ISP MPLS Lab

## Overview

This is an expandable EVE-NG service-provider lab. It begins with a redundant MPLS underlay and grows through small, numbered exercises. Each exercise introduces a networking technology, adds a service, connects a customer, or extends an existing customer network.

Import the EVE-NG lab file that corresponds to the task you want to practice:

- [001-ISP-MPLS-Lab.unl](./lab_files/001-ISP-MPLS-Lab.unl) contains the original eight-router topology used by Tasks 001 and 002.
- [001-ISP-MPLS-Lab_added-PE3.unl](./lab_files/001-ISP-MPLS-Lab_added-PE3.unl) contains the nine-router topology with PE3 and its two provider links for Task 003.
- [001-ISP-MPLS-Lab_Added-RR-nodes.unl](./lab_files/001-ISP-MPLS-Lab_Added-RR-nodes.unl) contains PE3 plus RR101 and RR102 for Task 004.

The lab currently contains:

- Versioned EVE-NG topology files in [lab_files](./lab_files/)
- Six provider core routers: P1 through P6
- Three provider-edge routers after Task 003: PE1, PE2, and PE3
- Seventeen point-to-point provider links after Task 003
- Dedicated `/32` loopbacks for router IDs and MPLS label distribution
- PE1 dual-homed to P1/P3, PE2 dual-homed to P5/P6, and PE3 dual-homed to P2/P5 after Task 003

The visual topology design is maintained in [ISP-MPLS-Lab-Diagram.drawio](./ISP-MPLS-Lab-Diagram.drawio).

## EVE-NG Lab Files

| Lab File | Nodes | Links | Intended Tasks |
|---|---:|---:|---|
| [001-ISP-MPLS-Lab.unl](./lab_files/001-ISP-MPLS-Lab.unl) | 8: P1–P6, PE1, PE2 | 15 | Tasks 001 and 002 |
| [001-ISP-MPLS-Lab_added-PE3.unl](./lab_files/001-ISP-MPLS-Lab_added-PE3.unl) | 9: P1–P6, PE1–PE3 | 17 | Task 003 |
| [001-ISP-MPLS-Lab_Added-RR-nodes.unl](./lab_files/001-ISP-MPLS-Lab_Added-RR-nodes.unl) | 11: P1–P6, PE1–PE3, RR101, RR102 | 19 | Task 004 and later tasks |

The files represent topology milestones. Retaining earlier exports makes it possible to begin with the original core and practice each expansion independently.

## Learning Path

The numbered Markdown files are intended to be completed in order. Each task should leave the topology in a working state for the next exercise.

| Task | Topic | Status | Document |
|---:|---|---|---|
| 001 | Build and verify the routed MPLS provider underlay | Ready | [001-base-objectives.md](./001-base-objectives.md) |
| 002 | Establish PE-to-PE iBGP and build the CEtest VRF | Ready | [002-PE-to-PE-iBGP-CEtest-VRF.md](./002-PE-to-PE-iBGP-CEtest-VRF.md) |
| 003 | Add PE3 to the MPLS core, iBGP mesh, and CEtest VPN | Ready | [003-add-PE3-MPLS-iBGP-CEtest-VRF.md](./003-add-PE3-MPLS-iBGP-CEtest-VRF.md) |
| 004 | Add redundant VPNv4 route reflectors and retire the PE full mesh | Ready | [004-add-redundant-VPNv4-route-reflectors.md](./004-add-redundant-VPNv4-route-reflectors.md) |

Future exercises can add topics such as:

- Physical Customer A CE routers and PE-to-CE eBGP
- A second Customer A site
- MPLS Layer 3 VPN connectivity between physical customer sites
- Additional customer prefixes
- Customer route filtering and prefix limits
- BGP policy using communities and local preference
- OSPF as an alternative provider IGP
- BGP route reflectors
- MPLS traffic engineering, Segment Routing, or fast reroute
- Internet access and shared-services VRFs
- IPv6 and VPNv6

## Lab-Wide Objectives

By growing this lab, you should be able to:

1. Build a resilient service-provider IPv4 underlay.
2. Establish and troubleshoot IGP adjacencies.
3. Configure MPLS and verify LDP label-switched paths.
4. Connect customer-edge routers with eBGP.
5. Exchange customer prefixes safely using routing policy.
6. Build isolated MPLS VPN services with MP-BGP and VRFs.
7. Validate control-plane and data-plane behavior during failures.
8. Add services without disrupting the working provider core.
9. Record each topology change as a repeatable lab exercise.

## Addressing Overview

| Address Block | Purpose |
|---|---|
| `10.0.0.0/24` | P-to-P transit links |
| `10.0.1.0/24` | PE-to-P transit links |
| `10.0.50.0/23` | P-router loopbacks |
| `10.0.52.0/23` | PE-router loopbacks |
| To be assigned | PE-to-CE links and customer prefixes |

Detailed interface addressing is recorded in the task that introduces it.

## Task File Convention

Use the following naming convention:

```text
NNN-short-descriptive-task-name.md
```

Examples:

```text
001-base-objectives.md
002-PE-to-PE-iBGP-CEtest-VRF.md
003-add-PE3-MPLS-iBGP-CEtest-VRF.md
004-add-redundant-VPNv4-route-reflectors.md
005-CustomerA-PE-CE-eBGP.md
006-CustomerA-second-site.md
```

Each new task document should contain:

- Purpose and prerequisites
- Topology changes
- Devices and roles
- Interface and IP addressing
- Technologies and protocols
- Objectives
- Configuration tasks
- Verification commands
- Expected results
- Troubleshooting notes
- Completion checklist

When a task is added, also add it to the **Learning Path** table in this README.

## Repository Workflow

1. Update the Draw.io source when devices or links are added.
2. Add a numbered task document describing the change.
3. Add the task to the Learning Path table.
4. Complete and verify the exercise in EVE-NG.
5. Record deviations from the documented design in the relevant task file.
6. Preserve earlier task files as the history of how the lab evolved.

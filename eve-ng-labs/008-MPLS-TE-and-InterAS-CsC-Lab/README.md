# Atlas Spine: Shared-Core MPLS, TE & Carrier’s Carrier Lab

Build an ISP transport network in stages: establish isolated IPv4 connectivity, bring up OSPF, add MPLS/LDP, and then extend the design with traffic engineering and inter-AS Carrier’s Carrier (CsC) tasks. ISP100 is the first provider on a P-router platform intended to support more ISPs later.

## Current scope

The supplied EVE-NG topology contains 16 routers and 30 point-to-point links: P1–P12 and ISP100-PE13–ISP100-PE16. P1–P4 form the central mesh; the remaining P routers connect that mesh to the four PE routers. There are 22 P-to-P links and eight P-to-PE links.

P routers place ISP100 addressing in VRF `ISP100`. PE routers use their global routing table (GRT). P-to-P links use VLAN 100 subinterfaces on shared physical interfaces. PE-facing links use untagged physical interfaces. All ISP100 loopbacks are `Loopback100`.

## Lab files

- [EVE-NG topology](008-MPLS-TE-and-InterAS-CsS-Lab.unl): device inventory, physical interfaces, and link membership. The existing filename uses `CsS`; it is retained as supplied.
- [Editable draw.io diagrams](008-MPLS-TE-and-InterAS-CsC-Lab.drawio): physical, ISP100, IPv4, and OSPF views.
- [Topology and addressing workbook](docs/001-Topology-and-Addressing.md): full endpoint map, subnet allocation, and diagram conventions.
- [ISP100 task index](ISP100/README.md): configuration stages and deployment order.

## Task sequence

| Stage | Guide | Repository state |
| --- | --- | --- |
| 00 | [Topology and addressing](docs/001-Topology-and-Addressing.md) | Diagram and addressing prepared |
| 01 | [Base interfaces and VRF](ISP100/001-Base-interfaces/README.md) | 16 router configs prepared |
| 02 | [OSPF IGP](ISP100/002-IGP-OSPF/README.md) | 16 router configs prepared |
| 03 | [Core MPLS/LDP](ISP100/003-MPLS/001-Core-MPLS/README.md) | 16 router configs prepared |
| 04 | [MPLS TE infrastructure](ISP100/003-MPLS/002-Enable-MPLS-TE/README.md) | Planned; no configs yet |
| 05 | [MPLS TE tunnels](ISP100/003-MPLS/003-MPLS-TE-Tunnels/README.md) | Planned; no configs yet |
| Later | Additional ISPs and inter-AS CsC | Design and tasks to follow |

## Start the lab

1. Import the `.unl` into EVE-NG and provide the images referenced by its node definitions. P1–P12 use VIOS `vios-adventerprisek9-m.SPA.156-1.T`; PE13–PE16 use CSR1000v `csr1000v-universalk9.03.16.08.S.155-3.S8`. Router images are not included.
2. Open the draw.io file and review `Core diagram`, then `ISP100 IPv4`.
3. Apply the base-interface files to their matching routers. Complete that stage across all routers before proceeding to OSPF, then MPLS.
4. Use each stage’s verification steps and record actual results before starting the next stage.

The `.conf` files are incremental configuration-mode snippets, not complete startup configurations. Enter `configure terminal` before pasting a file; each file ends with `end`. Save with `copy running-config startup-config` after verifying the stage. Later files assume earlier stages remain installed.

## Validation status and continuing work

The configuration files were checked against the topology and diagrams for interface coverage, addressing, router IDs, and routing context. No live-router acceptance results or packet captures are stored in this project. Expected outputs in the guides are acceptance criteria, not observed results.

MPLS in the non-default P-router VRF requires support in the actual VIOS image; accepting an LDP router-ID command alone does not prove forwarding support. Validate this stage before building on it. MPLS TE support with the existing VRF transport design must also be established before its configuration is authored.

As the lab grows, add numbered stages and update this task table. Keep diagram changes, configuration files, and verification evidence aligned; preserve the completed baseline when adding another ISP.

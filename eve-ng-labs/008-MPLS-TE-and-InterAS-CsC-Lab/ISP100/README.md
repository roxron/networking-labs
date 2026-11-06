# ISP100 task index

[Main lab page](../README.md) · [Addressing workbook](../docs/001-Topology-and-Addressing.md)

ISP100 uses `10.100.0.0/16`, VLAN 100 on P-to-P links, OSPFv2 process 100, and Loopback100 identities. P1–P12 use VRF ISP100; PE13–PE16 use GRT.

## Apply stages in order

1. [001 — Base interfaces](001-Base-interfaces/README.md): hostnames, VRF, dot1Q subinterfaces, /30 addresses, and /32 loopbacks.
2. [002 — OSPF](002-IGP-OSPF/README.md): area 0 connectivity and loopback reachability.
3. [003.001 — Core MPLS](003-MPLS/001-Core-MPLS/README.md): LDP and MPLS forwarding on numbered links.
4. [003.002 — Enable MPLS TE](003-MPLS/002-Enable-MPLS-TE/README.md): future infrastructure enablement.
5. [003.003 — MPLS TE tunnels](003-MPLS/003-MPLS-TE-Tunnels/README.md): future tunnel creation and path tests.

Each completed configuration stage contains a file for every router, named with its exact hostname. Apply the matching file only; do not concatenate different routers’ configurations. Existing base and OSPF settings are retained by later stages.

## Evidence to collect

For each stage, record the router name, commands run, observed state, and any image-specific differences. Checkpoint the running configurations after successful verification. No stage is considered runtime-verified merely because its files exist.

Further tasks will extend this foundation with additional providers, TE policy, and inter-AS CsC. Their addressing, signaling choices, and acceptance tests will be documented when the designs are agreed.

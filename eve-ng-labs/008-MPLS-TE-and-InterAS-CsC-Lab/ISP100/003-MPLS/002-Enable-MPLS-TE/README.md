# Task 03.002 — MPLS TE infrastructure enablement

[Main lab page](../../../README.md) · [MPLS task group](../README.md)

**Status: planned.** This directory intentionally contains no router configuration files yet.

## Intended objective

Enable the network infrastructure required by MPLS traffic engineering before creating tunnels. This stage will follow successful OSPF and MPLS/LDP acceptance tests.

## Design work to complete

- Confirm image support and the supported routing context for RSVP-TE. The current P-router transport interfaces and Loopback100 reside in VRF ISP100; do not assume a conventional GRT MPLS-TE recipe works unchanged.
- Agree which routers and links participate, select TE router IDs, and define the OSPF TE-extension scope.
- Choose RSVP reservation bandwidth, bandwidth limits, metrics, and administrative attributes based on the lab objectives.
- Configure supported global/interface TE features and RSVP signaling, then verify TE advertisements, the TE topology database, and reservable bandwidth.

No RSVP bandwidth values, TE signaling commands, or tunnel paths have been approved or configured in this stage. Record the chosen design and add per-router files here when that work begins. Tunnel creation remains a separate task.

Next: [MPLS TE tunnels](../003-MPLS-TE-Tunnels/README.md).

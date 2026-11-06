# Task group 03 — MPLS and traffic engineering

[Main lab page](../../README.md) · [ISP100 task index](../README.md)

| Order | Stage | Current state |
| --- | --- | --- |
| 1 | [Core MPLS/LDP](001-Core-MPLS/README.md) | 16 configuration snippets prepared; runtime acceptance pending |
| 2 | [MPLS TE infrastructure enablement](002-Enable-MPLS-TE/README.md) | Planned |
| 3 | [MPLS TE tunnels](003-MPLS-TE-Tunnels/README.md) | Planned |

LDP establishes the current hop-by-hop MPLS baseline. TE infrastructure enablement and TE tunnel creation are separate stages. Do not assume LDP configuration alone enables RSVP-TE.

Before adding TE, verify that the actual lab images support the intended forwarding and signaling model, particularly transport interfaces placed in VRF ISP100. Document any agreed design change in the base, IGP, MPLS, and diagram views together.

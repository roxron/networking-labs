# Network Engineer Notes

A topic-first knowledge base distilled from `NetEngineer_Journal`. The original journal is unchanged.

## Start here

| Area | Purpose |
|---|---|
| [Foundations](01-foundations/README.md) | Addressing, subnetting, packet flow, IPv4/IPv6 |
| [Switching](02-switching/README.md) | VLANs, trunks, STP, EtherChannel, campus redundancy |
| [Routing](03-routing/README.md) | Static routing, OSPF, EIGRP, BGP, IS-IS, redistribution |
| [MPLS and service provider](04-mpls-service-provider/README.md) | Labels, LDP, VPNs, TE, inter-AS designs |
| [Security and VPN](05-security-vpn/README.md) | Management-plane hardening, AAA, ACLs, NAT, IPsec, ASA |
| [Network services](06-network-services/README.md) | DHCP, DNS, NTP, SNMP, syslog, NetFlow, IP SLA |
| [Operations and troubleshooting](07-operations-troubleshooting/README.md) | Repeatable workflows, baselines, OOB, validation |
| [Automation and Linux](08-automation-linux/README.md) | Ansible/Cumulus material and Linux operations |
| [Platforms and labs](09-platforms-labs/README.md) | IOS/IOS XE, NX-OS, ASA, EVE-NG, topology configs |
| [Reference](10-reference/README.md) | Command conventions, templates, source policy |
| [Source archive](90-source-archive/README.md) | Provenance-preserving import of original notes and images |

## How to use the examples

Commands are learning templates, not paste-ready production configurations. Replace every `<PLACEHOLDER>`, confirm interface names and feature support, stage changes through console/OOB access, and capture a rollback configuration. Verification and rollback are part of each procedure—not optional cleanup.

The curated notes distinguish:

- **Journal-derived material:** concepts and commands found in the original notes.
- **Added context:** missing prerequisites, sequence, verification, rollback, and security guidance.
- **External authority:** RFCs and current vendor documentation linked near the relevant procedure.

No real passwords or device credentials are included. Historical imported snippets can contain obsolete syntax or weak examples and are labeled accordingly.

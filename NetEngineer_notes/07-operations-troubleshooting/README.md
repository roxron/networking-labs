# Operations and Troubleshooting

## Evidence-first workflow

1. State the symptom, scope, start time, and business impact.
2. Capture known-good baselines and recent changes.
3. Map the path in both directions; identify the first failing layer/hop.
4. Form one falsifiable hypothesis.
5. Collect targeted evidence before changing state.
6. Make one reversible change with a rollback trigger.
7. Verify service, control plane, data plane, redundancy, and monitoring.
8. Record cause, fix, validation, and prevention.

## Layered checks

| Layer | Questions | Typical evidence |
|---|---|---|
| Physical | up/up, errors, optics, speed/duplex? | interface counters, transceiver data |
| Layer 2 | correct VLAN/trunk/STP/channel/MAC? | VLAN, trunk, STP, LACP, MAC tables |
| Layer 3 | address/ARP-ND/RIB/FIB/return path? | ARP/ND, route, CEF, ping/traceroute |
| Control | neighbors stable, policies correct? | protocol neighbors/database/routes |
| Services | DNS/NTP/AAA/DHCP reachable from correct VRF? | sourced tests, server logs, counters |
| Policy | ACL/NAT/QoS/security drops? | hit counters, translations, drop reasons |

## Change checklist

Before: OOB access, backup, diff, dependencies, maintenance window, rollback command, success criteria.  
During: timestamp observations, one change at a time, watch reachability and redundancy.  
After: functional test, negative test, failover test where safe, monitoring confirmation, save/archive config.

Avoid starting with `debug` on a busy production device. Prefer bounded show commands, filters, counters, SPAN/packet capture, or conditional debugging; always document how debug is disabled.

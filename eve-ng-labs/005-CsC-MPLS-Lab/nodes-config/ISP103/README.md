# ISP103 configuration

These configurations mirror the ISP102 design using the corrected **ISP103 IPv4** page in `005-CsC-MPLS-Lab-diagram.drawio`. They are additions to the shared lab infrastructure, not complete replacements for running configurations.

## Files and application order

1. [001 — Base interfaces](001-ISP103-base-interface-configurations.md): infrastructure VRFs, loopbacks, all 24 routed links and parent interface activation.
2. [007 — Switch VLAN transport](007-ISP103-switch-VLAN-transport.md): local switch trunks for VLANs 433–437.
3. [002 — IS-IS](002-ISP103-IGP-ISIS.md): independent Site1 and Site2 IGPs.
4. [003 — Site1 MPLS](003-ISP103-Site1-MPLS.md) and [004 — Site2 MPLS](004-ISP103-Site2-MPLS.md): LDP configuration and expected neighbors.
5. [005 — CsC eBGP](005-ISP103-to-ISP100-CsC-eBGP.md): labeled AS103/AS100 exchange and restricted remote-loopback redistribution.
6. [006 — MP-BGP](006-ISP103-MP-BGP-VPNv4.md): RR37 and its PE34/PE36 clients. The optional CUSTOMER-C example is at the bottom, after MP-BGP setup and verification.

## Topology mapping

| Role | ISP103 assignment |
| --- | --- |
| Site1 transport PE | PE33, Loopback0 10.103.3.33/32 |
| Site1 customer-facing PE | PE34, Loopback0 10.103.3.34/32 |
| Site1 route reflector | RR37, Loopback0 10.103.4.37/32 |
| Site2 transport PE | PE35, Loopback0 10.103.3.35/32 |
| Site2 customer-facing PE | PE36, Loopback0 10.103.3.36/32 |
| Shared P-router contexts | ISP1031 / ISP1032; Loopback1031 / Loopback1032 |
| P-to-P physical interfaces | Gi0/3; P5/P6 also use Gi0/7 and Gi0/11 |
| P-to-P tags | .10 for Site1; .20 for Site2 |
| Access VLANs | PE33: 433; PE34: 434; PE35: 435; PE36: 436; RR37: 437 |
| Carrier attachments | CsC-PE15/16/19/20 Gi0/13 in VRF ISP103 |
| Carrier loopbacks | Loopback1030, 10.103.50.15/16/19/20 respectively, each /32 |
| IS-IS area | 49.0103; PE system IDs end 0033–0036, RR37 ends 0037 |

P1–P6 appear in both logical sites but represent shared physical routers. Their ISP103 subinterfaces are separate from ISP102. VLANs 435 and 437 share P1/P3 Gi0/6, through SW29/SW212 Gi1/0. The switch file uses the updated PE/RR physical ports and preserves existing allowed VLANs with `add`.

## Policy inherited from ISP102

- ISP103 uses BGP AS 103; the carrier retains AS 100.
- Infrastructure RD/RTs are 103:1 and 103:2. Carrier VRF ISP103 uses router-specific RDs `10.100.2.<PE>:103` and common RT 103:103. Carrier VRF definitions include IPv4 and IPv6 address families and explicit RTs in both, matching the confirmed ISP102 style.
- IS-IS is level-2-only with wide metrics. P-router processes are VRF-specific; ISP103 PEs and RR37 use GRT for transport.
- PE33 exports the Site1 PE33, PE34 and RR37 /32s. PE35 exports the Site2 PE35 and PE36 /32s. Only the approved opposite-site /32s are redistributed from BGP into IS-IS.
- RR37 reflects IPv4 and VPNv4 routes for PE34 and PE36. PE33/PE35 provide labeled carrier transport; P1–P6 do not run ISP103 BGP.
- CUSTOMER-C is an optional example assigned by analogy with ISP102, not a topology-supplied service: RT 1003:1003, router-specific RDs, Loopback1003 192.168.0.34/32 on PE34 and 192.168.0.36/32 on PE36. It remains after the MP-BGP configuration in file 006. No VPNv6 service is configured.

## Validation and prerequisites

Static checks matched 24 /30 links, 48 endpoint interface/address/VRF assignments, 21 infrastructure loopbacks and 17 unique NETs to the diagram. Both site graphs are connected; IS-IS and LDP interface coverage matches the site links. BGP peer and exported/imported loopback references resolve to the base configuration. Parent physical interfaces are enabled, and no copied ISP102 identities remain in configuration commands.

The existing ISP100 MPLS/VPNv4 core must carry VRF ISP103 routes. The saved EVE-NG `.unl` contains no ISP103 nodes; add the devices and matching cabling before exercising these files. No topology files or running routers were changed by this configuration-generation task. IOS syntax, live adjacencies, label forwarding and customer pings have not been tested on devices; each file includes verification commands.

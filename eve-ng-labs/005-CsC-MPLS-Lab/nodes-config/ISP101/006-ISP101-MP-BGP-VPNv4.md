# ISP101 MP-BGP IPv4 and VPNv4 configuration

## Purpose and scope

This page configures the ISP101 MP-BGP IPv4-unicast and VPNv4 control planes in AS `101`. ISP101-RR1 is the route reflector, and the following four ISP101 PE routers are its IPv4 and VPNv4 clients:

- ISP101-PE123 — CsC-facing Site1 PE
- ISP101-PE124 — customer-facing Site1 PE
- ISP101-PE225 — CsC-facing Site2 PE
- ISP101-PE202 — customer-facing Site2 PE

The sessions use the Loopback0 addresses carried across the ISP101 IGP and MPLS/Carrier Supporting Carrier transport. P1–P6 do not participate in MP-BGP.

This page covers the global IPv4-unicast and VPNv4 MP-BGP sessions. Customer VRFs, per-VRF IPv4 address families, route distinguishers, and route targets on ISP101-PE124 and ISP101-PE202 will be configured separately.

The IPv4 address family establishes the ISP101 global-unicast control plane through RR1. Activating a neighbor does not originate routes by itself; global IPv4 prefixes must still be introduced with an explicit `network` statement or a controlled redistribution policy. The PE123/PE225 CsC-facing IPv4 advertisements remain documented in `005-ISP101-to-ISP100-CsC-eBGP.md`.

## Router and policy inventory

| Router | Role | BGP router ID and update source | Default RT filtering |
|---|---|---|---|
| ISP101-PE123 | Site1 CsC-facing PE | Loopback0 `10.101.3.123` | Disabled; retain all VPNv4 routes |
| ISP101-PE124 | Site1 customer-facing PE | Loopback0 `10.101.3.124` | Enabled; future customer VRFs select routes by RT |
| ISP101-PE225 | Site2 CsC-facing PE | Loopback0 `10.101.3.225` | Disabled; retain all VPNv4 routes |
| ISP101-PE202 | Site2 customer-facing PE | Loopback0 `10.101.3.202` | Enabled; future customer VRFs select routes by RT |
| ISP101-RR1 | VPNv4 route reflector | Loopback0 `10.101.4.1` | Disabled; retain and reflect all VPNv4 routes |

`no bgp default route-target filter` disables the normal inbound VPNv4 route-target filtering behavior. It is used on ISP101-RR1 because the RR has no customer VRFs, and on ISP101-PE123/PE225 because those CsC-facing PEs have no customer VRFs but should retain all VPNv4 routes for operational inspection by RD.

ISP101-PE124 and ISP101-PE202 intentionally retain the default filter. Their future customer VRFs and import route targets will determine which VPNv4 routes are retained and imported.

Disabling the default RT filter does not import VPNv4 routes into GRT and does not create VRFs. It only permits the VPNv4 BGP table to retain routes without a locally matching import RT.

## ISP101-PE123

Merge this VPNv4 configuration with the existing AS101 labeled eBGP configuration toward CsC-PE15 and CsC-PE16. Do not replace the existing IPv4 address-family neighbors.

```ios
router bgp 101
 bgp router-id 10.101.3.123
 bgp log-neighbor-changes
 no bgp default ipv4-unicast
 no bgp default route-target filter
 neighbor 10.101.4.1 remote-as 101
 neighbor 10.101.4.1 description IPv4 and VPNv4 iBGP to ISP101-RR1
 neighbor 10.101.4.1 update-source Loopback0
 !
 address-family ipv4
  neighbor 10.101.4.1 activate
 exit-address-family
 !
 address-family vpnv4
  neighbor 10.101.4.1 activate
  neighbor 10.101.4.1 send-community extended
 exit-address-family
```

## ISP101-PE124

ISP101-PE124 will terminate customer VRFs. Do not configure `no bgp default route-target filter` here; leave the default RT filter active.

```ios
router bgp 101
 bgp router-id 10.101.3.124
 bgp log-neighbor-changes
 no bgp default ipv4-unicast
 neighbor 10.101.4.1 remote-as 101
 neighbor 10.101.4.1 description IPv4 and VPNv4 iBGP to ISP101-RR1
 neighbor 10.101.4.1 update-source Loopback0
 !
 address-family ipv4
  neighbor 10.101.4.1 activate
 exit-address-family
 !
 address-family vpnv4
  neighbor 10.101.4.1 activate
  neighbor 10.101.4.1 send-community extended
 exit-address-family
```

## ISP101-PE225

Merge this VPNv4 configuration with the existing AS101 labeled eBGP configuration toward CsC-PE19 and CsC-PE20. Do not replace the existing IPv4 address-family neighbors.

```ios
router bgp 101
 bgp router-id 10.101.3.225
 bgp log-neighbor-changes
 no bgp default ipv4-unicast
 no bgp default route-target filter
 neighbor 10.101.4.1 remote-as 101
 neighbor 10.101.4.1 description IPv4 and VPNv4 iBGP to ISP101-RR1
 neighbor 10.101.4.1 update-source Loopback0
 !
 address-family ipv4
  neighbor 10.101.4.1 activate
 exit-address-family
 !
 address-family vpnv4
  neighbor 10.101.4.1 activate
  neighbor 10.101.4.1 send-community extended
 exit-address-family
```

## ISP101-PE202

ISP101-PE202 will terminate customer VRFs. Do not configure `no bgp default route-target filter` here; leave the default RT filter active.

```ios
router bgp 101
 bgp router-id 10.101.3.202
 bgp log-neighbor-changes
 no bgp default ipv4-unicast
 neighbor 10.101.4.1 remote-as 101
 neighbor 10.101.4.1 description IPv4 and VPNv4 iBGP to ISP101-RR1
 neighbor 10.101.4.1 update-source Loopback0
 !
 address-family ipv4
  neighbor 10.101.4.1 activate
 exit-address-family
 !
 address-family vpnv4
  neighbor 10.101.4.1 activate
  neighbor 10.101.4.1 send-community extended
 exit-address-family
```

## ISP101-RR1

ISP101-RR1 retains and reflects all VPNv4 routes even though it has no customer VRFs. All four PE neighbors are route-reflector clients under both the IPv4 and VPNv4 address families.

```ios
router bgp 101
 bgp router-id 10.101.4.1
 bgp log-neighbor-changes
 no bgp default ipv4-unicast
 no bgp default route-target filter
 neighbor 10.101.3.123 remote-as 101
 neighbor 10.101.3.123 description IPv4 and VPNv4 iBGP to ISP101-PE123
 neighbor 10.101.3.123 update-source Loopback0
 neighbor 10.101.3.124 remote-as 101
 neighbor 10.101.3.124 description IPv4 and VPNv4 iBGP to ISP101-PE124
 neighbor 10.101.3.124 update-source Loopback0
 neighbor 10.101.3.202 remote-as 101
 neighbor 10.101.3.202 description IPv4 and VPNv4 iBGP to ISP101-PE202
 neighbor 10.101.3.202 update-source Loopback0
 neighbor 10.101.3.225 remote-as 101
 neighbor 10.101.3.225 description IPv4 and VPNv4 iBGP to ISP101-PE225
 neighbor 10.101.3.225 update-source Loopback0
 !
 address-family ipv4
  neighbor 10.101.3.123 activate
  neighbor 10.101.3.123 route-reflector-client
  neighbor 10.101.3.124 activate
  neighbor 10.101.3.124 route-reflector-client
  neighbor 10.101.3.202 activate
  neighbor 10.101.3.202 route-reflector-client
  neighbor 10.101.3.225 activate
  neighbor 10.101.3.225 route-reflector-client
 exit-address-family
 !
 address-family vpnv4
  neighbor 10.101.3.123 activate
  neighbor 10.101.3.123 send-community extended
  neighbor 10.101.3.123 route-reflector-client
  neighbor 10.101.3.124 activate
  neighbor 10.101.3.124 send-community extended
  neighbor 10.101.3.124 route-reflector-client
  neighbor 10.101.3.202 activate
  neighbor 10.101.3.202 send-community extended
  neighbor 10.101.3.202 route-reflector-client
  neighbor 10.101.3.225 activate
  neighbor 10.101.3.225 send-community extended
  neighbor 10.101.3.225 route-reflector-client
 exit-address-family
```

## Route-target filtering options

### Selected design

Use `no bgp default route-target filter` on:

- ISP101-PE123
- ISP101-PE225
- ISP101-RR1

Retain default route-target filtering on:

- ISP101-PE124
- ISP101-PE202

This design gives the RR and CsC-facing PEs visibility of all VPNv4 routes by RD while allowing customer-facing PEs to retain routes according to their configured VRF import RTs.

### More restrictive alternative

If PE123 and PE225 do not require operational visibility of all VPNv4 routes, omit `no bgp default route-target filter` from those two routers. The RR must still have the command because it must retain and reflect routes for RTs that are not locally imported.

## Verification

### Neighbor state

Run on every PE and on ISP101-RR1:

```ios
show bgp ipv4 unicast summary
show bgp ipv4 unicast neighbors
show bgp vpnv4 unicast summary
show bgp vpnv4 unicast neighbors
```

Expected result:

- Each PE has IPv4 and VPNv4 sessions with `10.101.4.1` in Established state.
- ISP101-RR1 has four established peers under both address families.
- All four PE neighbors are route-reflector clients under both address families.
- Extended-community exchange is enabled for every VPNv4 neighbor.

### VPNv4 route retention

Run on ISP101-PE123, ISP101-PE225, and ISP101-RR1:

```ios
show bgp vpnv4 unicast all
show bgp vpnv4 unicast rd <customer-rd>
```

These three routers should retain VPNv4 routes even when no local VRF imports their route targets.

Run on ISP101-PE124 and ISP101-PE202:

```ios
show bgp vpnv4 unicast all
show vrf
show ip route vrf <customer-vrf>
```

Only routes selected by locally configured customer VRF import RTs are expected to be retained and imported on the customer-facing PEs.

### Underlay prerequisite

Before troubleshooting MP-BGP, confirm that every PE and RR loopback is reachable and label-switched end to end:

```ios
show ip route <remote-loopback>
show mpls forwarding-table <remote-loopback>
ping <remote-loopback> source Loopback0
```

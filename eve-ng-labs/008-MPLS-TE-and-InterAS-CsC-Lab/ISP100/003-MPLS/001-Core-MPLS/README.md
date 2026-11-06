# Task 03.001 — Core MPLS/LDP

[Main lab page](../../../README.md) · [MPLS task group](../README.md)

## Objective and prerequisites

Prepare hop-by-hop MPLS forwarding and LDP on all 30 ISP100 links. First verify OSPF and bidirectional reachability between Loopback100 addresses. Apply each router’s matching `.conf` in this directory after the base and OSPF stages.

## Configuration tasks

1. Enable CEF with `ip cef` and global MPLS forwarding with `mpls ip`.
2. Select LDP with `mpls label protocol ldp`.
3. Select Loopback100 as the LDP router ID in the correct context:

```cisco
! P1–P12
mpls ldp router-id vrf ISP100 Loopback100 force
!
! PE13–PE16
mpls ldp router-id Loopback100 force
```

4. Add `mpls ip` and `no shutdown` to every numbered link interface: `.100` P-to-P subinterfaces and physical PE-facing interfaces.
5. Leave MPLS disabled on Loopback100 and the unnumbered shared parents. The loopback supplies the LDP identity and transport reachability; it does not need interface MPLS enablement.

The `force` option makes the selected identity take effect and can reset existing LDP sessions if the identity changes. The files do not configure TE, RSVP, BGP, explicit-null policy, LDP/IGP synchronization, or a new MTU.

## Platform acceptance gate

The P-router design requires MPLS/LDP on interfaces in a non-default VRF. The IOS command reference documents the per-VRF LDP router-ID syntax, but this alone does not certify the supplied VIOS image’s control-plane or forwarding capabilities. Confirm command acceptance, VRF-specific neighbors, label bindings, and actual labeled forwarding in EVE-NG before declaring this stage operational. Do not silently move ISP100 interfaces to GRT if a feature is unsupported.

## Verify

On a P router:

```cisco
show mpls interfaces
show mpls ldp discovery vrf ISP100
show mpls ldp neighbor vrf ISP100
show mpls ldp bindings vrf ISP100
show mpls forwarding-table vrf ISP100
```

On a PE router:

```cisco
show mpls interfaces
show mpls ldp discovery
show mpls ldp neighbor
show mpls ldp bindings
show mpls forwarding-table
```

Use the router’s CLI help if a particular image exposes a different show-command qualifier. Confirm neighbors use their intended Lo100 identities and that remote loopback FECs have label bindings and forwarding entries. Expected peer counts match OSPF: seven for P1–P4, three for P5–P12, and two for each PE.

Test PE13-to-PE14 reachability with source Loopback100, then trace the path and inspect labels or capture MPLS frames on an intermediate link. A successful IP ping alone does not establish that forwarding used MPLS. Penultimate-hop popping can produce `Pop Label` for appropriate directly connected FECs; that is not by itself a fault.

Check the platform’s MPLS MTU behavior and test payload size before adding services or deeper label stacks. No end-to-end MPLS MTU has yet been established by this lab.

References: [Cisco IOS MPLS command reference](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/mpls/command/mp-cr-book/mp-m2.html), [Cisco LDP configuration guide](https://www.cisco.com/c/en/us/td/docs/routers/ios-xe/mpls/mpls/m_mp-ldp-overview.html).

Next: [MPLS TE infrastructure enablement](../002-Enable-MPLS-TE/README.md).

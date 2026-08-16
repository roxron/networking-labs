# MPLS and Service Provider

## Dependency chain

`IP underlay → IGP reachability → stable router IDs → LDP/RSVP/SR labels → MP-BGP/VPN services → CE routing → end-to-end validation`

Troubleshoot in that order. A working BGP VPN route does not prove that its transport label resolves, and a working LDP session does not prove the correct VPN route target was imported.

## Core checklist

1. Confirm loopbacks and core links are in the IGP.
2. Confirm CEF and MPLS forwarding are enabled where required.
3. Match LDP router ID/transport reachability and label bindings.
4. For L3VPN, verify VRF RD uniqueness and intentional RT import/export policy.
5. Verify VPNv4/VPNv6 next-hop reachability and both transport/VPN labels.
6. For L2VPN, also validate attachment-circuit state, pseudowire IDs/types, control word expectations, MTU, and MAC learning.
7. Validate CE-to-CE data traffic and failure convergence.

```ios
show mpls interfaces
show mpls ldp neighbor
show mpls ldp bindings
show mpls forwarding-table
show bgp vpnv4 unicast all summary
show bgp vpnv4 unicast vrf <VRF>
show ip route vrf <VRF>
show ip cef vrf <VRF> <PREFIX> detail
show mpls l2transport vc detail
```

The archived MPLS screenshots are organized as source image sets under [the archive](../90-source-archive/README.md). Treat legacy MPLS TE/RSVP and inter-AS examples as design-specific; confirm feature support on the chosen IOS/IOS XE/XR release.

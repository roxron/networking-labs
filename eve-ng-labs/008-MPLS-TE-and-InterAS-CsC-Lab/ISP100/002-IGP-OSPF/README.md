# Task 02 — OSPF IGP

[Main lab page](../../README.md) · [Addressing workbook](../../docs/001-Topology-and-Addressing.md)

## Objective and prerequisites

Advertise all ISP100 link and Loopback100 prefixes using OSPFv2. Complete the base-interface stage first, then apply each router’s matching `.conf` from this directory.

## Configuration tasks

1. On P routers, create `router ospf 100 vrf ISP100`; on PE routers, create `router ospf 100` in GRT.
2. Set the router ID explicitly to that router’s Loopback100 IPv4 address.
3. Use `capability vrf-lite` on P-router OSPF instances. These instances provide a VRF-contained IGP rather than an OSPF/MPLS VPN PE redistribution function.
4. Set `auto-cost reference-bandwidth 1000` consistently on every router. The value is Mbps; a 1-Gbps interface has calculated cost 1 when its interface bandwidth is 1 Gbps.
5. Configure `passive-interface default`, then remove passive mode from each numbered link interface. Keep Loopback100 passive while advertising its prefix.
6. Enable `ip ospf 100 area 0` on every numbered link and on Loopback100. Do not enable OSPF on unnumbered physical parents.
7. Set `ip ospf network point-to-point` on both ends of every P-to-P and PE-to-P link.

OSPFv2 supports the required VRF context. Defining the VRF IPv6 AF does not require OSPFv3 for this IPv4 stage. No IPv6 OSPF configuration, authentication, redistribution, or TE extensions have been added.

## Link-state behavior

All 30 links use point-to-point mode, so they elect no DR/BDR and originate no Type 2 Network LSAs for their /30 segments. Their adjacency and subnet information appear in Type 1 Router LSAs, flooded through area 0. Point-to-point mode does not filter other LSA types; a future broadcast segment could originate a Type 2 LSA that floods over these links.

Use the `ISP100 OSPF IGP` draw.io page alongside this stage.

## Verify

The process selector below identifies process 100 on both P and PE routers. Confirm the displayed VRF context on P routers.

```cisco
show ip ospf 100
show ip ospf 100 interface brief
show ip ospf 100 neighbor
show ip ospf 100 database router
show ip ospf 100 database network
```

On P1:

```cisco
show ip route vrf ISP100 ospf
ping vrf ISP100 10.100.21.14 source 10.100.20.1
```

On PE13:

```cisco
show ip route ospf
ping 10.100.21.14 source 10.100.21.13
```

Acceptance: all neighbors reach `FULL/-`; P1–P4 each have seven neighbors, P5–P12 each have three, and PE13–PE16 each have two. Confirm area 0, unique router IDs, reference bandwidth 1000 Mbps, point-to-point network type, and remote /32 routes. With only this baseline topology present, the Type 2 database section should contain no Network LSAs. Connected local prefixes remain connected routes rather than OSPF-learned routes.

If adjacencies fail, check the base-interface state, VLAN tags, passive settings, area, masks, network type, and duplicate router IDs before changing timers.

References: [Cisco OSPF multi-VRF support](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_ospf/configuration/15-mt/iro-15-mt-book/iro-sup-vrf.html), [IOS OSPF show commands](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_ospf/command/iro-cr-book/m_ospf-s1.html).

Next: [Core MPLS/LDP](../003-MPLS/001-Core-MPLS/README.md).

# Task 01 — Base interfaces and VRF

[Main lab page](../../README.md) · [Addressing workbook](../../docs/001-Topology-and-Addressing.md)

## Objective and prerequisites

Apply hostnames and the agreed ISP100 addressing plan on all 16 routers. Start from the supplied EVE-NG physical topology. Use this directory’s `<hostname>.conf` files in configuration mode.

## Configuration tasks

1. Set each router’s hostname to match the topology.
2. On P1–P12, define VRF ISP100 with RD `100:100`. Enable IPv4 and IPv6 address families, placing export and import route-target `100:100` inside each AF.
3. Keep ISP100-PE13–PE16 interfaces in GRT. No VRF definition or interface VRF binding is added on those routers.
4. On shared P-to-P physical interfaces, leave the parent unnumbered. Create `.100` subinterfaces with `encapsulation dot1Q 100`, bind them to ISP100, and assign their /30 addresses.
5. On PE-to-P links, configure the physical interfaces directly. The P side belongs to ISP100; the PE side belongs to GRT. Routing-context names do not have to match across a wire.
6. Configure Loopback100 and its /32 address. P-router loopbacks belong to ISP100; PE loopbacks remain in GRT.
7. Include `no shutdown` on physical interfaces and subinterfaces. Omit it on loopbacks.

The dual-AF VRF definition is prepared for future IPv6 work; no IPv6 interface addresses or IPv6 IGP have been assigned. Route-targets establish policy metadata but do not by themselves distribute routes; MP-BGP is not configured at this stage.

## P-router VRF example

```cisco
vrf definition ISP100
 rd 100:100
 address-family ipv4
  route-target export 100:100
  route-target import 100:100
 exit-address-family
 address-family ipv6
  route-target export 100:100
  route-target import 100:100
 exit-address-family
```

Bind `vrf forwarding ISP100` before assigning the IP address. Keep future ISP addresses on separate subinterfaces rather than adding them to ISP100’s shared transport parents. Future providers’ loopback numbering remains a later design task.

## Verify

On a P router:

```cisco
show vrf
show ip interface brief
show running-config interface Loopback100
show running-config interface GigabitEthernet0/0.100
ping vrf ISP100 10.100.1.2 source 10.100.1.1
```

The ping above is for P1 toward P2; substitute the correct directly connected endpoints for other links. Check dot1Q 100 and VRF membership explicitly in the interface configuration.

On PE13:

```cisco
show ip interface brief
show running-config interface Loopback100
ping 10.100.13.2 source 10.100.13.1
```

Acceptance: numbered physical interfaces and subinterfaces are up/up, directly connected peers answer in the correct context, and all Lo100 addresses match the workbook. Remote loopback reachability is tested after OSPF.

Reference: [Cisco multiprotocol VRF configuration](https://www.cisco.com/en/US/docs/ios-xml/ios/mp_l3_vpns/configuration/15-2mt/mp-vpn-ipv4-ipv6.html).

Next: [OSPF IGP](../002-IGP-OSPF/README.md).

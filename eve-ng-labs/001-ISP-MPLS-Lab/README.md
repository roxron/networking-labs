# ISP MPLS L3VPN Lab

## Lab Purpose

This EVE-NG lab demonstrates how an ISP can use Multiprotocol Label Switching (MPLS) and Multiprotocol BGP (MP-BGP) to provide Layer 3 VPN connectivity between two customer sites. The provider core uses an IGP and MPLS label switching, while the provider-edge (PE) routers keep customer routes isolated in a Virtual Routing and Forwarding (VRF) instance.

> [!NOTE]
> The lab directory currently contains no EVE-NG `.unl` file or device configurations. The topology, addressing, and device names below form a reference design for building the lab. Update them if the exported topology uses different values.

## Topology Overview

```text
 Customer Site A                 ISP MPLS Backbone                 Customer Site B

  192.168.10.0/24                                               192.168.20.0/24
         |                                                            |
       CE1 Lo0                                                      CE2 Lo0
       CE1 Gi0/1                                                    CE2 Gi0/1
         | 172.16.1.0/30                              172.16.2.0/30 |
       PE1 Gi0/0                                                    PE2 Gi0/1
       PE1 Gi0/1                                                    PE2 Gi0/0
         | 10.0.12.0/30          10.0.23.0/30          10.0.34.0/30 |
         +------------ P1 ---------------- P2 ----------------------+

  MP-BGP VPNv4: PE1 ================================================= PE2
  OSPF + LDP:    PE1 -------- P1 -------- P2 -------- PE2
```

The P routers switch labeled packets through the provider backbone and do not hold customer VPN routes. PE1 and PE2 exchange VPNv4 routes through MP-BGP. Each PE imports the remote routes into the `CUST-A` VRF.

## Devices and Roles

| Device | Role | Function |
|---|---|---|
| CE1 | Customer-edge router | Connects Customer Site A to PE1 and advertises the Site A LAN |
| PE1 | Provider-edge router | Hosts the `CUST-A` VRF, exchanges customer routes with CE1, and originates VPNv4 routes |
| P1 | Provider core router | Runs the provider IGP and LDP; label-switches traffic without learning VPN routes |
| P2 | Provider core router | Runs the provider IGP and LDP; label-switches traffic without learning VPN routes |
| PE2 | Provider-edge router | Hosts the `CUST-A` VRF, exchanges customer routes with CE2, and originates VPNv4 routes |
| CE2 | Customer-edge router | Connects Customer Site B to PE2 and advertises the Site B LAN |

## Interface and IP Addressing

### Router Interfaces

| Device | Interface | Connected To | VRF | IPv4 Address | Purpose |
|---|---|---|---|---|---|
| CE1 | Loopback0 | Local | Global | `192.168.10.1/24` | Simulated Site A LAN |
| CE1 | GigabitEthernet0/1 | PE1 Gi0/0 | Global | `172.16.1.1/30` | Customer-to-provider link |
| PE1 | Loopback0 | Local | Global | `1.1.1.1/32` | Router ID, LDP ID, and MP-BGP endpoint |
| PE1 | GigabitEthernet0/0 | CE1 Gi0/1 | `CUST-A` | `172.16.1.2/30` | Customer-facing link |
| PE1 | GigabitEthernet0/1 | P1 Gi0/0 | Global | `10.0.12.1/30` | MPLS core link |
| P1 | Loopback0 | Local | Global | `2.2.2.2/32` | Router ID and LDP ID |
| P1 | GigabitEthernet0/0 | PE1 Gi0/1 | Global | `10.0.12.2/30` | MPLS core link |
| P1 | GigabitEthernet0/1 | P2 Gi0/0 | Global | `10.0.23.1/30` | MPLS core link |
| P2 | Loopback0 | Local | Global | `3.3.3.3/32` | Router ID and LDP ID |
| P2 | GigabitEthernet0/0 | P1 Gi0/1 | Global | `10.0.23.2/30` | MPLS core link |
| P2 | GigabitEthernet0/1 | PE2 Gi0/0 | Global | `10.0.34.1/30` | MPLS core link |
| PE2 | Loopback0 | Local | Global | `4.4.4.4/32` | Router ID, LDP ID, and MP-BGP endpoint |
| PE2 | GigabitEthernet0/0 | P2 Gi0/1 | Global | `10.0.34.2/30` | MPLS core link |
| PE2 | GigabitEthernet0/1 | CE2 Gi0/1 | `CUST-A` | `172.16.2.2/30` | Customer-facing link |
| CE2 | GigabitEthernet0/1 | PE2 Gi0/1 | Global | `172.16.2.1/30` | Customer-to-provider link |
| CE2 | Loopback0 | Local | Global | `192.168.20.1/24` | Simulated Site B LAN |

### Routing and VPN Parameters

| Parameter | Value |
|---|---|
| Provider autonomous system | `65000` |
| Customer autonomous system | `65100` |
| Provider IGP | OSPF process `1`, area `0` |
| VRF name | `CUST-A` |
| Route distinguisher | PE1: `65000:1`; PE2: `65000:2` |
| Route target | Import/export `65000:100` |
| PE-to-PE signaling | MP-BGP VPNv4 between `1.1.1.1` and `4.4.4.4` |
| PE-to-CE routing | eBGP using customer AS `65100` |
| MPLS label distribution | LDP |

## Technologies and Protocols Used

- IPv4 addressing and routing
- OSPF as the provider-core interior gateway protocol
- MPLS forwarding in the provider core
- Label Distribution Protocol (LDP)
- MP-BGP VPNv4 address family between PE routers
- VRF route isolation on PE routers
- Route distinguishers (RDs) to create unique VPNv4 routes
- Route targets (RTs) to control VRF import and export
- eBGP between the PE and CE routers
- ICMP, traceroute, and MPLS-aware traceroute for validation

## Lab Objectives

After completing the lab, you should be able to:

1. Establish IP connectivity throughout the provider backbone.
2. Form OSPF adjacencies between PE and P routers.
3. Enable MPLS and establish LDP neighbors across all provider-core links.
4. Verify that PE loopbacks have label-switched paths through the core.
5. Create and apply the `CUST-A` VRF on both PE routers.
6. Establish an MP-BGP VPNv4 session between PE1 and PE2.
7. Exchange customer routes over PE-to-CE eBGP sessions.
8. Confirm end-to-end connectivity between the two customer LANs.
9. Demonstrate that P routers do not require customer routes.

## Configuration Tasks

### 1. Configure Base Addressing

- Assign hostnames and IPv4 addresses from the addressing table.
- Enable all required interfaces with `no shutdown`.
- Configure a `/32` Loopback0 interface on each provider router.
- Configure the customer LAN prefixes on CE1 and CE2 Loopback0.

Example:

```cisco
interface Loopback0
 ip address 1.1.1.1 255.255.255.255
!
interface GigabitEthernet0/1
 description TO-P1
 ip address 10.0.12.1 255.255.255.252
 no shutdown
```

### 2. Configure the Provider IGP

Run OSPF area 0 on PE1, P1, P2, and PE2. Advertise provider loopbacks and core links only; do not place customer-facing interfaces in the provider OSPF domain.

```cisco
router ospf 1
 router-id 1.1.1.1
 passive-interface Loopback0
 network 1.1.1.1 0.0.0.0 area 0
 network 10.0.12.0 0.0.0.3 area 0
```

### 3. Enable MPLS and LDP

Enable MPLS on every PE-to-P and P-to-P core interface. Use the provider loopback as the stable LDP router ID.

```cisco
mpls label protocol ldp
mpls ldp router-id Loopback0 force
!
interface GigabitEthernet0/1
 mpls ip
```

Do not enable MPLS on CE-facing interfaces.

### 4. Create the Customer VRF

Create `CUST-A` on both PE routers. Use a unique RD on each PE and a shared route target.

PE1:

```cisco
ip vrf CUST-A
 rd 65000:1
 route-target export 65000:100
 route-target import 65000:100
!
interface GigabitEthernet0/0
 ip vrf forwarding CUST-A
 ip address 172.16.1.2 255.255.255.252
 no shutdown
```

PE2 uses RD `65000:2` and assigns the VRF to its CE-facing interface with address `172.16.2.2/30`.

> Applying `ip vrf forwarding` removes the existing IP address from an interface. Apply the VRF first, and then configure the IP address.

### 5. Configure MP-BGP Between the PE Routers

Use the PE loopbacks for the iBGP session and activate the VPNv4 address family.

PE1 example:

```cisco
router bgp 65000
 bgp log-neighbor-changes
 neighbor 4.4.4.4 remote-as 65000
 neighbor 4.4.4.4 update-source Loopback0
 !
 address-family vpnv4
  neighbor 4.4.4.4 activate
  neighbor 4.4.4.4 send-community extended
 exit-address-family
```

Configure the reciprocal neighbor on PE2 using PE1's loopback address, `1.1.1.1`.

### 6. Configure PE-to-CE Routing

Configure eBGP between each PE and its attached CE. The PE address family must be VRF-aware.

PE1:

```cisco
router bgp 65000
 address-family ipv4 vrf CUST-A
  neighbor 172.16.1.1 remote-as 65100
  neighbor 172.16.1.1 activate
 exit-address-family
```

CE1:

```cisco
router bgp 65100
 neighbor 172.16.1.2 remote-as 65000
 network 192.168.10.0 mask 255.255.255.0
```

Apply the equivalent configuration on PE2 and CE2 for `172.16.2.0/30` and `192.168.20.0/24`.

Because both CE routers use AS `65100`, a CE normally rejects a remote route containing its own AS. For a controlled lab, configure `as-override` on each PE's VRF neighbor:

```cisco
router bgp 65000
 address-family ipv4 vrf CUST-A
  neighbor 172.16.1.1 as-override
 exit-address-family
```

Alternatively, assign a different AS to each customer site.

## Verification Commands

### Underlay and MPLS Core

```cisco
show ip interface brief
show ip ospf neighbor
show ip route ospf
show mpls interfaces
show mpls ldp neighbor
show mpls ldp bindings
show mpls forwarding-table
ping 4.4.4.4 source 1.1.1.1
traceroute 4.4.4.4 source 1.1.1.1
```

### VRF and MP-BGP

```cisco
show ip vrf
show ip route vrf CUST-A
show ip bgp vpnv4 all summary
show ip bgp vpnv4 all
show ip bgp vpnv4 vrf CUST-A
show ip bgp vpnv4 all labels
```

On newer IOS/IOS-XE images, the equivalent commands may use the following syntax:

```cisco
show bgp vpnv4 unicast all summary
show bgp vpnv4 unicast all
show bgp ipv4 unicast vrf CUST-A
```

### PE-to-CE and End-to-End Connectivity

```cisco
show ip bgp summary
show ip bgp
show ip route
ping 192.168.20.1 source 192.168.10.1
traceroute 192.168.20.1 source 192.168.10.1
```

To test from a PE within the customer VRF:

```cisco
ping vrf CUST-A 192.168.20.1 source 172.16.1.2
traceroute vrf CUST-A 192.168.20.1 source 172.16.1.2
```

## Expected Results

- OSPF reaches the `FULL` state on PE1-P1, P1-P2, and P2-PE2 links.
- Every provider router learns all provider loopbacks through OSPF.
- LDP neighbors form across the three core links.
- The MPLS forwarding table contains labels for remote provider loopbacks.
- The PE1-to-PE2 VPNv4 BGP session reaches `Established`.
- Each PE learns its local customer prefix over eBGP and the remote customer prefix over MP-BGP.
- `show ip route vrf CUST-A` on PE1 includes `192.168.20.0/24`; PE2 includes `192.168.10.0/24`.
- CE1 learns `192.168.20.0/24`, and CE2 learns `192.168.10.0/24`.
- A sourced ping from `192.168.10.1` to `192.168.20.1` succeeds.
- The P routers contain provider infrastructure routes and labels but no `192.168.10.0/24` or `192.168.20.0/24` customer routes.
- A traceroute between customer sites crosses the MPLS backbone; label details depend on platform and ICMP/MPLS propagation settings.

## Troubleshooting Notes

| Symptom | Likely Cause | Checks and Corrective Actions |
|---|---|---|
| OSPF neighbor does not form | Addressing, area, interface, or MTU mismatch | Check `show ip ospf interface brief`, masks, area IDs, interface state, and MTU |
| LDP neighbor is missing | MPLS is absent from one side, or the LDP router ID is unreachable | Check `show mpls interfaces`, enable `mpls ip` on both ends, and verify the loopback route |
| VPNv4 BGP session is down | PE loopback is unreachable or neighbor/update-source is incorrect | Ping the remote loopback from the local loopback and inspect `show ip bgp vpnv4 all summary` |
| VPNv4 session is up but no VPN routes appear | Extended communities are not sent, or local VRF has no routes | Configure `send-community extended`; check the VRF BGP table and PE-CE session |
| Remote VPN route is in VPNv4 BGP but not in the VRF | Import RT does not match the exported RT | Compare `show ip bgp vpnv4 all` route targets with `show running-config | section ip vrf` |
| PE cannot reach its CE | Interface is in the wrong VRF or its IP was removed | Check `show ip vrf interfaces`; reapply the address after `ip vrf forwarding CUST-A` |
| CE does not advertise its LAN | BGP `network` statement lacks an exact route in the local RIB | Verify the Loopback0 prefix and mask with `show ip route` |
| CE rejects the remote customer prefix | Its own AS appears in the AS path | Apply `as-override` on the PE neighbor or use unique AS numbers per site |
| Customer ping fails although routes exist | Return route, source address, ACL, or interface state issue | Run sourced pings in both directions and inspect each hop's VRF route table |
| MPLS traffic stops at a P router | Missing IGP route, LDP binding, or MPLS on a core interface | Correlate `show ip route`, `show mpls ldp bindings`, and `show mpls forwarding-table` |

When troubleshooting, validate the control plane in order: interfaces, provider IGP, LDP, MP-BGP VPNv4, PE-to-CE routing, VRF routes, and finally end-to-end forwarding.

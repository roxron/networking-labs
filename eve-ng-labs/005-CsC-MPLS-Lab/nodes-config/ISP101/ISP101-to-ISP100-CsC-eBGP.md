# ISP101-to-ISP100 CsC eBGP interconnection

## Purpose and scope

This page documents the configuration used to connect ISP101 Site1 and Site2 through the ISP100 Carrier Supporting Carrier backbone.

Only the following elements are included:

- The four physical routed links between ISP101 PE routers and ISP100 CsC PE routers.
- The ISP100 VRF elements required by those interfaces and BGP address families.
- The AS101 and AS100 eBGP configuration required to exchange labeled IPv4 routes.
- `neighbor ... send-label` and interface-level `mpls bgp forwarding`.

Unrelated ISP100 iBGP, VPNv4, IS-IS, LDP, and customer configurations are intentionally omitted. The ISP100 VPNv4 control plane and MPLS core must already be operational for end-to-end transport between the two sites.

## Design summary

| Site | ISP101 router | ISP101 interface/address | ISP100 router | ISP100 interface/address | Prefix |
|---|---|---|---|---|---|
| Site1 | ISP101-PE123 | Gi0/2 `10.101.49.9/30` | CsC-PE15 | Gi0/15 `10.101.49.10/30` VRF ISP101 | `10.101.49.8/30` |
| Site1 | ISP101-PE123 | Gi0/3 `10.101.49.13/30` | CsC-PE16 | Gi0/15 `10.101.49.14/30` VRF ISP101 | `10.101.49.12/30` |
| Site2 | ISP101-PE225 | Gi0/2 `10.101.49.1/30` | CsC-PE19 | Gi0/15 `10.101.49.2/30` VRF ISP101 | `10.101.49.0/30` |
| Site2 | ISP101-PE225 | Gi0/3 `10.101.49.5/30` | CsC-PE20 | Gi0/15 `10.101.49.6/30` VRF ISP101 | `10.101.49.4/30` |

Routing roles:

- ISP101 uses BGP AS `101`.
- ISP100 uses BGP AS `100`.
- ISP101-PE123 and ISP101-PE225 use GRT on the interconnection interfaces.
- CsC-PE15, CsC-PE16, CsC-PE19, and CsC-PE20 place Gi0/15 in VRF `ISP101`.
- `send-label` negotiates labeled IPv4-unicast exchange over eBGP.
- `mpls bgp forwarding` permits labeled BGP forwarding on each AS boundary interface.
- `as-override` on the ISP100 CsC PEs prevents routes learned from the opposite ISP101 site from being rejected merely because AS `101` already appears in the AS path.
- Each attached ISP101 PE originates its local site's IGP /32 loopbacks into BGP with explicit `network` statements.
- Each attached ISP101 PE redistributes only the remote site's approved BGP /32 loopbacks into IS-IS. Prefix lists and route maps prevent ISP100 infrastructure, CsC attachment networks, and other unintended BGP routes from entering the ISP101 IGP.

Each BGP `network` statement requires an exact `/32` route in the local routing table. Therefore, the site-local IS-IS adjacencies and loopback reachability must be established before all listed prefixes can be originated into BGP.

## Site1 configuration

### ISP101-PE123 — AS101

```ios
interface Loopback0
 description ISP101 RouterID
 ip address 10.101.3.123 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/2
 description Link to CsC-PE15 int g0/15
 ip address 10.101.49.9 255.255.255.252
 mpls bgp forwarding
 no shutdown
!
interface GigabitEthernet0/3
 description Link to CsC-PE16 int g0/15
 ip address 10.101.49.13 255.255.255.252
 mpls bgp forwarding
 no shutdown
!
ip prefix-list ISP101-SITE2-LOOPBACKS seq 10 permit 10.101.3.202/32
ip prefix-list ISP101-SITE2-LOOPBACKS seq 20 permit 10.101.3.225/32
ip prefix-list ISP101-SITE2-LOOPBACKS seq 30 permit 10.101.4.1/32
ip prefix-list ISP101-SITE2-LOOPBACKS seq 40 permit 10.101.5.1/32
ip prefix-list ISP101-SITE2-LOOPBACKS seq 50 permit 10.101.5.2/32
ip prefix-list ISP101-SITE2-LOOPBACKS seq 60 permit 10.101.5.3/32
ip prefix-list ISP101-SITE2-LOOPBACKS seq 70 permit 10.101.5.4/32
ip prefix-list ISP101-SITE2-LOOPBACKS seq 80 permit 10.101.5.5/32
ip prefix-list ISP101-SITE2-LOOPBACKS seq 90 permit 10.101.5.6/32
!
route-map ISP101-SITE2-BGP-TO-ISIS permit 10
 match ip address prefix-list ISP101-SITE2-LOOPBACKS
!
router isis ISP101
 redistribute bgp 101 route-map ISP101-SITE2-BGP-TO-ISIS
!
router bgp 101
 bgp router-id 10.101.3.123
 bgp log-neighbor-changes
 neighbor 10.101.49.10 remote-as 100
 neighbor 10.101.49.14 remote-as 100
 !
 address-family ipv4
  network 10.101.0.1 mask 255.255.255.255
  network 10.101.0.2 mask 255.255.255.255
  network 10.101.0.3 mask 255.255.255.255
  network 10.101.0.4 mask 255.255.255.255
  network 10.101.0.5 mask 255.255.255.255
  network 10.101.0.6 mask 255.255.255.255
  network 10.101.3.123 mask 255.255.255.255
  network 10.101.3.124 mask 255.255.255.255
  neighbor 10.101.49.10 activate
  neighbor 10.101.49.10 send-label
  neighbor 10.101.49.14 activate
  neighbor 10.101.49.14 send-label
 exit-address-family
```

### CsC-PE15 — AS100

The RD is router-specific, while the route targets are common to ISP101 so the ISP100 VPNv4 control plane can carry the routes between participating CsC PEs.

```ios
vrf definition ISP101
 rd 10.100.2.15:101
 route-target export 101:101
 route-target import 101:101
 !
 address-family ipv4
  route-target export 101:101
  route-target import 101:101
 exit-address-family
!
interface Loopback1010
 description ISP101 RouterID
 vrf forwarding ISP101
 ip address 10.101.50.15 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/15
 description Link to ISP101-PE123 int g0/2
 vrf forwarding ISP101
 ip address 10.101.49.10 255.255.255.252
 mpls bgp forwarding
 no shutdown
!
router bgp 100
 bgp router-id 10.100.2.15
 bgp log-neighbor-changes
 !
 address-family ipv4 vrf ISP101
  redistribute connected
  neighbor 10.101.49.9 remote-as 101
  neighbor 10.101.49.9 activate
  neighbor 10.101.49.9 as-override
  neighbor 10.101.49.9 send-label
 exit-address-family
```

### CsC-PE16 — AS100

```ios
vrf definition ISP101
 rd 10.100.2.16:101
 route-target export 101:101
 route-target import 101:101
 !
 address-family ipv4
  route-target export 101:101
  route-target import 101:101
 exit-address-family
!
interface Loopback1010
 description ISP101 RouterID
 vrf forwarding ISP101
 ip address 10.101.50.16 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/15
 description Link to ISP101-PE123 int g0/3
 vrf forwarding ISP101
 ip address 10.101.49.14 255.255.255.252
 mpls bgp forwarding
 no shutdown
!
router bgp 100
 bgp router-id 10.100.2.16
 bgp log-neighbor-changes
 !
 address-family ipv4 vrf ISP101
  redistribute connected
  neighbor 10.101.49.13 remote-as 101
  neighbor 10.101.49.13 activate
  neighbor 10.101.49.13 as-override
  neighbor 10.101.49.13 send-label
 exit-address-family
```

## Site2 configuration

### ISP101-PE225 — AS101

```ios
interface Loopback0
 description ISP101 RouterID
 ip address 10.101.3.225 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/2
 description Link to CsC-PE19 int g0/15
 ip address 10.101.49.1 255.255.255.252
 mpls bgp forwarding
 no shutdown
!
interface GigabitEthernet0/3
 description Link to CsC-PE20 int g0/15
 ip address 10.101.49.5 255.255.255.252
 mpls bgp forwarding
 no shutdown
!
ip prefix-list ISP101-SITE1-LOOPBACKS seq 10 permit 10.101.0.1/32
ip prefix-list ISP101-SITE1-LOOPBACKS seq 20 permit 10.101.0.2/32
ip prefix-list ISP101-SITE1-LOOPBACKS seq 30 permit 10.101.0.3/32
ip prefix-list ISP101-SITE1-LOOPBACKS seq 40 permit 10.101.0.4/32
ip prefix-list ISP101-SITE1-LOOPBACKS seq 50 permit 10.101.0.5/32
ip prefix-list ISP101-SITE1-LOOPBACKS seq 60 permit 10.101.0.6/32
ip prefix-list ISP101-SITE1-LOOPBACKS seq 70 permit 10.101.3.123/32
ip prefix-list ISP101-SITE1-LOOPBACKS seq 80 permit 10.101.3.124/32
!
route-map ISP101-SITE1-BGP-TO-ISIS permit 10
 match ip address prefix-list ISP101-SITE1-LOOPBACKS
!
router isis ISP101
 redistribute bgp 101 route-map ISP101-SITE1-BGP-TO-ISIS
!
router bgp 101
 bgp router-id 10.101.3.225
 bgp log-neighbor-changes
 neighbor 10.101.49.2 remote-as 100
 neighbor 10.101.49.6 remote-as 100
 !
 address-family ipv4
  network 10.101.3.202 mask 255.255.255.255
  network 10.101.3.225 mask 255.255.255.255
  network 10.101.4.1 mask 255.255.255.255
  network 10.101.5.1 mask 255.255.255.255
  network 10.101.5.2 mask 255.255.255.255
  network 10.101.5.3 mask 255.255.255.255
  network 10.101.5.4 mask 255.255.255.255
  network 10.101.5.5 mask 255.255.255.255
  network 10.101.5.6 mask 255.255.255.255
  neighbor 10.101.49.2 activate
  neighbor 10.101.49.2 send-label
  neighbor 10.101.49.6 activate
  neighbor 10.101.49.6 send-label
 exit-address-family
```

### CsC-PE19 — AS100

```ios
vrf definition ISP101
 rd 10.100.2.19:101
 route-target export 101:101
 route-target import 101:101
 !
 address-family ipv4
  route-target export 101:101
  route-target import 101:101
 exit-address-family
!
interface Loopback1010
 description ISP101 RouterID
 vrf forwarding ISP101
 ip address 10.101.50.19 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/15
 description Link to ISP101-PE225 int g0/2
 vrf forwarding ISP101
 ip address 10.101.49.2 255.255.255.252
 mpls bgp forwarding
 no shutdown
!
router bgp 100
 bgp router-id 10.100.2.19
 bgp log-neighbor-changes
 !
 address-family ipv4 vrf ISP101
  redistribute connected
  neighbor 10.101.49.1 remote-as 101
  neighbor 10.101.49.1 activate
  neighbor 10.101.49.1 as-override
  neighbor 10.101.49.1 send-label
 exit-address-family
```

### CsC-PE20 — AS100

```ios
vrf definition ISP101
 rd 10.100.2.20:101
 route-target export 101:101
 route-target import 101:101
 !
 address-family ipv4
  route-target export 101:101
  route-target import 101:101
 exit-address-family
!
interface Loopback1010
 description ISP101 RouterID
 vrf forwarding ISP101
 ip address 10.101.50.20 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/15
 description Link to ISP101-PE225 int g0/3
 vrf forwarding ISP101
 ip address 10.101.49.6 255.255.255.252
 mpls bgp forwarding
 no shutdown
!
router bgp 100
 bgp router-id 10.100.2.20
 bgp log-neighbor-changes
 !
 address-family ipv4 vrf ISP101
  redistribute connected
  neighbor 10.101.49.5 remote-as 101
  neighbor 10.101.49.5 activate
  neighbor 10.101.49.5 as-override
  neighbor 10.101.49.5 send-label
 exit-address-family
```

## Verification

### ISP101 PE routers

```ios
show ip bgp summary
show ip bgp neighbors
show ip bgp labels
show ip prefix-list
show route-map
show mpls interfaces
show mpls forwarding-table
show ip route isis
```

Expected eBGP neighbors:

- ISP101-PE123: `10.101.49.10` and `10.101.49.14` in Established state.
- ISP101-PE225: `10.101.49.2` and `10.101.49.6` in Established state.

Route-exchange expectations:

- ISP101-PE123 originates the eight Site1 /32s: P1–P6 Loopback1011 plus ISP101-PE123 and ISP101-PE124 Loopback0.
- ISP101-PE225 originates the nine Site2 /32s: P1–P6 Loopback1012 plus ISP101-PE202, ISP101-PE225, and ISP101-RR1 Loopback0.
- ISP101-PE123 injects only the nine permitted Site2 /32s from BGP into Site1 IS-IS.
- ISP101-PE225 injects only the eight permitted Site1 /32s from BGP into Site2 IS-IS.
- The prefix-list implicit deny blocks all other BGP prefixes from IS-IS redistribution.

### ISP100 CsC PE routers

```ios
show ip bgp vpnv4 vrf ISP101 summary
show ip bgp vpnv4 vrf ISP101
show ip route vrf ISP101
show mpls interfaces vrf ISP101
show mpls forwarding-table vrf ISP101
```

Expected eBGP neighbors:

- CsC-PE15: `10.101.49.9` in Established state.
- CsC-PE16: `10.101.49.13` in Established state.
- CsC-PE19: `10.101.49.1` in Established state.
- CsC-PE20: `10.101.49.5` in Established state.

The BGP neighbor details should show labeled IPv4-unicast capability in both directions. The ISP100 VPNv4 table for VRF `ISP101` should transport the labeled AS101 PE loopback routes between Site1 and Site2.

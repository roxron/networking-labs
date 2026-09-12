# ISP101-to-ISP102 Inter-AS Option A for CUSTOMER-A

Apply after the ISP101 and ISP102 MP-BGP VPNv4 configurations in step 006. This step extends `CUSTOMER-A` from ISP101 into ISP102 by using a back-to-back VRF connection between ISP101-PE124 and ISP102-PE30.

The InterAS diagram defines the following handoff:

| Router | Interface | VRF | IPv4 address | BGP AS |
|---|---|---|---|---|
| ISP101-PE124 | GigabitEthernet0/5 | CUSTOMER-A | `10.101.48.1/30` | 101 |
| ISP102-PE30 | GigabitEthernet0/5 | CUSTOMER-A | `10.101.48.2/30` | 102 |

This is Inter-AS Option A. The link carries ordinary IPv4 packets inside `CUSTOMER-A`; it does not carry labeled-unicast or VPNv4 NLRI. Do not enable IS-IS, LDP, `mpls ip`, or `mpls bgp forwarding` on GigabitEthernet0/5.

ISP102-PE29 and ISP102-PE30 both receive a local `CUSTOMER-A` VRF so that ISP102 can transport this VPN between its sites using its existing VPNv4 route-reflector design. Each PE uses a unique RD and both use RT `1001:1001`.

## CUSTOMER-A service-prefix policy

The current CUSTOMER-A test endpoints use host addresses from `192.168.0.0/24`. The policy below permits only `/32` service endpoints and prevents the Option A transit network `10.101.48.0/30` from being redistributed into VPNv4 or advertised across the eBGP boundary.

Apply on ISP101-PE124, ISP102-PE29, and ISP102-PE30:

```ios
ip prefix-list CUSTOMER-A-SERVICE seq 10 permit 192.168.0.0/24 ge 32 le 32
!
route-map CUSTOMER-A-CONNECTED permit 10
 match ip address prefix-list CUSTOMER-A-SERVICE
!
route-map CUSTOMER-A-INTERAS permit 10
 match ip address prefix-list CUSTOMER-A-SERVICE
```

Add additional explicit prefix-list entries before connecting real customer networks. Do not broaden the policy to include infrastructure or the Option A transit subnet.

## ISP101-PE124

`CUSTOMER-A`, RD `10.101.3.124:1001`, RT `1001:1001`, and Loopback1001 `192.168.0.124/32` already exist from step 006.

Configure the dedicated Option A interface:

```ios
interface GigabitEthernet0/5
 description Inter-AS Option A to ISP102-PE30 GigabitEthernet0/5
 vrf forwarding CUSTOMER-A
 ip address 10.101.48.1 255.255.255.252
 no shutdown
```

Replace unrestricted connected redistribution and add the per-VRF eBGP neighbor:

```ios
router bgp 101
 address-family ipv4 vrf CUSTOMER-A
  no redistribute connected
  redistribute connected route-map CUSTOMER-A-CONNECTED
  neighbor 10.101.48.2 remote-as 102
  neighbor 10.101.48.2 description Inter-AS Option A CUSTOMER-A to ISP102-PE30
  neighbor 10.101.48.2 activate
  neighbor 10.101.48.2 route-map CUSTOMER-A-INTERAS in
  neighbor 10.101.48.2 route-map CUSTOMER-A-INTERAS out
  neighbor 10.101.48.2 maximum-prefix 100 80 warning-only
 exit-address-family
```

Do not configure `send-label`, `as-override`, or `allowas-in` on this session. AS101 and AS102 are different provider AS numbers, so normal AS-path loop prevention should remain active.

## ISP102-PE29

PE29 does not terminate the physical Option A link, but it imports CUSTOMER-A through the existing ISP102 VPNv4 control plane. Loopback1001 supplies a local test endpoint for end-to-end validation.

```ios
vrf definition CUSTOMER-A
 rd 10.102.3.29:1001
 route-target export 1001:1001
 route-target import 1001:1001
 !
 address-family ipv4
 exit-address-family
 !
 address-family ipv6
 exit-address-family
!
interface Loopback1001
 description CUSTOMER-A test endpoint on ISP102-PE29
 vrf forwarding CUSTOMER-A
 ip address 192.168.0.29 255.255.255.255
!
router bgp 102
 address-family ipv4 vrf CUSTOMER-A
  redistribute connected route-map CUSTOMER-A-CONNECTED
 exit-address-family
```

No new neighbor is required on PE29. Its existing VPNv4 iBGP session to ISP102-RR11 carries CUSTOMER-A routes selected by RT `1001:1001`.

## ISP102-PE30

PE30 terminates the ISP102 side of the Option A link and remains an existing VPNv4 client of ISP102-RR11. `CUSTOMER-A` is separate from the existing `CUSTOMER-B` VRF.

```ios
vrf definition CUSTOMER-A
 rd 10.102.3.30:1001
 route-target export 1001:1001
 route-target import 1001:1001
 !
 address-family ipv4
 exit-address-family
 !
 address-family ipv6
 exit-address-family
!
interface Loopback1001
 description CUSTOMER-A test endpoint on ISP102-PE30
 vrf forwarding CUSTOMER-A
 ip address 192.168.0.30 255.255.255.255
!
interface GigabitEthernet0/5
 description Inter-AS Option A to ISP101-PE124 GigabitEthernet0/5
 vrf forwarding CUSTOMER-A
 ip address 10.101.48.2 255.255.255.252
 no shutdown
!
router bgp 102
 address-family ipv4 vrf CUSTOMER-A
  redistribute connected route-map CUSTOMER-A-CONNECTED
  neighbor 10.101.48.1 remote-as 101
  neighbor 10.101.48.1 description Inter-AS Option A CUSTOMER-A to ISP101-PE124
  neighbor 10.101.48.1 activate
  neighbor 10.101.48.1 route-map CUSTOMER-A-INTERAS in
  neighbor 10.101.48.1 route-map CUSTOMER-A-INTERAS out
  neighbor 10.101.48.1 maximum-prefix 100 80 warning-only
 exit-address-family
```

ISP102-RR11 already uses `no bgp default route-target filter` and already reflects VPNv4 routes between PE29 and PE30. No RR11 change is required.

## Verification sequence

### 1. Verify the Option A interface

On ISP101-PE124:

```ios
show ip interface brief | include GigabitEthernet0/5
show ip route vrf CUSTOMER-A connected
ping vrf CUSTOMER-A 10.101.48.2 source 10.101.48.1
```

On ISP102-PE30:

```ios
show ip interface brief | include GigabitEthernet0/5
show ip route vrf CUSTOMER-A connected
ping vrf CUSTOMER-A 10.101.48.1 source 10.101.48.2
```

### 2. Verify per-VRF eBGP

```ios
show ip bgp vpnv4 vrf CUSTOMER-A summary
show ip bgp vpnv4 vrf CUSTOMER-A
```

The PE124-to-PE30 neighbor must be Established. CUSTOMER-A service routes should carry AS101 or AS102 across the Option A boundary. The `10.101.48.0/30` transit prefix must not appear as a VPNv4 route.

### 3. Verify ISP102 VPNv4 propagation

On ISP102-RR11:

```ios
show bgp vpnv4 unicast all
show bgp vpnv4 unicast rd 10.102.3.29:1001
show bgp vpnv4 unicast rd 10.102.3.30:1001
```

On ISP102-PE29:

```ios
show vrf detail CUSTOMER-A
show ip route vrf CUSTOMER-A
show ip bgp vpnv4 vrf CUSTOMER-A
```

PE29 should import ISP101 CUSTOMER-A routes through RT `1001:1001`, including `192.168.0.124/32` and `192.168.0.202/32` when both ISP101 sites are operational.

### 4. Verify end-to-end CUSTOMER-A reachability

From ISP102-PE29:

```ios
ping vrf CUSTOMER-A 192.168.0.124 source 192.168.0.29
ping vrf CUSTOMER-A 192.168.0.202 source 192.168.0.29
```

From ISP101-PE124:

```ios
ping vrf CUSTOMER-A 192.168.0.29 source 192.168.0.124
ping vrf CUSTOMER-A 192.168.0.30 source 192.168.0.124
```

Successful tests demonstrate Option A route exchange between AS101 and AS102 while each provider independently transports CUSTOMER-A through its own VPNv4/MPLS control plane.

## Expected routing behavior

- ISP101 CUSTOMER-A routes are exported from PE124 to PE30 as ordinary IPv4 eBGP routes.
- PE30 applies its local RD and RT when exporting those routes into ISP102 VPNv4.
- PE29 imports those VPNv4 routes because its CUSTOMER-A VRF imports RT `1001:1001`.
- ISP102 CUSTOMER-A routes follow the reverse process through PE30 and PE124.
- VPN labels terminate at the Option A boundary; no label is exchanged across GigabitEthernet0/5.
- The Option A transit `/30` remains connected only on PE124 and PE30 and is excluded from service-route advertisements.

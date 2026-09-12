# ISP102-to-ISP103 Inter-AS Option A for CUSTOMER-A

Apply after:

1. ISP102 and ISP103 MP-BGP VPNv4 step 006.
2. `007-ISP101-to-ISP102-InterAS-Option-A-CUSTOMER-A.md`, which establishes CUSTOMER-A between AS101 and AS102.

This step extends `CUSTOMER-A` from ISP102 into ISP103. ISP102-PE30 becomes the transit Option A PE between AS101 and AS103: it maintains separate per-VRF eBGP sessions to ISP101-PE124 and ISP103-PE36.

The `InterAS optionA CUSTOMER-A` diagram defines this handoff:

| Router | Interface | VRF | IPv4 address | BGP AS |
|---|---|---|---|---|
| ISP102-PE30 | GigabitEthernet0/6 | CUSTOMER-A | `10.102.48.1/30` | 102 |
| ISP103-PE36 | GigabitEthernet0/6 | CUSTOMER-A | `10.102.48.2/30` | 103 |

This is a back-to-back VRF connection. It carries ordinary CUSTOMER-A IPv4 traffic and per-VRF eBGP routes. Do not enable IS-IS, LDP, `mpls ip`, `mpls bgp forwarding`, or VPNv4 on GigabitEthernet0/6.

## CUSTOMER-A service-prefix policy

CUSTOMER-A test endpoints use `/32` addresses within `192.168.0.0/24`. Only those service routes may cross the Option A boundaries. The transit networks `10.101.48.0/30` and `10.102.48.0/30` must remain local to their directly connected PEs.

The following policy should already exist on ISP102-PE30 from the AS101-to-AS102 Option A step. Verify it before adding the new neighbor:

```ios
ip prefix-list CUSTOMER-A-SERVICE seq 10 permit 192.168.0.0/24 ge 32 le 32
!
route-map CUSTOMER-A-CONNECTED permit 10
 match ip address prefix-list CUSTOMER-A-SERVICE
!
route-map CUSTOMER-A-INTERAS permit 10
 match ip address prefix-list CUSTOMER-A-SERVICE
```

Apply the same policy on ISP103-PE34 and ISP103-PE36:

```ios
ip prefix-list CUSTOMER-A-SERVICE seq 10 permit 192.168.0.0/24 ge 32 le 32
!
route-map CUSTOMER-A-CONNECTED permit 10
 match ip address prefix-list CUSTOMER-A-SERVICE
!
route-map CUSTOMER-A-INTERAS permit 10
 match ip address prefix-list CUSTOMER-A-SERVICE
```

Add explicit prefix-list entries before connecting any CUSTOMER-A networks outside `192.168.0.0/24`. Do not permit either Option A transit `/30`.

## ISP102-PE30

PE30 should already have CUSTOMER-A with RD `10.102.3.30:1001`, RT `1001:1001`, Loopback1001 `192.168.0.30/32`, and the Option A neighbor `10.101.48.1` in AS101.

Configure the second dedicated Option A interface:

```ios
interface GigabitEthernet0/6
 description Inter-AS Option A to ISP103-PE36 GigabitEthernet0/6
 vrf forwarding CUSTOMER-A
 ip address 10.102.48.1 255.255.255.252
 no shutdown
```

Add the AS103 neighbor under the existing CUSTOMER-A address family:

```ios
router bgp 102
 address-family ipv4 vrf CUSTOMER-A
  neighbor 10.102.48.2 remote-as 103
  neighbor 10.102.48.2 description Inter-AS Option A CUSTOMER-A to ISP103-PE36
  neighbor 10.102.48.2 activate
  neighbor 10.102.48.2 route-map CUSTOMER-A-INTERAS in
  neighbor 10.102.48.2 route-map CUSTOMER-A-INTERAS out
  neighbor 10.102.48.2 maximum-prefix 100 80 warning-only
 exit-address-family
```

Confirm that connected redistribution remains filtered:

```ios
router bgp 102
 address-family ipv4 vrf CUSTOMER-A
  no redistribute connected
  redistribute connected route-map CUSTOMER-A-CONNECTED
 exit-address-family
```

With both eBGP sessions established, PE30 performs normal BGP transit:

- Routes received from AS101 are advertised to AS103 with AS path `102 101`.
- Routes received from AS103 are advertised to AS101 with AS path `102 103`.
- Normal AS-path loop prevention remains active.

Do not configure `as-override` or `allowas-in` on either Option A session.

## ISP103-PE34

PE34 does not terminate the physical Option A link. It imports CUSTOMER-A through the existing ISP103 VPNv4 control plane. Loopback1001 provides a local test endpoint.

```ios
vrf definition CUSTOMER-A
 rd 10.103.3.34:1001
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
 description CUSTOMER-A test endpoint on ISP103-PE34
 vrf forwarding CUSTOMER-A
 ip address 192.168.0.34 255.255.255.255
!
router bgp 103
 address-family ipv4 vrf CUSTOMER-A
  redistribute connected route-map CUSTOMER-A-CONNECTED
 exit-address-family
```

No new neighbor is required on PE34. Its existing VPNv4 iBGP session to ISP103-RR37 carries routes selected by CUSTOMER-A RT `1001:1001`.

## ISP103-PE36

PE36 terminates the ISP103 side of the Option A link and remains an existing VPNv4 client of ISP103-RR37. CUSTOMER-A is separate from the existing CUSTOMER-C VRF.

```ios
vrf definition CUSTOMER-A
 rd 10.103.3.36:1001
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
 description CUSTOMER-A test endpoint on ISP103-PE36
 vrf forwarding CUSTOMER-A
 ip address 192.168.0.36 255.255.255.255
!
interface GigabitEthernet0/6
 description Inter-AS Option A to ISP102-PE30 GigabitEthernet0/6
 vrf forwarding CUSTOMER-A
 ip address 10.102.48.2 255.255.255.252
 no shutdown
!
router bgp 103
 address-family ipv4 vrf CUSTOMER-A
  redistribute connected route-map CUSTOMER-A-CONNECTED
  neighbor 10.102.48.1 remote-as 102
  neighbor 10.102.48.1 description Inter-AS Option A CUSTOMER-A to ISP102-PE30
  neighbor 10.102.48.1 activate
  neighbor 10.102.48.1 route-map CUSTOMER-A-INTERAS in
  neighbor 10.102.48.1 route-map CUSTOMER-A-INTERAS out
  neighbor 10.102.48.1 maximum-prefix 100 80 warning-only
 exit-address-family
```

ISP103-RR37 already has VPNv4 sessions to PE34 and PE36 and uses `no bgp default route-target filter`. No RR37 change is required.

## Verification sequence

### 1. Verify the new Option A link

On ISP102-PE30:

```ios
show ip interface brief | include GigabitEthernet0/6
show ip route vrf CUSTOMER-A connected
ping vrf CUSTOMER-A 10.102.48.2 source 10.102.48.1
```

On ISP103-PE36:

```ios
show ip interface brief | include GigabitEthernet0/6
show ip route vrf CUSTOMER-A connected
ping vrf CUSTOMER-A 10.102.48.1 source 10.102.48.2
```

### 2. Verify per-VRF eBGP

On PE30 and PE36:

```ios
show ip bgp vpnv4 vrf CUSTOMER-A summary
show ip bgp vpnv4 vrf CUSTOMER-A
```

The `10.102.48.1`/`10.102.48.2` neighbor relationship must be Established. The `10.102.48.0/30` transit prefix must not appear as a VPNv4 route or be advertised to AS101.

### 3. Verify ISP103 VPNv4 propagation

On ISP103-RR37:

```ios
show bgp vpnv4 unicast all
show bgp vpnv4 unicast rd 10.103.3.34:1001
show bgp vpnv4 unicast rd 10.103.3.36:1001
```

On ISP103-PE34:

```ios
show vrf detail CUSTOMER-A
show ip route vrf CUSTOMER-A
show ip bgp vpnv4 vrf CUSTOMER-A
```

PE34 should import CUSTOMER-A routes from all participating ASes through RT `1001:1001`.

### 4. Verify three-AS route propagation

Expected examples on ISP103-PE36:

```text
192.168.0.29/32 and 192.168.0.30/32: received through AS102
192.168.0.124/32 and 192.168.0.202/32: received with AS path 102 101
```

Expected examples on ISP101-PE124:

```text
192.168.0.29/32 and 192.168.0.30/32: received through AS102
192.168.0.34/32 and 192.168.0.36/32: received with AS path 102 103
```

Use the following commands to confirm the BGP next hop and AS path:

```ios
show ip bgp vpnv4 vrf CUSTOMER-A 192.168.0.124
show ip bgp vpnv4 vrf CUSTOMER-A 192.168.0.34
```

### 5. Verify end-to-end CUSTOMER-A reachability

From ISP103-PE34:

```ios
ping vrf CUSTOMER-A 192.168.0.124 source 192.168.0.34
ping vrf CUSTOMER-A 192.168.0.202 source 192.168.0.34
ping vrf CUSTOMER-A 192.168.0.29 source 192.168.0.34
```

From ISP101-PE124:

```ios
ping vrf CUSTOMER-A 192.168.0.34 source 192.168.0.124
ping vrf CUSTOMER-A 192.168.0.36 source 192.168.0.124
```

Successful tests demonstrate CUSTOMER-A reachability across AS101, transit AS102, and AS103 while every provider independently transports the VPN through its own VPNv4/MPLS control plane.

## Expected routing behavior

- PE30 exchanges ordinary CUSTOMER-A IPv4 routes with PE124 and PE36 over two separate Option A links.
- PE30 prepends AS102 when advertising routes between AS101 and AS103.
- PE36 applies its local RD and RT when exporting received Option A routes into ISP103 VPNv4.
- PE34 imports those routes through RT `1001:1001`.
- VPN labels terminate at each Option A boundary; neither inter-AS link exchanges MPLS labels.
- Both Option A transit `/30`s remain local and are excluded from CUSTOMER-A service advertisements.

# ISP101-to-ISP102 Inter-AS Option B MP-BGP VPNv4

Apply after the ISP101 and ISP102 CsC and MP-BGP configurations in steps 005 and 006.

This design promotes ISP101-PE123 and ISP102-PE28 to Inter-AS Option B ASBR roles while preserving their existing Carrier Supporting Carrier functions. The configuration is intentionally divided into two stages:

1. Establish VPNv4-only iBGP sessions from each ASBR to its local route reflector.
2. Establish a directly connected VPNv4 eBGP session between the two ASBRs.

The `InterAS OptionB` diagram defines the ASBR link as follows:

| Router | Role | Interface | IPv4 address | BGP AS |
|---|---|---|---|---|
| ISP101-PE123 | ISP101 Option B ASBR | GigabitEthernet0/10 | `10.101.48.17/30` | 101 |
| ISP102-PE28 | ISP102 Option B ASBR | GigabitEthernet0/10 | `10.101.48.18/30` | 102 |

The link prefix is `10.101.48.16/30` and the direct inter-AS session uses VPNv4 eBGP.

## Control-plane separation

The new ASBR-to-RR sessions must be activated only under `address-family vpnv4`. Do not activate these neighbors under `address-family ipv4`.

This preserves the existing underlay design:

- PE and RR loopback reachability remains supplied by IS-IS, LDP, and the existing CsC labeled IPv4 transport.
- Existing CsC IPv4 eBGP neighbors remain active and continue to exchange only the approved infrastructure `/32`s.
- The route reflectors do not advertise global IPv4 routes to PE123 or PE28.
- The existing BGP-to-IS-IS redistribution policies cannot select VPNv4 NLRI, so VPN service routes cannot feed back into IS-IS.

`no bgp default ipv4-unicast` is required on PE123 and PE28 before defining the new RR neighbor. Their existing CsC neighbors are already explicitly activated under `address-family ipv4`, so they remain operational.

# Part 1 — VPNv4-only ASBR-to-RR sessions

## Prerequisite reachability

Before configuring BGP, verify that every ASBR and RR loopback is reachable through the existing underlay.

On ISP101-PE123:

```ios
show ip route 10.101.4.1
show mpls forwarding-table 10.101.4.1 255.255.255.255
ping 10.101.4.1 source 10.101.3.123
```

On ISP101-RR1:

```ios
show ip route 10.101.3.123
show mpls forwarding-table 10.101.3.123 255.255.255.255
ping 10.101.3.123 source 10.101.4.1
```

On ISP102-PE28:

```ios
show ip route 10.102.4.11
show mpls forwarding-table 10.102.4.11 255.255.255.255
ping 10.102.4.11 source 10.102.3.28
```

On ISP102-RR11:

```ios
show ip route 10.102.3.28
show mpls forwarding-table 10.102.3.28 255.255.255.255
ping 10.102.3.28 source 10.102.4.11
```

Do not proceed until all four sourced pings succeed.

## ISP101-PE123 to ISP101-RR1

PE123 has no customer VRFs. Disable default route-target filtering so it can retain and relay VPNv4 routes for all permitted services.

```ios
router bgp 101
 no bgp default ipv4-unicast
 no bgp default route-target filter
 neighbor 10.101.4.1 remote-as 101
 neighbor 10.101.4.1 description VPNv4-only iBGP to ISP101-RR1
 neighbor 10.101.4.1 update-source Loopback0
 !
 address-family vpnv4
  neighbor 10.101.4.1 activate
  neighbor 10.101.4.1 send-community extended
  neighbor 10.101.4.1 next-hop-self
 exit-address-family
```

Do not add `neighbor 10.101.4.1 activate` under `address-family ipv4`.

## ISP101-RR1 to ISP101-PE123

RR1 already uses `no bgp default ipv4-unicast` and `no bgp default route-target filter`. Add PE123 as a route-reflector client only under VPNv4:

```ios
router bgp 101
 neighbor 10.101.3.123 remote-as 101
 neighbor 10.101.3.123 description VPNv4-only iBGP to Option B ASBR ISP101-PE123
 neighbor 10.101.3.123 update-source Loopback0
 !
 address-family vpnv4
  neighbor 10.101.3.123 activate
  neighbor 10.101.3.123 send-community extended
  neighbor 10.101.3.123 route-reflector-client
 exit-address-family
```

Do not activate `10.101.3.123` under RR1's IPv4 address family.

## ISP102-PE28 to ISP102-RR11

PE28 also has no customer VRFs and must retain VPNv4 routes independently of local RT membership.

```ios
router bgp 102
 no bgp default ipv4-unicast
 no bgp default route-target filter
 neighbor 10.102.4.11 remote-as 102
 neighbor 10.102.4.11 description VPNv4-only iBGP to ISP102-RR11
 neighbor 10.102.4.11 update-source Loopback0
 !
 address-family vpnv4
  neighbor 10.102.4.11 activate
  neighbor 10.102.4.11 send-community extended
  neighbor 10.102.4.11 next-hop-self
 exit-address-family
```

Do not add `neighbor 10.102.4.11 activate` under `address-family ipv4`.

## ISP102-RR11 to ISP102-PE28

RR11 already uses `no bgp default ipv4-unicast` and `no bgp default route-target filter`. Add PE28 only to VPNv4:

```ios
router bgp 102
 neighbor 10.102.3.28 remote-as 102
 neighbor 10.102.3.28 description VPNv4-only iBGP to Option B ASBR ISP102-PE28
 neighbor 10.102.3.28 update-source Loopback0
 !
 address-family vpnv4
  neighbor 10.102.3.28 activate
  neighbor 10.102.3.28 send-community extended
  neighbor 10.102.3.28 route-reflector-client
 exit-address-family
```

Do not activate `10.102.3.28` under RR11's IPv4 address family.

## Part 1 verification

On PE123 and RR1:

```ios
show bgp vpnv4 unicast summary
show bgp vpnv4 unicast all
show bgp ipv4 unicast summary
```

Expected result:

- The VPNv4 session between `10.101.3.123` and `10.101.4.1` is Established.
- The IPv4 summary does not contain an active PE123-to-RR1 adjacency.
- PE123 retains the VPNv4 routes reflected by RR1 even though PE123 has no customer VRFs.

On PE28 and RR11:

```ios
show bgp vpnv4 unicast summary
show bgp vpnv4 unicast all
show bgp ipv4 unicast summary
```

Expected result:

- The VPNv4 session between `10.102.3.28` and `10.102.4.11` is Established.
- The IPv4 summary does not contain an active PE28-to-RR11 adjacency.
- PE28 retains the VPNv4 routes reflected by RR11 even though PE28 has no customer VRFs.

Verify that the existing CsC IPv4 labeled-unicast peers remain Established after enabling `no bgp default ipv4-unicast`:

```ios
show bgp ipv4 unicast summary
show ip bgp labels
```

# Part 2 — ISP101-to-ISP102 Inter-AS Option B

## VPNv4 route-target policy

The initial Option B policy permits the service RTs currently shown in the lab:

- CUSTOMER-A: RT `1001:1001`
- CUSTOMER-B: RT `1002:1002`

Apply on ISP101-PE123 and ISP102-PE28:

```ios
ip extcommunity-list standard INTERAS-OPTIONB-RT permit rt 1001:1001
ip extcommunity-list standard INTERAS-OPTIONB-RT permit rt 1002:1002
!
route-map INTERAS-OPTIONB-VPNV4 permit 10
 match extcommunity INTERAS-OPTIONB-RT
```

The route map has an implicit deny. Add an explicit RT entry before extending another VPN across the Option B boundary.

## ISP101-PE123 ASBR interface and eBGP

The inter-AS interface remains in the global routing table. `mpls bgp forwarding` permits labeled BGP forwarding without extending the provider IGP or LDP adjacency across the AS boundary.

```ios
interface GigabitEthernet0/10
 description Inter-AS Option B to ISP102-PE28 GigabitEthernet0/10
 ip address 10.101.48.17 255.255.255.252
 mpls bgp forwarding
 no shutdown
!
router bgp 101
 neighbor 10.101.48.18 remote-as 102
 neighbor 10.101.48.18 description Inter-AS Option B VPNv4 eBGP to ISP102-PE28
 !
 address-family vpnv4
  neighbor 10.101.48.18 activate
  neighbor 10.101.48.18 send-community extended
  neighbor 10.101.48.18 route-map INTERAS-OPTIONB-VPNV4 in
  neighbor 10.101.48.18 route-map INTERAS-OPTIONB-VPNV4 out
  neighbor 10.101.48.18 maximum-prefix 1000 80 warning-only
 exit-address-family
```

Do not configure `send-label` under VPNv4. VPNv4 NLRI carries its VPN label as part of the address family.

## ISP102-PE28 ASBR interface and eBGP

```ios
interface GigabitEthernet0/10
 description Inter-AS Option B to ISP101-PE123 GigabitEthernet0/10
 ip address 10.101.48.18 255.255.255.252
 mpls bgp forwarding
 no shutdown
!
router bgp 102
 neighbor 10.101.48.17 remote-as 101
 neighbor 10.101.48.17 description Inter-AS Option B VPNv4 eBGP to ISP101-PE123
 !
 address-family vpnv4
  neighbor 10.101.48.17 activate
  neighbor 10.101.48.17 send-community extended
  neighbor 10.101.48.17 route-map INTERAS-OPTIONB-VPNV4 in
  neighbor 10.101.48.17 route-map INTERAS-OPTIONB-VPNV4 out
  neighbor 10.101.48.17 maximum-prefix 1000 80 warning-only
 exit-address-family
```

The directly connected VPNv4 eBGP sessions change the VPNv4 next hop to the local ASBR. PE123 and PE28 then advertise externally learned VPNv4 routes toward their local RRs with `next-hop-self`. Each provider therefore needs transport reachability only to its own ASBR loopback.

Do not configure the inter-AS neighbor under IPv4, do not run an IGP on GigabitEthernet0/10, and do not establish LDP across this link.

## Part 2 verification

### 1. Interface and direct reachability

On ISP101-PE123:

```ios
show ip interface brief | include GigabitEthernet0/10
ping 10.101.48.18 source 10.101.48.17
```

On ISP102-PE28:

```ios
show ip interface brief | include GigabitEthernet0/10
ping 10.101.48.17 source 10.101.48.18
```

### 2. VPNv4 eBGP and policy

On both ASBRs:

```ios
show bgp vpnv4 unicast summary
show bgp vpnv4 unicast all
show ip extcommunity-list INTERAS-OPTIONB-RT
show route-map INTERAS-OPTIONB-VPNV4
```

The direct `.17`/`.18` VPNv4 neighbor must be Established. Confirm that advertised and received routes carry:

- A route distinguisher.
- The expected route target.
- A VPN label.
- The remote provider AS in the AS path.

Detailed checks:

```ios
show bgp vpnv4 unicast all neighbors 10.101.48.18 advertised-routes
show bgp vpnv4 unicast all neighbors 10.101.48.18 routes
show bgp vpnv4 unicast all neighbors 10.101.48.17 advertised-routes
show bgp vpnv4 unicast all neighbors 10.101.48.17 routes
```

Run only the commands relevant to the local neighbor address.

### 3. MPLS forwarding

On PE123 and PE28:

```ios
show mpls interfaces GigabitEthernet0/10 detail
show mpls forwarding-table
show bgp vpnv4 unicast all labels
```

Confirm that each remote VPNv4 route has a received VPN label and that the LFIB has a forwarding action toward GigabitEthernet0/10.

### 4. RR propagation and VRF import

On ISP101-RR1 and ISP102-RR11:

```ios
show bgp vpnv4 unicast all
show bgp vpnv4 unicast summary
```

On customer-facing PEs with a matching import RT:

```ios
show ip bgp vpnv4 vrf CUSTOMER-A
show ip bgp vpnv4 vrf CUSTOMER-B
show ip route vrf CUSTOMER-A
show ip route vrf CUSTOMER-B
```

Only VRFs configured with a matching import RT install the exchanged routes. The Option B control plane can be Established and exchange VPNv4 routes before both providers instantiate matching customer VRFs, but end-to-end customer forwarding requires matching service membership and reachable customer prefixes on both sides.

## Expected forwarding behavior

- A local customer PE pushes its VPN service label and the transport label required to reach its local ASBR.
- The local ASBR removes or swaps the local transport label and swaps the VPN label according to the VPNv4 route learned from the remote ASBR.
- The packet crosses GigabitEthernet0/10 as MPLS using the label advertised through VPNv4 eBGP.
- The remote ASBR swaps the inter-AS VPN label toward the remote customer PE and adds any transport label required inside its own AS.
- PE123 and PE28 carry VPNv4 routes and labels but do not need customer VRFs.
- No customer VPN route is redistributed into IS-IS, and no IPv4 iBGP session is created between either ASBR and its RR.

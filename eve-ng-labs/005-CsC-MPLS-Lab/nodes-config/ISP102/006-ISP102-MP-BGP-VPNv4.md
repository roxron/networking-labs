# ISP102 MP-BGP IPv4 and VPNv4

RR11 is in Site1 at Loopback0 10.102.4.11/32. PE29 (10.102.3.29) and PE30 (10.102.3.30) are its clients, following the ISP101 service-role convention. PE28 and PE31 provide CsC transport and are not VPNv4 clients. P1–P6 do not run ISP102 BGP.

This config establishes the control plane. Customer VRFs, route targets and service addresses are absent from the ISP102 diagram and are not copied from ISP101 CUSTOMER-A. PE29 and PE30 retain default route-target filtering; RR11 retains and reflects all VPNv4 routes. No VPNv4 service routes are expected until customer VRFs and route origination are configured.

## ISP102-PE29

```ios
router bgp 102
 bgp router-id 10.102.3.29
 bgp log-neighbor-changes
 no bgp default ipv4-unicast
 neighbor 10.102.4.11 remote-as 102
 neighbor 10.102.4.11 update-source Loopback0
 !
 address-family ipv4
  neighbor 10.102.4.11 activate
 exit-address-family
 !
 address-family vpnv4
  neighbor 10.102.4.11 activate
  neighbor 10.102.4.11 send-community extended
 exit-address-family
```

## ISP102-PE30

```ios
router bgp 102
 bgp router-id 10.102.3.30
 bgp log-neighbor-changes
 no bgp default ipv4-unicast
 neighbor 10.102.4.11 remote-as 102
 neighbor 10.102.4.11 update-source Loopback0
 !
 address-family ipv4
  neighbor 10.102.4.11 activate
 exit-address-family
 !
 address-family vpnv4
  neighbor 10.102.4.11 activate
  neighbor 10.102.4.11 send-community extended
 exit-address-family
```

## ISP102-RR11

```ios
router bgp 102
 bgp router-id 10.102.4.11
 bgp log-neighbor-changes
 no bgp default ipv4-unicast
 no bgp default route-target filter
 neighbor 10.102.3.29 remote-as 102
 neighbor 10.102.3.29 update-source Loopback0
 neighbor 10.102.3.30 remote-as 102
 neighbor 10.102.3.30 update-source Loopback0
 !
 address-family ipv4
  neighbor 10.102.3.29 activate
  neighbor 10.102.3.29 route-reflector-client
  neighbor 10.102.3.30 activate
  neighbor 10.102.3.30 route-reflector-client
 exit-address-family
 !
 address-family vpnv4
  neighbor 10.102.3.29 activate
  neighbor 10.102.3.29 send-community extended
  neighbor 10.102.3.29 route-reflector-client
  neighbor 10.102.3.30 activate
  neighbor 10.102.3.30 send-community extended
  neighbor 10.102.3.30 route-reflector-client
 exit-address-family
```

## Verification

```ios
show bgp ipv4 unicast summary
show bgp vpnv4 unicast summary
show bgp vpnv4 unicast all
show mpls forwarding-table
```

RR11 should have two established clients in each address family. Each client should have one established RR11 peer. Before testing BGP, ping each remote peer with source Loopback0 and verify the corresponding /32 route and label forwarding entry. The IPv4 address family does not originate routes simply by activating a neighbor.

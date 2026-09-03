# ISP102 MP-BGP IPv4 and VPNv4

RR11 is in Site1 at Loopback0 10.102.4.11/32. PE29 (10.102.3.29) and PE30 (10.102.3.30) are its clients, following the ISP101 service-role convention. PE28 and PE31 provide CsC transport and are not VPNv4 clients. P1–P6 do not run ISP102 BGP.

This config establishes the control plane and includes the user-supplied CUSTOMER-B service configuration on PE29 and PE30. Each PE uses a unique RD and imports/exports RT 1002:1002. PE29 and PE30 retain default route-target filtering; their CUSTOMER-B import RT selects the service routes. RR11 retains and reflects all VPNv4 routes. Both PEs originate their CUSTOMER-B connected loopback through BGP AS 102. IPv6 is enabled in the VRF definition; IPv6 addressing and VPNv6 BGP are not configured here.

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

## CUSTOMER-B configuration after MP-BGP

Apply these additions on PE29 and PE30 after the MP-BGP configuration above is in place.

### CUSTOMER-B on ISP102-PE29

```ios
vrf definition CUSTOMER-B
 rd 10.102.3.29:1002
 route-target export 1002:1002
 route-target import 1002:1002
 !
 address-family ipv4
 exit-address-family
 !
 address-family ipv6
 exit-address-family
!
interface Loopback1002
 vrf forwarding CUSTOMER-B
 ip address 192.168.0.29 255.255.255.255
!
router bgp 102
 address-family ipv4 vrf CUSTOMER-B
  redistribute connected
 exit-address-family
```

### CUSTOMER-B on ISP102-PE30

```ios
vrf definition CUSTOMER-B
 rd 10.102.3.30:1002
 route-target export 1002:1002
 route-target import 1002:1002
 !
 address-family ipv4
 exit-address-family
 !
 address-family ipv6
 exit-address-family
!
interface Loopback1002
 vrf forwarding CUSTOMER-B
 ip address 192.168.0.30 255.255.255.255
!
router bgp 102
 address-family ipv4 vrf CUSTOMER-B
  redistribute connected
 exit-address-family
```

### CUSTOMER-B verification

On PE29 and PE30:

```ios
show vrf detail CUSTOMER-B
show ip route vrf CUSTOMER-B
show bgp vpnv4 unicast all
```

PE29 should import 192.168.0.30/32; PE30 should import 192.168.0.29/32. RR11 should reflect both VPNv4 routes with RT 1002:1002. Test from PE29:

```ios
ping vrf CUSTOMER-B 192.168.0.30 source 192.168.0.29
```

Test from PE30:

```ios
ping vrf CUSTOMER-B 192.168.0.29 source 192.168.0.30
```

These are expected results after configuration and working end-to-end CsC label transport; they have not been verified on running routers.

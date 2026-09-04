# ISP103 MP-BGP IPv4 and VPNv4

RR37 is in Site1 at Loopback0 10.103.4.37/32. PE34 (10.103.3.34) and PE36 (10.103.3.36) are its clients, following the ISP101 service-role convention. PE33 and PE35 provide CsC transport and are not VPNv4 clients. P1–P6 do not run ISP103 BGP.

This config establishes the control plane and includes an optional CUSTOMER-C service example on PE34 and PE36. Each PE uses a unique RD and imports/exports RT 1003:1003. PE34 and PE36 retain default route-target filtering; their CUSTOMER-C import RT selects the service routes. RR37 retains and reflects all VPNv4 routes. When the example is applied, both PEs originate their CUSTOMER-C connected loopback through BGP AS 103. IPv6 is enabled in the VRF definition; IPv6 addressing and VPNv6 BGP are not configured here.

## ISP103-PE34

```ios
router bgp 103
 bgp router-id 10.103.3.34
 bgp log-neighbor-changes
 no bgp default ipv4-unicast
 neighbor 10.103.4.37 remote-as 103
 neighbor 10.103.4.37 update-source Loopback0
 !
 address-family ipv4
  neighbor 10.103.4.37 activate
 exit-address-family
 !
 address-family vpnv4
  neighbor 10.103.4.37 activate
  neighbor 10.103.4.37 send-community extended
 exit-address-family
```

## ISP103-PE36

```ios
router bgp 103
 bgp router-id 10.103.3.36
 bgp log-neighbor-changes
 no bgp default ipv4-unicast
 neighbor 10.103.4.37 remote-as 103
 neighbor 10.103.4.37 update-source Loopback0
 !
 address-family ipv4
  neighbor 10.103.4.37 activate
 exit-address-family
 !
 address-family vpnv4
  neighbor 10.103.4.37 activate
  neighbor 10.103.4.37 send-community extended
 exit-address-family
```

## ISP103-RR37

```ios
router bgp 103
 bgp router-id 10.103.4.37
 bgp log-neighbor-changes
 no bgp default ipv4-unicast
 no bgp default route-target filter
 neighbor 10.103.3.34 remote-as 103
 neighbor 10.103.3.34 update-source Loopback0
 neighbor 10.103.3.36 remote-as 103
 neighbor 10.103.3.36 update-source Loopback0
 !
 address-family ipv4
  neighbor 10.103.3.34 activate
  neighbor 10.103.3.34 route-reflector-client
  neighbor 10.103.3.36 activate
  neighbor 10.103.3.36 route-reflector-client
 exit-address-family
 !
 address-family vpnv4
  neighbor 10.103.3.34 activate
  neighbor 10.103.3.34 send-community extended
  neighbor 10.103.3.34 route-reflector-client
  neighbor 10.103.3.36 activate
  neighbor 10.103.3.36 send-community extended
  neighbor 10.103.3.36 route-reflector-client
 exit-address-family
```

## Verification

```ios
show bgp ipv4 unicast summary
show bgp vpnv4 unicast summary
show bgp vpnv4 unicast all
show mpls forwarding-table
```

RR37 should have two established clients in each address family. Each client should have one established RR37 peer. Before testing BGP, ping each remote peer with source Loopback0 and verify the corresponding /32 route and label forwarding entry. The IPv4 address family does not originate routes simply by activating a neighbor.

## CUSTOMER-C configuration after MP-BGP

Optional service example, assigned by analogy with ISP102 CUSTOMER-B: use CUSTOMER-C, RT 1003:1003 and Loopback1003 on PE34 and PE36. These customer settings are not supplied by the ISP103 topology. Apply these additions after the MP-BGP configuration above is in place.

### CUSTOMER-C on ISP103-PE34

```ios
vrf definition CUSTOMER-C
 rd 10.103.3.34:1003
 route-target export 1003:1003
 route-target import 1003:1003
 !
 address-family ipv4
 exit-address-family
 !
 address-family ipv6
 exit-address-family
!
interface Loopback1003
 vrf forwarding CUSTOMER-C
 ip address 192.168.0.34 255.255.255.255
!
router bgp 103
 address-family ipv4 vrf CUSTOMER-C
  redistribute connected
 exit-address-family
```

### CUSTOMER-C on ISP103-PE36

```ios
vrf definition CUSTOMER-C
 rd 10.103.3.36:1003
 route-target export 1003:1003
 route-target import 1003:1003
 !
 address-family ipv4
 exit-address-family
 !
 address-family ipv6
 exit-address-family
!
interface Loopback1003
 vrf forwarding CUSTOMER-C
 ip address 192.168.0.36 255.255.255.255
!
router bgp 103
 address-family ipv4 vrf CUSTOMER-C
  redistribute connected
 exit-address-family
```

### CUSTOMER-C verification

On PE34 and PE36:

```ios
show vrf detail CUSTOMER-C
show ip route vrf CUSTOMER-C
show bgp vpnv4 unicast all
```

PE34 should import 192.168.0.36/32; PE36 should import 192.168.0.34/32. RR37 should reflect both VPNv4 routes with RT 1003:1003. Test from PE34:

```ios
ping vrf CUSTOMER-C 192.168.0.36 source 192.168.0.34
```

Test from PE36:

```ios
ping vrf CUSTOMER-C 192.168.0.34 source 192.168.0.36
```

These are expected results after configuration and working end-to-end CsC label transport; they have not been verified on running routers.

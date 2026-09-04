# ISP103-to-ISP100 CsC eBGP interconnection

Apply after files 001–004. ISP103 uses AS 103; ISP100 retains AS 100. PE33 and PE35 provide labeled transport for Sites 1 and 2 respectively. The existing ISP100 MPLS and VPNv4 control plane must already transport VRF ISP103 (RT 103:103). Shared CsC routers retain their existing global BGP router IDs.

Only local-site PE/RR /32s are originated. Only approved remote-site PE/RR /32s are redistributed into IS-IS. Infrastructure P-router loopbacks stay site-local. `as-override` on the carrier PEs permits the remote AS 103 site to accept these routes. All `network` statements require exact /32 routes in the local routing table.

## ISP103-PE33

```ios
ip prefix-list ISP103-SITE2-LOOPBACKS seq 10 permit 10.103.3.36/32
ip prefix-list ISP103-SITE2-LOOPBACKS seq 20 permit 10.103.3.35/32
!
route-map ISP103-SITE2-BGP-TO-ISIS permit 10
 match ip address prefix-list ISP103-SITE2-LOOPBACKS
!
router isis ISP103
 redistribute bgp 103 route-map ISP103-SITE2-BGP-TO-ISIS
!
interface GigabitEthernet0/2
 mpls bgp forwarding
!
interface GigabitEthernet0/3
 mpls bgp forwarding
!
router bgp 103
 bgp router-id 10.103.3.33
 bgp log-neighbor-changes
 neighbor 10.103.49.10 remote-as 100
 neighbor 10.103.49.14 remote-as 100
 !
 address-family ipv4
  network 10.103.3.33 mask 255.255.255.255
  network 10.103.3.34 mask 255.255.255.255
  network 10.103.4.37 mask 255.255.255.255
  neighbor 10.103.49.10 activate
  neighbor 10.103.49.10 send-label
  neighbor 10.103.49.14 activate
  neighbor 10.103.49.14 send-label
 exit-address-family
```

## ISP103-PE35

```ios
ip prefix-list ISP103-SITE1-LOOPBACKS seq 10 permit 10.103.3.33/32
ip prefix-list ISP103-SITE1-LOOPBACKS seq 20 permit 10.103.3.34/32
ip prefix-list ISP103-SITE1-LOOPBACKS seq 30 permit 10.103.4.37/32
!
route-map ISP103-SITE1-BGP-TO-ISIS permit 10
 match ip address prefix-list ISP103-SITE1-LOOPBACKS
!
router isis ISP103
 redistribute bgp 103 route-map ISP103-SITE1-BGP-TO-ISIS
!
interface GigabitEthernet0/2
 mpls bgp forwarding
!
interface GigabitEthernet0/3
 mpls bgp forwarding
!
router bgp 103
 bgp router-id 10.103.3.35
 bgp log-neighbor-changes
 neighbor 10.103.49.2 remote-as 100
 neighbor 10.103.49.6 remote-as 100
 !
 address-family ipv4
  network 10.103.3.36 mask 255.255.255.255
  network 10.103.3.35 mask 255.255.255.255
  neighbor 10.103.49.2 activate
  neighbor 10.103.49.2 send-label
  neighbor 10.103.49.6 activate
  neighbor 10.103.49.6 send-label
 exit-address-family
```

## CsC-PE15

```ios
interface GigabitEthernet0/13
 mpls bgp forwarding
!
router bgp 100
 address-family ipv4 vrf ISP103
  redistribute connected
  neighbor 10.103.49.9 remote-as 103
  neighbor 10.103.49.9 activate
  neighbor 10.103.49.9 as-override
  neighbor 10.103.49.9 send-label
 exit-address-family
```

## CsC-PE16

```ios
interface GigabitEthernet0/13
 mpls bgp forwarding
!
router bgp 100
 address-family ipv4 vrf ISP103
  redistribute connected
  neighbor 10.103.49.13 remote-as 103
  neighbor 10.103.49.13 activate
  neighbor 10.103.49.13 as-override
  neighbor 10.103.49.13 send-label
 exit-address-family
```

## CsC-PE19

```ios
interface GigabitEthernet0/13
 mpls bgp forwarding
!
router bgp 100
 address-family ipv4 vrf ISP103
  redistribute connected
  neighbor 10.103.49.1 remote-as 103
  neighbor 10.103.49.1 activate
  neighbor 10.103.49.1 as-override
  neighbor 10.103.49.1 send-label
 exit-address-family
```

## CsC-PE20

```ios
interface GigabitEthernet0/13
 mpls bgp forwarding
!
router bgp 100
 address-family ipv4 vrf ISP103
  redistribute connected
  neighbor 10.103.49.5 remote-as 103
  neighbor 10.103.49.5 activate
  neighbor 10.103.49.5 as-override
  neighbor 10.103.49.5 send-label
 exit-address-family
```

## Verification

On PE33 and PE35:

```ios
show ip bgp summary
show ip bgp labels
show ip prefix-list
show route-map
show ip route isis
show mpls forwarding-table
```

PE33 peers with 10.103.49.10 and 10.103.49.14. PE35 peers with 10.103.49.2 and 10.103.49.6. Each pair should be Established and negotiate labeled IPv4. Site1 exports 10.103.3.33/32, 10.103.3.34/32 and 10.103.4.37/32. Site2 exports 10.103.3.36/32 and 10.103.3.35/32.

On all four CsC PEs:

```ios
show ip bgp vpnv4 vrf ISP103 summary
show ip bgp vpnv4 vrf ISP103
show ip route vrf ISP103
show mpls forwarding-table vrf ISP103
```

Confirm the remote-site /32s reach the local IS-IS domain and have usable labels. The prefix-list implicit deny excludes all other BGP routes from IS-IS redistribution.

# ISP102-to-ISP100 CsC eBGP interconnection

Apply after files 001–004. ISP102 uses AS 102; ISP100 retains AS 100. PE28 and PE31 provide labeled transport for Sites 1 and 2 respectively. The existing ISP100 MPLS and VPNv4 control plane must already transport VRF ISP102 (RT 102:102). Shared CsC routers retain their existing global BGP router IDs.

Only local-site PE/RR /32s are originated. Only approved remote-site PE/RR /32s are redistributed into IS-IS. Infrastructure P-router loopbacks stay site-local. `as-override` on the carrier PEs permits the remote AS 102 site to accept these routes. All `network` statements require exact /32 routes in the local routing table.

## ISP102-PE28

```ios
ip prefix-list ISP102-SITE2-LOOPBACKS seq 10 permit 10.102.3.30/32
ip prefix-list ISP102-SITE2-LOOPBACKS seq 20 permit 10.102.3.31/32
!
route-map ISP102-SITE2-BGP-TO-ISIS permit 10
 match ip address prefix-list ISP102-SITE2-LOOPBACKS
!
router isis ISP102
 redistribute bgp 102 route-map ISP102-SITE2-BGP-TO-ISIS
!
interface GigabitEthernet0/2
 mpls bgp forwarding
!
interface GigabitEthernet0/3
 mpls bgp forwarding
!
router bgp 102
 bgp router-id 10.102.3.28
 bgp log-neighbor-changes
 neighbor 10.102.49.10 remote-as 100
 neighbor 10.102.49.14 remote-as 100
 !
 address-family ipv4
  network 10.102.3.28 mask 255.255.255.255
  network 10.102.3.29 mask 255.255.255.255
  network 10.102.4.11 mask 255.255.255.255
  neighbor 10.102.49.10 activate
  neighbor 10.102.49.10 send-label
  neighbor 10.102.49.14 activate
  neighbor 10.102.49.14 send-label
 exit-address-family
```

## ISP102-PE31

```ios
ip prefix-list ISP102-SITE1-LOOPBACKS seq 10 permit 10.102.3.28/32
ip prefix-list ISP102-SITE1-LOOPBACKS seq 20 permit 10.102.3.29/32
ip prefix-list ISP102-SITE1-LOOPBACKS seq 30 permit 10.102.4.11/32
!
route-map ISP102-SITE1-BGP-TO-ISIS permit 10
 match ip address prefix-list ISP102-SITE1-LOOPBACKS
!
router isis ISP102
 redistribute bgp 102 route-map ISP102-SITE1-BGP-TO-ISIS
!
interface GigabitEthernet0/2
 mpls bgp forwarding
!
interface GigabitEthernet0/3
 mpls bgp forwarding
!
router bgp 102
 bgp router-id 10.102.3.31
 bgp log-neighbor-changes
 neighbor 10.102.49.2 remote-as 100
 neighbor 10.102.49.6 remote-as 100
 !
 address-family ipv4
  network 10.102.3.30 mask 255.255.255.255
  network 10.102.3.31 mask 255.255.255.255
  neighbor 10.102.49.2 activate
  neighbor 10.102.49.2 send-label
  neighbor 10.102.49.6 activate
  neighbor 10.102.49.6 send-label
 exit-address-family
```

## CsC-PE15

```ios
interface GigabitEthernet0/14
 mpls bgp forwarding
!
router bgp 100
 address-family ipv4 vrf ISP102
  redistribute connected
  neighbor 10.102.49.9 remote-as 102
  neighbor 10.102.49.9 activate
  neighbor 10.102.49.9 as-override
  neighbor 10.102.49.9 send-label
 exit-address-family
```

## CsC-PE16

```ios
interface GigabitEthernet0/14
 mpls bgp forwarding
!
router bgp 100
 address-family ipv4 vrf ISP102
  redistribute connected
  neighbor 10.102.49.13 remote-as 102
  neighbor 10.102.49.13 activate
  neighbor 10.102.49.13 as-override
  neighbor 10.102.49.13 send-label
 exit-address-family
```

## CsC-PE19

```ios
interface GigabitEthernet0/14
 mpls bgp forwarding
!
router bgp 100
 address-family ipv4 vrf ISP102
  redistribute connected
  neighbor 10.102.49.1 remote-as 102
  neighbor 10.102.49.1 activate
  neighbor 10.102.49.1 as-override
  neighbor 10.102.49.1 send-label
 exit-address-family
```

## CsC-PE20

```ios
interface GigabitEthernet0/14
 mpls bgp forwarding
!
router bgp 100
 address-family ipv4 vrf ISP102
  redistribute connected
  neighbor 10.102.49.5 remote-as 102
  neighbor 10.102.49.5 activate
  neighbor 10.102.49.5 as-override
  neighbor 10.102.49.5 send-label
 exit-address-family
```

## Verification

On PE28 and PE31:

```ios
show ip bgp summary
show ip bgp labels
show ip prefix-list
show route-map
show ip route isis
show mpls forwarding-table
```

PE28 peers with 10.102.49.10 and 10.102.49.14. PE31 peers with 10.102.49.2 and 10.102.49.6. Each pair should be Established and negotiate labeled IPv4. Site1 exports 10.102.3.28/32, 10.102.3.29/32 and 10.102.4.11/32. Site2 exports 10.102.3.30/32 and 10.102.3.31/32.

On all four CsC PEs:

```ios
show ip bgp vpnv4 vrf ISP102 summary
show ip bgp vpnv4 vrf ISP102
show ip route vrf ISP102
show mpls forwarding-table vrf ISP102
```

Confirm the remote-site /32s reach the local IS-IS domain and have usable labels. The prefix-list implicit deny excludes all other BGP routes from IS-IS redistribution.

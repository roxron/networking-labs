# 20 IPV6 MPLS L3VPN (6VPE)

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/IPV6/20 IPV6 MPLS L3VPN (6VPE)`  
> Original source context: 01 CBTNUGGETS / IPV6. Content is preserved as historical study material; validate commands against the target platform and release.

```text
! 
!
PE1(config)# vrf definition ACME
PE1(config-vrf)# rd 50:50
PE1(config-vrf)# address-family ipv6 
PE1(config-vrf-af)# route-target export 55:55
PE1(config-vrf-af)# route-target import 55:55
PE1(config-vrf-af)# exit
PE1(config-vrf)# exit
!
PE1(config)# vrf definition BitCoin 
PE1(config-vrf)# rd 60:60
PE1(config-vrf)# address-family ipv6 
PE1(config-vrf-af)# route-target export 66:66
PE1(config-vrf-af)# route-target import 66:66
PE1(config-vrf-af)# exit
PE1(config-vrf)# exit
!
PE1# show vrf
PE1# show vrf detail 
!
PE1(config)# interface G0/1
PE1(config-if)# vrf forwarding ACME
PE1(config-if)# ipv6 address 2001:DB8:AC1:1::1
PE1(config-if)# exit
!
PE1(config)# interface G0/2
PE1(config-if)# vrf forwarding BitCoin
PE1(config-if)# ipv6 address 2001:DB8:BC1:1::1
PE1(config-if)# exit
!
PE1(config)# ipv6 route vrf BitCoin 2001:DB8:BC1::/48 2001:DB8:BC1:1::2
!
PE1(config)# router bgp 65536
PE1(config-router)# no bgp default ipv4-unicast
PE1(config-router)# bgp router-id 1.1.1.1
PE1(config-router)# neighbor 2.2.2.2 remote-as 65536
PE1(config-router)# nieghbor 2.2.2.2 update-source Loopback0 
PE1(config-router)# address-family vpnv6
PE1(config-router-af)# neighbor 2.2.2.2 activate 
PE1(config-router-af)# neighbor 2.2.2.2 send-community extended 
PE1(config-router-af)# exit
PE1(config-router)# address-family ipv6 vrf ACME 
PE1(config-router-af)# neighbor 2001:DB8:AC1:1::2 remote-as 64512
PE1(config-router-af)# neighbor 2001:DB8:AC1:1::2 activate 
PE1(config-router-af)# exit
PE1(config-router)# address-family ipv6 vrf BitCoin
PE1(config-router-af)# redistribute static
PE1(config-router-af)# end
PE1#
!
!
PE1# show running-config | section bgp
PE1# show bgp vpnv6 unicast all 
PE1# show bgp vpnv6 unicast all 2001:DB8:AC1::/48
!
!
!
PE2(config)# vrf definition ACME
PE2(config-vrf)# rd 50:50
PE2(config-vrf)# address-family ipv6 
PE2(config-vrf-af)# route-target export 55:55
PE2(config-vrf-af)# route-target import 55:55
PE2(config-vrf-af)# exit
PE2(config-vrf)# exit
!
PE2(config)# vrf definition BitCoin 
PE2(config-vrf)# rd 60:60
PE2(config-vrf)# address-family ipv6 
PE2(config-vrf-af)# route-target export 66:66
PE2(config-vrf-af)# route-target import 66:66
PE2(config-vrf-af)# exit
PE2(config-vrf)# exit
!
PE2# show vrf
PE2# show vrf detail 
!
PE2(config)# interface G0/1
PE2(config-if)# vrf forwarding ACME
PE2(config-if)# ipv6 address 2001:DB8:AC2:1::1
PE2(config-if)# exit
!
PE2(config)# interface G0/2
PE2(config-if)# vrf forwarding BitCoin
PE2(config-if)# ipv6 address 2001:DB8:BC2:1::1
PE2(config-if)# exit
!
PE2(config)# ipv6 route vrf ACME 2001:DB8:AC2::/48 2001:DB8:AC2:1::2
!
PE2(config)# router bgp 65536
PE2(config-router)# no bgp default ipv4-unicast
PE2(config-router)# bgp router-id 2.2.2.2
PE2(config-router)# neighbor 1.1.1.1 remote-as 65536
PE2(config-router)# nieghbor 1.1.1.1 update-source Loopback0 
PE2(config-router)# address-family vpnv6
PE2(config-router-af)# neighbor 1.1.1.1 activate 
PE2(config-router-af)# neighbor 1.1.1.1 send-community extended 
PE2(config-router-af)# exit
PE2(config-router)# address-family ipv6 vrf BitCoin 
PE2(config-router-af)# neighbor 2001:DB8:BC1:1::2 remote-as 64512
PE2(config-router-af)# neighbor 2001:DB8:BC1:1::2 activate 
PE2(config-router-af)# exit
PE2(config-router)# address-family ipv6 vrf ACME
PE2(config-router-af)# redistribute static
PE2(config-router-af)# end
PE2#
!
!
PE2# show running-config | section bgp
!
!
!
PE2# show bgp vpnv6 unicast all
PE2# show bgp vpnv6 unicast all neighbors 
PE2# show bgp all summary 
PE2# show ipv6 cef vrf ACME
!
!
!
ACME-1(config)# ipv6 route 2001:DB8:AC1::/48 null 0
ACME-1(config)# router bgp 64512
ACME-1(config-router)# bgp router-id 11.11.11.11
ACME-1(config-router)# no bgp default ipv4-unicast 
ACME-1(config-router)# address-family ipv6 
ACME-1(config-router-af)# neighbor 2001:DB8:AC1:1::1 remote-as 65536
ACME-1(config-router-af)# neighbor 2001:DB8:AC1:1::1 activate
ACME-1(config-router-af)# network 2001:DB8:AC1::/48
ACME-1(config-router-af)# end
!
ACME-1# show bgp ipv6 unicast neighbor 
ACME-1# show bgp ipv6 unicast 
!
!
ACME-2# ( use default static route for connection to PE-2)
!
BitCoin-1# ( use default static route for connection to PE-1)
!
!
BitCoin-2(config)# ipv6 route 2001:DB8:BC1::/48 null 0
BitCoin-2(config)# router bgp 64513
BitCoin-2(config-router)# bgp router-id 22.22.22.22
BitCoin-2(config-router)# no bgp default ipv4-unicast 
BitCoin-2(config-router)# address-family ipv6 
BitCoin-2(config-router-af)# neighbor 2001:DB8:BC1:1::1 remote-as 65536
BitCoin-2(config-router-af)# neighbor 2001:DB8:BC1:1::1 activate
BitCoin-2(config-router-af)# network 2001:DB8:BC1::/48
BitCoin-2(config-router-af)# end
```

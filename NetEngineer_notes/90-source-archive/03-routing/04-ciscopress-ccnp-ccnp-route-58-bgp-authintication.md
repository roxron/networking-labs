# 58 BGP Authintication

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/58 BGP Authintication`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
IPv4 BGP Authentication Configuration:
Configuration on Router R1
router bgp 65001
network 172.16.1.0 mask 255.255.255.0
neighbor 10.1.1.2 remote-as 65002
neighbor 10.1.1.2 password KEYNOTE
!Configuration on Router R2
router bgp 65002
network 192.168.1.0
neighbor 10.1.1.1 remote-as 65001
neighbor 10.1.1.1 password KEYNOTE
!



IPv6 BGP Authentication Configuration:
!Configuration on Router R1
router bgp 65001
bgp router-id 1.1.1.1
bgp log-neighbor-changes
no bgp default ipv4-unicast
neighbor 2002::2 remote-as 65002
neighbor 2002::2 password KEYNOTE
!
address-family ipv4
exit-address-family
!
address-family ipv6
network 2001::/64
network 2002::/64
neighbor 2002::2 activate
exit-address-family
!
!
!
!Configuration on Router R2
router bgp 65002
bgp router-id 2.2.2.2
bgp log-neighbor-changes
no bgp default ipv4-unicast
neighbor 2002::1 remote-as 65001
neighbor 2002::1 password KEYNOTE
!
address-family ipv4
exit-address-family
!
address-family ipv6
network 2002::/64
network 2003::/64
neighbor 2002::1 activate
exit-address-family
```

# 003 NO EXPOR COMMUNITY

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/BOOKS/Jeff Doyle/Routing TCPIP Vol 2 Jeff Doyle/BGP and NLRI/003 NO EXPOR_COMMUNITY`  
> Original source context: 07 SAFARI ONLINE / BOOKS / Jeff Doyle / Routing TCPIP Vol 2 Jeff Doyle / BGP and NLRI. Content is preserved as historical study material; validate commands against the target platform and release.

```text
router eigrp 100 network 192.168.199.0
!
router bgp 100 
aggregate-address 192.168.192.0 255.255.248.0 
redistribute eigrp 100 
neighbor 192.168.1.253 remote-as 200 
neighbor 192.168.1.253 send-community 
neighbor 192.168.1.253 route-map COMMUNITY out
!
ip classless!access-list 101 permit ip host 192.168.192.0 host 255.255.248.0
!
route-map COMMUNITY permit 10 match ip address 101 set community none
!
route-map COMMUNITY permit 20 set community no-export
!
Verify No-export Community:
!

Sugarbush#show ip bgp community no-export
```

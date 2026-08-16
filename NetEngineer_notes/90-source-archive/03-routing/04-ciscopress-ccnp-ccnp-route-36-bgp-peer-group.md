# 36 BGP Peer Group

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/36 BGP Peer Group`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Displaying the Results of BGP Filtering:
router bgp 64701
bgp log-neighbor-changes
network 192.0.2.0
network 198.51.100.0 mask 255.255.255.252
network 198.51.100.4 mask 255.255.255.252
neighbor ROUTE-PG peer-group
neighbor ROUTE-PG prefix-list ROUTE-DEMO in
neighbor 198.51.100.2 remote-as 64702
neighbor 198.51.100.2 peer-group ROUTE-PG
neighbor 198.51.100.6 remote-as 64703
neighbor 198.51.100.6 peer-group ROUTE-PG
!
ip prefix-list ROUTE-DEMO seq 5 deny 10.0.0.0/8 le 32
ip prefix-list ROUTE-DEMO seq 10 deny 172.16.0.0/12 le 32
ip prefix-list ROUTE-DEMO seq 15 deny 192.168.0.0/16 le 32
ip prefix-list ROUTE-DEMO seq 20 permit 0.0.0.0/0
ip prefix-list ROUTE-DEMO seq 25 permit 0.0.0.0/0 ge 8
```

# 10 AS-Path Filters Examples

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/BGP/10 AS-Path Filters Examples`  
> Original source context: 01 CBTNUGGETS / BGP. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# ip as-path access-list 1 deny ^300_
R1(config)# ip as-path access-list 1 permit .*
R1(config)# route-map FILTER_300 permit 10
R1(config-route-map)# match as-path 1
R1(config-route-map)#exit
R1(config)# router bgp 500 
R1(config-router)# neighbor 1.1.1.1 route-map FILTER_300 out 

or 


    Filter-list with AS PATH access-list.
    No-Export Community.
    Prefix-list Filtering
    Distribute-list Filtering


FIlter-List:
R1(config)# ip as-path access-list 1 permit ^$
R1(config)# router BGP 500
R1(config-router)# neighbor 50.0.0.1 filter-list 1 out 


No-Export Community:
R1(config)#route-map NO-EXPORT
R1(config-route-map)#set community no-export

R1(config)#router bgp 1
R1(config-router)#neighbor 192.168.12.2 route-map NO-EXPORT in
R1(config-router)#neighbor 192.168.13.3 route-map NO-EXPORT in


Prefix-List Filtering:
R1(config)#ip prefix-list NO-TRANSIT permit 1.1.1.0/24

R1(config-router)#neighbor 192.168.12.2 prefix-list NO-TRANSIT out 
R1(config-router)#neighbor 192.168.13.3 prefix-list NO-TRANSIT out


Distribute-list Filtering:
R1(config)#ip access-list standard NO-TRANSIT
R1(config-std-nacl)#permit 1.1.1.0 0.0.0.255

R1(config-router)#neighbor 192.168.12.2 distribute-list NO-TRANSIT out
R1(config-router)#neighbor 192.168.13.3 distribute-list NO-TRANSIT out
```

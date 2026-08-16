# 07 Configuring Policy Template

> Imported source note. Provenance: `NetEngineer_Journal/Extra/BGP/07 Configuring Policy Template`  
> Original source context: Extra / BGP. Content is preserved as historical study material; validate commands against the target platform and release.

```text
router bgp 100
template peer-policy All_Peers
 soft-reconfiguration inbound 
exit-peer-policy 
!
template peer-policy IBGP_Policy 
 route-map internal_peers in
 route-map out_peers out 
 route-reflect-client 
 next-hop-self 
 inherit peer-policy All_Peers 10
exit-peer-policy 
!
template peer-policy EBGP_Out 
 route-map external_peers out 
 inherit peer-policy All_Peers 10
exit-peer-policy 
!
template peer-policy EBGP_In 
 prefix-list customers in 
 remove-private-as
 maximum-prefix 30000
 inherit peer-policy All_Peers 10 
exit-peer-policy 
!
template peer-policy Premium 
 route-map Premium_Customers in 
exit-peer-policy 
!
template peer-policy EBGP Standard 
 inherit peer-policy EBGP_In 20
 inherit peer-policy EBGP_Out 10 
exit-peer-policy 
!
template peer-policy EBGP_Premium 
 inherit peer-policy Premium 30
 inherit peer-policy EBGP_In 20
 inherit peer-policy EBGP_Out 10 
exit-peer-policy 
!
neighbor 192.168.255.2 inherit peer-policy IBGP_Policy 
neighbor 192.168.255.3 inherit peer-policy IBGP_Policy 
neighbor 192.168.255.4 inherit peer-policy EBGP_Standard 
neighbor 192.168.255.5 inherit peer-policy EBGP_Standard 
neighbor 192.168.255.6 inherit peer-policy EBGP_Premium
```

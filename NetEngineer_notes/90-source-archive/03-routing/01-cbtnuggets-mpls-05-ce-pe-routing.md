# 05 CE-PE Routing

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/MPLS/05 CE-PE Routing`  
> Original source context: 01 CBTNUGGETS / MPLS. Content is preserved as historical study material; validate commands against the target platform and release.

```text
PE1(config)# router ospf 101 vrf CUST_A
PE1(config-router)# network 192.168.0.0 0.0.0.3 area0
PE1(config-router)# exit

PE1(config)# router eigrp 1
PE1(config-router)# address-family ipv4 vrf CUST_B autonomous-system 1
PE1(config-router-af)# network 192.168.0.0 0.0.0.3
PE1(config-router-af)# end



PE2(config)# router rip
PE2(config-router)# version 2
PE2(config-router)# address-family ipv4 vrf CUST_A
PE2(config-router-af)# network 172.16.0.0
PE2(config-router-af)# no auto-summary 
PE2(config-router-af)# end

PE2(config)# router bgp 500
PE2(config-router)# address-family ipv4 vrf CUST_B
PE2(config-router-af)# neighbor 192.168.0.2 remote-as 64600
PE2(config-router-af)# exit
PE2(config-router)# address-family vpnv4 
PE2(config-router-af)# neighbor 10.100.0.100 next-hop-self
```

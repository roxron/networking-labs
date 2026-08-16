# 06 Redistribution

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/MPLS/06 Redistribution`  
> Original source context: 01 CBTNUGGETS / MPLS. Content is preserved as historical study material; validate commands against the target platform and release.

```text
PE1(config)# router bgp 500 

PE1(config-router)# address-family ipv4 vrf CUST_A
PE1(config-router-af)# redistribute ospf 101 vrf CUST_A
PE1(config-router-af)# end
!
PE1(config)# router ospf 101 vrf CUST_A 
PE1(config-router)# redistribute bgp 500 subnets
!
!
PE1(config)# router bgp 500 
PE1(config-router)# address-family ipv4 vrf CUST_B
PE1(config-router-af)# redistribute eigrp 1
PE1(config-router-af)# end
!
PE1(config)# router eigrp 1
PE1(config-router)# address-family ipv4 vrf CUST_B autonomous-system 1
PE1(config-router-af)# redistribute bgp 500 metric 1 1 1 1 1

PE1# show ip bgp vpnv4 rd 10.100.0.100 labels
PE1# show bgp vpnv4 unicast rd 10.100.0.100 labels
PE1# show bgp vpnv4 unicast vrf CUST_A labels 
PE1# show mpls forwarding-table vrf CUST_A
PE1# show ip cef vrf CUST_A 
PE1# show bgp vpnv4 unicast vrf CUST_A 
PE1# show bgp vpnv4 unicast vrf CUST_A 192.168.0.0/16
```

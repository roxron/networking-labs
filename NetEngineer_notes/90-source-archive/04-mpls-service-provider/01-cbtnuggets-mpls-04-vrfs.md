# 04 VRFs

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/MPLS/04 VRFs`  
> Original source context: 01 CBTNUGGETS / MPLS. Content is preserved as historical study material; validate commands against the target platform and release.

```text
PE1(config)# ip vrf CUST_A
or
PE1(config)# vrf definition CUST_A 
 route-target export 10.10.10.1:103
 route-target import 10.10.10.2:103
PE1(config-vrf)# rd 10.100.0.100:1
PE1(config-vrf)# address-family ipv4
PE1(config-vrf-af)# route-target export 10.100.0.100:101
PE1(config-vrf-af)# route-target import 10.100.0.200:101
PE1(config-vrf-af)# exit
PE1(config)# interface G0/2
PE1(config-if)# vrf forwarding CUST_A
PE1(config-if)# ip address 192.168.0.1 255.255.255.252
PE1(config-if)# exit
!
PE1(config)# vrf definition CUST_B
PE1(config-vrf)# rd 10.100.0.100:2
PE1(config-vrf)# address-family ipv4
PE1(config-vrf-af)# route-target export 10.100.0.100:102
PE1(config-vrf-af)# route-target import 10.100.0.200:102
PE1(config-vrf-af)# exit
PE1(config)# interface G0/3
PE1(config-if)# vrf forwarding CUST_B
PE1(config-if)# ip address 192.168.0.1 255.255.255.252
PE1(config-if)# exit


PE1# show ip interface brief 
PE1# show vrf
PE1# show ip route vrf CUST_A


PE2(config)# vrf definition CUST_A
PE2(config-vrf)# rd 10.100.0.200:1
PE2(config-vrf)# address-family ipv4
PE2(config-vrf-af)# route-target export 10.100.0.200:101
PE2(config-vrf-af)# route-target import 10.100.0.100:101
PE2(config-vrf-af)# exit
PE2(config)# interface G0/2
PE2(config-if)# vrf forwarding CUST_A
PE2(config-if)# ip address 172.16.0.1 255.255.255.252
PE2(config-if)# exit
!
PE2(config)# vrf definition CUST_B
PE2(config-vrf)# rd 10.100.0.200:2
PE2(config-vrf)# address-family ipv4
PE2(config-vrf-af)# route-target export 10.100.0.200:102
PE2(config-vrf-af)# route-target import 10.100.0.100:102
PE2(config-vrf-af)# exit
PE2(config)# interface G0/3
PE2(config-if)# vrf forwarding CUST_B
PE2(config-if)# ip address 172.16.0.1 255.255.255.252
PE2(config-if)# exit
```

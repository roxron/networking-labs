# 007 VRFs on the PE

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS Core Concepts - VPN Technologies/007 VRFs on the PE`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS Core Concepts - VPN Technologies. Content is preserved as historical study material; validate commands against the target platform and release.

```text
PE(config)# ip vrp 101:CBT 
PE(config-vrf)# rd 1.1.1.1:11
PE(config-vrf)# route-target export 1.1.1.1:101
PE(config-vrf)# route-target import 5.5.5.5:101 
PE(config-vrf)# exit
!
PE1# show vrf 
!
PE(config)# int g0/1 
PE(config-if)# ip vrf forwarding 101:CBT
PE(config-if)# ip address 10.0.0.14 255.255.255.252
PE(config-if)# exit 
!
PE# show ip route vrf 101:CBT
!
```

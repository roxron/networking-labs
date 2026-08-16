# 03 Confugre Virtual Device Context

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/Cisco DATA CENTER/03 Confugre Virtual Device Context`  
> Original source context: 01 CBTNUGGETS / Cisco DATA CENTER. Content is preserved as historical study material; validate commands against the target platform and release.

```text
n7k# configure terminal 
n7k(config)# vdc NX10 
!
n7k(config)# no vdc NX10 
!
n7k(config)# show vdc 
!
n7k(config)# vdc VDC-A
n7k(config-vdc)# allocate inteface enternet 2/1 
!
n7k(config)# switchto vdc VDC-A
!
n7k(config)# switchback 
!
n7k(config)# show vdc membership 
!
n7k(config)# show vdc resource 
!
n7k(config)# vdc VDC-A
n7k(config-vdc)# limit-resource u4route-mem minimum 10 maximum 200
!
n7k# show running-config vdc | begin VDC-A
!
!
n7k(config)# vdc resource templete TEST 
n7k(config-vdc-template)# limit-resource vlan minimum 32 maximum 256
n7k(config-vdc-template)# limit-resource vrf minimum 32 maximum 64 
n7k(config-vdc-template)# exit
n7k(config)# vdc VDC-A 
n7k(config-vdc)# template TEST 
n7k(config-vdc)# show vdc resource template TEST 
!
!
Set up VDC HA
!
n7k(config)# vdc VDC-B 
n7k(config-vdc)# ha-policy dual-sup restart single-sup restart 
!
n7k(config)# vdc VDC-C 
n7k(config-vdc)# ha-policy dual-sup bridgedown single-sup bridgedown 
!
!
n7k# show vdc detail 
!
n7k# copy run star vdc-all 
!
n7k# vdc VDC-B restart 
!
n7k# vdc VDC-B suspend 
!
!
FCoE VDC is Storage 
!
```

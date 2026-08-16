# 006 MBGP on the PE devices

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS Core Concepts - VPN Technologies/006 MBGP on the PE devices`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS Core Concepts - VPN Technologies. Content is preserved as historical study material; validate commands against the target platform and release.

```text
PE1(config)# router bgp 65536
PE1(config-router)# neighbor 192.168.0.4 remote-as 65536 
PE1(config-router)# neighbor 192.168.0.4 update-source lo0
PE1(config-router)# address-family vpnv4 unicast
PE1(config-router-af)# neighbor 192.168.0.4 activate 
PE1(config-router-af)# neoghbor 192.168.0.4 send-community extended 
!
PE2(config)# router bgp 65536
PE2(config-router)# neighbor 192.168.0.2 remote-as 65536 
PE2(config-router)# neighbor 192.168.0.2 update-source lo0
PE2(config-router)# address-family vpnv4 unicast
PE2(config-router-af)# neighbor 192.168.0.2 activate 
PE2(config-router-af)# neoghbor 192.168.0.2 send-community extended 
!
Verify MBGP:
!
PE1# show ip bgp neighbors
```

# 03 PE-PE mBGP

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/MPLS/03 PE-PE mBGP`  
> Original source context: 01 CBTNUGGETS / MPLS. Content is preserved as historical study material; validate commands against the target platform and release.

```text
PE1(config)# router bgp 500 
PE1(config-router)# neighbor 10.100.0.200 remote-as 500
PE1(config-router)# neighbor 10.100.0.200 update-source Lo0
PE1(config-router)# address-family vpnv4
PE1(config-router-af)# neighbor 10.100.0.200 activate   
PE1(config-router-af)# neighbor 10.100.0.200 send-community extended
PE1(config-router-af)# end
PE1#

PE2(config)# router bgp 500 
PE2(config-router)# neighbor 10.100.0.100 remote-as 500
PE2(config-router)# neighbor 10.100.0.100 update-source Lo0
PE2(config-router)# address-family vpnv4
PE2(config-router-af)# neighbor 10.100.0.100 activate   
PE2(config-router-af)# neighbor 10.100.0.100 send-community extended
PE2(config-router-af)# end
PE2#

PE1# show ip bgp neighbors | section capabilities 
PE1# show control-plane host open-ports
```

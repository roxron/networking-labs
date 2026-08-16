# 10 Control Plane Protection Conf

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/10 Control Plane Protection Conf`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure ICMP rate limit on Control Plane:
!
R1(config)# access-list 100 icmp any any
R1(config)# class-map ICMP
R1(config-cmap)# match access-group ICMP
R1(config-cmap)# exit
R1(config)# policy-map ICMP_POLICY 
R1(config-pmap)# class ICMP 
R1(config-pmap-c)# police 8000 conform-action trasmiy exceed-action drop 
R1(config-pmap-c)# exit
R1(config-pmap)# exit
R1(config)# control-plane 
R1(config-cp)# service-policy input ICMP_POLICY 
R1(config-cp)# end
R1#
!
R1# show policy-map control-plane 
R1#
```

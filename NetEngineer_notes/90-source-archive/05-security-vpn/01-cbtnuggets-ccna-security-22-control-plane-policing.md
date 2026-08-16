# 22 Control Plane Policing

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/22 Control Plane Policing`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# access-list 100 permit icmp any any
!
R1(config)# class-map ICMP match access-group 100
R1(config-cmap)# match access-group 100
R1(config-cmap)# exit
!
R1(config)# policy-map ICMP-POLICY
R1(config-pmap)# class ICMP
R1(config-pmap-c)# police 8000 conform-action transmit exceed-action drop
R1(config-pmap-c)# exit
!
R1(config)# control-plane
R1(config-cp)# service-policy input ICMP-POLICY
R1(config-cp)# end
!
Verify:
!
R1# show policy-map control-plane
!
```

# 15 IPV6 Zone-based Firewall

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/IPV6/15 IPV6 Zone-based Firewall`  
> Original source context: 01 CBTNUGGETS / IPV6. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R2(config)# zone security INSIDE 
R2(config-sec-zone)# description This represents the trusted network 
R2(config-sec-zone)# exit
R2(config)# zone security OUTSIDE 
R2(config-sec-zone)# description This represents the untrusted network 
R2(config-sec-zone)# exit
R2(config)# zone security DMZ 
R2(config-sec-zone)# description This represents the DMZ 
R2(config-sec-zone)# exit
!
R2(config)# interface G0/0
R2(config-if)# zone-member security INSIDE
R2(config-if)# exit
R2(config)# interface G0/1 
R2(config-if)# zone-member security OUTSIDE
R2(config-if)# exit
R2(config)# interface G0/2
R2(config-if)# zone-member security DMZ
R2(config-if)# exit
!
R2(config)# ipv6 access-list IN2OUT-ACL
R2(config-ipv6-acl)# permit icmp 2001:DB8:A001::/48 any 
R2(config-ipv6-acl)# exit
!
R2(config)# class-map type inspect match-any CMAP
R2(config-cmap)# match protocol http 
R2(config-cmap)# match protocol https 
R2(config-cmap)# match protocols ssh
R2(config-cmap)# match access-group name IN2OUT-ACL
R2(config-cmap)# exit
!
R2(config)# policy-map type inspect PMAP
R2(config-pmap)# class type inspect CMAP
R2(config-pmap-c)# inspect 
R2(config-pmap-c)# exit
R2(config-pmap)# class class-default
R2(config-pmap-c)# drop log
R2(config-pmap-c)# exit
R2(config-pmap)# exit
!
R2(config)# zone-pair sec IN2OUT source INSIDE dest OUTSIDE
R2(config-sec-zone-pair)# service-policy type inspect PMAP
R2(config-sec-zone-pair)# end
R2#





R2# show zone security 
R2# show zone-pair security 
R2# show class-map type inspect
R2# show policy-map type inspect 
R2# show policy-map type inspect zone-pair
R2# show policy-map type inspect zone-pair sessions
```

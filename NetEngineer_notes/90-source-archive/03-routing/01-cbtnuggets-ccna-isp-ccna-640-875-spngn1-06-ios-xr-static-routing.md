# 06 IOS-XR Static Routing

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA ISP/CCNA 640-875 SPNGN1/06 IOS-XR Static Routing`  
> Original source context: 01 CBTNUGGETS / CCNA ISP / CCNA 640-875 SPNGN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
XR1(config)# router static 
XR1(config-static)# address-family ipv4 unicast
XR1(config-static-afi)# 10.0.0.0/24 192.168.10.2
XR1(config-static-afi)# commit 

XR1# show route ipv4 
XR1# show protocol ipv4
```

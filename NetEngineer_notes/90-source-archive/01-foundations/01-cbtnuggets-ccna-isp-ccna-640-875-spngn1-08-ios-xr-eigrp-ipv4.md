# 08 IOS-XR EIGRP IPv4

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA ISP/CCNA 640-875 SPNGN1/08 IOS-XR EIGRP IPv4`  
> Original source context: 01 CBTNUGGETS / CCNA ISP / CCNA 640-875 SPNGN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Basic Configuration:
XR1(config)# router eigrp 100
XR1(config-eigrp)# address-family ipv4 unicast 
XR1(config-eigrp-af)# router-id 1.1.1.1
XR1(config-eigrp-af)# interface G0/0/0/1 
XR1(config-eigrp-af)# commit
!
XR1# show eigrp ipv4 neighbor 
XR1# show eigrp ipv4 topology 
XR1# show eigrp ipv4 interfacs
XR1# show route eigrp 
!
!
```

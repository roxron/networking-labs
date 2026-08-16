# 09 IOS-XR EIGRP IPv6

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA ISP/CCNA 640-875 SPNGN1/09 IOS-XR EIGRP IPv6`  
> Original source context: 01 CBTNUGGETS / CCNA ISP / CCNA 640-875 SPNGN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Basic Configuration EIGRP IPv6:
!
router eigrp 100
!
 address-family ipv6
  router-id 1.1.1.1
  interface GigabitEthernet0/0/0/1

Verify:
XR1# show eigrp ipv6 neighbors
XR1# show eigrp ipv6 interface 
XR1# show eigrp ipv6 topology 
XR1# show route ipv6 eigrp
```

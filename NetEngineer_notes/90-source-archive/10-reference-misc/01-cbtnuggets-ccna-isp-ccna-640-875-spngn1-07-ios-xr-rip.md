# 07 IOS XR RIP

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA ISP/CCNA 640-875 SPNGN1/07 IOS_XR RIP`  
> Original source context: 01 CBTNUGGETS / CCNA ISP / CCNA 640-875 SPNGN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
XR1(config)# router rip 
XR1(config-rip)# no auto-summary 
XR1(config-rip)# interface g0/0/0/0
XR1(config-rip)# interface lo0
XR1(config-rip)# commit
XR1(config-rip)# end
!
XR1# show rip 
XR1# show route
```

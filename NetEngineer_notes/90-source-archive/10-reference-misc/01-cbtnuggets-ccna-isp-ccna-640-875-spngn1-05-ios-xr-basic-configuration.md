# 05 IOS-XR Basic Configuration

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA ISP/CCNA 640-875 SPNGN1/05 IOS-XR Basic Configuration`  
> Original source context: 01 CBTNUGGETS / CCNA ISP / CCNA 640-875 SPNGN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
XR# configure 
XR(config)# hostname XR1
XR1(config)# interface G0/0/0/0
XR1(config-if)# ipv4 address 192.168.10.1/24
XR1(config-if)# negotiation auto 
XR1(config-if)# exit
XR1(config)# commit
!
XR1(config)# commit best-effort 
!
XR1(config)# commit confirmed 30 
!
XR1(config)# commit replace 

XR# show configuration 
XR# show configuration merge
XR# show configuration changes 
XR# show configuration failed
```

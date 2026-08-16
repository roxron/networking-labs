# 07 Configure Standart ACL

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA ISP/Cisco CCNA 640-878 SPNGN2/07 Configure Standart ACL`  
> Original source context: 01 CBTNUGGETS / CCNA ISP / Cisco CCNA 640-878 SPNGN2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure Standart ACL on IOS-XR:
!
XR1(config)# ipv4 access-list BLOCK deny host 192.168.2.50 
XR1(config)# ipv4 access-list BLOCK permit any 
XR1(config)# interface g0/1/0/0 
XR1(config-if)# ipv4 access-group BLOCK ingress 
XR1(config-if)# commit
```

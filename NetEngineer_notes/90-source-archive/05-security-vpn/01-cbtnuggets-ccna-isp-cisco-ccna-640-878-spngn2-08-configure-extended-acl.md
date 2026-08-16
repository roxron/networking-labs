# 08 Configure Extended ACl

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA ISP/Cisco CCNA 640-878 SPNGN2/08 Configure Extended ACl`  
> Original source context: 01 CBTNUGGETS / CCNA ISP / Cisco CCNA 640-878 SPNGN2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure Extended ACL on IOS-XR:
!
XR1(config)# ipv4 access-list BLOCK2 permit tcp 192.168.2.0 0.0.0.127 host 10.1.1.1 eq 23
XR1(config)# ipv4 access-list BLOCK2 permit tcp 192.168.2.0 0.0.0.127 host 10.1.1.1 eq 22
XR1(config)# ipv4 access-list BLOCK2 deny ipv4 192.168.2.0 0.0.0.127 host 10.1.1.1 
XR1(config)# ipv4 access-list BLOCK2 permit ipv4 any any 
XR1(config)# commit 
XR1(config)# do show access-list  
XR1(config)# interface g0/1/0/0 
XR1(config-if)# ipv4 access-group BLOCK2 ingress
```

# 05 Tshoot IPv6 Address Assignment

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CCNP/CCNP TSHOOT by Kevin Wallace/M4 Tshoot IP Addressing/05 Tshoot IPv6 Address Assignment`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CCNP / CCNP TSHOOT by Kevin Wallace / M4 Tshoot IP Addressing. Content is preserved as historical study material; validate commands against the target platform and release.

```text
conf t
interface G0/0 
 ipv6 address 2001:DB8::1/64 
!
show ipv6 interface brief
!
interface G0/1 
 ipv6a address autoconfig 
!
show ipv6 interface G0/0 
!
interface G0/2 
 ipv6 dhcp relay destination 2003::2 
 ipv6 nd other-config-flag 
 ! (or for staful dhcp):
 ipv6 nd managed-config-flag 
!
```

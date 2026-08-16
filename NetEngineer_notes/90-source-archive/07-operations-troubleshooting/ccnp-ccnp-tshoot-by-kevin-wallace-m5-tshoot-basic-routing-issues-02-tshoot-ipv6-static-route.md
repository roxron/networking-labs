# 02 Tshoot IPv6 static route

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CCNP/CCNP TSHOOT by Kevin Wallace/M5 Tshoot Basic Routing ISsues/02 Tshoot IPv6 static route`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CCNP / CCNP TSHOOT by Kevin Wallace / M5 Tshoot Basic Routing ISsues. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1# ping 2001:DB8:1000::100
R1# show ipv6 route static
R1# show ipv6 protocols 
R1# show ipv6 interface brief 
!
R1(config)# ipv6 route 2001:db8:1010:AAAA::/64 2001:DB8:AAAA::1
!
```

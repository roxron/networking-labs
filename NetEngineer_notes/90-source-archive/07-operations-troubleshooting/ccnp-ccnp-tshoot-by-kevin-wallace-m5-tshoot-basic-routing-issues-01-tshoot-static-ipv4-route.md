# 01 Tshoot Static IPv4 route

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CCNP/CCNP TSHOOT by Kevin Wallace/M5 Tshoot Basic Routing ISsues/01 Tshoot Static IPv4 route`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CCNP / CCNP TSHOOT by Kevin Wallace / M5 Tshoot Basic Routing ISsues. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1# show ip route 
R1# show ip route static 
R1# show run | section ip route 
R1# ping 10.100.0.1 
R1# 
!
R1(config)# no ip route 172.16.1.0 255.255.255.0
R1(config)# ip route 172.16.2.0 255.255.255.0 G0/0 10.0.0.2
```

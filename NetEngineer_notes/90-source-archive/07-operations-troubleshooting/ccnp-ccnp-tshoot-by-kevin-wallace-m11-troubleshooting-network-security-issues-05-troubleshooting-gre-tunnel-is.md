# 05 Troubleshooting GRE Tunnel Issues

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CCNP/CCNP TSHOOT by Kevin Wallace/M11  Troubleshooting Network Security Issues/05 Troubleshooting GRE Tunnel Issues`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CCNP / CCNP TSHOOT by Kevin Wallace / M11  Troubleshooting Network Security Issues. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Troubleshooting GRE Tunnel Issues:
!
Common GRE Tunnel Issues:
!
> Source IP address for tunnel not reachable by far-end router 
> Destination IP address for tunnel not reachable by local router 
> GRE traffic blocked by ACL
> Fragmatation caused by inconsistent MTU settings 
> Best route to tunnel destination is through the tunnel (recursive routing)
!
Verify GRE Tunnel:
!
R1# show interface tunnel 1
R1# show ip route 
R1# show access-list
```

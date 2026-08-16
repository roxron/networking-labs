# 001 Subbpess Inactive

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/BOOKS/Jeff Doyle/Routing TCPIP Vol 2 Jeff Doyle/BGP and NLRI/001 Subbpess Inactive`  
> Original source context: 07 SAFARI ONLINE / BOOKS / Jeff Doyle / Routing TCPIP Vol 2 Jeff Doyle / BGP and NLRI. Content is preserved as historical study material; validate commands against the target platform and release.

```text
This will prevent BGP enabled router to advertise BGP routes with RIB failure to BGP other BGP peers! 
!
R1(config)# router bgp 100 
R1(config-router)# bgp suppress-inactive
```

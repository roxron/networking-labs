# 01 Review of Route Redistribution

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CCNP/CCNP TSHOOT by Kevin Wallace/M8 Tshoot Route Redistribution/01 Review of Route Redistribution`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CCNP / CCNP TSHOOT by Kevin Wallace / M8 Tshoot Route Redistribution. Content is preserved as historical study material; validate commands against the target platform and release.

```text
!
Reason for redistribution:
- Company has more than one IGP
- Company merger 
- Different departments under different administrative control 
- Connection to partner netwroks 

- IGP routes need to be advertised into BGP 
- BGP routes need to be advertised into IGP 
!
___________________________________________
ROUTING PROTOCOL   DEFAULT SEED METRIC 

      RIP               INFINITY 
     EIGRP              INFINITY
     OSPF               20(1 FOR BGP)
      BGP            USES THE IGP METRIC VALUE 
!
Basic route redistribution: 
!
OSPF routes go into EIGRP 
R2(config)# router eigrp 1 
R2(config-router)# redistribute ospf 1 
R2(config-router)# default-metric 1544 10 255 1 1500
!
EIGRP routes go into OSPF
R2(config)# router ospf 1
R2(config-router)# redistribute eigrp 1 subnets 
R2(config-router)# end 
 
R2
```

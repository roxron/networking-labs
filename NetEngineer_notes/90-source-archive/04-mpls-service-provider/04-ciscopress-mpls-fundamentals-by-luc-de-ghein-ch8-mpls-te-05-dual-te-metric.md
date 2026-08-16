# 05 Dual TE Metric

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/MPLS Fundamentals by luc De Ghein/CH8 MPLS TE/05 Dual TE Metric`  
> Original source context: 04 CISCOPRESS / MPLS Fundamentals by luc De Ghein / CH8 MPLS TE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
!
 Configuring the path-selection Metric:
!
london(config)#interface tunnel 1
london(config-if)#tunnel mpls traffic-eng path-selection ? 
  metric Metric type for path calculation
london(config-if)#tunnel mpls traffic-eng path-selection metric ?  
 igp Use IGP Metric  
  te Use TE Metric
!
!
Example 8-11. TE Metric
!
berlin# conf t
berlin(config)#int pos 0/0
berlin(config-if)# mpls traffic-eng administrative-weight 18
!
!
brussels#show mpls traffic-eng tunnels tunnel 1
!
!
!
Example 8-12. Path-Selection Metric IGP:
!
brussels(config)#interface tunnel 1
brussels(config-if)#tunnel mpls traffic-eng path-selection metric igp
brussels(config-if)#^Z
!
brussels#show mpls traffic-eng tunnels tunnel 1
!
!
```

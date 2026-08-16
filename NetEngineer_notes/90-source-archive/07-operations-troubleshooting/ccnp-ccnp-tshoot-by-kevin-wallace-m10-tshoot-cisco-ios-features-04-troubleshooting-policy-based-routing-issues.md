# 04 Troubleshooting Policy-Based Routing Issues

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CCNP/CCNP TSHOOT by Kevin Wallace/M10 Tshoot Cisco IOS Features/04 Troubleshooting Policy-Based Routing Issues`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CCNP / CCNP TSHOOT by Kevin Wallace / M10 Tshoot Cisco IOS Features. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Troubleshooting Policy-Based Routing Issues:
!
> Is the policy applied correctly
> Are the route map statements in the correct order?
> is the appropriate traffic being matched?
> Is the appropriate action specified? 
!
Verify PBR:
!
R1# traceroute 198.21.15.10
R1# show ip access-list 
R1# show ip policy 
R1# show roure-map 
R1# debug ip policy
```

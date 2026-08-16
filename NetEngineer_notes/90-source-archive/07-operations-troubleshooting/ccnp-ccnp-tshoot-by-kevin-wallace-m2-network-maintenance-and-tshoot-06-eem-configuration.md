# 06 EEM Configuration

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CCNP/CCNP TSHOOT by Kevin Wallace/M2  Network Maintenance and Tshoot/06 EEM Configuration`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CCNP / CCNP TSHOOT by Kevin Wallace / M2  Network Maintenance and Tshoot. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Embedded Event Manager:
!
R1(config)# event manager applet COUNTER_RESET
R1(config-applet)# event cli pattern "clear counters" sync no skip no occurs 1 
R1(config-applet)# action 1 syslog priority informational msg "Update network Docs to record why the counters were reset."
R1(config-applet)# end
```

# 02 Troubleshooting Syslog and SNMP Issues

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CCNP/CCNP TSHOOT by Kevin Wallace/M10 Tshoot Cisco IOS Features/02 Troubleshooting Syslog and SNMP Issues`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CCNP / CCNP TSHOOT by Kevin Wallace / M10 Tshoot Cisco IOS Features. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Troubleshooting Syslog and SNMP Issues:
!
> Server Reachability 
> Wrong Address 
> Wrong Syslog Level
> Wrong SNMP Version or Community String 
> SNMP Traps is not enable 
> 
!
Verify Syslog:
!
R1# show logging 
!
!
Verify SNMP:
!
R1# show snmp group
R1# show run | include ^snmp-sever
```

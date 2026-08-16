# 07 Logging and Tracing

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIA-Junos JN0-102/07 Logging and Tracing`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIA-Junos JN0-102. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Logging:
root# edit system syslog 
[edit system syslog] 
root# set user rustem ntp error 
root# set host 10.0.2.25 any any
root# set file LOG1 any warning

Tracing:
root# edit protocols ospf
root# set traceoptions file OSPF_SAMPLE size 256K
root# set traceoptions flag lsa-update detail
root# exit
root> show log MYLOG
root> clear log MYLOG
```

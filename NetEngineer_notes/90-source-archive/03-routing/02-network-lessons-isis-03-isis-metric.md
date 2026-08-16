# 03 IS-IS Metric

> Imported source note. Provenance: `NetEngineer_Journal/02 NETWORK LESSONS/IS-IS/03 IS-IS Metric`  
> Original source context: 02 NETWORK LESSONS / IS-IS. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Change metric:
R1(config)# interface G0/1
R1(config-if)# isis metric 5 

Wide metric:
R1(config)# router isis 
R1(config-router)# metric-style wide

Set maximum metric:     
R1(config)# interface G0/1
R1(config-if)# isis metric maximum
```

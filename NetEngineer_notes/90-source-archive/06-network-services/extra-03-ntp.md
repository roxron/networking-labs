# 03 NTP

> Imported source note. Provenance: `NetEngineer_Journal/Extra/03 NTP`  
> Original source context: Extra. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure NTP Server:
R1(config)# ntp master 
R1(config)# interface S0/0
R1(Config-if)# ntp broadcast

Configure NTP Client:
R2(config)# int S0/0
R2(config-if)# ntp broadcast cleint
R2(config-if)# exit
R2(config)# 

R2# show ntp associations
R2# show ntp status
```

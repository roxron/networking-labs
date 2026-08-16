# 04 Setting Date, Time, NTP

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CIsco ASA/04 Basic Settings/04 Setting Date, Time, NTP`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CIsco ASA / 04 Basic Settings. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure TimeZone:
!
asa(config)# clock timezone EST -5 
ASA(config)# clock summer-time EST recurring
asa(config)# 
!
!
Set time Manually:
!
asa(config)# clock set 16:09;00 february 28 2015 
!
asa# show clock
!
!
Configure NTP Client:
!
asa(config)# ntp authenticate 
asa(config)# ntp treusted-key 1 
asa(config)# ntp authentication-key 1 md5 cisco
!
asa(config)# ntp server 10.11.12.123 key 1 prefer
!
```

# 011  Logging Switch Activity

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP SWITCH/011  Logging Switch Activity.txt`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Chapter 13. Logging Switch Activity
!
Logging to the Switch Console:
!
Switch(config)# logging console 5
!
Switch# terminal monitor 
!
Logging to the Internal Buffer:
!
Switch(config)# logging buffered 5
Switch(config)# logging buffered 100000
!
show logging
!
Logging to a Remote Syslog Server:
!
Switch(config)# logging host 10.100.10.14
Switch(config)# logging trap informational
!
Switch(config-if)# no logging event link-status
!
Adding Time Stamps to Syslog Messages:
!
Switch(config)# service timestamp 
!
Setting the Internal System Clock
!
Switch(config)# clock timezone EST -5
Switch(config)# clock summer-time EDT recurring
Switch(config)# exit
Switch# clock set 15:23:00
!
show clock 
!
!
Using NTP to Synchronize with an External Time Source:
!
Switch(config)# ntp server 192.168.2.168 prefer
Switch(config)# ntp server 24.56.178.140
!
Switch# show ntp status
Switch# show ntp associations
!
Securing NTP:
!
Switch(config)# ntp authentication-key 1 md5 CISCO
Switch(config)# ntp authenticate
Switch(config)# ntp trusted-key 1
Switch(config)# ntp server 10.0.0.10 key 1
!
Switch(config)# access-list 1 permit 192.168.0.0 0.0.0.255
Switch(config)# ntp access-group serve 1 
!
Using SNTP to Synchronize Time:
!
Switch(config)# sntp authentication-key key-number md5 key-string
Switch(config)# sntp authenticate
Switch(config)# sntp trusted-key key-number
Switch(config)# sntp server ip-address key key-number
!
Adding Time Stamps to Logging Messages:
!
Switch(config)# service timestamps log datetime localtime show-timezone msec
```

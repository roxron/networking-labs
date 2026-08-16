# 06 Additional Initial Configuration Elements

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIA-Junos JN0-102/06 Additional Initial Configuration Elements`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIA-Junos JN0-102. Content is preserved as historical study material; validate commands against the target platform and release.

```text
NTP Configurations:

root# edit system ntp
[edit system ntp]
root# set server 10.0.0.2
root# set boot-server 10.0.0.2
root# set ntp authentication-key 1 type md5 value cisco

root> show ntp association 
root> show ntp status

SNMP Configurations:

root# edit snmp
[edit snmp]
root# set location NYC_Building100
root# set contact RUSTEM
root# set client-list MYLIST 10.0.1.0/24
root# set communit TEST
root# set trap-group MYGROUP version v2 catrgories chassis routing configuration
root# set trap-group MYGROUP targets 10.0.1.100
root# commit
```

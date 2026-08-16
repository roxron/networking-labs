# 03 Restoring Factory Defaults

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIA-Junos JN0-102/03 Restoring Factory Defaults`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIA-Junos JN0-102. Content is preserved as historical study material; validate commands against the target platform and release.

```text
root@% cli
root> edit 
root# edit system
root# set host-name JR1
root# set root-authentication plain-text-password 
*******
*******
root# set time-zone America/New_York 
root# commit

Restore Factory-Defualts:
root> edit 
root# load factory-default
root# set system root-authentication plain-text-password
******
******
root# commit
root# exit configuration-mode
root> request system reboot
```

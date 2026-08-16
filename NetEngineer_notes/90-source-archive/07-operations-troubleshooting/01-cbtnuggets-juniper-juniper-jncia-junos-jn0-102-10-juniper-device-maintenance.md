# 10 Juniper Device Maintenance

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIA-Junos JN0-102/10 Juniper Device Maintenance`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIA-Junos JN0-102. Content is preserved as historical study material; validate commands against the target platform and release.

```text
root> request system reboot
root> request system power-off
root> request system halt 
root> request system firmware 
root> show version 
root> request system software add [path:]
root> request system storage cleanup dry-run 

Recovering password:
Hit spacebar 

loader> boot -s 
/bin/sh: recovery 

Starting CLI...
root> configure 
root# set system root-authentication plain-text-password
*******
*******
root# commit 
root# exit

<<reboot>>
```

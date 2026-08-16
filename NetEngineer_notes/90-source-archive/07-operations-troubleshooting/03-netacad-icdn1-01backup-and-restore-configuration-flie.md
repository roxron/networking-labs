# 01Backup and restore Configuration flie

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN1/01Backup and restore Configuration flie.txt`  
> Original source context: 03 NETACAD / ICDN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Using TFTP
Backup:
R1#copy running-config tftp 
Restore:
R1#copy tftp running-config

Using USB drive
Backup:
R1# copy runnig-config usbflash0:
Restore:
R1# copy usbflash0:/R1-config running-config

R1# configure replace nvram:
```

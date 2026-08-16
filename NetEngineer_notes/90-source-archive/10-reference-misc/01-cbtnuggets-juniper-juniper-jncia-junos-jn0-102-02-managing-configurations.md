# 02 Managing Configurations

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIA-Junos JN0-102/02 Managing Configurations`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIA-Junos JN0-102. Content is preserved as historical study material; validate commands against the target platform and release.

```text
root> configure
root# edit system 
root# set host-name J1
root# commit 

root> configure exclusive 
root# edit system
root# set host-name Juniper1
root# exit

root> configure private 
root# edit system
root# set host-name JR1



[edit]
root@J1# edit protocols 
[edit protocols]
root@J1# edit ospf   
[edit protocols ospf]
root@J1# 

_______________________________________________

[edit protocols ospf]
root@J1# up 

[edit protocols ospf]
root@J1# top 

[edit protocols ospf]
root@J1# exit configuration-mode

____________________________________________________

[edit]
root@J1# edit system services 
[edit system services]
root@J1# set ftp 
[edit system services]
root@J1# delete ftp 

_________________________________________________________

root# show | compare 
________________________________________________________
root> show configuration | compare rollback 2
_________________________________________________________
[edit]
root@JUN1# rollback 2 
root@JUN1# commit
______________________________________________________________
[edit]
root@JUN1# save jun-config1

root@JUN1# load replace jun-config1 
load complete

_________________________________________________________________

[edit]
root@JUN1# run ping 10.0.0.1
_________________________________________________________________
```

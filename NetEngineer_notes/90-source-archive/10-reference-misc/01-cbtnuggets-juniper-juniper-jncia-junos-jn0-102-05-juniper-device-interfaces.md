# 05 Juniper Device Interfaces

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIA-Junos JN0-102/05 Juniper Device Interfaces`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIA-Junos JN0-102. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Interfaces commands:
root> show interfaces terse
root> show interface em0

roxron> configure 
roxron# edit interface
[edit interfaces]
roxron# edit em1  
[edit interfaces em1]
roxron# edit unit 0 
[edit interfaces em1 unit 0]
roxron# set family inet address 10.0.0.5/24 
roxron# commit

________________________________________________________

root# edit interfaces
[edit interfaces]
root#  set interface-range USERS member-range ge-0/0/1 to ge-0/0/8
```

# 001 Basic Switching

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIS-ENT (JN0-343) - Layer 2/001 Basic Switching`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIS-ENT (JN0-343) - Layer 2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Login: rout
root@:RE:0% cli 
root> 
!
root> show vlans
!
root> show ethernet-switching table 
!
root> edit 
root# set ethernet-switching-options interface ge-0/0/2.0 no-mac-learning 
root# set ethernet-switching-options mac-table-aging-time 120 
root# set vlans default mac-aging-time 180
```

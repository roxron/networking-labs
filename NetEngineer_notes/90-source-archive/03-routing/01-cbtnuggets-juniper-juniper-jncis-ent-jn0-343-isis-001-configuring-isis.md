# 001 Configuring IS-IS

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIS-ENT (JN0-343) – IS-IS/001 Configuring IS-IS`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIS-ENT (JN0-343) – IS-IS. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring IS-IS:
!
root> edit 
root# set protocols isis interface ge-0/0/0.0 
root# set protocols isis interface lo0.0
root# set protocols isis interface ge-0/0/1.0 level 2 disable 
!
root# set interfaces ge-0/0/0.0 family iso 
root# set interfaces ge-0/0/1.0 family iso 
root# set interfaces lo0.0 family iso address 49.0001.0000.0000.0010.00 
!
```

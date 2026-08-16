# 003 Troubleshooting IS-IS

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIS-ENT (JN0-343) – IS-IS/003 Troubleshooting IS-IS`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIS-ENT (JN0-343) – IS-IS. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Troubleshooting IS-IS:
!
root> show isis adjacency
! 
root> edit 
root# show protocols isis
!
root> edit 
root# set protocols isis traceoptions file ISIS-DEBUG 
root# set protocols isis traceoptions flag error
root# commit and-quit 
!
rooo> show log ISIS-DEBUG 
!
root> clear log ISIS-DEBUG 
!
```

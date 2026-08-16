# 01 Configuring Multiple Context

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CIsco ASA/03 Multiple Context Mode/01 Configuring Multiple Context`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CIsco ASA / 03 Multiple Context Mode. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Changing the Mode:
!
asa(config)# mode multiple
!
Verify mode:
!
asa1# show mode
!
Creating a Security Context:
!
asa(config)# context customer1
asa(config-ctx)# descriptioin customer 1 context
asa(config-ctx)# allocate-interface gigabitethernet0/1.101 int1
asa(config-ctx)# allocate-interface gigabitethernet0/1.102 int2
asa(config-ctx)# config-url disk0:context1.cfg
!
Verify contxt:
!
asa# show context
!
```

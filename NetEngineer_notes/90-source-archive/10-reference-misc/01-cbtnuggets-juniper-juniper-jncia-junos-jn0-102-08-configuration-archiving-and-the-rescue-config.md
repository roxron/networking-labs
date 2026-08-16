# 08 Configuration Archiving and the Rescue Config

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIA-Junos JN0-102/08 Configuration Archiving and the Rescue Config`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIA-Junos JN0-102. Content is preserved as historical study material; validate commands against the target platform and release.

```text
root# edit system 
root# set archival configuration transfer-on-commit
root# set archival configuration archival-sites "scp://10.10.2.200/"


root> request system configuration rescue save
root> configure 
root# rollback rescue
root# commit
```

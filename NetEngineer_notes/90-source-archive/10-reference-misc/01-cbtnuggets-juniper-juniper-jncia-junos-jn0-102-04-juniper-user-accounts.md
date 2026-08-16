# 04 Juniper User Accounts

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIA-Junos JN0-102/04 Juniper User Accounts`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIA-Junos JN0-102. Content is preserved as historical study material; validate commands against the target platform and release.

```text
root@% cli
root> configure 
root# set system authentication-order [password]
root# edit system login
[edit system login]
root# set user Rustem class super-user 
root# set user Rustem full-name Rustem Saliev 
root# set user Rustem authentication plain-text-password
*****
*****
root# set system root-authentication plain-text-password
*****
*****
root# commit check 
root# commit and-quit 
root> 
root> file list /var
```

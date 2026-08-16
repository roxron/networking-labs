# 33 CA Server out of IOS Router

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/33 CA Server out of IOS Router`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
crypto pki server My-CA_Server
database url nvram:
database level minimum
issuer-name CN=MY_CA.labsproject.net L=VA C=US
cdp=url <http://192.168.1.10/CA_Server.crl>
grant auto 
no shutdown 
!
```

# CH2 Secure the Network Devices

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/CCNA Security/CH2 Secure the Network Devices`  
> Original source context: 03 NETACAD / CCNA Security. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Increasing Access Security:
R1(config)# security passwords min-length 10
R1(config)# service password-encryption
R1(config)# line vty 0 15
R1(config-line)# exec-timeout 3 30
R1(config-line)# line console 0
R1(config-line)# exec-timeout 3 30
```

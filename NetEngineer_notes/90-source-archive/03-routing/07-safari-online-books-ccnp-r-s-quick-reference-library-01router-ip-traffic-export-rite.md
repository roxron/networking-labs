# 01Router IP Traffic Export (RITE)

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/BOOKS/CCNP R&S Quick reference Library/01Router IP Traffic Export (RITE)`  
> Original source context: 07 SAFARI ONLINE / BOOKS / CCNP R&S Quick reference Library. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuration:
!
R1(config)# ip traffic-export profile rite
R1(config-rite)# interface FastEthernet 0/1
R1(config-rite)# bidirectional
R1(config-rite)# mac-address c401.1a30.0000
R1(config-rite)# incoming access-list my_acl
R1(config-rite)# outgoing sample one-in-every 10
R1(config)# interface FastEthernet0/0
R1(config-if)# ip traffic-export apply rite
```

# 04 DTP Configurations

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN2/04 DTP Configurations.txt`  
> Original source context: 03 NETACAD / ICDN2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Disable DTP:
Trunk between S1 F0/1 and S2 F0/1
S1(Config)# interface F0/1
S1(config-if)# switchport trunk
S1(config-if)# switchport nonegotiate

S2(config)# interface F0/1
S1(config-if)# switchport dynamic auto
S1(config-if)# switchport nonegotiate

Verify DTP:
S1# show dtp inteface F0/1
S1# show interface F0/1 switchport
```

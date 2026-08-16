# 03 Managing PoE

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP SWITCH/03 Managing PoE`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Show Commands:
S1# show power inline 
Configure:
S1(config)# interface G0/1
S1(config-if)# power inline auto 
or
S1(config-if)# power inline never
setup consumption:
S1(config-if)# power inline consumption 7000
```

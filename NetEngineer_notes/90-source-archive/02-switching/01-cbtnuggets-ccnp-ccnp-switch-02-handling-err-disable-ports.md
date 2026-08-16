# 02 HAndling Err-Disable Ports

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP SWITCH/02 HAndling Err-Disable Ports`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
S1(config)# errdisable recovery cause psecure-violation
S1(config)# errdisable recovery interval 30

S1# show errdisable recovery 
S1# show interface G0/1 status err-disabled
```

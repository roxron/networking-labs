# 13  Switch%3a Troubleshooting L2 and L3 Etherchannel

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/13  Switch%3a Troubleshooting L2 and L3 Etherchannel`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Switch: Troubleshooting L2 and L3 Etherchannel:
!
ETHERCHANNEL FLY-BY:
!
> LACP, PAgP, Manual 
> Layer 2, Layer 3
> Load-Balancing
!
What Can Go Wrong?:
!
> Mismatched Port Configurations
> Order of Configuration (Channel-Group Last) 
> Mismatched EtherChannel Configuration 
> Inefficient Distribution Algorithm 
!
S1# show etherchannel summary 
S1# show etherchannel load-balance 
S1# show run <interface>
!
```

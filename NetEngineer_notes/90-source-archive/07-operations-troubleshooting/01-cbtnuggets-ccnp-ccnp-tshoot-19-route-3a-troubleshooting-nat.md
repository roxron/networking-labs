# 19 Route%3a Troubleshooting NAT

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/19 Route%3a Troubleshooting NAT`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Route: Troubleshooting NAT:
!
NAT: What Can GO Wrong?:
!
> Interface NOT Identified Correctly 
> NAT Pool Misconfigured/ Wrong Addresses Used 
> Access-List Does not Identify Correct IP Address
> Missing "OVERLOAD" for PAT 
!
- show run | include ip nat 
- show ip nat translations 
- clear ip nat translations *
- show ip nat statistics 
- debug ip nat 
!
!
```

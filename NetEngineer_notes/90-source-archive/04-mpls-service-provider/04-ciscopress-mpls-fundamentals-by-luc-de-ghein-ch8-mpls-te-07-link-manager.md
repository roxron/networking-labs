# 07 Link Manager

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/MPLS Fundamentals by luc De Ghein/CH8 MPLS TE/07 Link Manager`  
> Original source context: 04 CISCOPRESS / MPLS Fundamentals by luc De Ghein / CH8 MPLS TE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Example 8-17. Checking the TE Link Manager:
!
rome#show mpls traffic-eng link-management ?  
admission-control     Link Management admission-control  
advertisements        Link Management advertisements  
bandwidth-allocation  Link Management bandwidth-allocation  
igp-neighbors         Link Management igp-neighbors  
interfaces            Link Management Traffic Engineering interfaces  
statistics            Link Management Traffic Engineering statistics  
summary               Link Management summary
!
rome# debug mpls traffic-eng link-management ? 
admission-control     Link admission control  
advertisements        Link state advertisements  
bandwidth-allocation  Link bandwidth allocation  
errors                Link Management errors  
events                Link Management process events  
igp-neighbors         Link IGP-neighbor adjacencies  
links                 Link configuration activity  
preemption            Link Management preemption  
routing               Link local routing decisions
```

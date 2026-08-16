# 01 Core CAM, TCAM, SDM Tem

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP SWITCH/01 Core CAM, TCAM, SDM Tem`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
mac table:
S1# show mac address-table 
S1(config)# mac address-table static 1111.1111.1111 vlan 1 interface G0/0

Show Commands:
S1# show platform tcam utilization

SDM 
S1# show sdm prefer 
S1# show sdp prefer access
S1(config)# sdm prefer access 
or 
S1(config)# sdm prefer routing
```

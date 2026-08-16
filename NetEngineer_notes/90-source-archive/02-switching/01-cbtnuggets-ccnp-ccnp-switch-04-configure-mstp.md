# 04 Configure MSTP

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP SWITCH/04 Configure MSTP`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
S1(config)# spanning-tree mst configuration
S1(config-mst)# name Region1
S1(config-mst)# revision 1
S1(config-mst)# instance 1 vlan 1-3
S1(config-mst)# instance 2 vlan 4-6
S1(config-mst)# exit
S1(config)# spanning-tree mode mst
S1(config)# spanning-tree mst 1 root primary 
S1(config)# spanning-tree mst 2 root secondary 

S2(config)# spanning-tree mst configuration
S2(config-mst)# name Region1
S2(config-mst)# revision 1
S2(config-mst)# instance 1 vlan 1-3
S2(config-mst)# instance 2 vlan 4-6
S2(config-mst)# exit
S2(config)# spanning-tree mode mst
S2(config)# spanning-tree mst 2 root primary 
S2(config)# spanning-tree mst 1 root secondary

S1#show spanning-tree mst configuration
```

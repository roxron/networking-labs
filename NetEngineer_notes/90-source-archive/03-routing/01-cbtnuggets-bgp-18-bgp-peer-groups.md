# 18 BGP Peer Groups

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/BGP/18 BGP Peer Groups`  
> Original source context: 01 CBTNUGGETS / BGP. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# router-bgp 500
R1(config-router)# neighbor IBGPCLI peer-group 
R1(config-router)# neighbor IBGPCLI remote-as 500
R1(config-router)# neighbor IBGPCLI update-source Lo100 
R1(config-router)# neighbor IBGPCLI next-hop-self
R1(config-router)# neighbor IBGPCLI route-reflector-client
R1(config-router)# neighbor IBGPCLI soft-reconfiguration inbound
R1(config-router)# neighbor 1.1.1.1 peer-group IBGPCLI
R1(config-router)# neighbor 2.2.2.2 peer-group IBGPCLI
R1(config-router)# neighbor 3.3.3.3 peer-group IBGPCLI
R1(config-router)# neighbor 4.4.4.4 peer-group IBGPCLI
R1(config-router)# exit
```

# 02 Named EIGRP

> Imported source note. Provenance: `NetEngineer_Journal/02 NETWORK LESSONS/CCNP/CCNP ROUTE/02 Named EIGRP`  
> Original source context: 02 NETWORK LESSONS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# router eigrp MY_EIGRP
R1(config-router)# address-family ipv4 autonomous-system 10
R1(config-router-af)# eigrp router-id 1.1.1.1
R1(config-router-af)# network 10.0.0.0 0.0.0.3 
R1(config-router-af)# network 192.168.1.0 0.0.0.255
R1(config-router-af)# topology base
R1(config-router-af-topology)# no auto-summary 
R1(config-router-af-topology)# redistribute static
R1(config-router-af-topology)# exit
R1(config-router-af)# af-inteface G0/0
R1(config-router-af-interface)# bandwidth-percent 10
R1(config-router-af-interface)# hello-interval 1 
R1(config-router-af-interface)# hold-time 3
R1(config-router-af-interface)# authentication mode md5
R1(config-router-af-interface)# authentication key-chain EIGRP
R1(config-router-af-interface)# end
R1#
```

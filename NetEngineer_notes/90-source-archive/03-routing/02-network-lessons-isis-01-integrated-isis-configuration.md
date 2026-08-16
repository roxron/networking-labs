# 01 Integrated IS-IS Configuration

> Imported source note. Provenance: `NetEngineer_Journal/02 NETWORK LESSONS/IS-IS/01 Integrated IS-IS Configuration`  
> Original source context: 02 NETWORK LESSONS / IS-IS. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# router isis
R1(config-router)# net 49.0005.0000.0000.0001.00
R1(config-router)# is-type level-2 
R1(config-router)# log-adjacency-changes
R1(config-router)# exit
R1(config)# interface G0/0
R1(config-if)# ip router isis
R1(config-if)#exit

R1# show ip protocols
R1# show isis database 
R1# show isis neighbors
R1# show ip route isis
R1# clear isis *
```

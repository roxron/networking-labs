# 05 OSPF Virtual-link AUTH

> Imported source note. Provenance: `NetEngineer_Journal/02 NETWORK LESSONS/CCNP/CCNP ROUTE/05 OSPF Virtual-link AUTH`  
> Original source context: 02 NETWORK LESSONS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Plain text AUTH:

R1(config)# router ospf 10
R1(config-router)# area 0 authentication 
R1(config-router)# area 1 virtual-link 2.2.2.2 authentication-key cisco

R2(config)# router ospf 10
R2(config-router)# area 0 authentication 
R2(config-router)# area 1 virtual-link 1.1.1.1 authentication-key cisco

MD5 AUTH:

R1(config)# router ospf 10 
R1(config)# area 0 authentication message-digest 
R1(config)# area 1 virtual-link 2.2.2.2 message-digest-key 1 md5 cisco

R2(config)# router ospf 10
R2(config)# area 0 authentication 1.1.1.1 message-digest-key 1 md5 cisco

R1# show ip ospf virtual-link
```

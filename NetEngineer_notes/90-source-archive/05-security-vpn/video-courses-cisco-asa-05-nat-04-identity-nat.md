# 04 Identity NAT

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CIsco ASA/05 NAT/04 Identity NAT`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CIsco ASA / 05 NAT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
asa(config)# object network NET10
asa(config-network-object)# subnet 192.168.10.0 255.255.255.0
asa(config-network-object)# exit
asa(config)# object network NET20
asa(config-network-object)# subnet 192.168.20.0 255.255.255.0
asa(config-network-object)# exit
asa(config)# object network INAT
asa(config-network-object)# nat (inside,outside) source static NAT10 NAT10 destination static NAT20 NAT20
```

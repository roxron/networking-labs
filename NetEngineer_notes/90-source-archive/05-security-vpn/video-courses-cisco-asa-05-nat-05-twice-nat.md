# 05 Twice NAT

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CIsco ASA/05 NAT/05 Twice NAT`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CIsco ASA / 05 NAT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Twice NAT:
!
asa(config)# object network InsideNetwork 
asa(config-network-object)# subnet 10.1.1.0 255.255.255.0
!
asa(config)# object network Destination-1
asa(config-network-object)# host 100.11.11.11
!
asa(config)# object network PATaddress1 
asa(config-network-object)# host 100.10.2.10 
!
asa(config)# nat (inside,outside) source dynamic InsideNetwork PATaddress1 destination static Destination-1 
!
!
asa(config)# object network Destination-2
asa(config-network-object)# host 100.22.22.22
!
asa(config)# object network PATaddress2 
asa(config-network-object)# host 100.10.2.20
!
asa(config)# nat (inside,outside) source dynamic InsideNetwork PATaddress2 destination static Destination-2
```

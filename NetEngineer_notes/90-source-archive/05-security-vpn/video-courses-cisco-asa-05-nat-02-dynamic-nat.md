# 02 Dynamic NAT

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CIsco ASA/05 NAT/02 Dynamic NAT`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CIsco ASA / 05 NAT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Dynamic NAT:
!
asa(config)# object network MYNATPOOL
asa(config-network-object)# range 100.0.0.2 100.0.0.15
asa(config-network-object)#exit
!
asa(config)# object network InsideNet 
asa(config-network-object)# subnet 192.168.10.0 255.255.255.0
asa(config-network-object)# nat (inside,outside) dynamic MYNATPOOL
```

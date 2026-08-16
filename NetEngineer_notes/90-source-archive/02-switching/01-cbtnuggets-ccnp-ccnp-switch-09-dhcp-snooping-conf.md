# 09 DHCP Snooping Conf

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP SWITCH/09 DHCP Snooping Conf`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
SW1(config)# ip dhcp snooping 
SW1(config)# interface G0/1
SW1(config-if)# ip dhcp snooping trust
SW1(config-if)# exit
SW1(config)# ip dhcp snooping vlan 1

for VIRL or GNS3
SW1(config)# no ip dhcp snooping information option

SW1# show ip dhcp snooping binding 
SW1# Show ip dhcp Snooping
```

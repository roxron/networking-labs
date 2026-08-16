# 02 DHCP Snooping Implementation

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/02 DHCP Snooping Implementation`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure DHCP Snooping:
SW1(config)# ip dhcp snooping 
SW1(config)# ip dhcp snooping database flash:/snoopy.db
SW1(config)# ip dhcp snooping vlan 10
SW1(config)# interface G0/0
SW1(config-if)# ip dhcp snooping trust 
SW1(config-if)# ip dhcp snooping limit rate 10
SW1(config-if)# switchport port-security maximum 5
SW1(config-if)# switchport port-security 
SW1(config-if)#  
!
For DHCP Relay Router Enable this Command:
R1(config)# ip dhcp relay information trust 
!
for VIRL or GNS3
SW1(config)# no ip dhcp snooping information option

Verify DHCP Snooping: 
SW1# show ip dhcp snooping 
SW!# show ip dhcp snooping binding 
SW1# show ip dhcp snooping database
```

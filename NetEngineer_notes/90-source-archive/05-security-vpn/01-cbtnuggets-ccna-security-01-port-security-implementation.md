# 01 Port Security Implementation

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/01 Port Security Implementation`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure POrt Security:

SW1(config)# interface Gig 0/2
SW1(config-if)# switchport mode access 
SW1(config-if)# switchport access vlan 10
SW1(config-if)# switchport port-security maximum 5
SW1(config-if)# switchport port-security aging time 5
SW1(config-if0# switchport port-security violation restrict 
SW1(config-if)# switchport port-security mac-address 0000.1234.A123
SW1(config-if)# switchport port-security 

Verify Port Security:
SW1# show port-security 
SW1# show port-security address
SW1# show port-security interface G0/1

SW1# terminal monitor 


Enable Port Security on the Trunks:
SW1(config)# interface Gig 0/0
SW1(config-if)# switchport trunk encapsulation dot1q
SW1(config-if)# switchport mode trunk
SW1(config-if)# switchport port-security maximum 50 vlan 10
SW1(config-if)# switchport port-security
```

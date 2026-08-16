# 18 ASA Transparent Firewall

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/18 ASA Transparent Firewall`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
ASA(config)# clear config all 
!
ASA(config)# show firewall 
!
ASA(config)# firewall transparent 
!
ASA(config)# no firewall transparent 
!
!
!
Create Bridge Virtual Interface (BVI):
!
ASA(config)# interface BVI 1 
ASA(config-if)# ip address 192.168.1.150 255.255.255.0
ASA(config-if)# exit 
!
Add Interface to the BVI: 
!
ASA(config)# interface G0/1
ASA(config-if)# security-level 100
ASA(config-if)# nameif inside 
ASA(config-if)# bridge-group 1
ASA(config-if)# no shutdown
!
ASA(config)# interface G0/0
ASA(config-if)# security-level 0
ASA(config-if)# nameif outside 
ASA(config-if)# bridge-group 1
ASA(config-if)# no shutdown
```

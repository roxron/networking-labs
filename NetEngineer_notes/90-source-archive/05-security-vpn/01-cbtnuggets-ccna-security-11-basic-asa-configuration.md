# 11 Basic ASA Configuration

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/11 Basic ASA Configuration`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Bootstrap for ASDM Management:
!
ciscoas> enable 
ciscoasa# configure terminal 
ciscoasa(config)# interface e0/5
ciscoasa(config-if)# switchport access vlan 1 
ciscoasa(config-if)# no shutdown
ciscoasa(config-if)# exit
ciscoasa(config)# interface vlan 1 
ciscoasa(conf9g-if)# security-level 100
ciscoasa(config-if)# nameif INSIDE
ciscoasa(config-if)# ip address 10.0.0.1 255.255.255.0
ciscoasa(config-if)# exit
ciscoasa(config)# http server enable 
ciscoasa(config)# http 10.0.0.0 255.255.255.0 INSIDE
ciscoasa(config)# show interface ip brief 
!
!
Configure NAT/PAT:
!
ciscoasa(config)# nat (INSIDE,OUTSIDE) 1 source dynamic any interface 
!
!
Configure ACL on ASA:
ciscoasa# configure terminal 
ciscoasa(config)# access-list INSIDE_ACL_IN line 1 extended deny icmp 10.0.0.0 255.255.255.0 host 8.8.8.8 echo
ciscoasa(config)# access-list INSIDE_ACL_IN line 2 extended permit ip any any
ciscoasa(config)# access-group INSIDE_ACL_IN in interface INSIDE 
!
!
Clear all configuration on the ASA:
!
ASA(config)# clear config all
```

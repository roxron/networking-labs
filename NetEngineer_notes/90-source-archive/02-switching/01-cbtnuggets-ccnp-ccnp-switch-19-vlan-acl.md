# 19 Vlan ACL

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP SWITCH/19 Vlan ACL`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
COnfigure VLAN Access Control List (VACLs):
SW1(config)# access-list 1 permit 192.168.1.0 0.0.0.31
SW1(config)# access-list 2 permit any 
SW1(config)# vlan access-map NO-0-31 5
SW1(config-access-map)# match ip address 1 
SW1(config-access-map)# action drop 
SW1(config-access-map)# exit
SW1(config)# vlan access-map NO-0-31 10
SW1(config-access-map)# match ip address 2
SW1(config-access-map)# action forward 
SW1(config-access-map)# exit
SW1(config)# vlan filter No-0-31 vlan-list 100

SW1# show vlan access-map
```

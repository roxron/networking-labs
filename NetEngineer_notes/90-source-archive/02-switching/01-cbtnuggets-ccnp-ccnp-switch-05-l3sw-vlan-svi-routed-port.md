# 05 L3SW VLAN,SVI, Routed Port

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP SWITCH/05 L3SW VLAN,SVI, Routed Port`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
L3 Switching:
Configuring VLANs
SW1(config)# vlan 10
SW1(config-vlan)# name SALE
SW1(config-vlan)# exit
SW1(config)# interface F0/1
SW1(config-if)# spanning-tree portfast
SW1(config-if)# switchport mode access
SW1(config-if)# switchport access vlan 10

Configuring SVI
SW1(config)# interface vlan 10 
SW1(config-if)# ip address 192.168.10.1 255.255.255.0
SW1(config-if)# exit

Configuring Routred Port:
SW1(config)# interface G0/1
SW1(config-if)# no switchport
SW1(config-if)# ip address 10.0.0.1 255.255.255.252
SW1(config-if)# exit

Configuring Routing 
SW1(config)# ip routing 
SW1(config)# router eigrp 10
SW1(config-router)# network 0.0.0.0 255.255.255.255
SW1(config-router)# exit
```

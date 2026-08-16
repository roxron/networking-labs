# 12 Configure Private VLAN

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP SWITCH/12 Configure Private VLAN`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
SW1(config)# vtp mode transperent 
SW1(config)# vlan 200
SW1(config-vlan)# private-vlan primary 
SW1(config-vlan)# exit
SW1(config)# vlan 205 
SW1(config-vlan)# private-vlan community 
SW1(config-vlan)# exit
SW1(Config)# vlan 210 
SW1(config-vlan)# private-vlan isolated 
SW1(config-vlan)# exit
SW1(config)# vlan 200 
SW1(config-vlan)# private-vlan association 205,210
SW1(config-vlan)# exit
SW1(config)# iteface G0/10
SW1(config-if)# switchport mode private-vlan host
SW1(config-if)# switchport private-vlan host-association 200 205
SW1(config-if)# iteface G0/11
SW1(config-if)# switchport mode private-vlan host
SW1(config-if)# switchport private-vlan host-association 200 205
SW1(config-if)# interface G0/12
SW1(config-if)# switchport mode private-vlan host
SW1(config-if)#switchport private-vlan host-association 200 210
SW1(config-if)#exit
SW1(config)# interface G0/1
SW1(config-if)# switchport mode private-vlan promiscuous
SW1(config-if)# switchport private-vlan mapping 200 205,210
SW1(config-if)# exit


SW1# show vlan private-vlan type
```

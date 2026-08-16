# 10 IP Source Guard and DIA

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP SWITCH/10 IP Source Guard and DIA`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure IP source Guard
SW1(config)# interface G0/1
SW1(config-if)# ip verify source 
SW1(config-if)#exit

SW1# show ip verify source

Staticly bind source IP:
SW1(config)# ip source binding 1111.1111.1111 vlan 1 172.16.100.54 interface G0/14

Configuring Dynamic ARP Inspection:
SW1(config)# ip arp inspection vlan 1
SW1(config)# interface G0/0
SW1(config-if)# ip arp inspection trust
```

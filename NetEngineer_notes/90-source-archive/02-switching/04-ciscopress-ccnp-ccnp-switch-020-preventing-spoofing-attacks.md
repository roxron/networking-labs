# 020 Preventing Spoofing Attacks

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP SWITCH/020 Preventing Spoofing Attacks.txt`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Chapter 21. Preventing Spoofing Attacks:
!
Configure DHCP Snooping:
!
Switch(config)# ip dhcp snooping
Switch(config)# ip dhcp snooping vlan 104
Switch(config)# interface range gigabitethernet 1/0/35 – 36
Switch(config-if)# ip dhcp snooping limit rate 3
Switch(config-if)# interface gigabitethernet 1/1/1
Switch(config-if)# ip dhcp snooping trust
!
Switch(config)# [no] ip dhcp snooping information option
!
Verify DHCP Snooping:
!
Switch# show ip dhcp snooping 
Switch# show ip dhcp snooping binding 
!
Configure IP Source Guard:
!
SW(config)# interface G0/1
SW(config-if)# ip verify source 
!
Verify IP Source Guard:
!
SW# show ip source binding 
!
!
Dynamic ARP Inspection:
!
Switch(config)# ip arp inspection vlan 104
Switch(config)# arp access-list StaticARP
Switch(config-acl)# permit ip host 192.168.1.10 mac host 0006.5b02.a841
Switch(config-acl)# exit
Switch(config)# ip arp inspection filter StaticARP vlan 104
Switch(config)# interface gigabitethernet 1/0/49
Switch(config-if)# ip arp inspection trust
!
show ip arp inspection
```

# 06 Protecting the Spanning Tree Protocol Topology

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP SWITCH/06 Protecting the Spanning Tree Protocol Topology.txt`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Chapter 8. Protecting the Spanning Tree Protocol Topology:
!
Root Guard:
!
Switch(config-if)# spanning-tree guard root
!
Switch# show spanning-tree inconsistentports
!
!
BPDU Guard:
!
Switch(config)# spanning-tree portfast bpduguard default
!
Switch(config-if)# [no] spanning-tree bpduguard enable
!
!
Loop Guard:
!
Switch(config)# spanning-tree loopguard default
!
Switch(config-if)# [no] spanning-tree guard loop
!
!
UDLD:
!
Switch(config)# udld {enable | aggressive | message time seconds}
!
Switch(config-if)# udld port {enable | aggressive | disable}
!
Switch# udld reset
!
!
BPDU Filtering:
!
Switch(config)# spanning-tree portfast bpdufilter default
!
Switch(config-if)# spanning-tree bpdufilter {enable | disable}
!
!
Troubleshooting STP Protection:
!
show spanning-tree inconsistentports 
show spanning-tree interface g0/0 detail 
show spannig-tree summary
show udld 
udld reset
```

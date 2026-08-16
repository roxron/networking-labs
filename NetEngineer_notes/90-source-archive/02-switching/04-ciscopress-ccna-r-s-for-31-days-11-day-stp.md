# 11 Day STP

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNA R&S for 31 days/11 Day STP`  
> Original source context: 04 CISCOPRESS / CCNA R&S for 31 days. Content is preserved as historical study material; validate commands against the target platform and release.

```text
STP:
!
Configuring and Verifying Varieties of STP:
!
Configuring and Verifying the PVST+:
!
Method 1:
!
S1(config)# spanning-tree vlan 10 root primary 
S1(config)# spanning-tree vlan 20 root secondary 
!
S2(config)# spanning-tree vlan 20 root primary 
S2(config)# spanning-tree vlan 10 root secondary
!
Method 2:
!
S1(config)# spanning-tree vlan 10 priority 4096 
S1(config)# spanning-tree vlan 20 priority 8192 
!
S2(config)# spanning-tree vlan 20 priority 4096
S2(config)# spanning-tree vlan 10 priority 8192
!
!
Verifying Spanning-tree Configurations:
!
S1# show spanning-tree 
!
!
Configuring PortFast and BPDU Guard:
!
S2(config)# interface range f0/11 - f0/13
S2(config-if-range)# switchport mode access
S2(config-if-range)# spanning-tree portfast
S2(config-if-range)# spanning-tree bpduguard enable
!
or Globally Enable PortFast or BPDU GUARD:
!
S2(config)# spanning-tree portfast default 
S2(config)# spanning-tree bpduguard default 
!
!
Configuring Rapid PVST+:!
!
S1(config)# spanning-tree mode rapid-pvst
!
!
Verifying STP:
!
S1# show spanning-tree 
S1# show spanning-tree active 
S1# show spanning-tree brief 
S1# show spanning-tree detail 
S1# show spanning-tree interface G0/0
S1# show spanning-tree vlan 10 
S1# show spanning-tree summary 
!
```

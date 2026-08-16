# 03 EtherChannel

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/BOOKS/CCNP SWITCH by Richard Froom/03 EtherChannel`  
> Original source context: 07 SAFARI ONLINE / BOOKS / CCNP SWITCH by Richard Froom. Content is preserved as historical study material; validate commands against the target platform and release.

```text
EtherChannel:
!
EtherChannel Configuration and Load Balancing:
!
S1(config)# interface range G0/0-1
S1(config-if)# channel-group 1 mode active
!
S1(config)# interface port-channel 1 in use: 3
Number of aggregators:           3

Group  Port-channel  Protocol    Ports
------+-------------+-----------+-----------------------------------------------
1      Po1(RU)         PAgP      Gi0/0(P)    Gi0/1(P)    
2      Po2(RD)         PAgP      Gi1/0(s)    Gi1/1(s)    
3      Po3(RD)         PAgP      Gi0/2(s)    Gi0/3(s)    
          
CSW2#
CSW2#
CSW2#
CSW2#
CSW2#
CSW2#
CSW2#
CSW2#sh
CSW2#show  cd
CSW2#show  cdp  ne
CSW2#show  cdp  neighbors 
Capability Codes: R - Router, T - Trans Bridge, B - Source Route Bridge
                  S - Switch, H - Host, I - IGMP, r - Repeater, P - Phone, 
                  D - Remote, C - CVTA, M - Two-port Mac Relay 

Device ID        Local Intrfce     Holdtme    Capability  Platform  Port ID
CSW1             Gig 0/1           143             R S I            Gig 0/1
CSW1             Gig 0/0           155             R S I            Gig 0/0

Total cdp entries displayed : 2
CSW2#
CSW2#
CSW2#
CSW2#cop r s
Destination filename [startup-config]? 
Building configuration...
Compressed configuration from 4150 bytes to 1879 bytes[OK]
CSW2#

S1(config-if)# switchport trunk encapsulation dot1q
S1(config-if)# switchport mode trunk 
!
!
Verify Etherchannel:
!
show etherchannel summary
show etherchannel load-balance
!
!
Change the load-balancing behavior:
!
S1(config)# port-channel load-balance dst-ip
!
!
Configure EtherChannel Guard:
!
S1(config)# spanning-treee etherchannel guard misconfig
!
!
Verify EtherChannel Guard:
!
show spanning-tree summary 
!
```

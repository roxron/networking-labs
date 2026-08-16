# BIG NET

> Imported source note. Provenance: `NetEngineer_Journal/BIG_NET`  
> Original source context: Journal root. Content is preserved as historical study material; validate commands against the target platform and release.

```text
NETWORK DOCUMENTATION OF BIG_NET
==================================================================================

Physical connections between Switches MS1--MS2--S1--S2
CDP tables before EtherChannel is configured: 
On the MS1:
________________________________________________________________________________
MS1#show cdp neighbors 
Capability Codes: R - Router, T - Trans Bridge, B - Source Route Bridge
                  S - Switch, H - Host, I - IGMP, r - Repeater, P - Phone, 
                  D - Remote, C - CVTA, M - Two-port Mac Relay 

Device ID        Local Intrfce     Holdtme    Capability  Platform  Port ID
S1.ccna.loc      Gig 0/0           128             R S I            Gig 0/0
S1.ccna.loc      Gig 0/1           176             R S I            Gig 0/1
S2.ccna.loc      Gig 0/2           154             R S I            Gig 0/0
S2.ccna.loc      Gig 0/3           169             R S I            Gig 0/1
MS2.ccna.loc     Gig 1/0           159             R S I            Gig 1/0
MS2.ccna.loc     Gig 1/1           142             R S I            Gig 1/1

Total cdp entries displayed : 6
________________________________________________________________________

On the MS2:
____________________________________________________________________________________

MS2#show cdp neighbors 
Capability Codes: R - Router, T - Trans Bridge, B - Source Route Bridge
                  S - Switch, H - Host, I - IGMP, r - Repeater, P - Phone, 
                  D - Remote, C - CVTA, M - Two-port Mac Relay 

Device ID        Local Intrfce     Holdtme    Capability  Platform  Port ID
S1.ccna.loc      Gig 0/1           153             R S I            Gig 0/3
S1.ccna.loc      Gig 0/0           123             R S I            Gig 0/2
S2.ccna.loc      Gig 0/3           136             R S I            Gig 0/3
S2.ccna.loc      Gig 0/2           139             R S I            Gig 0/2
MS1.ccna.loc     Gig 1/1           146             R S I            Gig 1/1
MS1.ccna.loc     Gig 1/0           157             R S I            Gig 1/0

Total cdp entries displayed : 6
______________________________________________________________________________________

On the S1:

S1#show cdp neighbors 
Capability Codes: R - Router, T - Trans Bridge, B - Source Route Bridge
                  S - Switch, H - Host, I - IGMP, r - Repeater, P - Phone, 
                  D - Remote, C - CVTA, M - Two-port Mac Relay 

Device ID        Local Intrfce     Holdtme    Capability  Platform  Port ID
MS1.ccna.loc     Gig 0/1           152             R S I            Gig 0/1
MS1.ccna.loc     Gig 0/0           164             R S I            Gig 0/0
MS2.ccna.loc     Gig 0/3           170             R S I            Gig 0/1
MS2.ccna.loc     Gig 0/2           156             R S I            Gig 0/0

Total cdp entries displayed : 4
_______________________________________________________________________________________

S2#show cdp neighbors 
Capability Codes: R - Router, T - Trans Bridge, B - Source Route Bridge
                  S - Switch, H - Host, I - IGMP, r - Repeater, P - Phone, 
                  D - Remote, C - CVTA, M - Two-port Mac Relay 

Device ID        Local Intrfce     Holdtme    Capability  Platform  Port ID
MS1.ccna.loc     Gig 0/1           167             R S I            Gig 0/3
MS1.ccna.loc     Gig 0/0           179             R S I            Gig 0/2
MS2.ccna.loc     Gig 0/2           167             R S I            Gig 0/2
MS2.ccna.loc     Gig 0/3           165             R S I            Gig 0/3

Total cdp entries displayed : 4
_________________________________________________________________________________________






======================================================================================================

EtherChannel layout between MS1--MS2--S1--S2:

Output on MS1:
MS1#show etherchannel summary 
Flags:  D - down        P - bundled in port-channel
        I - stand-alone s - suspended
        H - Hot-standby (LACP only)
        R - Layer3      S - Layer2
        U - in use      N - not in use, no aggregation
        f - failed to allocate aggregator

        M - not in use, minimum links not met
        m - not in use, port not aggregated due to minimum links not met
        u - unsuitable for bundling
        w - waiting to be aggregated
        d - default port

        A - formed by Auto LAG


Number of channel-groups in use: 3
Number of aggregators:           3

Group  Port-channel  Protocol    Ports
------+-------------+-----------+-----------------------------------------------
1      Po1(SU)         PAgP      Gi0/0(P)    Gi0/1(P)    
2      Po2(SU)         PAgP      Gi0/2(P)    Gi0/3(P)    
3      Po3(SU)         PAgP      Gi1/0(P)    Gi1/1(P)   

________________________________________________________________________________

Output on MS2:

MS2#show etherchannel summary 
Flags:  D - down        P - bundled in port-channel
        I - stand-alone s - suspended
        H - Hot-standby (LACP only)
        R - Layer3      S - Layer2
        U - in use      N - not in use, no aggregation
        f - failed to allocate aggregator

        M - not in use, minimum links not met
        m - not in use, port not aggregated due to minimum links not met
        u - unsuitable for bundling
        w - waiting to be aggregated
        d - default port

        A - formed by Auto LAG


Number of channel-groups in use: 3
Number of aggregators:           3

Group  Port-channel  Protocol    Ports
------+-------------+-----------+-----------------------------------------------
1      Po1(SU)         PAgP      Gi1/0(P)    Gi1/1(P)    
2      Po2(SU)         PAgP      Gi0/0(P)    Gi0/1(P)    
3      Po3(SU)         PAgP      Gi0/2(P)    Gi0/3(P)    
          
_____________________________________________________________________________________________

Output on S1:

S1#show etherchannel summary 
Flags:  D - down        P - bundled in port-channel
        I - stand-alone s - suspended
        H - Hot-standby (LACP only)
        R - Layer3      S - Layer2
        U - in use      N - not in use, no aggregation
        f - failed to allocate aggregator

        M - not in use, minimum links not met
        m - not in use, port not aggregated due to minimum links not met
        u - unsuitable for bundling
        w - waiting to be aggregated
        d - default port

        A - formed by Auto LAG


Number of channel-groups in use: 2
Number of aggregators:           2

Group  Port-channel  Protocol    Ports
------+-------------+-----------+-----------------------------------------------
1      Po1(SU)         PAgP      Gi0/0(P)    Gi0/1(P)    
2      Po2(SU)         PAgP      Gi0/2(P)    Gi0/3(P)   

___________________________________________________________________________________________________________

Output on S2:

MS2#show etherchannel summary 
Flags:  D - down        P - bundled in port-channel
        I - stand-alone s - suspended
        H - Hot-standby (LACP only)
        R - Layer3      S - Layer2
        U - in use      N - not in use, no aggregation
        f - failed to allocate aggregator

        M - not in use, minimum links not met
        m - not in use, port not aggregated due to minimum links not met
        u - unsuitable for bundling
        w - waiting to be aggregated
        d - default port

        A - formed by Auto LAG


Number of channel-groups in use: 3
Number of aggregators:           3

Group  Port-channel  Protocol    Ports
------+-------------+-----------+-----------------------------------------------
1      Po1(SU)         PAgP      Gi1/0(P)    Gi1/1(P)    
2      Po2(SU)         PAgP      Gi0/0(P)    Gi0/1(P)    
3      Po3(SU)         PAgP      Gi0/2(P)    Gi0/3(P)    

__________________________________________________________________________________________________________

===============================================================================================================

VTP Configurations:
VTP version 2
VTP domain - ccna.loc
VTP password - cisco12345

MS1 VTP server 
MS2 VTP server
S1  VTP client
S2  VTP client

______________________________________________________________________________________________________________


============================================================================================================
VLAN Implementation:

vlan 1 - Defaulf 
vlan 5 - unused-ports
vlan 10 NATIVE
vlan 20 VOICE            net20: 192.168.20.0/24
vlan 30 HR               net30: 192.168.30.0/24
vlan 40 SALES            net40: 192.168.40.0/24
vlan 50 MANAGERS         net50: 192.168.50.0/24
vlan 60 DEVELOPMENT      net60: 192.168.60.0/24
vlan 70 ENGINEERS        net70: 192.168.70.0/24
vlan 80 PRODUCTION       net80: 192.168.80.0/24
vlan 90 VISITORWIFI      net90: 192.168.90.0/24

____________________________________________________________________________________________________________


=============================================================================================================

STP
Mode: rapid-pvst
MS1 is Root Bridge for : 
MS1(config)#spanning-tree vlan 1,5,10,20,30,40,50 priority 4096
and Second for:
MS1(config)#spanning-tree vlan 60,70,80,90 priority 8192

MS2 is Root Bridge for:
MS2(config)#spanning-tree vlan 60,70,80,90 priority 4096
and Second for:
MS2(config)#spanning-tree vlan 1,5,10,20,30,40,50 priority 8192
_____________________________________________________________________________________________________________



interface GigabitEthernet0/0
 description SUBINTERFACE USE ONLY!#
 no ip address
 duplex auto
 speed auto
 media-type rj45
 no cdp enable
 no shutdown
       
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10 native
 no cdp enable
        
interface GigabitEthernet0/0.20
 description VOICE VLAN
 encapsulation dot1Q 20
 ip address 192.168.20.3 255.255.255.0
 no cdp enable
         
interface GigabitEthernet0/0.30
 description HR VLAN
 encapsulation dot1Q 30
 ip address 192.168.30.3 255.255.255.0
 no cdp enable
         
interface GigabitEthernet0/0.40
 description SALES VLAN
 encapsulation dot1Q 40
 ip address 192.168.40.3 255.255.255.0
 no cdp enable
         
interface GigabitEthernet0/0.50
 description MANAGERS VLAN
 encapsulation dot1Q 50
 ip address 192.168.50.3 255.255.255.0
 no cdp enable
         
interface GigabitEthernet0/0.60
 description DEVELOPMENT VLAN
 encapsulation dot1Q 60
 ip address 192.168.60.3 255.255.255.0
 no cdp enable
         
interface GigabitEthernet0/0.70
 description ENGINEERS VLAN
 encapsulation dot1Q 70
 ip address 192.168.70.3 255.255.255.0
 no cdp enable
         
interface GigabitEthernet0/0.80
 description PRODUCTION VLAN
 encapsulation dot1Q 80
 ip address 192.168.80.3 255.255.255.0
 no cdp enable
         
interface GigabitEthernet0/0.90
 description VISITORWIFI
 encapsulation dot1Q 90
 ip address 192.168.90.3 255.255.255.0
 no cdp enable


______________________________________________________________________________________

=================================================================================================
HSRP:
 
R1#show standby brief  
                     P indicates configured to preempt.
                     |
Interface   Grp  Pri P State   Active          Standby         Virtual IP
Gi0/0.20    2    150 P Active  local           192.168.20.3    192.168.20.1
Gi0/0.30    3    150 P Active  local           192.168.30.3    192.168.30.1
Gi0/0.40    4    150 P Active  local           192.168.40.3    192.168.40.1
Gi0/0.50    5    150 P Active  local           192.168.50.3    192.168.50.1
Gi0/0.60    6    100   Standby 192.168.60.3    local           192.168.60.1
Gi0/0.70    7    100   Standby 192.168.70.3    local           192.168.70.1
Gi0/0.80    8    100   Standby 192.168.80.3    local           192.168.80.1
Gi0/0.90    9    100   Standby 192.168.90.3    local           192.168.90.1
_____________________________________________________________________________________________________

R2#show standby brief 
                     P indicates configured to preempt.
                     |
Interface   Grp  Pri P State   Active          Standby         Virtual IP
Gi0/0.20    2    100   Standby 192.168.20.2    local           192.168.20.1
Gi0/0.30    3    100   Standby 192.168.30.2    local           192.168.30.1
Gi0/0.40    4    100   Standby 192.168.40.2    local           192.168.40.1
Gi0/0.50    5    100   Standby 192.168.50.2    local           192.168.50.1
Gi0/0.60    6    150 P Active  local           192.168.60.2    192.168.60.1
Gi0/0.70    7    150 P Active  local           192.168.70.2    192.168.70.1
Gi0/0.80    8    150 P Active  local           192.168.80.2    192.168.80.1
Gi0/0.90    9    150 P Active  local           192.168.90.2    192.168.90.1

________________________________________________________________________________________________________

partial startup-config:
 interface G0/0.20 
 standby version 2
 standby 2 ip 192.168.20.1
 standby 2 priority 150
 standby 2 preempt   

 interface G0/0.30 
 standby version 2
 standby 3 ip 192.168.30.1
 standby 3 priority 150
 standby 3 preempt 

 interface G0/0.40 
 standby version 2
 standby 4 ip 192.168.40.1
 standby 4 priority 150
 standby 4 preempt 

 interface G0/0.50 
 standby version 2
 standby 5 ip 192.168.50.1
 standby 5 priority 150
 standby 5 preempt 


 interface G0/0.60 
 standby version 2
 standby 6 ip 192.168.60.1
 standby 6 priority 150
 standby 6 preempt 

  interface G0/0.70 
 standby version 2
 standby 7 ip 192.168.70.1
 standby 7 priority 150
 standby 7 preempt 

 interface G0/0.80 
 standby version 2
 standby 8 ip 192.168.80.1
 standby 8 priority 150
 standby 8 preempt 

 interface G0/0.90 
 standby version 2
 standby 9 ip 192.168.90.1
 standby 9 priority 150
 standby 9 preempt 



interface G0/0.20 
 standby version 2
 standby 2 ip 192.168.20.1 

interface G0/0.30 
 standby version 2
 standby 3 ip 192.168.30.1 

interface G0/0.40 
 standby version 2
 standby 4 ip 192.168.40.1 
 
interface G0/0.50 
 standby version 2
 standby 5 ip 192.168.50.1


interface G0/0.60 
 standby version 2
 standby 6 ip 192.168.60.1


interface G0/0.70 
 standby version 2
 standby 7 ip 192.168.70.1


interface G0/0.80 
 standby version 2
 standby 8 ip 192.168.80.1


interface G0/0.90 
 standby version 2
 standby 9 ip 192.168.90.1

______________________________________________________________________________________________________

===================================================================================================
DHCP:
ip dhcp excluded-address 192.168.20.1 192.168.20.29
ip dhcp excluded-address 192.168.30.1 192.168.30.29
ip dhcp excluded-address 192.168.40.1 192.168.40.29
ip dhcp excluded-address 192.168.50.1 192.168.50.29
ip dhcp excluded-address 192.168.60.1 192.168.60.29
ip dhcp excluded-address 192.168.70.1 192.168.70.29
ip dhcp excluded-address 192.168.80.1 192.168.80.29
ip dhcp excluded-address 192.168.90.1 192.168.90.29


ip dhcp pool VLAN20
 network 192.168.20.0 255.255.255.0
 default-router 192.168.20.1 
 dns-server 8.8.8.8 
 domain-name ccna.loc
 exit
ip dhcp pool VLAN30
 network 192.168.30.0 255.255.255.0
 default-router 192.168.30.1 
 dns-server 8.8.8.8 
 domain-name ccna.loc
 exit

ip dhcp pool VLAN40
 network 192.168.40.0 255.255.255.0
 default-router 192.168.40.1 
 dns-server 8.8.8.8 
 domain-name ccna.loc
 exit

ip dhcp pool VLAN50
 network 192.168.50.0 255.255.255.0
 default-router 192.168.50.1 
 dns-server 8.8.8.8 
 domain-name ccna.loc
 exit

ip dhcp pool VLAN60
 network 192.168.60.0 255.255.255.0
 default-router 192.168.60.1 
 dns-server 8.8.8.8 
 domain-name ccna.loc
 exit


ip dhcp pool VLAN70
 network 192.168.70.0 255.255.255.0
 default-router 192.168.70.1 
 dns-server 8.8.8.8 
 domain-name ccna.loc
 exit

ip dhcp pool VLAN80
 network 192.168.80.0 255.255.255.0
 default-router 192.168.80.1 
 dns-server 8.8.8.8 
 domain-name ccna.loc
 exit

ip dhcp pool VLAN90
 network 192.168.90.0 255.255.255.0
 default-router 192.168.90.1 
 dns-server 8.8.8.8 
 domain-name ccna.loc
 exit
```

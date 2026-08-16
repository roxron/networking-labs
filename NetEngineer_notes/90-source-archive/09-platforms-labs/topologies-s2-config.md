# S2-config

> Imported source note. Provenance: `NetEngineer_Journal/TOPOLOGIES/S2-config`  
> Original source context: TOPOLOGIES. Content is preserved as historical study material; validate commands against the target platform and release.

```text
S2#show running-config 
Building configuration...

  
Current configuration : 5952 bytes
!
! Last configuration change at 23:25:11 america Thu Sep 21 2017 by rustem
!
version 15.2
service timestamps debug datetime msec
service timestamps log datetime msec
service password-encryption
service compress-config
service sequence-numbers
!
hostname S2
!
boot-start-marker
boot-end-marker
!
!
enable secret 5 $1$uuI7$0mYNpupWmrmA00Wy9HJOQ1
!
username rustem privilege 15 secret 5 $1$TEPH$ngghT2wiO6tGZqfAKmOAp.
no aaa new-model
clock timezone america -4 0
!         
!
!
!
!
!
!
!
no ip domain-lookup
ip domain-name ccna.loc
ip cef
login block-for 120 attempts 3 within 60
no ipv6 cef
!
!
!
spanning-tree mode rapid-pvst
spanning-tree extend system-id
!
vlan internal allocation policy ascending
!
! 
!
!         
!
!
!
!
!
!
!
!
!
!
interface Port-channel2
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 10
 switchport mode trunk
 switchport nonegotiate
!
interface Port-channel1
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 10
 switchport mode trunk
 switchport nonegotiate
!
interface GigabitEthernet0/0
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 10
 switchport mode trunk
 switchport nonegotiate
 media-type rj45
 negotiation auto
 channel-group 1 mode auto
!
interface GigabitEthernet0/1
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 10
 switchport mode trunk
 switchport nonegotiate
 media-type rj45
 negotiation auto
 channel-group 1 mode auto
!
interface GigabitEthernet0/2
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 10
 switchport mode trunk
 switchport nonegotiate
 media-type rj45
 negotiation auto
 channel-group 2 mode auto
!
interface GigabitEthernet0/3
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 10
 switchport mode trunk
 switchport nonegotiate
 media-type rj45
 negotiation auto
 channel-group 2 mode auto
!
interface GigabitEthernet1/0
 media-type rj45
 negotiation auto
!
interface GigabitEthernet1/1
 media-type rj45
 negotiation auto
!
interface GigabitEthernet1/2
 media-type rj45
 negotiation auto
!
interface GigabitEthernet1/3
 media-type rj45
 negotiation auto
!
interface GigabitEthernet2/0
 switchport access vlan 40
 switchport mode access
 switchport port-security maximum 2
 switchport port-security mac-address sticky
 switchport port-security mac-address sticky 0050.7966.6802
 switchport port-security
 media-type rj45
 negotiation auto
!
interface GigabitEthernet2/1
 switchport access vlan 50
 switchport mode access
 switchport port-security maximum 2
 switchport port-security mac-address sticky
 switchport port-security mac-address sticky 0050.7966.6803
 switchport port-security
 media-type rj45
 negotiation auto
!
interface GigabitEthernet2/2
 switchport access vlan 60
 switchport mode access
 switchport port-security maximum 2
 switchport port-security mac-address sticky
 switchport port-security mac-address sticky 0050.7966.6806
 switchport port-security
 media-type rj45
 negotiation auto
!
interface GigabitEthernet2/3
 switchport access vlan 70
 switchport mode access
 switchport port-security maximum 2
 switchport port-security mac-address sticky
 switchport port-security mac-address sticky 0050.7966.6807
 switchport port-security
 media-type rj45
 negotiation auto
!
interface GigabitEthernet3/0
 media-type rj45
 negotiation auto
!
interface GigabitEthernet3/1
 media-type rj45
 negotiation auto
!
interface GigabitEthernet3/2
 media-type rj45
 negotiation auto
!
interface GigabitEthernet3/3
 description Connected to MN
 no switchport
 ip address 10.0.0.13 255.255.255.0
 negotiation auto
!
ip forward-protocol nd
!
no ip http server
no ip http secure-server
!
ip ssh time-out 10
ip ssh authentication-retries 1
ip ssh version 2
!
!
logging host 10.0.0.2
!
!
!
control-plane
!
banner exec ^C
**************************************************************************
* IOSv is strictly limited to use for evaluation, demonstration and IOS  *
* education. IOSv is provided as-is and is not supported by Cisco's      *
* Technical Advisory Center. Any use or disclosure, in whole or in part, *
* of the IOSv Software or Documentation to any third party for any       *
* purposes is expressly prohibited except as otherwise authorized by     *
* Cisco in writing.                                                      *
**************************************************************************^C
banner incoming ^C
**************************************************************************
* IOSv is strictly limited to use for evaluation, demonstration and IOS  *
* education. IOSv is provided as-is and is not supported by Cisco's      *
* Technical Advisory Center. Any use or disclosure, in whole or in part, *
* of the IOSv Software or Documentation to any third party for any       *
* purposes is expressly prohibited except as otherwise authorized by     *
* Cisco in writing.                                                      *
**************************************************************************^C
banner login ^C
**************************************************************************
* IOSv is strictly limited to use for evaluation, demonstration and IOS  *
* education. IOSv is provided as-is and is not supported by Cisco's      *
* Technical Advisory Center. Any use or disclosure, in whole or in part, *
* of the IOSv Software or Documentation to any third party for any       *
* purposes is expressly prohibited except as otherwise authorized by     *
* Cisco in writing.                                                      *
**************************************************************************^C
banner motd ^CAUTHORIZED ACCESS ONLY!^C
!
line con 0
 logging synchronous
 login local
 history size 100
line aux 0
line vty 0 4
 logging synchronous
 login local
 history size 100
 transport input ssh
line vty 5 15
 logging synchronous
 login local
 history size 100
 transport input ssh
!
ntp update-calendar
ntp server 10.0.0.2
!
end
```

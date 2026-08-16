# R1-config

> Imported source note. Provenance: `NetEngineer_Journal/TOPOLOGIES/R1-config`  
> Original source context: TOPOLOGIES. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1#show running-config 
Building configuration...

  
Current configuration : 7159 bytes
!
! Last configuration change at 00:44:05 america Fri Sep 22 2017
! NVRAM config last updated at 00:44:28 america Fri Sep 22 2017
!
version 15.6
service timestamps debug datetime msec
service timestamps log datetime msec
service password-encryption
service sequence-numbers
!
hostname R1
!
boot-start-marker
boot-end-marker
!
!
enable secret 5 $1$xc3x$jHAjv0b4BILdtY1yM3wT6/
!
no aaa new-model
ethernet lmi ce
!
!         
!
no process cpu autoprofile hog
clock timezone america -4 0
mmi polling-interval 60
no mmi auto-configure
no mmi pvc
mmi snmp-timeout 180
!
!
!
!
!
no ip icmp rate-limit unreachable
!
!
!
ip dhcp excluded-address 192.168.20.1 192.168.20.29
ip dhcp excluded-address 192.168.30.1 192.168.30.29
ip dhcp excluded-address 192.168.40.1 192.168.40.29
ip dhcp excluded-address 192.168.50.1 192.168.50.29
ip dhcp excluded-address 192.168.60.1 192.168.60.29
ip dhcp excluded-address 192.168.70.1 192.168.70.29
ip dhcp excluded-address 192.168.80.1 192.168.80.29
ip dhcp excluded-address 192.168.90.1 192.168.90.29
!
ip dhcp pool VLAN20
 network 192.168.20.0 255.255.255.0
 default-router 192.168.20.1 
 dns-server 8.8.8.8 
 domain-name ccna.loc
!
ip dhcp pool VLAN30
 network 192.168.30.0 255.255.255.0
 default-router 192.168.30.1 
 dns-server 8.8.8.8 
 domain-name ccna.loc
!
ip dhcp pool VLAN40
 network 192.168.40.0 255.255.255.0
 default-router 192.168.40.1 
 dns-server 8.8.8.8 
 domain-name ccna.loc
!
ip dhcp pool VLAN50
 network 192.168.50.0 255.255.255.0
 default-router 192.168.50.1 
 dns-server 8.8.8.8 
 domain-name ccna.loc
!
ip dhcp pool VLAN60
 network 192.168.60.0 255.255.255.0
 default-router 192.168.60.1 
 dns-server 8.8.8.8 
 domain-name ccna.loc
!
ip dhcp pool VLAN70
 network 192.168.70.0 255.255.255.0
 default-router 192.168.70.1 
 dns-server 8.8.8.8 
 domain-name ccna.loc
!
ip dhcp pool VLAN80
 network 192.168.80.0 255.255.255.0
 default-router 192.168.80.1 
 dns-server 8.8.8.8 
 domain-name ccna.loc
!
ip dhcp pool VLAN90
 network 192.168.90.0 255.255.255.0
 default-router 192.168.90.1 
 dns-server 8.8.8.8 
 domain-name ccna.loc
!
!
!
no ip domain lookup
ip domain name ccna.loc
ip cef
login block-for 120 attempts 3 within 60
no ipv6 cef
!
multilink bundle-name authenticated
!
!
!
!
username rustem privilege 15 secret 5 $1$Yfxi$WuExdhrBhdar.awRenXhQ/
!
redundancy
!
no cdp log mismatch duplex
no cdp run
!
ip tcp synwait-time 5
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
interface GigabitEthernet0/0
 description SUBINTERFACE USE ONLY!#
 no ip address
 duplex auto
 speed auto
 media-type rj45
 no cdp enable
!         
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10 native
 no cdp enable
!
interface GigabitEthernet0/0.20
 description VOICE VLAN
 encapsulation dot1Q 20
 ip address 192.168.20.2 255.255.255.0
 standby version 2
 standby 2 ip 192.168.20.1
 standby 2 priority 150
 standby 2 preempt
 no cdp enable
!
interface GigabitEthernet0/0.30
 description HR VLAN
 encapsulation dot1Q 30
 ip address 192.168.30.2 255.255.255.0
 standby version 2
 standby 3 ip 192.168.30.1
 standby 3 priority 150
 standby 3 preempt
 no cdp enable
!
interface GigabitEthernet0/0.40
 description SALES VLAN
 encapsulation dot1Q 40
 ip address 192.168.40.2 255.255.255.0
 standby version 2
 standby 4 ip 192.168.40.1
 standby 4 priority 150
 standby 4 preempt
 no cdp enable
!
interface GigabitEthernet0/0.50
 description MANAGERS VLAN
 encapsulation dot1Q 50
 ip address 192.168.50.2 255.255.255.0
 standby version 2
 standby 5 ip 192.168.50.1
 standby 5 priority 150
 standby 5 preempt
 no cdp enable
!
interface GigabitEthernet0/0.60
 description DEVELOPMENT VLAN
 encapsulation dot1Q 60
 ip address 192.168.60.2 255.255.255.0
 standby version 2
 standby 6 ip 192.168.60.1
 no cdp enable
!
interface GigabitEthernet0/0.70
 description ENGINEERS VLAN
 encapsulation dot1Q 70
 ip address 192.168.70.2 255.255.255.0
 standby version 2
 standby 7 ip 192.168.70.1
 no cdp enable
!
interface GigabitEthernet0/0.80
 description PRODUCTION VLAN
 encapsulation dot1Q 80
 ip address 192.168.80.2 255.255.255.0
 standby version 2
 standby 8 ip 192.168.80.1
 no cdp enable
!
interface GigabitEthernet0/0.90
 description VISITORWIFI
 encapsulation dot1Q 90
 ip address 192.168.90.2 255.255.255.0
 standby version 2
 standby 9 ip 192.168.90.1
 no cdp enable
!
interface GigabitEthernet0/1
 description Link to R2 int G0/1
 ip address 192.168.0.1 255.255.255.252
 duplex auto
 speed auto
 media-type rj45
 no cdp enable
!
interface GigabitEthernet0/2
 description Connected to MS
 ip address 10.0.0.8 255.255.255.0
 duplex auto
 speed auto
 media-type rj45
 no cdp enable
!         
interface GigabitEthernet0/3
 no ip address
 shutdown
 duplex auto
 speed auto
 media-type rj45
 no cdp enable
!
ip forward-protocol nd
!
!
no ip http server
no ip http secure-server
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
 privilege level 15
 logging synchronous
 login local
 history size 100
line aux 0
 exec-timeout 0 0
 privilege level 15
 logging synchronous
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
no scheduler allocate
ntp update-calendar
ntp server 10.0.0.2
!
end
```

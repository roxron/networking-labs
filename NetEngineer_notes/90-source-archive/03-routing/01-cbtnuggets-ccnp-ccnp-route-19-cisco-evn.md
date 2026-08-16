# 19 Cisco EVN

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP ROUTE/19 Cisco EVN`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Topology:


  CR1-A-----                                                 ---------CR2-A
           |                                                 |
           ------SW1-----EVR1------------EVR2------SW2-------
           |                                                 | 
  CR1-B----                                                  ---------CR2-B

EVR1-G0/0 to EVR2-G0/0 is VNET trunk 
EVR1-G0/1 to SW1-G0/0 is 802.1q trunk 
EVR2-G0/1 to SW2-G0/0 is 802.1q trunk 
SW1-g0/1 to CR1-A -G0/0
SW1-G0/2 to CR1-B -G0/0
SW2-G0/1 to CR2-A -G0/0
SW2-G0/2 to CR2-B -G0/0

Configuration:
!
hostname EVR1
!
vrf definition CUSTOMER10
 vnet tag 10
 rd 10.0.0.1:10
 !
 address-family ipv4
 exit-address-family
!
vrf definition CUSTOMER20
 vnet tag 20
 rd 10.0.0.1:20
 !        
 address-family ipv4
 exit-address-family
!         
interface GigabitEthernet0/0
 description Link to EVR2 int g0/0
 vnet trunk
 ip address 10.0.0.1 255.255.255.252
 ip pim sparse-mode
!         
interface GigabitEthernet0/1
 no ip address
!         
interface GigabitEthernet0/1.10
 encapsulation dot1Q 10
 vrf forwarding CUSTOMER10
 ip address 192.168.10.1 255.255.255.0
 ip pim sparse-mode
!         
interface GigabitEthernet0/1.20
 encapsulation dot1Q 20
 vrf forwarding CUSTOMER20
 ip address 192.168.20.1 255.255.255.0
 ip pim sparse-mode
!         
router ospf 10 vrf CUSTOMER10
 router-id 10.0.0.1
 auto-cost reference-bandwidth 1000
 network 10.0.0.0 0.0.0.3 area 0
 network 192.168.10.0 0.0.0.255 area 0
!         
router ospf 20 vrf CUSTOMER20
 router-id 20.0.0.1
 auto-cost reference-bandwidth 1000
 network 10.0.0.0 0.0.0.3 area 0
 network 192.168.20.0 0.0.0.255 area 0


hostname EVR2
!
vrf definition CUSTOMER10
 vnet tag 10
 rd 10.0.0.2:10
 !
 address-family ipv4
 exit-address-family
!
vrf definition CUSTOMER20
 vnet tag 20
 rd 10.0.0.2:20
 !        
 address-family ipv4
 exit-address-family
!         
interface GigabitEthernet0/0
 description Link to EVR1 int g0/0
 vnet trunk
 ip address 10.0.0.2 255.255.255.252
 ip pim sparse-mode
!         
interface GigabitEthernet0/1.10
 encapsulation dot1Q 10
 vrf forwarding CUSTOMER10
 ip address 172.16.10.1 255.255.255.0
 ip pim sparse-mode
!         
interface GigabitEthernet0/1.20
 encapsulation dot1Q 20
 vrf forwarding CUSTOMER20
 ip address 172.16.20.1 255.255.255.0
 ip pim sparse-mode
!
router ospf 10 vrf CUSTOMER10
 router-id 10.0.0.2
 auto-cost reference-bandwidth 1000
 network 10.0.0.0 0.0.0.3 area 0
 network 172.16.10.0 0.0.0.255 area 0
!         
router ospf 20 vrf CUSTOMER20
 router-id 20.0.0.2
 auto-cost reference-bandwidth 1000
 network 10.0.0.0 0.0.0.3 area 0
 network 172.16.20.0 0.0.0.255 area 0


hostname SW1
!
interface GigabitEthernet0/0
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport nonegotiate
!
interface GigabitEthernet0/1
 switchport access vlan 10
 switchport mode access
!         
interface GigabitEthernet0/2
 switchport access vlan 20
 switchport mode access


hostname SW2
!
interface GigabitEthernet0/0
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport nonegotiate
!
interface GigabitEthernet0/1
 switchport access vlan 10
 switchport mode access
!
interface GigabitEthernet0/2
 switchport access vlan 20
 switchport mode access
 
hostname CR1-A
interface Loopback0
 ip address 10.100.0.1 255.255.255.0
 ip ospf network point-to-point
!         
interface Loopback1
 ip address 10.100.1.1 255.255.255.0
 ip ospf network point-to-point
!         
interface GigabitEthernet0/0
 ip address 192.168.10.2 255.255.255.0
!
router ospf 10
 router-id 10.0.0.10
 auto-cost reference-bandwidth 1000
 network 10.100.0.0 0.0.0.255 area 0
 network 10.100.1.0 0.0.0.255 area 0
 network 192.168.10.0 0.0.0.255 area 0
```

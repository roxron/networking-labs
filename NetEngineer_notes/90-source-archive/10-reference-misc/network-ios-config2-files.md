# IOS config2 Files

> Imported source note. Provenance: `NetEngineer_Journal/Network/IOS config2 Files`  
> Original source context: Network. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Router R1 Configuration: 
 
hostname R1 
no ip domain lookup 
interface f0/0 
 ip address 192.168.1.1 255.255.255.0 
 duplex auto 
 speed auto 
 no shut 
interface Serial0/0 
 bandwidth 128 
 ip address 192.168.12.1 255.255.255.252 
 ip ospf message-digest-key 1 md5 MD5LINKS 
 clock rate 128000 
 no shut 
interface Serial0/1 
 bandwidth 64 
 ip ospf message-digest-key 1 md5 MD5LINKS 
 ip address 192.168.13.1 255.255.255.252 
 no shut 
router ospf 1 
 auto-cost reference-bandwidth 1000 
 area 0 authentication message-digest 
 passive-interface f0/0 
 network 192.168.1.0 0.0.0.255 area 0 
 network 192.168.12.0 0.0.0.3 area 0 
 network 192.168.13.0 0.0.0.3 area 0 
banner motd ^Unauthorized Access is Prohibited!^ 
line con 0 
 no password  
 logging synchronous 
 no login 
line vty 0 4 
no password  
 transport input all 
end 

Router R2 Configuration: 
 
hostname R2  
no ip domain lookup 
interface Loopback0 
ip address 209.165.200.225 255.255.255.252 
interface Serial0/0 
 bandwidth 182 
 ip ospf message-digest-key 1 md5 MD5LINKS 
 ip address 192.168.12.2 255.255.255.252 
 no shut 
interface Serial0/1 
 bandwidth 128 
 ip ospf message-digest-key 1 md5 MD5LINKS 
 ip address 192.168.23.1 255.255.255.252 
 clock rate 128000 
 no shut 
router ospf 1 
 router-id 2.2.2.2 
 auto-cost reference-bandwidth 100 
 area 0 authentication message-digest 
 passive-interface f0/0 
 network 192.168.12.0 0.0.0.3 area 0 
 network 192.168.23.0 0.0.0.3 area 0 
ip route 0.0.0.0 0.0.0.0 Loopback0 
banner motd ^ Unauthorized Access is Prohibited! ^ 
line con 0 
 no password 
 logging synchronous 
 no login 
line vty 0 4 
 no password 
 no login 
 transport input all 
end 

Router R3 Configuration: 
 
hostname R3  
no ip domain lookup 
interface f0/0 
 ip address 192.168.3.1 255.255.255.0 
 duplex auto 
 speed auto 
 no shut 
interface Serial0/0 
 bandwidth 128 
 ip ospf message-digest-key 1 md5 MD5LINKS 
 ip address 192.168.13.2 255.255.255.252 
 clock rate 128000 
 no shut 
interface Serial0/1 
 bandwidth 128 
 ip address 192.168.23.2 255.255.255.252 
 no shut 
router ospf 1 
 router-id 3.3.3.3 
 area 0 authentication message-digest 
 passive-interface f0/0 
 network 192.168.3.0 0.0.0.255 area 0 
 network 192.168.13.0 0.0.0.3 area 0 
 network 192.168.23.0 0.0.0.3 area 0 
banner motd ^ Unauthorized Access is Prohibited!^ 
line con 0 
 password cisco 
 no logging  
 no login 
line vty 0 4 
 no password 
 no login 
 transport input all 
end
```

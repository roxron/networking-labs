# IOS config Files

> Imported source note. Provenance: `NetEngineer_Journal/Network/IOS config Files.txt`  
> Original source context: Network. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Router R1 Configuration: 

service password-encryption 
hostname R1 
enable secret class 
no ip domain lookup 
ipv6 unicast-routing 
interface FastEthernet0/0 
 ip address 192.168.1.1 255.255.255.0 
 duplex auto 
 speed auto 
 ipv6 address FE80::1 link-local 
 ipv6 address 2001:DB8:ACAD:A::1/64 
 ipv6 eigrp 1 
 no shutdown 
interface Serial0/0 
 bandwidth 128 
 ip address 192.168.21.1 255.255.255.252 
 ipv6 address FE80::1 link-local 
 ipv6 address 2001:DB8:ACAD:12::1/64 
 ipv6 eigrp 1 
 clock rate 128000 
 no shutdown 
interface Serial0/1 
 ip address 192.168.13.1 255.255.255.252 
 ipv6 address FE80::1 link-local 
 ipv6 address 2001:DB8:ACAD:31::1/64 
 ipv6 eigrp 1 
 no shutdown 
router eigrp 1 
 network 192.168.1.0 
 network 192.168.12.0 0.0.0.3 
 network 192.168.13.0 0.0.0.3 
 passive-interface FastEthernet0/0 
 eigrp router-id 1.1.1.1 
ipv6 router eigrp 1 
 no shutdown 
banner motd @Unauthorized Access is Prohibited!@ 
line con 0 
 password cisco 
 logging synchronous 
line vty 0 4 
 password cisco 
login 
 transport input all 
end 

Router R2 Configuration: 

service password-encryption 
hostname R2 
enable secret class 
no ip domain lookup 
ipv6 unicast-routing 
interface FastEthernet0/0 
 ip address 192.168.2.1 255.255.255.0 
 duplex auto 
 speed auto 
 ipv6 address FE80::2 link-local 
 ipv6 address 2001:DB8:ACAD:B::2/64 
 ipv6 eigrp 1 
interface Serial0/0 
 ip address 192.168.12.2 255.255.255.252 
 ipv6 address FE80::2 link-local 
 ipv6 address 2001:DB8:ACAD:12::2/64 
 ipv6 eigrp 1 
 no shutdown 
interface Serial0/1 
 bandwidth 128 
 ip address 192.168.23.1 255.255.255.0 
 ipv6 address FE80::2 link-local 
 ipv6 address 2001:DB8:ACAD:23::2/64 
 ipv6 eigrp 1 
 clock rate 128000 
 no shutdown 
router eigrp 1 
 network 192.168.12.0 0.0.0.3 
 network 192.168.23.0 0.0.0.3 
 passive-interface FastEthernet0/0 
 eigrp router-id 2.2.2.2 
ipv6 router eigrp 1 
 no shutdown 
 passive-interface FastEthernet0/0 
banner motd @Unauthorized Access is Prohibited!@ 
line con 0 
 password cisco 
 login 
 logging synchronous 
line vty 0 4 
 password cisco 
 login 
 transport input all 
end 


Router R3 Configuration: 

service password-encryption 
hostname R3 
enable secret class 
no ip domain lookup 
interface FastEthernet0/0 
 ip address 192.168.3.1 255.255.255.0 
 duplex auto 
 speed auto 
 ipv6 address FE80::3 link-local 
 ipv6 address 2001:DB8:ACAD:C::3/64 
 ipv6 eigrp 1 
interface Serial0/0 
 ip address 192.168.13.2 255.255.255.252 
 ipv6 address FE80::3 link-local 
 ipv6 address 2001:DB8:ACAD:13::3/64 
 ipv6 eigrp 1 
 no shutdown 
interface Serial0/1 
 bandwidth 128 
 ip address 192.168.23.2 255.255.255.252 
 ipv6 address FE80::3 link-local 
 ipv6 address 2001:DB8:ACAD:23::3/64 
 ipv6 eigrp 1 
 no shutdown 
router eigrp 1 
 network 192.168.3.0 
 network 192.168.13.0 0.0.0.3 
 passive-interface FastEthernet0/0 
 eigrp router-id 3.3.3.3 
banner motd @Unauthorized Access is Prohibited!@ 
line con 0 
 password cisco 
 login 
 logging synchronous 
line vty 0 4 
 password cisco 
 login 
 transport input all 
end 
_____________________________________________________________


Router R1 Configuration: 

service password-encryption 
hostname R1 
enable secret class 
no ip domain lookup 
ipv6 unicast-routing 
interface GigabitEthernet0/0 
 ip address 192.168.1.1 255.255.255.0 
 duplex auto 
 speed auto 
 ipv6 address FE80::1 link-local 
 ipv6 address 2001:DB8:ACAD:A::1/64 
 ipv6 eigrp 1 
 no shutdown 
interface Serial0/0/0 
 bandwidth 128 
 ip address 192.168.21.1 255.255.255.252 
 ipv6 address FE80::1 link-local 
 ipv6 address 2001:DB8:ACAD:12::1/64 
 ipv6 eigrp 1 
 clock rate 128000 
 no shutdown 
interface Serial0/0/1 
 ip address 192.168.13.1 255.255.255.252 
 ipv6 address FE80::1 link-local 
 ipv6 address 2001:DB8:ACAD:31::1/64 
 ipv6 eigrp 1 
 no shutdown 
router eigrp 1 
 network 192.168.1.0 
 network 192.168.12.0 0.0.0.3 
 network 192.168.13.0 0.0.0.3 
 passive-interface GigabitEthernet0/0 
 eigrp router-id 1.1.1.1 
ipv6 router eigrp 1 
 no shutdown 
banner motd @ 
 Unauthorized Access is Prohibited! @ 
line con 0 
 password cisco 
 logging synchronous 
line vty 0 4 
 password cisco 
login 
 transport input all 
end 

Router R2 Configuration: 

service password-encryption 
hostname R2 
enable secret class 
no ip domain lookup 
ipv6 unicast-routing 
interface GigabitEthernet0/0 
 ip address 192.168.2.1 255.255.255.0 
 duplex auto 
 speed auto 
 ipv6 address FE80::2 link-local 
 ipv6 address 2001:DB8:ACAD:B::2/64 
 ipv6 eigrp 1 
interface Serial0/0/0 
 ip address 192.168.12.2 255.255.255.252 
 ipv6 address FE80::2 link-local 
 ipv6 address 2001:DB8:ACAD:12::2/64 
 ipv6 eigrp 1 
 no shutdown 
interface Serial0/0/1 
 bandwidth 128 
 ip address 192.168.23.1 255.255.255.0 
 ipv6 address FE80::2 link-local 
 ipv6 address 2001:DB8:ACAD:23::2/64 
 ipv6 eigrp 1 
 clock rate 128000 
 no shutdown 
router eigrp 1 
 network 192.168.12.0 0.0.0.3 
 network 192.168.23.0 0.0.0.3 
 passive-interface GigabitEthernet0/0 
 eigrp router-id 2.2.2.2 
ipv6 router eigrp 1 
 no shutdown 
 passive-interface GigabitEthernet0/0 
banner motd @ 
 Unauthorized Access is Prohibited! @ 
line con 0 
 password cisco 
 login 
 logging synchronous 
line vty 0 4 
 password cisco 
 login 
 transport input all 
end 

Router R3 Configuration: 

service password-encryption 
hostname R3 
enable secret class 
no ip domain lookup 
interface GigabitEthernet0/0 
 ip address 192.168.3.1 255.255.255.0 
 duplex auto 
 speed auto 
 ipv6 address FE80::3 link-local 
 ipv6 address 2001:DB8:ACAD:C::3/64 
 ipv6 eigrp 1 
interface Serial0/0/0 
 ip address 192.168.13.2 255.255.255.252 
 ipv6 address FE80::3 link-local 
 ipv6 address 2001:DB8:ACAD:13::3/64 
 ipv6 eigrp 1 
 no shutdown 
interface Serial0/0/1 
 bandwidth 128 
 ip address 192.168.23.2 255.255.255.252 
 ipv6 address FE80::3 link-local 
 ipv6 address 2001:DB8:ACAD:23::3/64 
 ipv6 eigrp 1 
 no shutdown 
router eigrp 1 
 network 192.168.3.0 
 network 192.168.13.0 0.0.0.3 
 passive-interface GigabitEthernet0/0 
 eigrp router-id 3.3.3.3 
banner motd @ 
 Unauthorized Access is Prohibited! @ 
line con 0 
 password cisco 
 login 
 logging synchronous 
line vty 0 4 
 password cisco 
 login 
 transport input all 
end
```

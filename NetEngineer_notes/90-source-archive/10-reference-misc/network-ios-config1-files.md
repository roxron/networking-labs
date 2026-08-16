# IOS config1 Files

> Imported source note. Provenance: `NetEngineer_Journal/Network/IOS config1 Files`  
> Original source context: Network. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Router R1 Configuration: 

 
service password-encryption 
no ip domain lookup 
hostname R1 
enable secret class 
line con 0 
 logging synchronous 
 password cisco 
 login
line vty 0 
 password cisco 
 login 
banner motd @Unauthorized Access is Prohibited!@ 
ipv6 unicast-routing 
ipv6 router ospf 1 
 router-id 1.1.1.1 
 passive-interface f0/0 
interface f0/0 
 ip address 192.168.1.1 255.255.255.0 
 ipv6 address 2001:db8:acad:a::1/64 
 ipv6 address fe80::1 link-local 
interface s0/0 
 clock rate 128000 
 ip address 192.168.12.1 255.255.255.0 
 ipv6 address 2001:db8:acad:12::1/64 
 ipv6 address fe80::1 link-local 
 ipv6 ospf 1 area 0 
 no shutdown 
interface s0/1 
 ip address 192.168.13.1 255.255.255.0 
 ipv6 address 2001:db8:acad:13::1/64 
 ipv6 address fe80::1 link-local 
 ipv6 ospf 1 area 0 
 no shutdown 
router ospf 1 
 network 192.168.1.0 0.0.0.255 area 0 
 network 129.168.12.0 0.0.0.3 area 0 
 network 192.168.13.0 0.0.0.3 area 0 
 passive-interface f0/0 
end 

Router R2 Configuration: 


service password-encryption 
no ip domain lookup 
hostname R2 
enable secret class 
line con 0 
 logging synchronous 
 password cisco 
 login 
line vty 0 
 password cisco 
 login 
banner motd @Unauthorized Access is Prohibited!@
ipv6 unicast-routing 
ipv6 router ospf 1 
 router-id 2.2.2.2 
interface f0/0 
ip address 192.168.2.1 255.255.255.0 
 ipv6 address 2001:db8:acad:B::2/64 
 ipv6 address fe80::1 link-local 
 no shutdown 
interface s0/0 
 ip address 192.168.12.2 255.255.255.252 
 ipv6 address 2001:db8:acad:12::2/64 
 ipv6 address fe80::2 link-local 
 ipv6 ospf 1 area 0 
 no shutdown 
interface s0/1 
 clock rate 128000 
 ipv6 address 2001:db8:acad:23::2/64 
 ipv6 address fe80::2 link-local 
 no shutdown 
router ospf 1 
 network 192.168.2.0 0.0.0.255 area 0 
 network 192.168.12.0 0.0.0.3 area 0 
 network 192.168.23.0 0.0.0.3 area 0 
end 

Router R3 Configuration: 
 
service password-encryption 
no ip domain lookup 
enable secret class 
hostname R3 
line con 0 
 logging synchronous 
 password cisco 
 login 
line vty 0 
 password cisco 
 login 
banner motd @Unauthorized Access is Prohibited!@ 
interface f0/0 
 ipv6 address 2001:db8:acad:c::3/64 
 ipv6 address fe80::3 link-local 
interface s0/0 
 clock rate 128000 
 ip address 192.168.13.1 255.255.255.252 
 ipv6 address 2001:db8:acad:13::3/64 
 ipv6 address fe80::3 link-local 
 no shutdown 
interface s0/1 
 ip address 192.168.23.2 255.255.255.252 
 ipv6 address 2001:db8:acad:23::3/64 
 ipv6 address fe80::3 link-local 
router ospf 1 
 network 192.168.3.0 0.0.0.255 area 0 
 passive-interface f0/0 
end
```

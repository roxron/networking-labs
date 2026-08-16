# 28 NAT

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/28 NAT`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Dynamic NAT Configuration:
!
interface FastEthernet0/0
ip address 10.1.1.100 255.255.255.0
ip nat inside
!
interface FastEthernet0/1
ip address 198.51.100.1 255.255.255.240
ip nat outside
!
ip nat pool ISP-POOL 198.51.100.3 198.51.100.14 netmask 255.255.255.240
ip nat inside source list 1 pool ISP-POOL
!
access-list 1 permit 10.1.1.0 0.0.0.255
!
!
Verify Dynamic NAT:
show ip nat statistics
show ip nat translations


Static NAT Configuration:
!
interface FastEthernet0/0
ip address 10.1.1.100 255.255.255.0
ip nat inside
!
interface FastEthernet0/1
ip address 198.51.100.1 255.255.255.240
ip nat outside
!
ip nat inside source static 10.1.1.1 198.51.100.3
ip nat inside source static 10.1.1.2 198.51.100.4
!


PAT Configuration:
interface FastEthernet0/0
ip address 10.1.1.100 255.255.255.0
ip nat inside
!
interface FastEthernet0/1
ip address 198.51.100.1 255.255.255.240
ip nat outside
!
access-list 1 permit 10.1.1.0 0.0.0.255
!
ip nat inside source list 1 interface FastEthernet0/1 overload

   
NAT Virtual Interface (NVI), Configuration:
!
interface FastEthernet0/0
ip address 10.1.1.100 255.255.255.0
ip nat enable
!
interface FastEthernet0/1
ip address 198.51.100.1 255.255.255.240
ip nat enable
!
ip nat source list 1 interface FastEthernet0/1 overload
!
access-list 1 permit 10.1.1.0 0.0.0.255
```

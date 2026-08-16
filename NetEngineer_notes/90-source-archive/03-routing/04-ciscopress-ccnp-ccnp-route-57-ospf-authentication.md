# 57 OSPF Authentication

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/57 OSPF Authentication`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
OSPFv2 Plain Text Authentication Configuration:
!Configuration on Router R1
interface Serial1/0
ip address 10.1.1.1 255.255.255.252
ip ospf authentication-key KEYLIME
!
router ospf 1
area 0 authentication
network 0.0.0.0 255.255.255.255 area 0
!
!
!
!Configuration on Router R2
interface Serial1/0
ip address 10.1.1.2 255.255.255.252
p ospf authentication
ip ospf authentication-key KEYLIME
!
router ospf 1
network 0.0.0.0 255.255.255.255 area 0
!
!
R1# show ip ospf interface s 1/0
R1# show ip ospf neighbor



OSPFv2 MD5 Authentication Configuration:
!Configuration on Router R1
interface Serial1/0
ip address 10.1.1.1 255.255.255.252
ip ospf message-digest-key 1 md5 KEYLIME
!
router ospf 1
area 0 authentication message-digest
network 0.0.0.0 255.255.255.255 area 0
!
!Configuration on Router R2
interface Serial1/0
ip address 10.1.1.2 255.255.255.252
ip ospf authentication message-digest
ip ospf message-digest-key 1 md5 KEYLIME
!
router ospf 1
network 0.0.0.0 255.255.255.255 area 0
!
!
R1# show ip ospf interface G0/0
R1# show ip ospf interface



OSPFv3 Authentication Configuration:
!Configuration on Router R1
interface Serial1/0
ipv6 address 2002::1/64
ipv6 ospf 2 area 0
!
ipv6 router ospf 2
router-id 1.1.1.1
area 0 authentication ipsec spi 256 sha1 0123456789012345678901234567890123456789
!
!
!
!Configuration on Router R2
interface Serial1/0
ipv6 address 2002::2/64
ipv6 ospf authentication ipsec spi 256 sha1 0123456789012345678901234567890123456789
ipv6 ospf 2 area 0
!
ipv6 router ospf 2
router-id 2.2.2.2
!
!
R1# show crypto ipsec sa interface s0/0
!
!
Enable AH:
!
ipv6 ospf authentication 
!
!
Enable ESP:
!
ipv6 ospf encryption 
!
```

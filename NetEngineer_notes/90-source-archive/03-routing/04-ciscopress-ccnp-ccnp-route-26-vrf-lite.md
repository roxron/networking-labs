# 26 VRF-lite

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/26 VRF-lite`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
VRF-Lite Sample Configuration Using OSPF as the Routing Protocol:
... OUTPUT OMITTED...
ip vrf VOICE
!
ip vrf DATA
!
ip vrf VIDEO
!
... OUTPUT OMITTED...
!
interface FastEthernet0/0
no ip address
!
interface FastEthernet0/0.2	
encapsulation dot1Q 2
ip vrf forwarding VOICE
ip address 192.0.2.1 255.255.255.252
!
interface FastEthernet0/0.3
encapsulation dot1Q 3
ip vrf forwarding DATA
ip address 198.51.100.1 255.255.255.252
!
interface FastEthernet0/0.4
encapsulation dot1Q 4
ip vrf forwarding VIDEO
ip address 203.0.113.1 255.255.255.252
!
... OUTPUT OMITTED...
!
router ospf 1 vrf VOICE
network 0.0.0.0 255.255.255.255 area 0
!
router ospf 2 vrf DATA
network 0.0.0.0 255.255.255.255 area 0
!
router ospf 3 vrf VIDEO
network 0.0.0.0 255.255.255.255 area 0
!
!
Verify VRF:
show ip vrf
show ip route vrf VOICE
ping vrf VOICE 10.1.1.1
```

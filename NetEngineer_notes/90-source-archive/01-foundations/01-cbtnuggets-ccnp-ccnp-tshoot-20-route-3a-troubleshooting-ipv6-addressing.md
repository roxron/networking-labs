# 20 Route%3a Troubleshooting IPv6 Addressing

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/20 Route%3a Troubleshooting IPv6 Addressing`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Route: Troubleshooting IPv6 Addressing:
!
IPV6 ADDRESSSING:
!
> Address Size Moved From 32-bit (IPV4) to 128-Bit (IPv6)

> Provides: 
     340,282,366,920,938,463,363,374,607,431,770,000,000  ...Addresses 

> To Make Addresses more Manageable, Divided into 8 Groups of 4 Hex Characters 
       2001:0050:0DB8:0000:0000:0000:0AB4:1e2b 

> Rule 1: Eliminate Group of Consecutive Zeros
       2001:0050:0DB8::0AB4:1e2b

> Rule 2: Drop Leading Zeros 
       2001:50:DB8::AB4:1e2b
!
!
GLOBAL ADDRESSES:
!
> Have their High-level 3 bits set to 001 (2000::/3)
! 
 [ Global Prefix ('n' bits) ] + [ Subnet ID (64-'n' bits) ] + [ Interface ID (64 bits) ] 
!
> Global Routing PRefix is 48 Bits or Less 
!
> Subnet ID os Comprised of Bits are Left over after Global Routing PRefix 
! 
> The Primary addresses expected to comprise the IPv6 Internet are from the 2001::/16 subnet 

   - /32 Subnets assignerd to ISPs
 
   - /48 /56/ /64 subnets assigned to customers 
!
!
IPV6 COMMUNICATIONS:
!
> NEIGHBOR DISCOVERY 
> NEIGHBOR SOLICITATION
!
IPv6 Multicast Address: 

FF02::1 - All-nodes 
FF02::2 - All-routers 
FF02::5 - All-OSPF routers 
FF02::6 - OSPF designated 
FF02::9 - All-RIP 
FF02::A - All-EIGRP 
FF02::1:Fxx:xxxx - Solicited-node 
!
!
GETTING AN ADDRESS IN IPV6:
!
> STATELESS ADDRESS AUTOCONFIGURATION (RS TO ROUTERS)
> STATEFUL DHCP (ADDRESS AND OPTIONS FROM DHCP)
> STATELESS DHCP (OPTIONS FROM DHCP) 
> DHCP RELAY AGENTS
> MANUAL CONFIGURATION 
!
!
IPV6 ADDRESS: WHAT CAN GO WRONG?:
!
> IPV6 UNICAST ROUTING OR IPV6 INTERFACE NOT ENABLED 
> INTERFACE IS USING A /64 PREFIX (AUTO-CONFIGURATION)
> ROUTER ADVERTISEMENTS ARE SUPPRESSED 
> DHCP MISCONFIGURATION 
!
- show run interface <int> 
- show run | include ipv6 
- show run | section dhcp 
- show ipv6 dhcp binding 
- show ipv6 interface 
- show ipv6 interface brief 
- show ipv6 neighbors
- show ipv6 routers 
- debug ipv6 nd
```

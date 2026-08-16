# IPv6 Addressing

> Imported source note. Provenance: `NetEngineer_Journal/Network Matrix/IPv6 Addressing`  
> Original source context: Network Matrix. Content is preserved as historical study material; validate commands against the target platform and release.

```text
IPv6 Adressing 
  IPv6 example:  2012:ABCD:EF00:1234:5678:910A:0000:A1B1
  IPv6 address is 128 bit long divided by colons, each portion of adress is calling hextet. 
  IPv6 address represented by 32  Hexadecimal symbols combined into  8 groups,  each of 4 hex digits.
  IPv6 adress structured  into 2 parts  Prefix and Iterface ID      || Prefix 64 bit  | Interface ID ||   
  IPv6 Address  uses prefix-length to represent prefix  and shown as /64 .  Example: 2001:AAAA:1234:ABCD::/64
  IPv6 Address can  be:
                                     Unicast Address 
                                     Multicast Address 
                                     Anycast  Adress    ( there is no Broadcast address in IPv6.)
  However there is  an IPv6 Multicast  all-nodes  address  that essentially gives the same result. 
  
  Types of Ipv6 Unicast addresses:  
                                   Global  Unicast 
                                   Link Local 
                                   Loop Back   ::1/128
                                   Unspecified Address ::/128
                                   Unique Local  FC00::/7  to FDFF::/7 
                                   Embedded IPv4  

  IPv6 Link Local address  has local significance, meaning that  address  is not routable outside of local network. 
  IPv6 Link local  addresses are in the FE80::/10 range. 
  The  /10 indicates that first 10 bit are 1111 1110 10xx xxxx.  
  The first hextet  is  1111 1110 1000 0000 (FE80)  to last hextet  1111 1110 1011 1111  (FEBF)

  IPv6 Unicast Global address structure: 
  IPv6  Global address has three parts:
                            Global routing prefix 
                            Subnet  ID
                            Interface ID 
  Current range of IPv6 uses  3 first bit of first hextet is  001 
  Range of  first hextet:
  0010 0000 0000 0000  ( 2000)   to  0011 1111 1111 1111  (3FFF)
  Structure: 
   ______________________________________________________
  | Global routig prefix |    Subnet ID   |     Interface   ID                |
  |__________________|____________|____________________| 
                 48 bit                           16 bit                          64 bit   
   A /48 bit routing  prefix + /16 bit Subnet ID = /64 bit Prefix 
 ______________________________________________________________________ 
 
IPv6 Multicast addresses have prefix FF00::/8
There are two types of  IPv6  Multicast addresses 
                           Assigned Multicast 
                           Solicited node Multicast
```

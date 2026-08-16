# 16 TUNNELING

> Imported source note. Provenance: `NetEngineer_Journal/02 NETWORK LESSONS/CCNP/CCNP ROUTE/16 TUNNELING`  
> Original source context: 02 NETWORK LESSONS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure Automatic 6to4 Tunnel:
!
Site one:
!
Futura(config)#ipv6 general-prefix MYPREFIX 6to4 fastEthernet 0/0
!
Futura(config)#interface tunnel 0
Futura(config-if)#ipv6 address 2002:C0A8:C01::1/64
Futura(config-if)#tunnel source fastEthernet 0/0
Futura(config-if)#tunnel mode ipv6ip 6to4
!
Futura(config)#ipv6 route 2001::3/128 2002:C0A8:1703::3
Futura(config)#ipv6 route 2002::/16 tunnel 0
!
!
Site two:
!
Destiny(config)#ipv6 general-prefix MYPREFIX 6to4 fastEthernet 0/0
!
Destiny(config)#interface tunnel 0
Destiny(config-if)#ipv6 address 2002:C0A8:1703::3/64
Destiny(config-if)#tunnel source fastEthernet 0/0
Destiny(config-if)#tunnel mode ipv6ip 6to4
!
Destiny(config)#ipv6 route 2001::1/128 2002:C0A8:C01::1
Destiny(config)#ipv6 route 2002::/16 tunnel 0
!
!
Future# show ipv6 general-prefix
!




Configuring ISATAP (Intra-site Automatic Tunneling Addressing Protocol)
!
!
Futura(config)#interface tunnel 0
Futura(config-if)#ipv6 address 2001::/64 eui-64
Futura(config-if)#no ipv6 nd suppress-ra
Futura(config-if)#tunnel source loopback 0
Futura(config-if)#tunnel mode ipv6ip isatap
!
!
!
Destiny(config)#interface tunnel 0
Destiny(config-if)#ipv6 enable
Destiny(config-if)#ipv6 address autoconfig
Destiny(config-if)#tunnel source fastEthernet 0/0
Destiny(config-if)#tunnel destination 1.1.1.1
Destiny(config-if)#tunnel mode ipv6ip
!
```

# 001 IPv6 Addressing Formats

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS v5 All-In-One 3.0 Layer 3 Technologies/001 IPv6 Addressing Formats`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS v5 All-In-One 3.0 Layer 3 Technologies. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Site Local: FEC0::/10 
!
ULA: FC00::/7

Configure Global IPv6 Address and Link-local 
!
R1(config)# interface g0/0 
R1(config-if)# ipv6 address fe80::1 link-local 
R1(config-if)# ipv6 address 2001:DB8:1000:ABCD:FFFF:DEED:1122:C100/64 
R1(config-if)# end
!
R1# show ipv6 interface g0/0
```

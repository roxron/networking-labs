# 11 IP Services  DHCP

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA ISP/CCNA 640-875 SPNGN1/11 IP Services_ DHCP`  
> Original source context: 01 CBTNUGGETS / CCNA ISP / CCNA 640-875 SPNGN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# ip dhcp excluded-address 192.168.10.1 192.168.10.10
R1(config)#ip dhcp pool 192.168.10.0
R1(dhcp-config)#network 192.168.10.0 /24
R1(dhcp-config)#default-router 192.168.10.1
R1(dhcp-config)#dns-server 8.8.8.8
R1(dhcp-config)#domain-name cbtnuggets.com
!
R1# show ip dhcp pool
R1# show ip dhcp binding
```

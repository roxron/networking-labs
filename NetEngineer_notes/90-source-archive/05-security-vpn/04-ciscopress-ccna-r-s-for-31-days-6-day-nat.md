# 6 Day NAT

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNA R&S for 31 days/6 Day NAT`  
> Original source context: 04 CISCOPRESS / CCNA R&S for 31 days. Content is preserved as historical study material; validate commands against the target platform and release.

```text
NAT:
!
Configuring Static NAT:
!
R2(config)# ip nat inside source static 192.168.10.254 209.165.200.254
R2(config)# interface serial0/0/0
R2(config-if)# ip nat inside
R2(config-if)# interface serial 0/1/0
R2(config-if)# ip nat outside
!
!
Configuring Dynamic NAT:
!
R2(config)# ip nat pool NAT-POOL1 209.165.200.226 209.165.200.240 netmask
255.255.255.224
R2(config)# access-list 1 permit 192.168.0.0 0.0.255.255
R2(config)# ip nat inside source list 1 pool NAT-POOL1
R2(config)# interface serial 0/0/0
R2(config-if)# ip nat inside
R2(config-if)# interface serial s0/1/0
R2(config-if)# ip nat outside
!
!
Configuring NAT to Overload an Interface Address:
!
R2(config)# access-list 1 permit 192.168.0.0 0.0.255.255
R2(config)# ip nat inside source list 1 interface serial 0/1/0 overload
R2(config)# interface serial 0/0/0
R2(config-if)# ip nat inside
R2(config-if)# interface serial s0/1/0
R2(config-if)# ip nat outside
!
!
Verifying NAT:
!
R2# show ip nat translations
R2# show ip nat statistics
R2# clear ip nat translation *
!
!
Troubleshooting NAT:
!
R2# debug ip nat
!
```

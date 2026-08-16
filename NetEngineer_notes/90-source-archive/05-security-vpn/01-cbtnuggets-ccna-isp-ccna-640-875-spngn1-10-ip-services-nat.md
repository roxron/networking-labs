# 10 IP Services  NAT

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA ISP/CCNA 640-875 SPNGN1/10 IP Services_ NAT`  
> Original source context: 01 CBTNUGGETS / CCNA ISP / CCNA 640-875 SPNGN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure static NAT:
R1(config)# int	 g0/0
R1(config-if)# ip nat outside
R1(config-if)# interface g0/1
R1(config-if)# ip nat inside
R1(config-if)# exit
R1(config)# ip nat inside source static 192.168.10.50 200.0.1.25
!
R1# show ip nat translations
R1# show ip nat statistics


Connfigure NAT overload ( to An Interface)
R1(config)# int	 g0/0
R1(config-if)# ip nat outside
R1(config-if)# interface g0/1
R1(config-if)# ip nat inside
R1(config-if)# exit
R1(config)# access-list 10 permit 192.168.10.0 0.0.0.255 
R1(config)# ip nat inside source list 10 interface g0/0 overload
!
R1# show ip nat translations
R1# show ip nat statistics


Configure NAT overload (to a POOL)# 
R1(config)# int	 g0/0
R1(config-if)# ip nat outside
R1(config-if)# interface g0/1
R1(config-if)# ip nat inside
R1(config-if)# exit
R1(config)# access-list 10 permit 192.168.10.0 0.0.0.255 
R1(config)# ip nat pool PUBLIC_POOL 200.0.1.9 200.0.1.14
R1(config)# ip nat inside source list 10 pool PUBLIC_POOL overload
!
R1# show ip nat translations
R1# show ip nat statistics
R1# clear ip nat translations *
```

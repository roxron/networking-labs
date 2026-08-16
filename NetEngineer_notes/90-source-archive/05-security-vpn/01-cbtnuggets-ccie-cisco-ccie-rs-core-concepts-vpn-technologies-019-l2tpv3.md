# 019 L2TPV3

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS Core Concepts - VPN Technologies/019 L2TPV3`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS Core Concepts - VPN Technologies. Content is preserved as historical study material; validate commands against the target platform and release.

```text
PE1# show l2tp session 
PE1# show l2tp tunnel 
!
l2tp-class l2tp_class1
!
pseudowire-class eth1000 
 encapsulation l2tpv3 
 protocol ll2tpv3 l2tp_class1 
 ip local interface Lo101 
!
int g0/2 
 xconnect 192.168.200.1 200 encapsulation l2tpv3 pw-class eth1000
```

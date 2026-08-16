# 017 VTI Site to Site IPsec VPNs

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS Core Concepts - VPN Technologies/017 VTI Site to Site IPsec VPNs`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS Core Concepts - VPN Technologies. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Static IPsec VTI:
R3(config)# crypto isakmp polify 1 
R3(config-isakmp)# authentication pre-share 
R3(config-isakmp)# exit 
!
R3(config)# crypto isakmp key cisco123 address 12.12.12.1 
!
R3(config)# crypto ipsec transform-set MYSET esp-aes esp-sha-hmac
R3(cfg-crypto-trans)# exit
!
R3(config)# crypto ipsec profile MYPROFILE 
R3(ipsec-profile)# set transform-ser MYSET
R3(ipsec-profile)# exit
!
R3(config)# interface tun 0
R3(config-if)# ip unnumbered fa0/0 
R3(config-if)# tunnel source fa0/0
R3(config-if)# tunnel destination 12.12.12.1 
R3(config-if)# tunnel mode ipsec ipv4 
R3(config-if)# tunnel protection ipsec profile MYPROFILE 
!
!
Verify:
R3# show crypto isakmp sa 
R3# show crypto ipsec sa
R3# 


Dynamic IPsec VTI:
!
int virtual-template 1 
ip unnumbered f0/0 
tunnel mode ipsec ipv4 
tunnel protection ipsec profile MYPROFILE
```

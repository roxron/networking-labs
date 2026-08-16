# 013 DMVPN%3a IPSec

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS Core Concepts - VPN Technologies/013 DMVPN%3a IPSec`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS Core Concepts - VPN Technologies. Content is preserved as historical study material; validate commands against the target platform and release.

```text
crypto isakmp policy 1 
 encription aes 
 authentication pre-share 
 group 14 
!
crypto isakmp key CISCOPASS address 0.0.0.0 
!
crypto ipsec transform-set CCIE esp-aes esp-sha-hmac 
 mode transport 
!
crypto ipsec profile CCIE_PART4 
 set transform-set CCIE 
!
int tu 0 
tunnel protection ipsec profile CCIE_PART4 
!
!
Verify IPSEC:
!
R1# show crypto isakmp sa
R1# show dmvpn 
R1# show dmvpn detail
```

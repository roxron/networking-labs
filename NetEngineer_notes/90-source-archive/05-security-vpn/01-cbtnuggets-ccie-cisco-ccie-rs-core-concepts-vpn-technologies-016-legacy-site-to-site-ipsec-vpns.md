# 016 Legacy Site to Site IPsec VPNs

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS Core Concepts - VPN Technologies/016 Legacy Site to Site IPsec VPNs`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS Core Concepts - VPN Technologies. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R2(config)# crypto isakmp policy 1 
R2(config-isakmp)# authentication pre-share 
R2(config-isakmp)# exit
!
R2(config)# crypto isakmp key cisco123 address 23.23.23.3 
!
R2(config)# access-list 100 permit ip host 1.1.1.1 host 4.4.4.4 
!
R2(config)# crypto ipsec transform-set MYSET esp-sha-hmac esp-aes 
R2(cfg-crypto-trans)# exit 
!
R2(config)# crypto map MYMAP 1 ipsec-isakmp 
R2(config-crypto-map)# set transform-set MYSET 
R2(config-crypto-map)# set peer 23.23.23.3
R2(config-crypto-map)# match address 100 
R2(config-crypto-map)# exit
!
R2(config)# interface f0/0 
R2(config-if)# crypto map MYMAP 
!
!
R3(config)# crypto isakmp policy 1 
R3(config-isakmp)# authentication pre-share 
R3(config-isakmp)# exit
!
R3(config)# crypto isakmp key cisco123 address 11.11.11.1 
!
R3(config)# access-list 100 permit ip host 4.4.4.4 host 1.1.1.1 
!
R3(config)# crypto ipsec transform-set MYSET esp-sha-hmac esp-aes 
R3(cfg-crypto-trans)# exit 
!
R3(config)# crypto map MYMAP 1 ipsec-isakmp 
R3(config-crypto-map)# set transform-set MYSET 
R3(config-crypto-map)# set peer 11.11.11.1
R3(config-crypto-map)# match address 100 
R3(config-crypto-map)# exit
!
R3(config)# interface f0/0 
R3(config-if)# crypto map MYMAP 
!
!
Verify: 
!
R2# show crypto isakmp sa 
R2# show crypto ipsec sa
```

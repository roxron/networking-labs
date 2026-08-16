# 001 Group Member Configuration

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP Sec/300-209 SIMOS/GET VPN/001 Group Member Configuration`  
> Original source context: 01 CBTNUGGETS / CCNP Sec / 300-209 SIMOS / GET VPN. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Create IKE Policy:
!
ks(config)# crypto isakmp policy 10 
ks(config-isakmp)# hash sha256
ks(config-isakmp)# authentication pre-share 
ks(config-isakmp)# group 14
ks(config-isakmp)# lifetime 180
ks(config-isakmp)# encryption aes 256 
ks(config-isakmp)# exit 
!
!
Configure Pre-Share Key:
!
ks(config)# crypto isakmp key cisco123 address 0.0.0.0
ks(config)# exit 
!
!
Create Crypto GDOI group:
!
ks(config)# crypto gdoi group Our-GETVPN
ks(config-gdoi-group)# identity number 6783
ks(config-gdoi-group)# server address ipv4 5.5.5.5
ks(config-gdoi-group)# exit 
!
!
Create Crypto Map:
!
ks(config)# crypto map GETVPN-MAP 10 gdoi 
ks(config-crypto-map)# set group Our-GETVPN
ks(config-crypto-map)# exit 
!
!
Apply crypto map to the interface:
!
ks(config)# interface e0/0
ks(config-if)# crypto map GETVPN-MAP
ks(config-if)# ip tcp adjust-mss 1360
ks(config-if)# exit 
!
!
Verify GETVPN:
!
gm# show crypto isakmp sa
gm# show crypto isakmp sa detail 
!
gm# show crypto session 
!
gm# show crypto gdoi 
!
gm# show crypto gdoi gm rekey 
!
gm# show crypto engine connections active 
!
gm# show crypto ipsec sa
```

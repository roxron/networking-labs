# 000 Key Server Configuration

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP Sec/300-209 SIMOS/GET VPN/000 Key Server Configuration`  
> Original source context: 01 CBTNUGGETS / CCNP Sec / 300-209 SIMOS / GET VPN. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Create IKE Policy:
!
ks(config)# crypto isakmp policy 1 
ks(config-isakmp)# hash sha256
ks(config-isakmp)# authentication pre-share 
ks(config-isakmp)# group 14
ks(config-isakmp)# lifetime 180
ks(config-isakmp)# encryption aes 256 
ks(config-isakmp)# exit 
!
Verify IKE policy:
!
ks# show crypto isakmp policy
!
!
Configure Pre-Share Key:
!
ks(config)# crypto isakmp key cisco123 address 0.0.0.0
ks(config)# exit 
!
!
Create rekeying Public/Private Key Pair:
!
ks(config)# crypto key gen rsa general lable GETVPN module 1024 exportable
ks(config)# exit
!
!
Create IPSec Transform-set:
!
ks(config)# crypto ipsec transform-ste Our-TSET esp-aes 192 esp-sha-hmac 
ks(config)# exit 
!
!
Create Crypto IPsec Profile:
!
ks(config)# crypto ipsec profile GDOI-Profile 
ks(ipsec-profile)# set transform-set Our-TSET
ks(ipsec-profile)# set security-association lifetime seconds 300
ks(ipsec-profile)# exit
!
!
Create Crypto GDOI group:
!
ks(config)# crypto gdoi group Our-GETVPN
ks(config-gdoi-group)# identity number 6783
ks(config-gdoi-group)# server local 
ks(gdoi-local-server)# address ipv4 5.5.5.5
ks(gdoi-local-server)# rekey transport unicast
ks(gdoi-local-server)# rekey lifetime seconds 600
ks(gdoi-local-server)# rekey retransmit 10 number 2 
ks(gdoi-local-server)# rekey authntication mypubkey rsa GETVPN
ks(gdoi-local-server)# sa ipsec
ks(gdoi-sa-ipsec)# profile GDOI-Profile
ks(gdoi-sa-ipsec)# match address ipv4 101 
ks(gdoi-sa-ipsec)# replay time window-size 5 
ks(gdoi-sa-ipsec)# exit
ks(gdoi-local-server)# exit 
ks(config-gdoi-group)# exit 
ks(config)# 
!
!
Create ACL to Encrypt/Decrypt Traffic:
!
ks(config)# ip acess-list extended 101
ks(config-ext-nacl)# permit ip 10.0.0.0 0.255.255.255 10.0.0.0 0.255.255.255
ks(config-ext-nacl)# exit
!
!
!
Force Rekey process after Policy has been changed:
!
ks# crypto gdoi ks rekey replace-now
!
Verify GETVPN:
!
ks# show crypto gdoi 
!
ks# show crypto gdoi ks policy 
!
ks# show crypto gdoi ks acl 
!
ks# show crypto gdoi ks rekey 
!
ks# show crypto gdoi ks member 
!
```

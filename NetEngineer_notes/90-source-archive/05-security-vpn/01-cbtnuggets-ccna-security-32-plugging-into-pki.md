# 32 Plugging into PKI

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/32 Plugging into PKI`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Install CE Certificate:
!
ASA(config)# crypto ca trustpoint MY-CA-1
 revocation-check none
 no id-usage 
 enrollment url http://192.168.1.172:80
 crypto ca authenticate MY-CA-1 nointeractive
!
!
!
Install Identity Certificate:
!
ASA(config)# crypto key generate rsa label New-Pair-for-Cert noconfirm
!
crypto ca trustpoint MY-IDENTITY-Cert
 keypair New-Pair-for-Cert
 id-usage ssl-ipsec
 no fqdn
 ip-address 192.168.1.171
 subject-name CN=ASA1
 enrollment url http:/192.168.1.172:80
crypto ca authenticate MY-IDENTITY-Cert noconfirm
!
!
!
Enable Identity Certificate:
!
ssl trust-point MY-IDENTITY-Cert outside 
crypto ikev2 remote-access trustpoint MY-IDENTITY-Cert
!
!
```

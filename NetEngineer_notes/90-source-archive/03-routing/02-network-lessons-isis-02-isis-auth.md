# 02 ISIS AUTH

> Imported source note. Provenance: `NetEngineer_Journal/02 NETWORK LESSONS/IS-IS/02 ISIS AUTH`  
> Original source context: 02 NETWORK LESSONS / IS-IS. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Clear Text Authentication
R1(config)# interface G0/1 
R1(config-if)# isis password CISCO

R2(config)# interface G0/1 
R2(config-if)# isis password CISCO


Area Authentication
R1(config)# router isis
R1(config-router)# area-password CISCO

R2(config)# router isis
R2(config-router)# area-password CISCO


LSP authentication
R1(config)# router isis
R1(config-router)# area-password CISCO authenticate snp validate

R2(config)# router isis
R2(config-router)# area-password CISCO authenticate snp validate


Domain Authentication
R1(config)# router isis
R1(config-router)# domain-password CISCO

R2(config)# router isis
R2(config-router)# domain-password CISCO


HMAC-MD5 Authentication
R1(config)# key chain ISIS_AUTH
R1(config-keychain)# key 1
R1(config-keychain-key)# key-string CISCO
R1(config-keychain-key)# exit

R1(config)# interface G0/1
R1(config-if)# isis authentication mode md5
R1(config-if)# isis authentication key-chain ISIS_AUTH
```

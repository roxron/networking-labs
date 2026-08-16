# 13 Configure Cisco Device for AAA

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP SWITCH/13 Configure Cisco Device for AAA`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
SW1(config)# aaa new-model 
SW1(config)# aaa authentication login default group radius local 
SW1(config)# aaa authentication login NO-LOGIN none
SW1(config)# line console 0
SW1(config-line)# login authentication NO-LOGIN
SW1(config-line)# exit
SW1(config)# radius-server host 10.0.0.100
SW1(config)# radius-server key cisco
SW1(config)# aaa authorization exec default group radius if-authenticated
SW1(config)# 

Test AAA:
SW1# test aaa group radius Rustem cisco12345 legacy 

Verify:
SW1# debug aaa aauthentication 
SW1# debug radius 
SW1# debug tacacs 
g
```

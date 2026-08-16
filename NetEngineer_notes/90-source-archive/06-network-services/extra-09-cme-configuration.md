# 09 CME Configuration

> Imported source note. Provenance: `NetEngineer_Journal/Extra/09 CME Configuration`  
> Original source context: Extra. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure Router as Voice Caller Server:
!
R1(config)# telephony-service 
R1(config-telephony)# max-ephones 5  
R1(config-telephony)# max-dn 5
R1(config-telephony)# ip source-address 10.100.0.100 port 2000 
R1(config-telephony)# exit
!
R1(config)# ephone-dn 1
R1(config-ephone-dn)# number 1000
R1(config-ephone-dn)#exit
!
R1(config)# ephone-dn 2
R1(config-ephone-dn)# number 2000
R1(config-ephone-dn)#exit
!
R1(config)# ephone 1
R1(config-ephone)# button 1:1
R1(config-ephone)# type 7960
!
R1(config)# ephone 2
R1(config-ephone)# button 1:2
R1(config-ephone)# type 7960

R1# show ephones
```

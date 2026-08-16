# 010 NAT TCP LOAD BALANCE

> Imported source note. Provenance: `NetEngineer_Journal/Extra/010 NAT TCP LOAD_BALANCE`  
> Original source context: Extra. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# inteface G0/0
R1(config-if)# ip nat inside 
!
R1(config)#  interface G0/1 
R1(config-if)#  ip nat outside
!
R1(config)# ip nat pool ROTATE prefix-length 24 type rotary 
R1(config-ipnat-pool)# address 10.100.0.101 10.100.0.103
R1(config-ipnat-pool)# exit
!
R1(config)# ip access-list extended BALANCE 
R1(config-ext-nacl)# permit tcp any host 192.168.1.100 eq www
!
R1(config)# ip nat inside destination list BALANCE pool ROTATE 
!
R1(config)# ip alias 192.168.1.100 80
```

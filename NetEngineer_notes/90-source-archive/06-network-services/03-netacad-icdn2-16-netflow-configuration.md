# 16 NetFlow Configuration

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN2/16 NetFlow Configuration`  
> Original source context: 03 NETACAD / ICDN2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# interface G0/1
R1(config-if)# ip flow ingress 
R1(config-if)# ip flow egress
R1(config-if)# exit
R1(config)# ip flow-export destination 192.168.1.3 2055
R1(config)# ip flow-export version 5
R1(config)# ip flow-export source S0/0/1

Verifying NetFlow:
R1# show ip cache flow
R1# show ip flow interface 
R1# show ip flow export
```

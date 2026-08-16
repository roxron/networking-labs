# 01 Cisco Discovery Protocol (CDP) and LLDP

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN1/01 Cisco Discovery Protocol (CDP) and LLDP.txt`  
> Original source context: 03 NETACAD / ICDN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1# show cdp neighbors 
R1# show cdp neighbors detail
R1# show cdp interface
R1# show cdp 
R1# show cdp traffic

R1(config)# no cdp run

R1(config)#inteface G0/0
R1(config-if)# no cdp enable

Configure and Verify LLDP Link Layer Discovery Protocol
R1(config)# no lldp run
R1(config)# lldp run
R1(config)# interface G0/0
R1(config-if)# lldp transmit 
R1(config-if)# lldp receive

R1# show lldp
R1# show lldp neighbors
R1# show lldp neighbors detail
```

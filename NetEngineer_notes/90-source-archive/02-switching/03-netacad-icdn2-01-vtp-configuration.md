# 01 VTP Configuration

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN2/01 VTP Configuration.txt`  
> Original source context: 03 NETACAD / ICDN2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure VTP Server:
S1(config)# vtp version 2
S1(config)# vtp mode server
S1(config)# vtp domain CCNA
S1(config)# vtp password cisco12345

Configure VTP Client:
S2(config)# vtp version 2
S2(config)# vtp mode client
S2(config)# vtp domain CCNA
S2(config)# vtp password cisco12345

Verify VTP:
S1# show vtp status 
S1# show vtp password 
S2# show vlan brief
```

# 04 Simple Subneting VLSM

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA ISP/CCNA 640-875 SPNGN1/04 Simple Subneting VLSM`  
> Original source context: 01 CBTNUGGETS / CCNA ISP / CCNA 640-875 SPNGN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Net1 - 110 hosts 
Net2 - 60 hosts
Net3 - 25 host	
Net4 - 10 host 
Net5 - 10 host
Given network 172.16.100.0/24
     128  64  32  16  8  4  2  1  
100   0    1   1   0  0  1  0  0  - /25
60    0    0   1   1  1  1  0  0  - /26
25    0    0   0   1  1  0  0  1  - /27
10    0    0   0   0  1  0  1  0  - /28

Net1: 172.16.100.0/25
Net2: 172.16.100.128/26
net3: 172.16.100.160/27
net4: 172.16.100.176/28
Net5: 172.16.100.192/28
```

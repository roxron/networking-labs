# 01 Simple- Subneting Find Networks

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA ISP/CCNA 640-875 SPNGN1/01 Simple- Subneting Find Networks`  
> Original source context: 01 CBTNUGGETS / CCNA ISP / CCNA 640-875 SPNGN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Given network 192.168.0.0/24
Need 8 networks:
8 to Binary  
128  64  32  16  8  4  2  1 
 0    0   0   0  1  0  0  0
4bits 
255.255.255.11110000
255.255.255.240 or /28

Need 12 subnets:

12 to binary :
128  64  32  16  8  4  2  1
 0    0   0   0  1  1  0  0
4 bits 
255.255.255.00000000
255.255.255.11110000
255.255.255.240
/28
BLock size: 16
net1: 192.168.0.0/28
net2: 192.168.0.16/28
net3: 192.168.0.32/28
net4: 192.168.0.48/28
net5: 192.168.0.64/28
net6: 192.168.0.80/28
net7: 192.168.0.96/28
net8: 192.168.0.112/28
net9: 192.168.0.128/28
net10:192.168.0.144/28
net11:192.168.0.160/28
net12:192.168.0.176/28
```

# 02 Simple-Subneting Finding Hosts

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA ISP/CCNA 640-875 SPNGN1/02 Simple-Subneting Finding Hosts`  
> Original source context: 01 CBTNUGGETS / CCNA ISP / CCNA 640-875 SPNGN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
215.100.25.0 255.255.255.0
50 hosts per subnet
50 to binary 
128  64  32  16  8  4  2  1
 0   0   1   1   0  0  1  0
6bits
255.255.255.00000000
255.255.255.11000000
255.255.255.192
/26
Block size: 64
net1: 215.100.25.0/26
net2: 215.100.25.64/26
net3: 215.100.25.128/26
net4: 215.100.25.192/26
```

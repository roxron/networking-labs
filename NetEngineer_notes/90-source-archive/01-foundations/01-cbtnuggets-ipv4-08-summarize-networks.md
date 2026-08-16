# 08 Summarize networks

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/IPv4/08 Summarize networks`  
> Original source context: 01 CBTNUGGETS / IPv4. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Steps:
1: Find common ground (common bists)
2: Use the Mask to cover common bits
3: Zero out the rest 
4: Indicate new summary and Mask

Given subnets: 

30.125.8.0/23      x.x.000|01000.x
30.125.14.0/23     x.x.000|01110.x
30.125.20.0/23     x.x.000|10100.x
30.125.24.0/23     x.x.000|11000.x        128  64  32 
                          |>>>>>>>>>>>>>   1    1   1 = /19 
30.125.0.0/19   range 30.125.0.1 >>> 30.125.31.255.254  BR: 30.125.31.255.255
30.125.32.0/19

172.20.68.0/24   x.x.010|00100.x 
172.20.75.0/24   x.x.010|01011.x
172.20.80.0/24   x.x.010|10000.x
172.20.83.0/24   x.x.010|10011.x
172.20.90.0/24   x.x.010|11010.x         128  64  32  
                        | >>>>>>>>>>>>>>  1    1   1 = /19
172.20.64.0/19 range 172.20.64.1 >>> 172.20.95.254 BR: 172.20.95.255
172.20.96.0/19 


192.168.68.0/23     x.x.01|000100.x
192.168.76.0/23     x.x.01|001100.x
192.168.80.0/23     x.x.01|010000.x
192.168.96.0/23     x.x.01|100000.x
192.168.100.0/23    x.x.01|100100.x
192.168.110.0/23    x.x.01|101110.x
192.168.116.0/23    x.x.01|110100.x

192.168.64.0/18  range 192.168.64.1 - 192.168.127.254 192.168.127.255
192.168.128.0/18
```

# IPv6 Summarization

> Imported source note. Provenance: `NetEngineer_Journal/Network Matrix/IPv6 Summarization`  
> Original source context: Network Matrix. Content is preserved as historical study material; validate commands against the target platform and release.

```text
OSPFv3  Area Summarization

External summary route by ASBR R1:

2001:D000::/64    2nd  Hextet   1101000000000000 
2001:D001::/64    2nd  Hextet   1101000000000001
Bit match                                       110100000000000| = 15 
Summary route:                          1101000000000000 
                                                        2001:D000::/31

Area 0 Intrer-area summary route  for 2 LANs 

2001:AAA0::/64   2nd Hextet  1010101010100000
2001:AAA1::/64   2nd Hextet  1010101010100001
Bit match:                                      101010101010000|= 15 
Summary route:                          1010101010100000 
                                                        2001:AAA0::/31

Area 0 Intrer-area summary route  for WAN links

2001:B000::/64  2nd Hextet    1011000000000000
2001:B001::/64  2nd Hextet    1011000000000001
2001:B002::/64  2nd Hextet    1011000000000010
2001:B003::/64  2nd Hextet    1011000000000011
Bit match:                                    10110000000000| = 14 
Summary route                         1011000000000000
                                                      2001:B000::/30 

Area 1 Intrer-area summary route  for 2 LANs 

2001:BBB0::/64   2nd Hextet   1011101110110000
2001:BBB1::/64   2nd Hextet   1011101110110001
Bit match:                                    101110111011000| = 15
Summary route:                         1011101110110000
                                                       2001:BBB0::/31

Area 1 Intrer-area summary route  for WAN links

2001:1101::/64  2nd Hextet   0001000100000001
2001:1102::/64  2nd Hextet   0001000100000010
2001:1103::/64  2nd Hextet   0001000100000011
Bit match:                                  00010001000000|  = 14 
Summary route:                      0001000100000000 
                                                    2001:1100::/30 

Area 2 Intrer-area summary route  for 2 LANs

2001:CCC0::/64   2nd Hextet  1100110011000000
2001:CCC1::/64   2nd Hextet  1100110011000001
Bit match:                                     110011001100000| = 15
Summary route:                         1100110011000000  
                                                       2001:CCC0::/64

Area 2 Intrer-area summary route  for WAN links

2001:2201::/64   2nd Hextet  0010001000000001
2001:2202::/64   2nd Hextet  0010001000000010
2001:2203::/64   2nd Hextet  0010001000000011
Bit match:                                  00100010000000| = 14 
Summary route:                      0010001000000000
                                                    2001:2200::/30
```

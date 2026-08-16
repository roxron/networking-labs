# IPv6 summarization

> Imported source note. Provenance: `NetEngineer_Journal/Network/IPv6 summarization`  
> Original source context: Network. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Find summary route of these routes:
2001:DB8:ACAD:1::/64
2001:DB8:ACAD:2::/64
2001:DB8:ACAD:3::/64
2001:DB8:ACAD:4::/64

Exapand abriveted IPv6 

2001:DB8:ACAD:0001::/64
2001:DB8:ACAD:0002::/64
2001:DB8:ACAD:0003::/64
2001:DB8:ACAD:0004::/64

Convert to binary differnt hextets:

2001:DB8:ACAD:0000 0000 0000 0001::/64
2001:DB8:ACAD:0000 0000 0000 0010::/64
2001:DB8:ACAD:0000 0000 0000 0011::/64
2001:DB8:ACAD:0000 0000 0000 0100::/64

Find left most bits match:

2001:DB8:ACAD:0000 0000 0000 0|001::/64
2001:DB8:ACAD:0000 0000 0000 0|010::/64
2001:DB8:ACAD:0000 0000 0000 0|011::/64
2001:DB8:ACAD:0000 0000 0000 0|100::/64

next:

2001:DB8:ACAD:0000000000000|000
 16 + 16 + 16 +  13bits   = 61

Prefix-length is /61 

Summary route is:
2001:DB8:ACAD::/61
________________________________________________________________________________
Find summary route of these routes:
2001:aaaa::/64
2001:aaab::/64

Convert to binary differnt hextets:
2001:aaaa::/64
2001:aaab::/64
Bin:
2001:1010101010101010::/64
2001:1010101010101011::/64

Find left most bits match:

2001:101010101010101|0::/64
2001:101010101010101|1::/64

summary address:
2001:101010101010101|0::
16+15=31 

Prefix-length /31 

Summary address is:
2001:aaaa::/31 
____________________________________________________________________________________

Find summary route of these routes:
2001:bbbb::/64
2001:bbbc::/64

Convert to binary differnt hextets:
2001:bbbb::/64
2001:bbbc::/64
bin:
2001:1011101110111011::/64
2001:1011101110111100::/64

Find left most bits match:

2001:1011101110111|011::/64
2001:1011101110111|100::/64

summary address: 
2001:1011101110111|000::/64
16+13=29

Prefix-length /29

Summary address: 
2001:bbb8::/29 
______________________________________________________________________________________________
Find summary route of these routes:
2001:cccb::/64
2001:cccc::/64
Convert to binary differnt hextets:
2001:cccb::/64
2001:cccc::/64
Bin:
2001:1100 1100 1100 1011::/64
2001:1100 1100 1100 1100::/64
Find left most bits match:
2001:1100110011001|011::/64
2001:1100110011001|100::/64
summary address: 
2001:1100110011001000::/64
16+13=29
Prefix-length: /29 
Summary address: 
2001:ccc8::/29
______________________________________________________________________________________________________
Find summary route of these routes:
2001:DB8:1:1:A000::1/72
2001:DB8:1:1:A100::1/72 
2001:DB8:1:1:A200::1/72 
2001:DB8:1:1:A300::1/72
Convert to binary differnt hextets:
Bin:
2001:DB8:1:1:1010000000000000::1/72
2001:DB8:1:1:1010000100000000::1/72 
2001:DB8:1:1:1010001000000000::1/72 
2001:DB8:1:1:1010001100000000::1/72
Find left most bits match:
2001:DB8:1:1:101000|0000000000::1/72
2001:DB8:1:1:101000|0100000000::1/72 
2001:DB8:1:1:101000|1000000000::1/72 
2001:DB8:1:1:101000|1100000000::1/72
Matched:
2001:DB8:1:1:101000
16+16+16+16+6=70
Make the summary address:
2001:DB8:1:1:1010000000000000
Convert to HEX:
2001:DB8:1:1:A000::/70
___________________________________________________________________________________________________________

Find summary route of these routes:
2001:DB8:1:1:BB80::/76 
2001:DB8:1:1:BB90::/76
2001:DB8:1:1:BBA0::/76 
2001:DB8:1:1:BBB0::/76
Convert to binary different hextets:
2001:DB8:1:1:1011101110000000::1/76 
2001:DB8:1:1:1011101110010000::1/76
2001:DB8:1:1:1011101110100000::1/76 
2001:DB8:1:1:1011101110110000::1/76
Find left most bits match:
2001:DB8:1:1:1011101110|000000::1/76 
2001:DB8:1:1:1011101110|010000::1/76
2001:DB8:1:1:1011101110|100000::1/76 
2001:DB8:1:1:1011101110|110000::1/76
Matched:
2001:DB8:1:1:1011101110
16+16+16+16+10=74
Make the summary address:
2001:DB8:1:1:1011101110000000
Convert to HEX:
2001:DB8:1:1:BB8::/74
```

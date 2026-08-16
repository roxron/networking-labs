# 00 IP addressing

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN1/00 IP addressing.txt`  
> Original source context: 03 NETACAD / ICDN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
01 Given two IP addresses: 
192.168.1.18 and 192.168.1.33 and subnet mask is 255.255.255.240
Determine whether IP addresses on the same network:
192.168.1.   00010010
192.168.1.   00100001
255.255.255. 11110000
192.168.1.   00010000 >> 192.168.1.16/28
192.168.1.   00100000 >> 192.168.1.32/28
Conclusion is that IP addresses on the different networks.

02 Given two IP addresses:
10.0.0.16 and 10.1.14.68 and subnet mask is 255.254.0.0
Determine whether IP addresses on the same network:
00001010.00000000.00000000.00010000 >> first IP addr 
00001010.00000001.00001110.01000100 >> second IP addr
11111111.11111110.00000000.00000000 >> Given Mask
00001010.00000000.00000000.00000000 >> Net IP for First IP addr is 10.0.0.0/15
00001010.00000000.00000000.00000000 >> Net IP for Second IP addr is 10.0.0.0/15
Conclusion is that IP addessses on the same network.

03 Given IP address:
172.16.140.24 and subnet mask 255.255.192.0
Find Network address and Default gateway for that network:
172.16.  10001100.00011000 
255.255. 11000000.00000000
172.16.  10000000.00000000 >> 172.16.128.0/18
172.16.128.1 is Default gateway

04 Given IP Address:
192.168.184.227 and subnet mask 255.255.255.248
Find Network address and first host IP address
192.168.184.  11100011 
255.255.255.  11111000
192.168.184.  11100000 >> 192.168.184.224 is Network addesss and 192.168.184.225 is First host IP addr

05 Given IP addr 181.95.21.234/22
Fint Network address, First and last usable IP and Direct Broadcast IP

181.95.   00010101.11101010
255.255.  11111100.00000000
181.95.   00010100.00000000 >> 181.95.20.0/22 
181.95.   00010100.00000001 >> 181.95.20.1
181.95.   00010111.11111110 >> 181.95.23.254 
181.95.   00010111.11111111 >> 181.95.23.255


07 Given IP and subnet mask 
Determine network address, broadcast addr and total number of hosts and host bits
192.168.100.25/28 255.255.255.240
192.168.100.  00011001
255.255.255.  11110000  Net address       Broadcast       host bits    number of host
192.168.100.  00010000 192.168.100.16/28  192.168.100.31    4          2^4=16-2=14 


08 Given IP and Subnet mask 
Determine network address, broadcast and total nubner of hosts and host bits
172.30.10.130/30 255.255.255.252
172.30.10.   10000010 
255.255.255. 11111100  Net Address         Broadcast      host bits     number of host
172.30.10.   10000000  172.30.10.128/30   172.30.10.131      2          2^2=4-2=2

09 Given IP and Subnet mask 
Determine network address, broadcast and total nubner of hosts and host bits
10.1.113.75/19 255.255.224.0 
10.1.     01110001.  75 
255.255.  11100000.   0 
10.1.     01100000.   0   10.1.96.0   10.1.127.255        13     2^13-2=8190  
Broadcast:01111111.  255

10 Given IP and Subnet mask 
Determine network address, broadcast and total nubner of hosts and host bits      
198.133.219.250/24 255.255.255.0
---.---.---.11111010
255.255.255.00000000
198.133.219.0 
198.133.219.255
host bits: 8
host numbers: 254

11 Given IP and Subnet mask 
Determine network address, broadcast and total nubner of hosts and host bits
128.107.14.191/22 255.255.252.0
---.---.00001110.  191
255.255.11111100.   0
---.---.00001100.   0        128.107.12.0 
---.---.00001111.  255       128.107.15.255
host bits: 10 
host number:2^10-2=1022

12 Given IP and Subnet mask 
Determine network address, broadcast and total nubner of hosts and host bits
172.16.104.99/27 255.255.255.224
---.---.---.01100011
255.255.255.11100000
---.---.---.01100000   172.16.104.96
---.---.---.01111111   172.16.104.127
host bits: 5
host numbers: 2^5-2=30

13 Covert IP addresses to Binary:
Decimal:                Binary:
192.168.10.10       11000000.10101000.00001010.00001010
209.165.200.229     11010001.10100101.11001000.11100101
172.16.18.183       10101100.00010000.00010010.10110111
10.86.252.17        00001010.01010110.11111100.00010001
255.255.255.128     11111111.11111111.11111111.10000000
255.255.192.0       11111111.11111111.11000000.00000000

14 Given IP address and Subnet mask, determine the Network address:
Description      Decimal          Binary
IP address       172.16.145.2     10101100.00010000.10010001.00000010
Subnet Mask      255.255.0.0      11111111.11111111.00000000.00000000
Network Addrs    172.16.0.0       10101100.00010000.00000000.00000000

15 Given IP address and Subnet mask, determine the Network address:
Description      Decimal          Binary
IP address      192.168.10.10     11000000.10101000.00001010.00001010
Subnet Mask     255.255.255.0     11111111.11111111.11111111.00000000
Network Addrs   192.168.10.0      11000000.10101000.00001010.00000000

14 Given IP address and Subnet mask, determine the Network address:
Description      Decimal          Binary
IP address      192.168.68.210    11000000.10101000.01000100.11010010
Subnet Mask     255.255.255.128   11111111.11111111.11111111.10000000
Network Addrs   192.168.68.128    11000000.10101000.01000100.10000000

15 Determine whether IP addresses are on same network:
Given IP:  192.168.1.18 and  192.168.1.33 and subnet mask 255.255.255.240
Last Octet will be analized:
18:      00010010 
33:      00100001
240:     11110000
IP1 Net: 00010000
IP2 Net: 00100000
IP1 Net: 192.168.1.16
IP2 Net: 192.168.1.32 
Conclusion: IP addresses are not on the same network.

16 Identify the Default gateway address:
Given IP address  172.16.140.2 with 255.255.192.0
Use the first IP address in a network as the default gateway address:
10101100.00010000.10001100.00000010
11111111.11111111.11000000.00000000
10101100.00010000.10000000.00000000
172.16.128.1 is Gateway of last resort.
 
17 Identify IPv4 Addresses

IP addrss/Prefix    Network/Host               Network Address  Subnet Mask
192.168.10.10/24    N.N.N.H                     192.168.10.0     255.255.255.0
10.101.99.17/23     N.N.nnnnnnnh.H              10.101.98.0      255.255.254.0
209.165.200.227/27  N.N.N.nnnhhhhh              209.165.200.224  255.255.255.224

18 Given two IP addresses:
159.123.50.11 and 159.123.60.241 and subnet mask is 255.255.128.0
Determine whether IP addresses on the same network:
10011111.01111011.00110010.00001011 >> First IP addr 
10011111.01111011.00111100.11110001 >> second IP addr
11111111.11111111.10000000.00000000 >> Given Mask
10011111.01111011.10000000.00000000 >> Net IP for First IP addr is 159.123.0.0/17
10011111.01111011.10000000.00000000 >> Net IP for Second IP addr is 159.123.0.0/17
Conclusion is that IP addessses on the same network.


19 Given two IP addresses:
180.125.98.156 and 180.125.90.100 and subnet mask is 255.255.224.0
Determine whether IP addresses on the same network:
10110100.01111101.01100010.10011100 >> First IP addr 
10110100.01111101.01011010.01100100 >> second IP addr
11111111.11111111.11100000.00000000 >> Given Mask
10110100.01111101.01100000.00000000 >> Net IP for First IP addr is 180.125.96.0/19
10110100.01111101.01000000.00000000 >> Net IP for Second IP addr is 180.125.64.0/19
Conclusion is that IP addessses on different networks.

20 Given two IP addresses:
19.250.145.12 and 19.250.155.105 and subnet mask is 255.255.240.0 
Determine whether IP addresses on the same network:
00010011.11111010.10010001.00001100 >> First IP addr
00010011.11111010.10011011.01101001 >> Second IP addr
11111111.11111111.11110000.00000000 >> Given Mask
00010011.11111010.10010000.00000000 >> Net IP for First IP adds is 19.250.144.0/20
00010011.11111010.10010000.00000000 >> Net IP for Second IP adds is 19.250.144.0/20
Conclusion is that IP addresses are on the same network.

21 Given IP Address:
192.168.100.155 and subnet mask 255.255.255.224
Find Network address and first host IP address
192.168.100.  10011011 
255.255.255.  11100000
192.168.100.  10000000 >> 192.168.100.128 is Network addesss and 192.168.100.129 is First host IP addr

22 Given IP Address:
100.100.10.222 and subnet mask 255.255.255.192
Find Network address and first host IP address
100.100.10.   11011110
255.255.255.  11000000
100.100.10.   11000000 >> 100.100.10.192 is Network addesss and 100.100.10.193 is First host IP addr

23 Given IP addr 156.123.100.17/23
Fint Network address, First and last usable IP and Direct Broadcast IP

156.123.  01100100.00010001
255.255.  11111110.00000000
156.123.  01100100.00000000 >> 156.123.100.0
156.123.  01100100.00000001 >> 156.123.100.1
156.123.  01100101.11111110 >> 156.123.101.254
156.123.  01100101.11111111 >> 156.123.101.255

24 Given IP and Subnet mask 
Determine network address, broadcast and total nubner of hosts and host bits
172.31.11.130/27 255.255.255.224
172.31.11.   10000010 
255.255.255. 11100000  Net Address         Broadcast      host bits     number of host
172.31.11.   10000000  172.31.11.128/27   172.30.10.159      5          2^5=4-2=30
```

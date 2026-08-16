# IPV4

> Imported source note. Provenance: `NetEngineer_Journal/Network/IPV4`  
> Original source context: Network. Content is preserved as historical study material; validate commands against the target platform and release.

```text
0 1
0 1 2 3 4 5 6 7 8 9 
0 1 2 3 4 5 6 7 8 9 A B C D E F 


Ipv4 address space: 

32 bit ip address 

3 types of IP addresses 
Network address 
Host    address
Broadcast address

IP address structure: Network portion____Host Portion
                      192.168.1        .     10

example:  192.168.1.10 

Range: 0.0.0.0 - 255.255.255.255

Default route 0.0.0.0 - 0.255.255.255  network: 0.0.0.0/8
Assigned to hosts: 1.0.0.0 - 126.255.255.255 
Loopback:          127.0.0.0 - 127.255.255.255 127.0.0.0/8      
Assigned to hosts: 128.0.0.0 - 223.255.255.255
Multicast:         224.0.0.0 - 239.255.255.255
Experimental:      240.0.0.0 - 255.255.255.254
Limited BroadCast: 255.255.255.255 


Ip address classes 
A: 0.0.0.0 -   127.255.255.255
B: 128.0.0.0 - 191.255.255.255
C: 192.0.0.0 - 223.255.255.255
D: 224.0.0.0 - 239.255.255.255
E: 240.0.0.0 - 255.255.255.254
Broadcast:     255.255.255.255 

1 Octet
A: 0  0000000  = 0     
B: 10  000000  = 128   
C: 110  00000  = 192   
D: 1110  0000  = 224   
E: 1111  0000  = 240   





Subnet mask and prefix is the same.  Determine Network portion of IP addess.
Example:
Subnet mask: 255.255.255.0 
Prefix:        /24 

Network 0.0.0.0/8 
IP Bin:00000000.00000000.00000000.00000000
S  Bin:11111111.00000000.00000000.00000000
_________________________________________________________________________________________________________________________
IP address 11.11.12.25/8
IP Bin: 00001011.00001011.00001100.00011001
S  Bin: 11111111.00000000.00000000.00000000
N  Bin: 00001011.00000000.00000000.00000000
B  Bin: 00001011.11111111.11111111.11111111
L  Bin: 00001011.11111111.11111111.11111110

Network address: 11.0.0.0/8
First Host address: 11.0.0.1/8
Second host address: 11.0.0.2 - 11.0.0.3 11.0.0.4 11.0.0.5 11.0.0.6 11.0.0.7 11.0.0.8 11.0.0.9 11.0.0.10
Last host address: 11.255.255.254
Broadcast address: 11.255.255.255  
________________________________________________________________________________________________________________________---

IP address: 25.125.225.98/24
IP bin: 00011001.01111101.11100001.01100010
S  bin: 11111111.11111111.11111111.00000000
N  bin: 00011001.01111101.11100001.00000000
B  bin: 00011001.01111101.11100001.11111111
F  bin: 00011001.01111101.11100001.00000001
L  bin: 00011001.01111101.11100001.11111110

Network address:25.125.225.0/24
First Host address: 25.125.225.1/24
Last host address: 25.125.225.254
Broadcast address: 25.125.225.255
___________________________________________________________________________________________________________________________________

HOMEWORK 1 FOR RAMIZ:

IP address: 172.16.12.0/24


IP address: 99.100.10.5/24


IP address: 192.168.100.123/16


IP address: 79.95.225.240/16 

send to my gmail: roxron87@gmail.com 
_______________________________________________________________________________________________________________________________

Hex: FEAC = 1111111010101100 = 65196 

32768 16384 8192 4096 2048 1024 512 256 128 64 32 16 8 4 2 1
  1     1    1     1    1    1   1   0   1   0  1  0 1 1 0 0
```

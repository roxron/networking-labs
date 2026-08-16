# Network+ N10-005

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/NETWORK+/Network+ N10-005`  
> Original source context: 01 CBTNUGGETS / NETWORK+. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Nugget1:  Intorduction to CompTIA Network+ N10-005 
 Notes:
  Allocate time!
  Hands on!
  Teach others!
  Commit!
!
!
!
Nugget2: Network Concepts 101: OSI vs TCP/IP 
 Notes: 
  What is the reason for a "model"
  Define the layers and functions of the layers  
  Identify the Name for the Data at each Layer 
  Specify what info is added at each level
! 
OSI- Theory 
TCP/IP - Production 
!
OSI Model:       TCP/IP:
!
Applicatiuon     ---- 
Presentation     ----  Application 
Session          ----
Transport              Transport  
Network                Internet 
Data Link        ----          
Physical         ----   Network Interface 
!
Datais is being send down the protocol stack - the process is called data encapsulation.
!
Data is being send up the protocol stack - the process is called data de-encapsulation. 
!
TCP/IP - Protocol stack 
Apllication:
  HTTP HTTPS FTP SCP SSH Telnet 
Responsible for formatting data. Protocol Data Unit is a piece of information this layer push the down the stack. 
!
Transport: 
 UDP or TCP protocols deliver PDUs to the remote nodes could be reliable or unreliable data delivery depends on the upper protocols needs. 
!
Network(Internet): 
 Logical addressing is happenning here the data chopped up into multiple peices called packets and assigned IP addresses. IPv4 and IPv6 is occured at this layer. 
!
Network Interface:
 Packets get encupsulated into frames, MAC addresses are physical addresses for nodes to cummunicate on the same link. MAC addresses are assigned to the frames at this layer.
!
When it comes to networking in production the combined of both TCP/IP and OSI model emerges new model: called "Hybrid model"
!
5. Application 
4. Transport 
3. Network 
2. DataLink 
1. Physical 
!
PDU - Protocol Data Unit 
Layers       Name of the Data at each layer 
Application: Data
Transport:   Segment 
Network:     Packet
Datalink:    Frame 
Physical:    Bits 
!
!
!
Nugget3: Network Concepts: Matching up Network Components with their Correct OSI Layers.
!
Network Concepts:
Where do devices and protocols "fit in" with OSI?
!
Layer1: Physical 
Network Interface Card (NIC)
Cables and Connectors 
Hub 
Bits 
!
Layer2: Datalink 
MAC address 
NIC (due to its L2 MAC Address)
Switch & Bridge
Frame 
!
Layer 3: Network 
IPv4 & IPv6 Address 
(including EUI-64)
Router 
Packets 
!
PC Client Verify MAC Address: 
Windows: 
> ipconfig /all 
Linux:
# ifconfig 
!
MAC address compose of two parts: OUI - Organization Unique Identifier + Node ID
!
Example: 
OUI:     Node-ID
00-CC-54-33-AA-D3 
!
IPv4 address example: 172.16.20.1 
IPv6 address example: 2001:DB8:3344:AAAA:1111:BBBB::10 
!
!
!
Nugget4: NC: IP Addressing Uncut and Uncensored:
!
Objective: 
 What an IP Address is used for 
 Looking under the hood of IPv4 and IPv6 
 Creating "sub" networks
 Broadcast, Unicast and other interesting tid bits
!
IP address has two parts: 
 Network portion + Host portion 
!
Subnet mask determine which part of IP address belong to network and host. 
!
IP address binary: 
Based-2 for IPv4: 
Use positional notation of 8-bits to represent one octet of IP address.
In binary there are only 0 and 1. 

128 64 32 16 8 4 2 1 

IP address in dotted decimal: 
10.1.2.3 
!
IP address in binary: 
00001010.00000001.00000010.00000011 
!
Convert IP address into binary:
!
192.168.20.55 
!                  128  64  32  16  8  4  2  1
1st octet: 192 -    1    1   0   0  0  0  0  0
2nd octet: 168 -    1    0   1   0  0  1  0  0
3rd octet: 20  -    0    0   0   1  0  1  0  0
4th octet: 55  -    0    0   1   1  0  1  1  1 
!
Binary IP: 11000000.10100100.00010100.00110111
!
Covert Binary IP Address into Decimal:

10010101.00110110.11001101.00110010

128 64 32 16 8 4 2 1 
  1  0  0  1 0 1 0 1  = 149 
  0  0  1  1 0 1 1 0  = 54
  1  1  0  0 1 1 0 1  = 205
  0  0  1  1 0 0 1 0  = 50
_____________________________
! 
IP Address is 149.54.205.50 
!
!
Subnet Mask:
255.255.255.0 
!
11111111.11111111.11111111.00000000 
!
Find network portion of IP address by matching IP address in binary to Mask in Binary: 

192.168.42.58/24 

IP binary:    11000000.10101000.00101010.00111010 
Mask Binarry: 11111111.11111111.11111111.00000000
Net Portion:  11000000.10101000.00101010.00000000
Convert Network protion to decimal: 
                  192.168.42.0
                  255.255.255.0 
!
Private addresses ranges: RFC:1918 
10.0.0.0/8 
172.16.0.0/12
192.168.0.0/16 
!
IPv4 Class:            1st Octet range:
A /8 255.0.0.0         1-126      
B /16 255.255.0.0      128-191 
C /24 255.255.255.0    192-223  
-
Loopback range: 127.0.0.0/8 
D - Multicast:         224-239  
!
!
IPv6: 
Example: 
2001:DB8:1000:AAAA:BBBB:CCCC:7777:1001/128 
!
Hexdecimal:
0 0000
1 0001
2 0010
3 0011
4 0100
5 0101
6 0110 
7 0111
8 1000
9 1001
A 1010
B 1011
C 1100
D 1101
E 1110
F 1111

IPv6 Global routable addresses identify by first hextet range: 
2000-3999 
Example: 
 2000:CCCC:BBBB:1111:2222:3333:4444:5555
 2050:FFFF:1000:2000:3000:DDDD:1234:5678 
 3888:AAAA:1234:9876:E100:B200:C300:D400
!
Subnetting: 
!
Position:   128 64  32  16  8   4   2   1 
Mask Value: 128 192 224 240 248 252 254 255
!
100.1.0.0/16  8 subnets needed 
!
borrow 3 bits from the host portion of network address 
!
new mask 255.255.224.0 Find Block size 255-224-31+1=32   
!
100.1.0.0/19 
100.1.32.0/19 
100.1.64.0/19 
100.1.96.0/19
100.1.128.0/19 
100.1.160.0/19
100.1.192.0/19
100.1.224.0/19 
!
Type of Communication:
 Unicast- One to one 
 Multicast - One to Many 
 Broadcast - One to all in subnet 
!
APIPA: 169.254.0.0/16 (Automatic Private IP Address)
!
!
!
Nugget5: NC: Routing and Switching 
!
```

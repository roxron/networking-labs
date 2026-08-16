# 00 Subnetting

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN1/00 Subnetting.txt`  
> Original source context: 03 NETACAD / ICDN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
128 64 32 16 8 4 2 1 
                                                                                
################################################################
01 Given NEtwork of 192.168.100.0/24
Needed 5 subnets of 25 host addreses 
Will be borrowed 3 bits of last octet to accomodate the requirements 
Subnets calculation: 2^n = 2^3=8  
Hosts number per subnet: 2^5=32-2=30 
192.168.100. 00000000
255.255.255. 11100000 255.255.255.224 /27

Subnets created:                                      First host         Last host           Broadcast
Net0: 192.168.100. 00000000  192.168.100.0/27     >> 192.168.100.1   >> 192.168.100.30   >> 192.168.100.31 
Net1: 192.168.100. 00100000  192.168.100.32/27    >> 192.168.100.33  >> 192.168.100.62   >> 192.168.100.63
Net2: 192.168.100. 01000000  192.168.100.64/27    >> 192.168.100.65  >> 192.168.100.94   >> 192.168.100.95
Net3: 192.168.100. 01100000  192.168.100.96/27    >> 192.168.100.97  >> 192.168.100.126  >> 192.168.100.127
Net4: 192.168.100. 10000000  192.168.100.128/27   >> 192.168.100.129 >> 192.168.100.158  >> 192.168.100.159
Net5: 192.168.100. 10100000  192.168.100.160/27   >> 192.168.100.161 >> 192.168.100.190  >> 192.168.100.191
Net6: 192.168.100. 11000000  192.168.100.192/27   >> 192.168.100.193 >> 192.168.100.222  >> 192.168.100.223
Net7: 192.168.100. 11100000  192.168.100.224/27   >> 192.168.100.225 >> 192.168.100.254  >> 192.168.100.255
____________________________________________________________________________________________________________

#################################################################
02 Given Network of 172.31.1.0/24 
Requirements: 
Needed 7 subnets, Largest subnet of 14 hosts in it.
Subnet calculation: 2^n= 2^4=16 
Host number per subnet: 2^416-2=14 
New subnet mask is 255.255.255. 1111000 or 255.255.255.240 or prefix /28

Subnets created:                             First host       Last host         Broadcast
Net0: 172.31.1. 00000000 172.31.1.0/28    >> 172.31.1.1    >> 172.31.1.14   >> 172.31.1.15
Net1: 172.31.1. 00010000 172.31.1.16/28   >> 172.31.1.17   >> 172.31.1.30   >> 172.31.1.31
Net2: 172.31.1. 00100000 172.31.1.32/28   >> 172.31.1.33   >> 172.31.1.46   >> 172.31.1.47
Net3: 172.31.1. 00110000 172.31.1.48/28   >> 172.31.1.49   >> 172.31.1.62   >> 172.31.1.63 
Net4: 172.31.1. 01000000 172.31.1.64/28   >> 172.31.1.65   >> 172.31.1.78   >> 172.31.1.79
Net5: 172.31.1. 01010000 172.31.1.80/28   >> 172.31.1.81   >> 172.31.1.94   >> 172.31.1.95
Net6: 172.31.1. 01100000 172.31.1.96/28   >> 172.31.1.97   >> 172.31.1.110  >> 172.31.1.111
Net7: ....
____________________________________________________________________________________________


CALCULATE IPv4 ADDRESS SUBNETING
##################################################################
GIVEN:
Host IP Address: 192.168.200.139           last octet: .10001011  2^3=8 
Original Subnet mask:255.255.255.0                      11100000  2^5-2=30
New Subnet mask: 255.255.255.224                        10000000 
                                                        10011111
FIND:
Number of subnet bits:                 3
Number of subnet created:              8
Number of host bits per subnet:        5
Number of host per subnet:             30
Network address of this subnet:        192.168.200.128
Address of first host on this subnet:  192.168.200.129
Address of last host on this subent:   192.168.200.158
Broadcasst address on this subnet:     192.168.200.159
________________________________________________________________________________

###################################################################
GIVEN:
Host IP Address: 10.101.99.228               third octet: 01100011   17bits -8bits= 9bits
Original Subnet mask:255.0.0.0                  NewMask   10000000   2^9=512
New Subnet mask:255.255.128.0                  Net addr   00000000
                                                  BR      01111111

FIND:
Number of subnet bits:                 9
Number of subnet created:              512 
Number of host bits per subnet:        15
Number of host per subnet:             32766
Network address of this subnet:        10.101.0.0
Address of first host on this subnet:  10.101.0.1
Address of last host on this subent:   10.101.127.254
Broadcasst address on this subnet:     10.101.127.255
_____________________________________________________________________________________


####################################################################
GIVEN:
Host IP Address:       172.22.32.12       third octed: 00100000
Original Subnet mask:  255.255.0.0                     11100000
New Subnet mask:       255.255.224.0                   00100000
                                                       00111111

FIND:
Number of subnet bits:                3
Number of subnet created:             8
Number of host bits per subnet:       13
Number of host per subnet:            8190
Network address of this subnet:       172.22.32.0
Address of first host on this subnet: 172.22.32.1
Address of last host on this subent:  172.22.63.254
Broadcasst address on this subnet:    172.22.63.255
______________________________________________________________________________________

######################################################################
GIVEN:
Host IP Address:192.168.1.245                last octet: 11110101
Original Subnet mask:255.255.255.0                       11111100
New Subnet mask:255.255.255.252                          11110100

FIND:
Number of subnet bits:                  6
Number of subnet created:               64
Number of host bits per subnet:         2
Number of host per subnet:              2
Network address of this subnet:         192.168.1.244
Address of first host on this subnet:   192.168.1.245
Address of last host on this subent:    192.168.1.246
Broadcasst address on this subnet:      192.168.1.247
_______________________________________________________________________________________


#########################################################################
GIVEN:
Host IP Address:128.107.0.55                    third octet: 00000000
Original Subnet mask:255.255.0.0                             11111111
New Subnet mask:255.255.255.0                                00000000
                                                             11111111

FIND:
Number of subnet bits:                8 
Number of subnet created:             256
Number of host bits per subnet:       8
Number of host per subnet:            254
Network address of this subnet:       128.107.0.0
Address of first host on this subnet: 128.107.0.1
Address of last host on this subent:  128.107.0.254
Broadcasst address on this subnet:    128.107.0.255
_______________________________________________________________________________________


###########################################################################
GIVEN:
Host IP Address:192.135.250.180               last octet: 10110100
Original Subnet mask:255.255.255.0                        11111000
New Subnet mask:255.255.255.248                           10110000
                                                          10111111

FIND:                       
Number of subnet bits:                5
Number of subnet created:             32
Number of host bits per subnet:       3
Number of host per subnet:            6
Network address of this subnet:       192.135.250.176
Address of first host on this subnet: 192.135.250.177
Address of last host on this subent:  192.135.250.190
Broadcasst address on this subnet:    192.135.250.191
_________________________________________________________________________________________

##########################################################################
GIVEN:
Host IP Address:
Original Subnet mask:
New Subnet mask:

FIND:
Number of subnet bits:
Number of subnet created: 
Number of host bits per subnet:
Number of host per subnet:
Network address of this subnet:
Address of first host on this subnet:
Address of last host on this subent:
Broadcasst address on this subnet:

###########################################################################
Subnet the network based on given topology:
Topology A:
Router R1 has two interfaces LAN and WAN connected to R2:
Two subnets require to fill address scheme. 
Given network: 192.168.10.0/24
1 bit borrowed
2^7-2=126 usable hosts
New Mask 255.255.255.128
Last octet in binary:
IP:00000000
SM:10000000

Net0: 192.168.10.0/25     192.168.10.1     192.168.10.126   192.168.10.127
Net1: 192.168.10.128/25   192.168.10.129   192.168.10.254   192.168.19.255

Topology B:
R1 has one LAN and connected to R2 over 
WAN, R2 has two WANs to R1 and R3, R3 has one LAN and one WAN to R2
Total number of subnets require is 4
Modify 192.168.10.0/24 to accomodate new topology of 4 subnets.
2 bits will be borrowed to create 4 subnets
New subnet mask is: 255.255.255.192 or prefix /26 

Net0: 192.168.10. 00000000 192.168.10.0/26    192.168.10.1    192.168.10.62   192.168.10.63
Net1: 192.168.10. 01000000 192.168.10.64/26   192.168.10.65   192.168.10.62   192.168.10.63
Net2: 192.168.10. 10000000 192.168.10.128/26  192.168.10.129  192.168.10.190  192.168.10.191
NEt3: 192.168.10. 11000000 192.168.10.192/26  192.168.10.193  192.168.10.254  192.168.19.255

Topology C:
 
__________________________________________________________________________________

Determine IPv4Address Subnetting:
IP Address:        Network            Broadcast  Total number of host bits  Total number of Hosts
192.168.100.25/28 192.168.100.16/28 192.168.100.31       4                    2^4-2=14
Last Octed in Bin:
IP:00011001
SM:11110000
NA:00010000 =16
BR:00011111 =31

172.30.10.30/30 172.30.10.28 172.30.10.31                2                    2^2-2=2 
Last Octed in Bin:
IP:00011110
SM:11111100
NA:00011100 =28
BR:00011111 =31 


##########################################################################
GIVEN:                                          Last Octet:
Host IP Address:      192.168.200.13            00001101
Original Subnet mask: 255.255.255.0             00000000
New Subnet mask:      255.255.255.224           11100000

FIND:
Number of subnet bits:                 3
Number of subnet created:              8
Number of host bits per subnet:        5
Number of host per subnet:             30
Network address of this subnet:        192.168.200.0
Address of first host on this subnet:  192.168.200.1
Address of last host on this subent:   192.168.200.14
Broadcasst address on this subnet:     192.168.200.15

_____________________________________________________________________

Make IPv4 Over again:


128 64 32 16 8 4 2 1 

Convert IPv4 to binary:

89.56.158.254 > 01011001.00111000.10011110.11111110
14.123.7.211  > 00001110.01111011.00000111.11010011


128 64 32 16 8 4 2 1 
                                                                                
################################################################
Given Network of 192.168.200.0/24
Needed 16 subnets with 10 hosts per subnet 
Will be borrowed 4 bits 
Subnets calculation: 2^n = 2^4=16  
Hosts number per subnet: 2^n-2=H 2^4-2=14 
255.255.255. 11110000 255.255.255.240 /28

Subnets created:                 First host         Last host           Broadcast
Net0:  192.168.200.0/28          192.168.200.1     192.168.200.14      192.168.200.15                         
Net1:  192.168.200.16/28         192.168.200.17    192.168.200.30      192.168.200.31
Net2:  192.168.200.32/28         192.168.200.33    192.168.200.46      192.168.200.47
Net3:  192.168.200.48/28         192.168.200.49    192.168.200.62      192.168.200.63
Net4:  192.168.200.64/28         192.168.200.65    192.168.200.78      192.168.200.79
Net5:  192.168.200.80/28         192.168.200.81    192.168.200.94      192.168.200.95
Net6:  192.168.200.96/28         192.168.200.97    192.168.200.110     192.168.200.111
Net7:  192.168.200.112/28        192.168.200.113   192.168.200.126     192.168.200.127
Net8:  192.168.200.128/28        192.168.200.129   192.168.200.142     192.168.200.143
Net9:  192.168.200.144/28        192.168.200.145   192.168.200.158     192.168.200.159
Net10: 192.168.200.160/28        192.168.200.161   192.168.200.174     192.168.200.175
Net11: 192.168.200.176/28        192.168.200.177   192.168.200.190     192.168.200.191
Net12: 192.168.200.192/28        192.168.200.193   192.168.200.206     192.168.200.207
Net13: 192.168.200.208/28        192.168.200.209   192.168.200.222     192.168.200.223
Net14: 192.168.200.224/28        192.168.200.225   192.168.200.238     192.168.200.239
Net15: 192.168.200.240/28        192.168.200.241   192.168.200.254     192.168.200.255
```

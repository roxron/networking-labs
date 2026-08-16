# 04 VLSM

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/IPv4/04 VLSM`  
> Original source context: 01 CBTNUGGETS / IPv4. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Given Base Network: 192.16.128.0/18 hosts per subnet 32-18=14 2^14-2=16382
Requirements: 
6 subnets 900 hosts
7 subnets 450 hosts 
6 subnets 200 hosts
10 subnets 120 hosts
                       128 64 32 16 8 4 2 1
192.16.128.0/18          1  1  0  0 0 0 0 0
192.16.192.0/18
range 192.16.128.1 - 192.16.191.254 BR: 192.168.191.255
Determine mask for Larger subnets:
 largest subnets:      5400 hosts  
 next largest subnets: 3150 hosts  
 medium subnets:       1200 hosts    
 small subnets:        1200 hosts  

900 hosts:
net0: 192.16.128.0/22
net1: 192.16.132.0/22
net2: 192.16.136.0/22
net3: 192.16.140.0/22
net4: 192.16.144.0/22
net5: 192.16.148.0/22
450 hosts:
net0: 192.16.152.0/23
net1: 192.16.154.0/23
net2: 192.16.156.0/23
net3: 192.16.158.0/23
net4: 192.16.160.0/23
net5: 192.16.162.0/23
net6: 192.16.164.0/23
200 hosts:
net0: 192.16.166.0/24
net1: 192.16.167.0/24
net2: 192.16.168.0/24
net3: 192.16.169.0/24
net4: 192.16.170.0/24
net5: 192.16.171.0/24
120 hosts: 
net0: 192.16.172.0/25
net1: 192.16.172.128/25
net2: 192.16.173.0/25
net3: 192.16.173.128/25
net4: 192.16.174.0/25
net5: 192.16.174.128/25
net6: 192.16.175.0/25
net7: 192.16.175.128/25
net8: 192.16.176.0/25
net9: 192.16.176.128/25

__________________________________________________________________________________________________

192.100.20.0/23
find range: 
128 64 32 16 8 4 2 1
 1   1  1  1 1 1 1 0
20/2=10 10x2=20 
Next subnet: 192.100.22.0/23
range 192.100.20.1 - 192.100.21.254 BR: 192.100.21.255
total number of host /23 supports 32-23=9 2^9-2=510
Requirements for vlsm:
1 subnet 120 hosts
3 subnets 60 hosts
4 subnets 25 hosts 
2 subnets 10 hosts 
2 subnets point-to-point 

120hosts:
192.100.20.0/25
60 hosts:
192.100.20.128/26
192.100.20.192/26
192.100.21.0/26
25 hosts
192.100.21.64/27
192.100.21.96/27
192.100.21.128/27
192.100.21.160/27
10 hosts:
192.100.21.192/28
192.100.21.208/28
PtoP
192.100.21.216/30
192.100.21.220/30
Left over:
192.100.21.224/27

______________________________________________________________________________________________

172.16.128.0/18  range 172.16.128.1 - 172.16.191.254 BR: 172.16.191.255
172.16.192.0/18 
Hosts supported: 32-18=14 2^14-2=16382
Requirements for vlsm:

1: 2000 hosts: 2 subnets
2: 1000 hosts: 5 subnets
3: 500  hosts: 9 subnets
4: 250  hosts: 10 subnets

128 64 32 16 8 4 2 1
 1   1  1  1 1 0 0 0
1: 
Net0: 172.16.128.0/21
Net1: 172.16.136.0/21
2:
Net0: 172.16.144.0/22
Net1: 172.16.148.0/22
Net2: 172.16.152.0/22
Net3: 172.16.156.0/22
Net4: 172.16.160.0/22
3:
Net0: 172.16.164.0/23
Net1: 172.16.166.0/23
Net2: 172.16.168.0/23
Net3: 172.16.170.0/23
Net4: 172.16.172.0/23
Net5: 172.16.174.0/23
Net6: 172.16.176.0/23
Net7: 172.16.178.0/23
Net8: 172.16.180.0/23
4:
Net0: 172.16.182.0/24
Net1: 172.16.183.0/24
Net2: 172.16.184.0/24
Net3: 172.16.185.0/24
Net4: 172.16.186.0/24
Net5: 172.16.187.0/24
Net6: 172.16.188.0/24
Net7: 172.16.189.0/24
Net8: 172.16.190.0/24
Net9: 172.16.191.0/24


Requirements for vlsm:
1: 1000 hosts 2 subnets  2000
2: 500  hosts 4 subnets  2000
3: 250  hosts 3 subnets   750
4: 120  hosts 7 subnets   840
Total:                   5590 
Hosts math: 
Major subnet needed to support vlsm:
2^13=8192-2=8190
32-13=/19 
172.20.0.0/19 range 172.20.0.1 - 172.20.31.254 BR: 172.20.31.255   
        128 64 32 16 8 4 2 1 128
0:/19     1  1  1| 0 0 0 0 0
1:/22     1  1  1  1 1 1|0 0
2:/23     1  1  1  1 1 1 1|0
3:/24     1  1  1  1 1 1 1 1|
4:/25     1  1  1  1 1 1 1 1. 1|
Block size is 32
Next subnet:
172.20.32.0/19
1:
Net0: 172.20.0.0/22
Net1: 172.20.4.0/22
2:
Net0: 172.20.8.0/23
Net1: 172.20.10.0/23
Net2: 172.20.12.0/23
Net3: 172.20.14.0/23
3:
Net0: 172.20.16.0/24
Net1: 172.20.17.0/24
Net2: 172.20.18.0/24
4:
Net0: 172.20.19.0/25
Net1: 172.20.19.128/25
Net2: 172.20.20.0/25
Net3: 172.20.20.128/25
Net4: 172.20.21.0/25
Net5: 172.20.21.128/25
Net6: 172.20.22.0/25


Requirements for vlsm:
1: 120 hosts 1 subnet   120 
2: 30  hosts 2 subnets   60
3: 10  hosts 3 subnets   30
4: 5   hosts 1 subnets   10
5: Point to Point 
Total:                   220 + P2P links
Hosts math:
Major subnet needed to support vlsm:
2^8=256-2=254
32-8=/24
192.168.100.0/24 range 192.168.100.1 - 192.168.100.254 BR: 192.168.100.255

        128 64 32 16 8 4 2 1
1:/25     1  0  0  0 0 0 0 0
2:/27     1  1  1  0 0 0 0 0
3:/28     1  1  1  1 0 0 0 0
4:/29     1  1  1  1 1 0 0 0
5:/30     1  1  1  1 1 1 0 0

1:  Block size 128
Net0: 192.168.100.0/25
Subnet next network: 
Net1: 192.168.100.128/25

2: Block size 32 
Net0: 192.168.100.128/27
Net1: 192.168.100.160/27
Subnet next network
Net2: 192.168.100.192/27

3: Block size 16 
Net0: 192.168.100.192/28
Net1: 192.168.100.208/28
Net2: 192.168.100.224/28
Subnet next network
Net3: 192.168.100.240/28

4: Block size 8
Net0: 192.168.100.240/29
Subnet next network 
Net1: 192.168.100.248/29

5: Block size 4 
Net0: 192.168.100.248/30
Net1: 192.168.100.252/30
end

Requirements for vlsm:          Prefix:
1: 200 hosts 10 subnets  2000     /24
2: 120 hosts 5  subnets  600      /25
3: 50  hosts 7  subnets  350      /26
4: 30  hosts 5  subnets  150      /27
5: P2P nets  20 subnets  40       /30
Total:                   3140  ip addresses needed.
Hosts formula: 
2^x-2=H
2^12-2=4094 
32-12=20 
Subnets mask is /20 
172.16.0.0/20

Req. 200 hosts per subnet
1: 10 subnets:
Net0: 172.16.0.0/24
Net1: 172.16.1.0/24
Net2: 172.16.2.0/24
Net3: 172.16.3.0/24
Net4: 172.16.4.0/24
Net5: 172.16.5.0/24
Net6: 172.16.6.0/24
Net7: 172.16.7.0/24
Net8: 172.16.8.0/24
Net9: 172.16.9.0/24

Req. 120 hosts per subnet
2: 5 subnets: 
Net0: 172.16.10.0/25
Net1: 172.16.10.128/25
Net2: 172.16.11.0/25
Net3: 172.16.11.128/25
Net4: 172.16.12.0/25

Req. 50 hosts per subnet
3: 7 subnets
Net0: 172.16.12.128/26
Net1: 172.16.12.192/26
Net2: 172.16.13.0/26
Net3: 172.16.13.64/26
Net4: 172.16.13.128/26
Net5: 172.16.13.192/26
Net6: 172.16.14.0/26

Req. 30 hosts per subnet
4: 6 subnets
Net0: 172.16.14.64/27
Net1: 172.16.14.96/27
Net2: 172.16.14.128/27
Net3: 172.16.14.160/27
Net4: 172.16.14.192/27
Net5: 172.16.14.224/27

Req. P2P 
5: 20 subnets
Net0: 172.16.15.0/30
Net1: 172.16.15.4/30
Net2: 172.16.15.8/30
Net3: 172.16.15.12/30                
Net4: 172.16.15.16/30
Net5: 172.16.15.20/30
Net6: 172.16.15.24/30
Net7: 172.16.15.28/30
Net8: 172.16.15.32/30                
Net9: 172.16.15.36/30
Net10: 172.16.15.40/30
Net11: 172.16.15.44/30
Net12: 172.16.15.48/30
Net13: 172.16.15.52/30                
Net14: 172.16.15.56/30
Net15: 172.16.15.60/30
Net16: 172.16.15.64/30
Net17: 172.16.15.68/30
Net18: 172.16.15.72/30                
Net19: 172.16.15.76/30

Left unsubnetted:
172.16.15.80/28
172.16.15.93/27
172.16.15.128/25


Requirements for VLSM:          prefix:   
1: 120 hosts 2 subnets   240       /25
2: 60  hosts 3 subnets   180       /26
3: 30  hosts 1 subnet     30       /27
4: 10  hosts 2 subnets    20       /28
Total:                   370 hosts 
Hosts formula:
2^x-2=H
2^9-2=510
32-9=23
Mask is /23
192.168.0.0/23                  

Req. 120 hosts
1: 2 subnets:
Net0: 192.168.0.0/25
Net1: 192.168.0.128/25

Req. 60 hosts 
2: 3 subnets:
Net0: 192.168.1.0/26
Net1: 192.168.1.64/26
Net3: 192.168.1.128/26

Req. 30 hosts
3: 1 subnet
Net0: 192.168.1.192/27

Req. 10 hosts
4: 2 subnets
Net0: 192.168.1.224/28
Net1: 192.168.1.240/28


Requirements for VLSM:            Prefix:
1: 500 hosts 5 subnets  2500       /23   510  2550
2: 200 hosts 3 subnets   600       /24   254  762
3: 100 hosts 7 subnets   700       /25   126  882
4: 50  hosts 4 subnets   200       /26    62  248
Total hosts:            4000                  4442
Host formula:
2^x-2=H
2^13-2=8190 
32-13=19
Prefix is /19 mask 255.255.224.0 wilcard mask: 0.0.31.255 
172.20.0.0/19 
Next usable subnet: 172.20.32.0/19

Req. 500 hosts 
1: 5 subnets  prefix /23  255.255.254.0  0.0.1.255
Net0: 172.20.0.0/23 
Net1: 172.20.2.0/23
Net2: 172.20.4.0/23
Net3: 172.20.6.0/23
Net4: 172.20.8.0/23 
Next network to subnet is 172.20.10.0

Req. 200 hosts
2: 3 subnets Prefix /24 255.255.255.0 0.0.0.255
Net0: 172.20.10.0/24
Net1: 172.20.11.0/24
Net2: 172.20.12.0/24
Next network tp subnet is 172.20.13.0

Req. 100 hosts
3: 7 subnets Prefix /25 255.255.255.128 0.0.0.127
Net0: 172.20.13.0/25
Net1: 172.20.13.128/25
Net2: 172.20.14.0/25
Net3: 172.20.14.128/25
Net4: 172.20.15.0/25
Net5: 172.20.15.128/25
Net6: 172.20.16.0/25
Next network to subnet os 172.20.16.128

Req. 50 hosts 
4: 4 subnets Prefix /26 255.255.255.192 0.0.0.63
Net0: 172.20.16.128/26
Net1: 172.20.16.192/26
Net2: 172.20.17.0/26
Net3: 172.20.17.64/26

Left unsubneted: 
172.20.17.128/25
172.20.18.0/23
172.20.20.0/22
172.20.24.0/21


Requirements for VLSM:              Hosts formula:        Prefix formula:
1: 1000 hosts 3 subnets    3000     2^10-2=1022x3= 3066    32-10= /22
2: 500  hosts 4 subnets    2000     2^9-2=510x4=   2040    32-9=  /23
3: 250  hosts 7 subnets    1750     2^8-2=254x7=   1778    32-8=  /24
4: 120  hosts 9 subnets    1080     2^7-2=126x9=   1134    32-7=  /25
Total:                     7830                    8018
Allocate Network size for 8018 hosts
Host Formula:
2^x-2=H 
2^13-2=8190
32-13=19
Prefix is /19 Mask: 255.255.224.0 Wilcard mask: 0.0.31.255

192.168.128.0/19
192.168.160.0/19

Req. 1000 hosts: 
1: 3 subnets:
                                128 64 32 16 8 4 2 1
1st: 192.168.128.0/22             1  1  1  1 1 1 0 0
2nd: 192.168.132.0/22
3rd: 192.168.136.0/22


Req. 500 hosts
2: 4 subnets:
                              128 64 32 16 8 4 2 1
1st: 192.168.140.0/23           1  1  1  1 1 1 1 0
2nd: 192.168.142.0/23
3rd: 192.168.144.0/23
4th: 192.168.146.0/23

Req. 250 hosts:            
3: 7 subnets:                   
                              128 64 32 16 8 4 2 1                        
1st: 192.168.148.0/24           1  1  1  1 1 1 1 1
2nd: 192.168.149.0/24
3rd: 192.168.150.0/24
4th: 192.168.151.0/24
5th: 192.168.152.0/24
6th: 192.168.153.0/24
7th: 192.168.154.0/24


Req. 120 hosts:
4: 9 subnets: 

1st: 192.168.155.0/25
2nd: 192.168.155.128/25
3rd: 192.168.156.0/25
4th: 192.168.156.128/25
5th: 192.168.157.0/25
6th: 192.168.157.128/25
7th: 192.168.158.0/25
8th: 192.168.158.128/25
9th: 192.168.159.0/25

Leftovers:

Net0: 192.168.159.128/25



Requirements for VLSM:              Hosts formula:        Prefix formula:
1: 500  hosts 5 subnets    2500     2^9-2=510x5= 2550    32-9=  /23
2: 200  hosts 3 subnets     600     2^8-2=254x3=  764    32-8=  /24
3: 100  hosts 7 subnets     700     2^7-2=126x7=  882    32-7=  /25
4: 50   hosts 9 subnets     450     2^6-2=62x9=   558    32-6=  /26
Total:                     4250                  4754
Allocate Network size for 4754 hosts
2^13-2=8190
32-13= /19 
172.16.0.0/19   range .0-31 
192.16.32.0/19

1. 500 hosts
Req: 5 subnets
Net0: 172.16.0.0/23
Net1: 172.16.2.0/23
Net2: 172.16.4.0/23
Net3: 172.16.6.0/23
Net4: 172.16.8.0/23

2. 200 hosts 
Req. 3 subnets
Net0: 172.16.10.0/24
Net1: 172.16.11.0/24
Net2: 172.16.12.0/24

3. 100 hossts 
Req. 7 subnets
Net0: 172.16.13.0/25
Net1: 172.16.13.128/2516
Net2: 172.16.14.0/25
Net3: 172.16.14.128/25
Net4: 172.16.15.0/28
Net5: 172.16.15.128/25
Net6: 172.16.16.0/25

4. 50 hosts
Req. 9 subnets
Net0: 172.16.16.128/26
Net1: 172.16.16.192/26
Net2: 172.16.17.0/26
Net3: 172.16.17.64/26
Net4: 172.16.17.128/26
Net5: 172.16.17.192/26
Net6: 172.16.18.0/26
Net7: 172.16.18.64/26
Net8: 172.16.18.128/26

Leftover for future use:

172.16.18.192/26
172.16.19.0/24
172.16.20.0/22
172.16.24.0/21

=======================================================================
VLSM PROJECT FOR XYZ.CORP
!
Requirement: 
Objects List:
1:  Main Office in NYC 1000 hosts
2:  DATA Center in Omaha 5000 hosts 
3:  Production Dep. in Denver 2000 hosts 
4:  Distribution Fac. in Indianapolis 500  host 
5:  Distribution Fac. in San Francisco 500 hosts 
6:  Branch office in Washington DC  250 hosts 
7:  Branch office in Maimi FL       250 hosts
8:  Branch office in Houston TX     250 hosts
9:  Branch office in San Diego CA   250 hosts 
10: Branch office in Vancouver BC   250 hosts 
11: Branch office in Halifax NS     250 hosts 
!
5000  2^13-2 = 8190  32-13=/19  172.16.0.0/19 
!
Total:5500 2^13-2 = 8190 32-13=/19 172.16.32.0/19
2000   2^11-2 = 2046  /21
1000   2^10-2 = 1022  /22
500    2^9-2  = 510   /23
500    2^9-2  = 510   /23
250    2^8-2  = 254   /24
250    2^8-2  = 254   /24
250    2^8-2  = 254   /24
250    2^8-2  = 254   /24
250    2^8-2  = 254   /24
250    2^8-2  = 254   /24
!
Net DataCenter: 172.16.0.0/19
Net Denver    : 172.16.32.0/21
Net NYC       : 172.16.40.0/22
Net Indianapol: 172.16.44.0/23
Net San Franci: 172.16.46.0/23
Net Washington: 172.16.48.0/24
Net Maimi     : 172.16.49.0/24
Net Houston   : 172.16.50.0/24
Net San Diego : 172.16.51.0/24
Net Vancouver : 172.16.52.0/24
Net Halifax   : 172.16.53.0/24
!
For future use:
172.16.54.0/23
172.16.56.0/21
```

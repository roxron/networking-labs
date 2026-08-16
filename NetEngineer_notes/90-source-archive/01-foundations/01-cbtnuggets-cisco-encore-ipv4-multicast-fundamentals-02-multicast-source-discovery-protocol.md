# 02 Multicast Source Discovery Protocol

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/Cisco ENCORE/IPv4 Multicast Fundamentals/02 Multicast Source Discovery Protocol`  
> Original source context: 01 CBTNUGGETS / Cisco ENCORE / IPv4 Multicast Fundamentals. Content is preserved as historical study material; validate commands against the target platform and release.

```text
MSDP Peers (intra-AS) 
MSDP Peers (inrer-AS)
MSDP SA-Filters
!
Configuring Intra-AS MSDP:
!
R1(config)# ip msdp peer 2.2.2.2 connect-source lo0
!
R2(config)# ip msdp peer 1.1.1.1 connect-source lo0
!
R1# show ip msdp peer 
!
!
Configuring Inter-AS MSDP:
!
R5(config)# ip msdp peer 9.9.9.9 connect-source lo0 remote-as 64512
R5(config)# ip msdp peer 16.16.16.16 connect-source lo0 remote-as 64512
R5(config)# ip msdp peer 20.20.20.20 connect-source lo0 remote-as 65000
!
!
R5(config)# access-list 111 deny ip any 224.0.0.0 0.0.0.255
R5(config)# access-list 111 deny ip any host 224.0.1.39
R5(config)# access-list 111 deny ip any host 224.0.1.40 
R5(config)# access-list 111 deny ip any 232.0.0.0 0.255.255.255
R5(config)# access-list 111 deny ip any 239.0.0.0 0.255.255.255
R5(config)# access-list 111 deny ip any 10.1.0.0 0.0.255.255 any
R5(config)# access-list 111 permit ip any any 
R5(config)#
R5(config)# ip msdp sa-filter in 9.9.9.9 list 111
R5(config)# ip msdp sa-filter out 9.9.9.9 list 111
```

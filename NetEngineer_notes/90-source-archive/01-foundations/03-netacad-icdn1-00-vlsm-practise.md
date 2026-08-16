# 00 VLSM Practise

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN1/00 VLSM Practise.txt`  
> Original source context: 03 NETACAD / ICDN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Given Network 172.16.128.0/17 255.255.128.0   0.0.127.255
Requirements:

                                              Topology:                                             


                             16000 hosts LAN1 G0/0|----Router HQ---|G0/1 LAN2 8000 host
                                                       |       |           
                                                      |         |         
                                                     |           |
                                                    |             |
                                                    |              |
                               2000 hosts G0/0|----BR1-------------BR2----|G0/0 500 hosts
                               4000 hosts G0/1|----/                \----|G0/1 1000 hosts

WANs subnets:
BR1-HQ  Net0: 192.168.255.0/30 192.168.255.1  192.168.255.2  192.168.255.3
HQ-BR2  Net1: 192.168.255.4/30 192.168.255.5  192.168.255.6  192.168.255.7
BR1-BR2 Net2: 192.168.255.8/30 192.168.255.9  192.168.255.10 192.168.255.11

LANs Subnets:
HQ  G0/0: 172.16.128.0/18 255.255.192.0  172.16.128.1  172.16.191.254 172.16.191.255
HQ  G0/1: 172.16.192.0/19 255.255.224.0  172.16.192.1  172.16.223.254 172.16.223.255

BR1 G0/1: 172.16.224.0/20 255.255.240.0  172.16.224.1  172.16.239.254 172.16.239.255
BR1 G0/0: 172.16.240.0/21 255.255.248.0  172.16.240.1  172.16.247.254 172.16.247.255

BR2 G0/1: 172.16.248.0/22 255.255.252.0  172.16.248.1  172.16.251.254 172.16.251.255
BR2 G0/0: 172.16.252.0/23 255.255.254.0  172.16.252.1  172.16.253.254 172.16.253.255

IPv6 Deployment:
WANs subnet IDs:
BR1-HQ  Net0: 2001:0db8:acad:0000::/64
HQ-BR2  Net1: 2001:0db8:acad:0001::/64
BR1-BR2 Net2: 2001:0db8:acad:0002::/64

LANs subnet IDs:
HQ  G0/0 Net0: 2001:0db8:acad:00a0::/64
HQ  G0/1 Net1: 2001:0db8:acad:00a1::/64

BR1 G0/0 Net0: 2001:0db8:acad:00b0::/64
BR1 G0/1 NEt1: 2001:0db8:acad:00b1::/64

BR2 G0/0 Net0: 2001:0db8:acad:00c0::/64
BR2 G0/1 NEt1: 2001:0db8:acad:00c1::/64

Link-Local
HQ  FE80::A
BR1 FE80::B
BR2 FE80::C

################################################################################
```

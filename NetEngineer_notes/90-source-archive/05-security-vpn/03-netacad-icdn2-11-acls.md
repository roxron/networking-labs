# 11 ACLs

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN2/11 ACLs`  
> Original source context: 03 NETACAD / ICDN2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure a Standard IPv4 ACL:
R1(config)# access-list 10 permit 192.168.10.0 0.0.0.255
R1(config)# access-list 10 deny host 192.168.20.100 
R1(config)# access-list 10 permit 192.168.20.0 0.0.0.255
R1(config)# access-list 10 deny any
Apply ACL to Interface:
R1(config)# interface S0/0/0
R1(config)# ip access-group 10 out

Configure Named Standard IPv4 ACLs:
R1(config)# ip access-list standard NO_ACCESS
R1(config-std-nacl)# deny host 192.168.11.10
R1(config-std-nacl)# permit any 
R1(confit-std-nacl)# exit
R1(config)# interface g0/0
R1(config-if)# ip access-group NO_ACCESS in

Verify ACLs:
R1# show ip interface G0/0
R1# show access-lists


Configure Extended ACLs:

Example1:
R1(config)# access-list 110 permit tcp 192.168.10.0 0.0.0.255 any eq 23
R1(config)# access-list 110 permit tcp 192.168.10.0 0.0.0.255 any eq 20
R1(config)# access-list 110 permit tcp 192.168.10.0 0.0.0.255 any eq 21
or 
R1(config)# access-list 110 permit tcp 192.168.10.0 0.0.0.255 any eq telnet
R1(config)# access-list 110 permit tcp 192.168.10.0 0.0.0.255 any eq ftp 
R1(config)# access-list 110 permit tcp 192.168.10.0 0.0.0.255 any eq ftp-data

Example2:
Extended ACLs as stateful firewall:
R1(config)# access-list 100 permit tcp 192.168.1.0 0.0.0.255 any eq 80
R1(config)# access-list 100 permit tcp 192.168.1.0 0.0.0.255 any eq 443
R1(config)# access-list 101 permit tcp any 192.168.1.0 0.0.0.255 established
R1(config)#interface g0/0
R1(config-if)# ip access-group 100 in 
R1(config-if)# exit
R1(config)#inteface S0/0/0
R1(config-if)# ip access-group 101 in

Example3:
Filtering Traffic with Extended ACLs, Deny FTP and Telnet, allow the rest:
R1(config)# access-list 102 deny tcp 192.168.11.0 0.0.0.255 192.168.10.0 0.0.0.255 eq ftp
R1(config)# access-list 102 deny tcp 192.168.11.0 0.0.0.255 192.168.10.0 0.0.0.255 eq ftp-data
R1(config)# access-list 102 deny tcp 192.168.11.0 0.0.0.255 192.168.10.0 0.0.0.255 eq telnet
R1(config)# access-list 102 permit ip 192.168.11.0 0.0.0.255 any 
R1(config)# interface g0/1 
R1(config-if)# ip access-group 102 in 

Configure Named extended ACLs:
Example4:
R1(config)# ip access-list extended SURFING
R1(config-ext-nacl)# permit tcp 192.168.0.0 0.0.0.255 any eq 80
R1(config-ext-nacl)# permit tcp 192.168.0.0 0.0.0.255 any eq 443
R1(config-ext-nacl)# exit
R1(config)# ip access-list exetended BROWSING
R1(config-ext-nacl)# permit tcp any 192.168.0.0 0.0.0.255 established
R1(config-ext-nacl)# exit
R1(config)# interface g0/0
R1(config-if)# ip access-group SURFING in
R1(config-if)# ip access-group BROWSING out

Verifying Extended ACLs:
R1# show ip interface G0/0
R1# show access-list
R1# show ip access-list

Configuring IPv6 ACLs:
Example1:
R1(config)# ipv6 access-list NO-R3-LAN-ACCESS
R1(config-ipv6-acl)# deny ipv6 2001:DB8:CAFE:30::/64 any
R1(config-ipv6-acl)# permit ipv6 any any
R1(config-ipv6-acl)# exit
R1(config)# interface S0/0/0
R1(config-if)# ipv6 traffic-filter NO-R3-LAN-ACCESS in

Example2:
Deny FTP access:
R1(config)# ipv6 access-list NO-FTP-TO-11
R1(config-ipv6-acl)# deny tcp any 2001:DB8:CAFE:11::/64 eq ftp 
R1(config-ipv6-acl)# deny tcp any 2001:DB8:CAFE:11::/64 eq ftp-data
R1(config-ipv6-acl)# permit ipv6 any any
R1(config-ipv6-acl)# exit
R1(config)# inteface g0/0
R1(config-if)# ipv6 traffic-filter NO-FTP-TO-11 in

Example3:
R3(config)# ipv6 access-list RESTRICTED-ACCESS
R3(config-ipv6-acl)# remark Allow only HTTP and HTTPS to network 10
R3(config-ipv6-acl)# permit tcp any 2001:DB8:CAFE:10::/64 eq 80
R3(config-ipv6-acl)# permit tcp any 2001:DB8:CAFE:10::/64 eq 443
R3(config-ipv6-acl)# remark Prohibit all other traffic to net 10
R3(config-ipv6-acl)# deny ipv6 any 2001:DB8:CAFE:10::/64 
R3(config-ipv6-acl)# remark Allow PC3 telnet to PC2
R3(config-ipv6-acl)# permit tcp host 2001:DB8:CAFE:30::12 host 2001:DB8:CAFE:11::12 eq 23
R3(config-ipv6-acl)# remark Prohibit other telnet to PC2
R3(config-ipv6-acl)# deny tcp any host 2001:DB8:CAFE:11::12 eq 23
R3(config-ipv6-acl)# remark Allow access to everything esle 
R3(config-ipv6-acl)# permit ipv6 any any
R3(config-ipv6-acl)# exit
R3(config)# interface G0/0
R3(config-if)# ipv6 traffic-filter RESTRICTED-ACCESS in

Verifying IPv6 ACLs:
R3# show ipv6 interface G0/0
R3# show access-list
R3# show ipv6 access-list
```

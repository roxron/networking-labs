# 8 Day ACL Implementation

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNA R&S for 31 days/8 Day ACL Implementation`  
> Original source context: 04 CISCOPRESS / CCNA R&S for 31 days. Content is preserved as historical study material; validate commands against the target platform and release.

```text
ACL Implementation:
!
Configuring Standard Numbered IPv4 ACLs:
!
R1(config)# access-list 1 permit 172.16.0.0 0.0.255.255
!
R1(config)# interface gigabitethernet 0/0
R1(config-if)# ip access-group 1 out
R1(config-if)# interface gigabitethernet 0/1
R1(config-if)# ip access-group 1 out
!
!
ACL Preventing Traffic Originating from a Specific Host:
!
R1(config)# access-list 1 deny 172.16.4.13 0.0.0.0
R1(config)# access-list 1 permit 0.0.0.0 255.255.255.255
R1(config)# interface gigabitethernet 0/0
R1(config-if)# ip access-group 1 out
!
!
ACL Preventing Traffic Originating from a Specific Subnet:
!
R1(config)# access-list 1 deny 172.16.4.0 0.0.0.255
R1(config)# access-list 1 permit any
R1(config)# interface g0/0
R1(config-if)# ip access-group 1 out
!
!
Access List Allowing One Host Only Remote Access to R1:
!
R1(config)# access-list 12 permit host 172.16.4.13
R1(config)# line vty 0 15
R1(config-line)# access-class 12 in
!
!
!
Configuring Extended Numbered IPv4 ACLs:
!
Access List Preventing FTP Traffic from Specific Subnets:
!
R1(config)# access-list 101 deny tcp 172.16.4.0 0.0.0.255 172.16.3.0 0.0.0.255 eq 21
R1(config)# access-list 101 deny tcp 172.16.4.0 0.0.0.255 172.16.3.0 0.0.0.255 eq 20
R1(config)# access-list 101 permit ip any any
R1(config)# interface g0/0
R1(config-if)# ip access-group 101 out
!
!
Access List Preventing Telnet Traffic from a Specific Subnet:
!
R1(config)# access-list 101 deny tcp 172.16.4.0 0.0.0.255 any eq 23
R1(config)# access-list 101 permit ip any any
R1(config)# interface g0/0
R1(config-if)# ip access-group 101 out
!
!
Configuring Named IPv4 ACLs:
!
Named ACL Preventing Traffic from a Specific Host:
!
R1(config)# ip access-list standard TROUBLEMAKER
R1(config-std-nacl)# deny host 172.16.4.13
R1(config-std-nacl)# permit 172.16.4.0 0.0.0.255
R1(config-std-nacl)# interface g0/0
R1(config-if)# ip access-group TROUBLEMAKER out
!
!
Extended Named ACL Preventing a Specific Hoast from Accessing WEB:
!
R1(config)# ip access-list extended NO_WEB
R1(config-ext-nacl)# deny tcp host 192.168.10.25 any eq www
R1(config-ext-nacl)# deny tcp host 192.168.10.25 any eq 443
R1(config-ext-nacl)# permit ip any any 
R1(config-ext-nacl)# exit
R1(config)# interface G0/1
R1(config-if)# ip access-group NO_WEB in 
!
!
Adding Comments to a Numbered ACL:
!
R1(config)# access-list 101 remark Permitting John to Telnet to Server
R1(config)# access-list 101 permit tcp host 172.16.4.13 host 172.16.3.10 eq telnet
!
!
Adding Comments to a Named ACL:
!
R1(config)# ip access-list standard PREVENTION
R1(config-std-nacl)# remark Do not allow Jones subnet through
R1(config-std-nacl)# deny 172.16.4.0 0.0.0.255
!
!
Verifying IPv4 ACLs:
!
R1# show access-lists
R1# show ip interface g0/0
R1# show running-config
!
!
!
Configuring IPv6 ACLs:
!
Access List Allowing Only One Host to Access R1:
!
R1(config)# ipv6 access-list SSH-HOST
R1(config-ipv6-acl)# permit ipv6 host 2001:db8:1:4::13 any
R1(config-ipv6-acl)# deny ipv6 any any
R1(config-ipv6-acl)# exit
R1(config)# line vty 0 4
R1(config-line)# ipv6 access-class SSH-HOST in
!
!
Extended IPv6 ACL: Allow Only Web Traffic:
!
R1(config)# ipv6 access-list WEB-ONLY
R1(config-ipv6-acl)# permit tcp 2001:DB8:1:4::/64 2001:DB8:1:3::/64 eq www
R1(config-ipv6-acl)# deny ipv6 2001:DB8:1:4::/64 2001:DB8:1:3::/64
R1(config-ipv6-acl)# permit ipv6 2001:DB8:1:4::/64 any
R1(config-ipv6-acl)# exit
R1(config)# interface g0/1
R1(config-if)# ipv6 traffic-filter WEB-ONLY in
!
!
Verifying IPv6 ACLs:
!
R1# show running-config
R1# show access-list 
R1# show ipv6 access-list 
R1# show ipv6 interface g0/1
```

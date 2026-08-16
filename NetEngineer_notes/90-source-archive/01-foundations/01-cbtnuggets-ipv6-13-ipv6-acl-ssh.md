# 13 IPV6 ACL & SSH

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/IPV6/13 IPV6 ACL & SSH`  
> Original source context: 01 CBTNUGGETS / IPV6. Content is preserved as historical study material; validate commands against the target platform and release.

```text
SSH: 

R1(config)# username admin priviledge 15 secret cisco
R1(config)# lie vty 0 15
R1(config-line)# no priviledge level 15 
R1(config-line)# login local
R1(config-line)# exit
R1(config)# ip domain name ccnp.loc
R1(config)# crypto key generate rsa modulus 1024
R1(config)#

R2# ssh -l admin 2001:DB8:A001:1000::23
R2# who 
R2# show ssh

IPV6 ACL:
R2(config)# ipv6 access-list  MYACL
R2(config-ipv6-acl)# permit icmp 2001:DB8:A001:10::/64 host 2001:DB8:A002:100::2
R2(config-ipv6-acl)# permit tcp 2001:DB8:A001:10::/64 host 2001:DB8:A002:100::2 eq 22
R2(config-ipv6-acl)# deny ipv6 2001:DB8:A001:10::/64 2001:DB8:A002:A10::/64
R2(config-ipv6-acl)# exit
R2(config)# interface G0/2
R2(config-if)# ipv6 traffic-filter MYACL in 
R2(config-if)# exit

R2# show access-list 
R2# show ipv6 interface G0/2

VTY IPV6 ACL:
R1(config)# ipv6 access-list VTY_ACL 
R1(config-ipv6-acl)# permit ipv6 2001:DB8:A003:10::100/128 any 
R1(config-ipv6-acl)# exit
R1(config)# line vty 0 15
R1(config-line)# transport input shh
R1(config-line)# ipv6 access-class VTY_ACL in 
R1(config-line)#
```

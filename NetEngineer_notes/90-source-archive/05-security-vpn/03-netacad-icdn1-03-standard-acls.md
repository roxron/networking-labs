# 03 Standard ACLs

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN1/03 Standard ACLs.txt`  
> Original source context: 03 NETACAD / ICDN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure Numbered Standard ACLs:
R1(config)# access-list 1 permit host 192.168.10.100
R1(config)# access-list 1 deny 192.168.10.0 0.0.0.255
R1(config)# access-list 1 permit any 
R1(config)# interface G0/1 
R1(config-if)# ip access-group 1 out

Configure Named Standard ACLs:
R1(config)# ip access-list standard ACL1
R1(config-std-nacl)# permit 172.16.40.0 0.0.0.255
R1(config-std-nacl)# deny all
R1(config-std-nacl)# exit
R1(config)# interface S0/0/1 
R1(config-if)# ip access-group ACL1 in

Verify ACLs:
R1# show ip inteface S0/0/0
R1# show access-list 
R1# show ip access-list ACL1
R1# clear access-list counters


Configure VTY line ACL:
R1(config)# line vty 0 15
R1(config-line)# login local
R1(config-line)# transport input ssh
R1(config-line)# access-class 10 in
R1(config-line)# exit
R1(config)# access-list 10 permit 192.168.0.0 0.0.0.255
R1(config)# access-list 10 deny any
```

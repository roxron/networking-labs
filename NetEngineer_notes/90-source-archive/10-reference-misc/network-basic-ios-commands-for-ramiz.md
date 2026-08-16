# Basic IOS commands for Ramiz

> Imported source note. Provenance: `NetEngineer_Journal/Network/Basic IOS commands for Ramiz.txt`  
> Original source context: Network. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Press enter 

S1> enable
S1# disable 
S1# show running-config 
S1# Show startup-config 
S1# copy running-config startup-config  
S1# configure terminal 
S1(config)# hostname S1 
S1(config)# enable password 
S1(config)# line console 0 
S1(Config-line)# password 7770
S1(config-line)# login 
S1(config-line)# exit
S1(config)#line vty 0 15 
S1(config)#password 7770
S1(config)#login 
S1(config)#exit
S1(config)# interface vlan 1 
S1(Config-if)# ip address 192.168.1.1 255.255.255.0
S1(config-if)# no shutdown 

Show commands: 

S1# show version 
S1# show mac address-table 
S1# show ip interface brief 
S1# show interface F0/1
```

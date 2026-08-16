# 29 day Basic Switch Conf

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNA R&S for 31 days/29 day Basic Switch Conf`  
> Original source context: 04 CISCOPRESS / CCNA R&S for 31 days. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Command History Buffer Commands:
!
switch# show histiry 
switch# show terminal 
switch# terminal history 
switch# terminal history size 50
switch# terminal no history size 
switch# terminal no history 
!
!
!
IOS Examination Commands:
!
switch# show version 
switch# show flash 
switch# show interface
switch# show interface status 
switch# show processes cpu 
switch# show protocols 
switch# show memory 
switch# show stacks 
switch# show buffers 
switch# show running-config 
switch# show startup-config 
!
!
!
Subconfiguration modes:
!
Global: 
switch# configure terminal 
switch(config)# 
!
Line:
switch(config)# line vty 0 15 
switch(config-line)# 
!
Interface:
switch(config)# interface gigabitethernet 0/1
switch(config-if)# 
!
router:
switch(config)# router rip 
switch(config-router)# 
!
!
!
Basic Switch Configuration Commands:
!
Switch# configure terminal 
Switch(config)# hostname S1 
S1(config)# interface vlan 1 
S1(config-if)# ip address 172.17.99.11 255.255.255.0
S1(config-if)# no shutdown 
S1(config-if)# exit
S1(config)# interface fastethernet 0/6 
S1(config-if)# switchport mode access 
S1(config-if)# switchport  access vlan 123
S1(config-if)# duplex auto 
S1(config-if)# speed auto 
S1(config-if)# mdix auto 
S1(config-if)# exit
S1(config)# ip default-gateway 172.17.99.1
S1(config)# ip http authentication enable 
S1(config)# ip http server 
S1(config)# line console 0
S1(config-line)# password cisco 
S1(config-line)# login 
S1(config-line)# exit
S1(config)# line vty 0 15 
S1(config-line)# password cisco 
S1(config-line)# login 
S1(config-line)# exit
S1(config)# enable password cisco 
S1(config)# enable secret class
S1(config)# service password-encryption 
S1(config)# banner login #Authorized Personnel Only!# 
S1(config)# banner motd #Device maintenance will be occurring on Friday!#
S1(config)# end
S1# copy running-config startup-config
!
!
!
Configure Range of Interfaces:
!
Switch(config)# interface range fastethernet 0/1 - 5 
!
!
!
Verifying Network Connectivity:
!
ping 192.168.1.10
ipconfig /all 
tracert 192.168.3.100
traceroute 192.168.3.100
```

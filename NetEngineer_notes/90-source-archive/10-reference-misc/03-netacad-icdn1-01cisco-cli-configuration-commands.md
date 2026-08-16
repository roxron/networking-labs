# 01Cisco CLI Configuration Commands

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN1/01Cisco CLI Configuration Commands.txt`  
> Original source context: 03 NETACAD / ICDN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
########################################################
Basic configuration for Cisco Routers and Switchis 

Router> enable 
Router#disable 
Router> 

Router#configure terminal 
Router(config)#exit

Router(config)#end 
Router(config)#           Ctrl-Z
Router#

Router# clock set 19:10:00 July 25 2019

Router(config)#hostname R1

R1(config)#enable pasword cisco

R1(config)#enable secret cisco

R1(config)#line console 0
R1(config-line)# password cisco 
R1(config-linw)# login
R1(config-line)# exit
R1(config)# line vty 0 15 
R1(config-line)# password cisco
R1(config-line)# login 

R1(config)#banner motd #Legal action will be pursued for any unautorized use#

R1# copy running-config startup-config 
R1# erase startup-config
R1# write


##################################################
Configuring Routed port on Cisco layer 3 Switch

SW1(config)# interface F0/1
SW1(config-if)# no switchport
SW1(config-if)#ip address 192.168.200.10 255.255.255.0
Sw1(config-if)#no shutdown

Disable DNS Lookup 

#R1(config)# no ip domain-lookup


########################################################
Configuration of IPv6 Unicast Global Address on the Router

R1(config)# interface GigabitEthernet 0/0
R1(config-if)# ipv6 address 2001:ABCD:1122:1::1/64
R1(config-if)# no shutdown 


R1(config)# ipv6 unicast-routing

############################################################
Configuring IPv6 Link local Address on the router:

R1(config)# interface GigabitEthernet 0/0
R1(config-if)# ipv6 address FE80::1 link-local 



R1# reload in 5
R1# reload cancel
```

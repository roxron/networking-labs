# 02 #Complete List of Secure Basic Configurations

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN1/02 #Complete List of Secure Basic Configurations.txt`  
> Original source context: 03 NETACAD / ICDN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# hostmane R1
R1(config)# clock timezone NYC -5
R1(config)# clock summer-time NYC recurring 	
R1(config)# ntp server 200.225.10.233
R1(config)# ntp update-calendar 
R1(config)# logging console  
R1(config)# logging buffered
R1(config)# logging 192.168.3.200
R1(config)# logging trap 4
R1(config)# service timestamp log datetime msec
R1(config)# service timestamp debug datetime msec
R1(config)# service password-encryption
R1(config)# banner motd #Authorized Access Only!#
R1(config)# security password min-length 10
R1(config)# login block-for 120 attempts 3 within 60
R1(config)# enable secret ciscoclass
R1(config)# no ip domain-lookup 
R1(config)# ip domain name r1.local
R1(config)# username rustem privilege 15 secret ciscoclass
R1(config)# crypto key generate rsa
R1(config)# ip ssh version 2
R1(config)# ip ssh time-out 10
R1(config)# ip ssh authentication-retries 1
R1(config)# aaa new-model
R1(config)# aaa authentication login AAA group radius local enable 
R1(config)# aaa authentication login LOCAL_AUTH local
R1(config)# line console 0
R1(config-line)# login local
R1(config-line)# exec-timeout 10
R1(config-line)# logging synchronous
R1(config-line)# history size 100
R1(config-line)# exit
R1(config)# line vty 0 15
R1(config-line)# exec-timeout 10 
R1(config-line)# logging synchronous
R1(config-line)# history size 100
R1(config-line)# transport input ssh 
R1(config-line)# end
R1# clock set 15:15:00 Aug 2 2017

______________________________________________________

  

hostname SD2
clock timezone NewYork -5
clock summer-time NewYork recurring
ntp server 10.100.0.254
ntp update-calendar
logging console 
logging buffered
logging 10.100.0.10
logging trap informational
service timestamps debug datetime msec
service timestamps log datetime msec
service password-encryption
login block-for 120 attempts 3 within 60
banner motd #AUTHORIZED ACCESS ONLY!#
enable secret ciscoclass
username rustem privilege 15 secret ciscoclass 
username admin secret ciscoclass       
no ip domain-lookup
ip domain-name cisco.loc
crypto key generate rsa general-key modulus 1024        
ip ssh time-out 10
ip ssh authentication-retries 1
ip ssh version 2     
line con 0
 logging synchronous
 login local
 history size 100
 exec-timeout 10
line vty 0 4
 exec-timeout 10  
 logging synchronous
 login local
 history size 100
 transport input ssh
line vty 5 15 
 exec-timeout 10
 logging synchronous
 login local
 history size 100
 transport input ssh     
snmp-server community cisco ro SNMP_ACL 
snmp-server host 10.100.0.10 version 2c cisco
ip access-list standard SNMP_ACL
 permit 10.100.0.0 0.0.0.255
 deny any 
end  


CONFIGURATION WITH AAA:
```

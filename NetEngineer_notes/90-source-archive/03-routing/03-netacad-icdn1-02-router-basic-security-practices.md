# 02 Router Basic Security Practices

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN1/02 Router Basic Security Practices.txt`  
> Original source context: 03 NETACAD / ICDN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
############################################################
R1(config)# service password-encryption
R1(config)# security password min-length 8 
R1(config)# banner motd #Unauthorized Access is Prohibited!#
R1(config)# login block-for 120 attempts 3 within 60 
R1(config)# line vty 0 4
R1(config-line)# exec-timeout 10
R1(config-line)# exit

______________________________________________________________

###############################################################
Enable SSH
R1(config)# ip domain-name r1.local
R1(config)# crypto key generate rsa general-keys modulus 1024
R1(config)# username rustem secret ciscoclass 
R1(config)# line vty 0 15 
R1(config-line)# login local 
R1(config-line)# transport input ssh 
________________________________________________________________

Display Debug Messages in VTY lines
R1# terminal monitor
or Disable it by:
R1# terminal no monitor
```

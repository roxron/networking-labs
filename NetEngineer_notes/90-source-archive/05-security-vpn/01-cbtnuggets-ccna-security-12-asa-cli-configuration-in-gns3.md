# 12 ASA CLI Configuration in GNS3

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/12 ASA CLI Configuration in GNS3`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
ciscoasa> enable 
ciscoasa# clear config all
ciscoasa# configure terminal
ciscoasa(config)# interface g0/0
ciscoasa(config-if)# secirity-level 0
ciscoasa(config-if)# nameif outside
ciscoasa(config-if)# ip address 192.168.1.250 255.255.255.0
ciscoasa(config-if)# no shutdown
ciscoasa(config-if)# exit
ciscoasa(config-if)# interface g0/1
ciscoasa(config-if)# security-level 100
ciscoasa(config-if)# nameif inside
ciscoasa(config-if)# ip address 10.0.1.2 255.255.255.0
ciscoasa(config-if)# no shutdown
ciscoasa(config-if)# exit
ciscoasa(config)# route outside 0.0.0.0 0.0.0.0  192.168.1.1 
ciscoasa(config)# route inside 10.0.0.0 255.0.0.0 10.0.1.1 
ciscoasa(config)# ping 8.8.8.8
ciscoasa(config)# traceroute 8.8.8.8
ciscoasa(config)# wr
ciscoasa(config)#

Configure SSL encryption:
!
ASA1(config)# ssl encryption 3des-sha1 aes128-sha1 rc4-md5 rc4-sha1 
!
```

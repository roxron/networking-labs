# 01 GRE and DMVPN

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP ROUTE/01 GRE and DMVPN`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
GRE Tunnel:
(config)# interface tunnel 0
R1(config-if)# ip address 192.168.0.1 255.255.255.252
R1(config-if)# tunnel source 54.10.1.1 
R1(config-if)# tunnel destination 100.32.0.2 

R2(config)# interface tunnel 0
R2(config-if)# ip address 192.168.0.2 255.255.255.252
R2(config-if)# tunnel source 100.32.0.2
R2(config-if)# tunnel destination 54.10.1.1

DMVPN:
Hub Configuration:
R1(config)# interface tunnel 0
R1(config-if)# tunnel source S0/0
R1(config-if)# tunnel mode gre multipoint 
R1(Config-if)# tunnel  key 1234
R1(config-if)# ip nhrp network-id 1 
R1(Config-if)# ip nhrp authentication ciscoccnp 
R1(config-if)# ip nhrp map multicasl dynamic
R1(Config-if)# ip address 192.168.1.1 255.255.255.0
R1(config-if)# tunnel path-mtu-discovery (or) ip mtu 1400
R1(config-if)#  ip tcp adjust-mss 1360
R1(config-if)# exit
!
R1(config-if)# no ip next-hop-self eigrp 1
R1(config-if)# no ip split-horizon eigrp 1


Spoke Configuration 

R2(config)# interface tunnel 0
R2(config-if)# tunnel source S0/0
R2(config-if)# tunnel mode gre multipoint 
R2(config-if)# tunnel key 1234
R2(config-if)# ip nhrp network-id 1 
R2(config-if)# ip nhrp authentication ciscpccnp 
R2(config-if)# ip nhrp map multicast dynamic 
R2(config-if)# ip nhrp nhs 192.168.1.1 
R2(config-if)# ip nhrp map 192.168.1.1 54.10.1.1
R2(config-if)# ip nhrp map multicast 54.10.1.1
R2(config-if)# ip address 192.168.1.2 255.255.255.0
R2(config-if)# ip mtu 1400
R2(config-if)# ip tcp adjust-mss 1360
R2(config-if)# 

Verify NHRP:
R2# show ip nhrp 
R2# show dmvpn
R2# show dmvpn detail


Add IPsec to DMVPN:
On the HUB:
R1(config)# crypto isakmp policy 5
R1(config-isakmp)# hash sha
R1(config-isakmp)# authentication pre-share 
R1(config-isakmp)# group 14
R1(config-isakmp)# lifetime 86400
R1(config-isakmp)# encryption aes 256 
R1(config-isakmp)# exit
!
R1(config)# crypto isakmp key cisco123 address 0.0.0.0 
R1(config)# crypto ipsec transform-set MYSET esp-aes 256 esp-sha-hmac
R1(cfg-crypto-trans)# mode transport
R1(cfg-crypto-trans)# exit
!
R1(config)# crypto ipsec profile IPSECPROFILE
R1(ipsec-profile)# set transform-set MYSET
R1(ipsec-profile)# exit
!
R1(config)# interface tunnel 0
R1(config-if)# tunnel protection ipsec profile IPSECPROFILE
R1(config-if)# exit
R1(config)# 

R1# show crypto isakmp sa
R1# show crypto isakmp sa detail 
R1# show crypto ipsec sa peer 50.0.0.1
R1# show dmvpn peer nbma 50.0.0.1 detail 
R1# debug crypto isakmp
```

# 4 Day WAN Implementation

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNA R&S for 31 days/4 Day WAN Implementation`  
> Original source context: 04 CISCOPRESS / CCNA R&S for 31 days. Content is preserved as historical study material; validate commands against the target platform and release.

```text
WAN Technology:
!
PPP Configuration and Verification:
!
R1(config)# interface serial 0/0/1
R1(config-if)# ip address 192.168.2.1 255.255.255.0
R1(config-if)# encapsulation ppp
R1(config-if)# no shutdown
!
R2(config)# interface serial 0/1/1
R2(config-if)# ip address 192.168.2.2 255.255.255.0
R2(config-if)# encapsulation ppp
R2(config-if)# no shutdown
!
!
Configuring CHAP:
!
R1(config)# username R2 password itsasecret
R1(config)# interface serial 0/0/1
R1(config-if)# ppp authentication chap
!
R2(config)# username R1 password itsasecret
R2(config)# interface serial 0/1/1
R2(config-if)# ppp authentication chap
!
!
PPP Troubleshooting:
!
R1# debug ppp packet 
R1# debug ppp authentication 
R1# debug ppp authorization 
!
!
!
Configuring and Verifying PPPoE:
!
R1(config)# interface dialer 5
R1(config-if)# encapsulation ppp
R1(config-if)# ip address negotiated
R1(config-if)# ip mtu 1492
R1(config-if)# dialer pool 5
R1(config-if)# ppp chap hostname customer2222
R1(config-if)# ppp chap password ConnectMe
R1(config-if)# no shutdown
R1(config-if)# interface GigabitEthernet 0/0
R1(config-if)# no ip address
R1(config-if)# pppoe enable
R1(config-if)# pppoe-client dial-pool-number 5
R1(config-if)# no shutdown
R1(config-if)# end
R1# show ip interface brief
!
R1# show ip interface brief 
R1# show pppoe session 
!
!
!
GRE Tunneling:
!
GRE Configuration and Verification:
!
R1(config)# interface Tunnel0
R1(config-if)# tunnel mode gre ip
R1(config-if)# ip address 192.168.2.1 255.255.255.0
R1(config-if)# tunnel source s0/0/0
R1(config-if)# tunnel destination 198.133.219.87
R1(config-if)# router ospf 1
R1(config-router)# network 192.168.2.0 0.0.0.255 area 0
!
R2(config)# interface Tunnel0
R2(config-if)# tunnel mode gre ip
R2(config-if)# ip address 192.168.2.2 255.255.255.0
R2(config-if)# tunnel source s0/0/0
R2(config-if)# tunnel destination 209.165.201.1
R2(config-if)# router ospf 1
R2(config-router)# network 192.168.2.0 0.0.0.255 area 0
!
!
Verifying That the Tunnel Interface Is Up:
!
R1# show ip interface brief | include Tunnel
R1# show interface Tunnel 0
!
!
!
BGP:
!
eBGP Configuration and Verification:
!
BGP Configuration Example:
!
Company-A(config-if)# router bgp 65000
Company-A(config-router)# neighbor 209.165.201.1 remote-as 65001
Company-A(config-router)# network 198.133.219.0 mask 255.255.255.0
!
ISP-1(config-if)# router bgp 65001
ISP-1(config-router)# neighbor 209.165.201.2 remote-as 65000
ISP-1(config-router)# network 0.0.0.0
!
!
BGP Verification Commands:
!
Company-A# show ip route
Company-A# show ip bgp
Company-A# show ip bgp summary
```

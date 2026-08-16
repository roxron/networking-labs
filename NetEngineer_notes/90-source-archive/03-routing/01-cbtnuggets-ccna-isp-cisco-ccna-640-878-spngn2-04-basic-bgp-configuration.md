# 04 Basic BGP Configuration

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA ISP/Cisco CCNA 640-878 SPNGN2/04 Basic BGP Configuration`  
> Original source context: 01 CBTNUGGETS / CCNA ISP / Cisco CCNA 640-878 SPNGN2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring Basic BGP on IOS:
!
P1(config)# router bgp 6509 
P1(config-router)# neighbors 10.1.11.1 remote-as 5505 
P1(config-router)# address-family ipv4 unicast
P1(config-router-af)# network 192.168.0.0 mask 255.255.0.0 
P1(config-router-af)# neighbor 10.1.11.1 activate
!
P1# show ip bgp summary 
P1# show ip bgp 
!
!
Configuring Basic BGP on IOS-XR:
!
XR1(config)# router bgp 5502 
XR1(config-bgp-af)# address-family ipv4 unicasst 
XR1(config-bgp-af)# network 172.16.10.0/24
XR1(config-bgp-af)# exit
XR1(config-bgp)# neighbor 10.1.11.2 
XR1(config-bgp-nbr)# remote-as  6509
XR1(config-bgp-nbr)# address-family ipv4 unicast 
XR1(config-bgp-nbr-af)# commit   
XR1(config-bgp-nbr-af)# exit 
!
XR1(config)# route-policy PASS
XR1(config-rpl)# pass
XR1(config-rpl)# exit
!
XR1(config)# router bgp 5505 
XR1(config-bgp)# neighbor 10.1.11.2 
XR1(config-bgp-nbr)# address-family ipv4 unucasst 
XR1(config-bgp-nbr-af)# route-policy PASS in 
XR1(config-bgp-nbr-af)# route-policy PASS out 
!
XR1#show bgp 
XR1# show ip bgp summary 
XR1#
```

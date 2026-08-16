# 03 IS-IS Configuration

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA ISP/Cisco CCNA 640-878 SPNGN2/03 IS-IS Configuration`  
> Original source context: 01 CBTNUGGETS / CCNA ISP / Cisco CCNA 640-878 SPNGN2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure ISIS on IOS:
!
PE1(config)# router isis 
PE1(config-router)# net 49.0001.0000.0000.1111.00
PE1(config-router)# is-type level-1
PE1(config-router)# exit
PE1(config)# interface G0/1
PE1(config-if)# ip router isis 
PE1(config-if)# isis circuit-type level-1
PE1(config-if)# exit
!
P1(config)# router isis 
P1(config-router)# net 49.0001.0000.0000.2222.00
P1(config-router)# is-type level-1-2
P1(config-router)# exit
P1(config)# interface G0/1
P1(config-if)# ip router isis 
P1(config-if)# isis circuit-type level-1
P1(config-if)# exit
P1(config)# interface G0/2
P1(config-if)# ip router isis 
P1(config-if)# isis circuit-type level-2
P1(config-if)# exit
!
Verify ISIS:
P1# show clns neighbors
P1# show clns neighbors detail 
P1# show clns interface 
P1# show clns 
P1# show ip route 
!
!
!
Configure ISIS on IOS-XR:
!
CXR1(config)# router isis RUSTEM 
CXR1(config-isis)# net 49.0010.0000.0000.CCC1.00
CXR1(config-isis)# is-type level-2
CXR1(config-isis)# interface g0/1/0/1
CXR1(config-isis-if)# address-family ipv4 
CXR1(config-isis-if-af)# exit
CXR1(config-isis-if)#  exit
CXR1(config-isis)# interface g0/1/0/2
CXR1(config-isis-if)# address-family ipv4
CXR1(config-isis-if-af)# exit
CRX1(config-isis-if)# exit
CRX1(config-isis)# exit 
CXR1(config)# commit 
!
!
Verify ISIS:
!
CXR1# show isis adjacency 
CXR1# show route ipv4
!
!
!
Configure ISIS Summarization on L1/L2 router oONLY!
!
P1(config)# router isis 
P1(config-router)# summary-address 192.168.0.0 255.255.0.0 level-2
P1(config-router)# end
!
!
!
Configure ISIS metric
!
P1(config)# interface g0/1
P1(config-if)# isis  metric 25
```

# 29 IPsec Site-to-Site VPN

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/29 IPsec Site-to-Site VPN`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Verify IPsec Site-to-Site VPN
!
Chcek operation of IKE Phase1:
!
R1# show crypto isakmp sa detail 
!
!
Check operation of IKE Phase2:
!
R1# show crypto ipsec sa
!
!
Debug for IKE1:
!
R1# debug crypto isakmp 
!
!
Debug for IKE2:
!
R1# debug crypto ipsec 
!
!
!
Configuration on R1:
!
access-list 100 remark CCP_ACL Category=4
access-list 100 remark IPSec Rule
access-list 100 permit ip 192.168.100.0 0.0.0.255 172.18.0.0 0.0.0.255
!
crypto isakmp policy 2
 encr aes 192
 authentication pre-share
 group 5  
crypto isakmp key cisco123 address 50.0.0.6      
!         
crypto ipsec transform-set MY_TRANSFORM_SET esp-aes 256 esp-sha-hmac 
 mode tunnel
!                  
crypto map SDM_CMAP_1 1 ipsec-isakmp 
 description Tunnel to50.0.0.6
 set peer 50.0.0.6
 set transform-set MY_TRANSFORM_SET 
 match address 100
!            
interface GigabitEthernet0/0
 description Link to ISP int g0/0
 ip address 50.0.0.2 255.255.255.252
 duplex auto
 speed auto
 media-type rj45
 crypto map SDM_CMAP_1
!
!
!
Configuration on R2:
!
access-list 100 remark CCP_ACL Category=4
access-list 100 remark IPSec Rule
access-list 100 permit ip 172.18.0.0 0.0.0.255 192.168.100.0 0.0.0.255
!
crypto isakmp policy 2
 encr aes 192
 authentication pre-share
 group 5
crypto isakmp key cisco123 address 50.0.0.2       
!
crypto ipsec transform-set MY_TRANSFORM_SET esp-aes 256 esp-sha-hmac 
 mode tunnel
!
crypto map SDM_CMAP_1 1 ipsec-isakmp 
 description Tunnel to50.0.0.2
 set peer 50.0.0.2
 set transform-set MY_TRANSFORM_SET 
 match address 100
!
interface GigabitEthernet0/0
 description Link to ISP int g0/1
 ip address 50.0.0.6 255.255.255.252
 duplex auto
 speed auto
 media-type rj45
 crypto map SDM_CMAP_1
```

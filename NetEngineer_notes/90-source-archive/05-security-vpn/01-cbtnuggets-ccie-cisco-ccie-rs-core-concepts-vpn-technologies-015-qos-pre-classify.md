# 015 QoS Pre-Classify

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS Core Concepts - VPN Technologies/015 QoS Pre-Classify`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS Core Concepts - VPN Technologies. Content is preserved as historical study material; validate commands against the target platform and release.

```text
!
R1# show dmvpn detail 
!
QoS outbound policy!
!
R1(config)# class-map CM_TEST 
R1(config-cmap)# match access-group name AL_ICMP
R1(config-cmap)# exit 
R1(config)# ip access-lsit extended AL_ICMP
R1(config-ext-nacl)# permit icmp any any 
R1(config-ext-nacl)# exit 
R1(config)# policy-map PM_TEST 
R1(config-pmap)# class CM_TEST 
R1(config-pmap)# exit 
R1(config)# interface g0/2 
R1(configif)# service-policy output PM_TEST 
!
R1# show policy-map interface g0/2 
!
Enable QoS Pre-classification:
!
R1(config)# interface tun 0 
R1(config-if)# qos pre-classify 
R1(config-if)# exit 
!
```

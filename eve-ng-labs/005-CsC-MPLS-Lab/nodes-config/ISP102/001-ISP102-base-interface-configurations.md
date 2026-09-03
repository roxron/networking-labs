# ISP102 IPv4 base interface configurations

Source: **ISP102 IPv4** in `005-CsC-MPLS-Lab-diagram.drawio`, after the corrections in [README.md](README.md). Apply these as additions to existing shared-router configurations. Existing ISP100 and ISP101 services remain in their own routing contexts.

P1–P6 use VRFs ISP1021 / ISP1022 and Loopback1021 / Loopback1022. ISP102 PE28, PE29, PE30, PE31 and RR11 use GRT. The four CsC PEs use provider VRF ISP102. IPv4 infrastructure is configured here. The additional user-supplied CUSTOMER-B VRFs and service loopbacks on PE29 and PE30 are documented in `006-ISP102-MP-BGP-VPNv4.md`.

RD/RT policy follows the existing lab convention: infrastructure VRFs 102:1 and 102:2; provider VRF router-specific RD 10.100.2.<PE>:102 and common RT 102:102. These are configuration choices, not diagram labels.

## Link inventory

| Network | Endpoint A | Endpoint B | Context / VLAN |
| --- | --- | --- | --- |
| 10.102.1.0/30 | P5 GigabitEthernet0/2.10 10.102.1.1/30 | P6 GigabitEthernet0/2.10 10.102.1.2/30 | ISP1021; direct |
| 10.102.1.4/30 | P1 GigabitEthernet0/2.10 10.102.1.6/30 | P5 GigabitEthernet0/6.10 10.102.1.5/30 | ISP1021; direct |
| 10.102.1.8/30 | P2 GigabitEthernet0/2.10 10.102.1.10/30 | P5 GigabitEthernet0/10.10 10.102.1.9/30 | ISP1021; direct |
| 10.102.1.12/30 | P3 GigabitEthernet0/2.10 10.102.1.14/30 | P6 GigabitEthernet0/6.10 10.102.1.13/30 | ISP1021; direct |
| 10.102.1.16/30 | P4 GigabitEthernet0/2.10 10.102.1.18/30 | P6 GigabitEthernet0/10.10 10.102.1.17/30 | ISP1021; direct |
| 10.102.11.0/30 | ISP102-PE28 GigabitEthernet0/0.328 10.102.11.2/30 | P1 GigabitEthernet0/5.328 10.102.11.1/30 | ISP1021; VLAN 328 SW27 |
| 10.102.49.8/30 | ISP102-PE28 GigabitEthernet0/2 10.102.49.9/30 | CsC-PE15 GigabitEthernet0/14 10.102.49.10/30 | ISP102; direct |
| 10.102.49.12/30 | CsC-PE16 GigabitEthernet0/14 10.102.49.14/30 | ISP102-PE28 GigabitEthernet0/3 10.102.49.13/30 | ISP102; direct |
| 10.102.12.0/30 | ISP102-PE28 GigabitEthernet0/1.328 10.102.12.2/30 | P2 GigabitEthernet0/5.328 10.102.12.1/30 | ISP1021; VLAN 328 SW28 |
| 10.102.14.0/30 | ISP102-PE29 GigabitEthernet0/1.329 10.102.14.2/30 | P4 GigabitEthernet0/5.329 10.102.14.1/30 | ISP1021; VLAN 329 SW210 |
| 10.102.13.0/30 | ISP102-PE29 GigabitEthernet0/0.329 10.102.13.2/30 | P3 GigabitEthernet0/5.329 10.102.13.1/30 | ISP1021; VLAN 329 SW211 |
| 10.102.21.0/30 | ISP102-PE31 GigabitEthernet0/0.331 10.102.21.2/30 | P1 GigabitEthernet0/6.331 10.102.21.1/30 | ISP1022; VLAN 331 SW29 |
| 10.102.23.0/30 | ISP102-PE31 GigabitEthernet0/1.331 10.102.23.2/30 | P3 GigabitEthernet0/6.331 10.102.23.1/30 | ISP1022; VLAN 331 SW212 |
| 10.102.22.0/30 | ISP102-PE30 GigabitEthernet0/1.330 10.102.22.2/30 | P2 GigabitEthernet0/6.330 10.102.22.1/30 | ISP1022; VLAN 330 SW214 |
| 10.102.24.0/30 | P4 GigabitEthernet0/6.330 10.102.24.1/30 | ISP102-PE30 GigabitEthernet0/0.330 10.102.24.2/30 | ISP1022; VLAN 330 SW213 |
| 10.102.49.0/30 | CsC-PE19 GigabitEthernet0/14 10.102.49.2/30 | ISP102-PE31 GigabitEthernet0/2 10.102.49.1/30 | ISP102; direct |
| 10.102.49.4/30 | CsC-PE20 GigabitEthernet0/14 10.102.49.6/30 | ISP102-PE31 GigabitEthernet0/3 10.102.49.5/30 | ISP102; direct |
| 10.102.2.0/30 | P5 GigabitEthernet0/2.20 10.102.2.1/30 | P6 GigabitEthernet0/2.20 10.102.2.2/30 | ISP1022; direct |
| 10.102.2.12/30 | P3 GigabitEthernet0/2.20 10.102.2.14/30 | P6 GigabitEthernet0/6.20 10.102.2.13/30 | ISP1022; direct |
| 10.102.2.16/30 | P4 GigabitEthernet0/2.20 10.102.2.18/30 | P6 GigabitEthernet0/10.20 10.102.2.17/30 | ISP1022; direct |
| 10.102.2.8/30 | P2 GigabitEthernet0/2.20 10.102.2.10/30 | P5 GigabitEthernet0/10.20 10.102.2.9/30 | ISP1022; direct |
| 10.102.2.4/30 | P1 GigabitEthernet0/2.20 10.102.2.6/30 | P5 GigabitEthernet0/6.20 10.102.2.5/30 | ISP1022; direct |
| 10.102.11.4/30 | ISP102-RR11 GigabitEthernet0/0.311 10.102.11.6/30 | P1 GigabitEthernet0/7.311 10.102.11.5/30 | ISP1021; VLAN 311 SW29 |
| 10.102.13.4/30 | ISP102-RR11 GigabitEthernet0/1.311 10.102.13.6/30 | P3 GigabitEthernet0/6.311 10.102.13.5/30 | ISP1021; VLAN 311 SW212 |

## P1

```ios
hostname P1
!
vrf definition ISP1021
 rd 102:1
 route-target export 102:1
 route-target import 102:1
 !
 address-family ipv4
 exit-address-family
!
vrf definition ISP1022
 rd 102:2
 route-target export 102:2
 route-target import 102:2
 !
 address-family ipv4
 exit-address-family
!
interface Loopback1021
 description ISP102 Site1 RouterID
 vrf forwarding ISP1021
 ip address 10.102.0.1 255.255.255.255
 no shutdown
!
interface Loopback1022
 description ISP102 Site2 RouterID
 vrf forwarding ISP1022
 ip address 10.102.5.1 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/2
 no shutdown
!
interface GigabitEthernet0/5
 no shutdown
!
interface GigabitEthernet0/6
 no shutdown
!
interface GigabitEthernet0/7
 no shutdown
!
interface GigabitEthernet0/2.10
 description Link to P5 GigabitEthernet0/6.10 
 encapsulation dot1Q 10
 vrf forwarding ISP1021
 ip address 10.102.1.6 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/5.328
 description Link to ISP102-PE28 GigabitEthernet0/0.328 VLAN 328 SW27
 encapsulation dot1Q 328
 vrf forwarding ISP1021
 ip address 10.102.11.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/6.331
 description Link to ISP102-PE31 GigabitEthernet0/0.331 VLAN 331 SW29
 encapsulation dot1Q 331
 vrf forwarding ISP1022
 ip address 10.102.21.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2.20
 description Link to P5 GigabitEthernet0/6.20 
 encapsulation dot1Q 20
 vrf forwarding ISP1022
 ip address 10.102.2.6 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/7.311
 description Link to ISP102-RR11 GigabitEthernet0/0.311 VLAN 311 SW29
 encapsulation dot1Q 311
 vrf forwarding ISP1021
 ip address 10.102.11.5 255.255.255.252
 no shutdown
!
```

## P2

```ios
hostname P2
!
vrf definition ISP1021
 rd 102:1
 route-target export 102:1
 route-target import 102:1
 !
 address-family ipv4
 exit-address-family
!
vrf definition ISP1022
 rd 102:2
 route-target export 102:2
 route-target import 102:2
 !
 address-family ipv4
 exit-address-family
!
interface Loopback1021
 description ISP102 Site1 RouterID
 vrf forwarding ISP1021
 ip address 10.102.0.2 255.255.255.255
 no shutdown
!
interface Loopback1022
 description ISP102 Site2 RouterID
 vrf forwarding ISP1022
 ip address 10.102.5.2 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/2
 no shutdown
!
interface GigabitEthernet0/5
 no shutdown
!
interface GigabitEthernet0/6
 no shutdown
!
interface GigabitEthernet0/2.10
 description Link to P5 GigabitEthernet0/10.10 
 encapsulation dot1Q 10
 vrf forwarding ISP1021
 ip address 10.102.1.10 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/5.328
 description Link to ISP102-PE28 GigabitEthernet0/1.328 VLAN 328 SW28
 encapsulation dot1Q 328
 vrf forwarding ISP1021
 ip address 10.102.12.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/6.330
 description Link to ISP102-PE30 GigabitEthernet0/1.330 VLAN 330 SW214
 encapsulation dot1Q 330
 vrf forwarding ISP1022
 ip address 10.102.22.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2.20
 description Link to P5 GigabitEthernet0/10.20 
 encapsulation dot1Q 20
 vrf forwarding ISP1022
 ip address 10.102.2.10 255.255.255.252
 no shutdown
!
```

## P3

```ios
hostname P3
!
vrf definition ISP1021
 rd 102:1
 route-target export 102:1
 route-target import 102:1
 !
 address-family ipv4
 exit-address-family
!
vrf definition ISP1022
 rd 102:2
 route-target export 102:2
 route-target import 102:2
 !
 address-family ipv4
 exit-address-family
!
interface Loopback1021
 description ISP102 Site1 RouterID
 vrf forwarding ISP1021
 ip address 10.102.0.3 255.255.255.255
 no shutdown
!
interface Loopback1022
 description ISP102 Site2 RouterID
 vrf forwarding ISP1022
 ip address 10.102.5.3 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/2
 no shutdown
!
interface GigabitEthernet0/5
 no shutdown
!
interface GigabitEthernet0/6
 no shutdown
!
interface GigabitEthernet0/2.10
 description Link to P6 GigabitEthernet0/6.10 
 encapsulation dot1Q 10
 vrf forwarding ISP1021
 ip address 10.102.1.14 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/5.329
 description Link to ISP102-PE29 GigabitEthernet0/0.329 VLAN 329 SW211
 encapsulation dot1Q 329
 vrf forwarding ISP1021
 ip address 10.102.13.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/6.331
 description Link to ISP102-PE31 GigabitEthernet0/1.331 VLAN 331 SW212
 encapsulation dot1Q 331
 vrf forwarding ISP1022
 ip address 10.102.23.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2.20
 description Link to P6 GigabitEthernet0/6.20 
 encapsulation dot1Q 20
 vrf forwarding ISP1022
 ip address 10.102.2.14 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/6.311
 description Link to ISP102-RR11 GigabitEthernet0/1.311 VLAN 311 SW212
 encapsulation dot1Q 311
 vrf forwarding ISP1021
 ip address 10.102.13.5 255.255.255.252
 no shutdown
!
```

## P4

```ios
hostname P4
!
vrf definition ISP1021
 rd 102:1
 route-target export 102:1
 route-target import 102:1
 !
 address-family ipv4
 exit-address-family
!
vrf definition ISP1022
 rd 102:2
 route-target export 102:2
 route-target import 102:2
 !
 address-family ipv4
 exit-address-family
!
interface Loopback1021
 description ISP102 Site1 RouterID
 vrf forwarding ISP1021
 ip address 10.102.0.4 255.255.255.255
 no shutdown
!
interface Loopback1022
 description ISP102 Site2 RouterID
 vrf forwarding ISP1022
 ip address 10.102.5.4 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/2
 no shutdown
!
interface GigabitEthernet0/5
 no shutdown
!
interface GigabitEthernet0/6
 no shutdown
!
interface GigabitEthernet0/2.10
 description Link to P6 GigabitEthernet0/10.10 
 encapsulation dot1Q 10
 vrf forwarding ISP1021
 ip address 10.102.1.18 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/5.329
 description Link to ISP102-PE29 GigabitEthernet0/1.329 VLAN 329 SW210
 encapsulation dot1Q 329
 vrf forwarding ISP1021
 ip address 10.102.14.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/6.330
 description Link to ISP102-PE30 GigabitEthernet0/0.330 VLAN 330 SW213
 encapsulation dot1Q 330
 vrf forwarding ISP1022
 ip address 10.102.24.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2.20
 description Link to P6 GigabitEthernet0/10.20 
 encapsulation dot1Q 20
 vrf forwarding ISP1022
 ip address 10.102.2.18 255.255.255.252
 no shutdown
!
```

## P5

```ios
hostname P5
!
vrf definition ISP1021
 rd 102:1
 route-target export 102:1
 route-target import 102:1
 !
 address-family ipv4
 exit-address-family
!
vrf definition ISP1022
 rd 102:2
 route-target export 102:2
 route-target import 102:2
 !
 address-family ipv4
 exit-address-family
!
interface Loopback1021
 description ISP102 Site1 RouterID
 vrf forwarding ISP1021
 ip address 10.102.0.5 255.255.255.255
 no shutdown
!
interface Loopback1022
 description ISP102 Site2 RouterID
 vrf forwarding ISP1022
 ip address 10.102.5.5 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/10
 no shutdown
!
interface GigabitEthernet0/2
 no shutdown
!
interface GigabitEthernet0/6
 no shutdown
!
interface GigabitEthernet0/2.10
 description Link to P6 GigabitEthernet0/2.10 
 encapsulation dot1Q 10
 vrf forwarding ISP1021
 ip address 10.102.1.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/6.10
 description Link to P1 GigabitEthernet0/2.10 
 encapsulation dot1Q 10
 vrf forwarding ISP1021
 ip address 10.102.1.5 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/10.10
 description Link to P2 GigabitEthernet0/2.10 
 encapsulation dot1Q 10
 vrf forwarding ISP1021
 ip address 10.102.1.9 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2.20
 description Link to P6 GigabitEthernet0/2.20 
 encapsulation dot1Q 20
 vrf forwarding ISP1022
 ip address 10.102.2.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/10.20
 description Link to P2 GigabitEthernet0/2.20 
 encapsulation dot1Q 20
 vrf forwarding ISP1022
 ip address 10.102.2.9 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/6.20
 description Link to P1 GigabitEthernet0/2.20 
 encapsulation dot1Q 20
 vrf forwarding ISP1022
 ip address 10.102.2.5 255.255.255.252
 no shutdown
!
```

## P6

```ios
hostname P6
!
vrf definition ISP1021
 rd 102:1
 route-target export 102:1
 route-target import 102:1
 !
 address-family ipv4
 exit-address-family
!
vrf definition ISP1022
 rd 102:2
 route-target export 102:2
 route-target import 102:2
 !
 address-family ipv4
 exit-address-family
!
interface Loopback1021
 description ISP102 Site1 RouterID
 vrf forwarding ISP1021
 ip address 10.102.0.6 255.255.255.255
 no shutdown
!
interface Loopback1022
 description ISP102 Site2 RouterID
 vrf forwarding ISP1022
 ip address 10.102.5.6 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/10
 no shutdown
!
interface GigabitEthernet0/2
 no shutdown
!
interface GigabitEthernet0/6
 no shutdown
!
interface GigabitEthernet0/2.10
 description Link to P5 GigabitEthernet0/2.10 
 encapsulation dot1Q 10
 vrf forwarding ISP1021
 ip address 10.102.1.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/6.10
 description Link to P3 GigabitEthernet0/2.10 
 encapsulation dot1Q 10
 vrf forwarding ISP1021
 ip address 10.102.1.13 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/10.10
 description Link to P4 GigabitEthernet0/2.10 
 encapsulation dot1Q 10
 vrf forwarding ISP1021
 ip address 10.102.1.17 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2.20
 description Link to P5 GigabitEthernet0/2.20 
 encapsulation dot1Q 20
 vrf forwarding ISP1022
 ip address 10.102.2.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/6.20
 description Link to P3 GigabitEthernet0/2.20 
 encapsulation dot1Q 20
 vrf forwarding ISP1022
 ip address 10.102.2.13 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/10.20
 description Link to P4 GigabitEthernet0/2.20 
 encapsulation dot1Q 20
 vrf forwarding ISP1022
 ip address 10.102.2.17 255.255.255.252
 no shutdown
!
```

## ISP102-PE28

```ios
hostname ISP102-PE28
!
interface Loopback0
 description ISP102 Site1 RouterID
 ip address 10.102.3.28 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/0
 no shutdown
!
interface GigabitEthernet0/1
 no shutdown
!
interface GigabitEthernet0/0.328
 description Link to P1 GigabitEthernet0/5.328 VLAN 328 SW27
 encapsulation dot1Q 328
 ip address 10.102.11.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2
 description Link to CsC-PE15 GigabitEthernet0/14 
 ip address 10.102.49.9 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/3
 description Link to CsC-PE16 GigabitEthernet0/14 
 ip address 10.102.49.13 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1.328
 description Link to P2 GigabitEthernet0/5.328 VLAN 328 SW28
 encapsulation dot1Q 328
 ip address 10.102.12.2 255.255.255.252
 no shutdown
!
```

## ISP102-PE29

```ios
hostname ISP102-PE29
!
interface Loopback0
 description ISP102 Site1 RouterID
 ip address 10.102.3.29 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/0
 no shutdown
!
interface GigabitEthernet0/1
 no shutdown
!
interface GigabitEthernet0/1.329
 description Link to P4 GigabitEthernet0/5.329 VLAN 329 SW210
 encapsulation dot1Q 329
 ip address 10.102.14.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/0.329
 description Link to P3 GigabitEthernet0/5.329 VLAN 329 SW211
 encapsulation dot1Q 329
 ip address 10.102.13.2 255.255.255.252
 no shutdown
!
```

## ISP102-PE30

```ios
hostname ISP102-PE30
!
interface Loopback0
 description ISP102 Site2 RouterID
 ip address 10.102.3.30 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/0
 no shutdown
!
interface GigabitEthernet0/1
 no shutdown
!
interface GigabitEthernet0/1.330
 description Link to P2 GigabitEthernet0/6.330 VLAN 330 SW214
 encapsulation dot1Q 330
 ip address 10.102.22.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/0.330
 description Link to P4 GigabitEthernet0/6.330 VLAN 330 SW213
 encapsulation dot1Q 330
 ip address 10.102.24.2 255.255.255.252
 no shutdown
!
```

## ISP102-PE31

```ios
hostname ISP102-PE31
!
interface Loopback0
 description ISP102 Site2 RouterID
 ip address 10.102.3.31 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/0
 no shutdown
!
interface GigabitEthernet0/1
 no shutdown
!
interface GigabitEthernet0/0.331
 description Link to P1 GigabitEthernet0/6.331 VLAN 331 SW29
 encapsulation dot1Q 331
 ip address 10.102.21.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1.331
 description Link to P3 GigabitEthernet0/6.331 VLAN 331 SW212
 encapsulation dot1Q 331
 ip address 10.102.23.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2
 description Link to CsC-PE19 GigabitEthernet0/14 
 ip address 10.102.49.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/3
 description Link to CsC-PE20 GigabitEthernet0/14 
 ip address 10.102.49.5 255.255.255.252
 no shutdown
!
```

## ISP102-RR11

```ios
hostname ISP102-RR11
!
interface Loopback0
 description ISP102 Site1 RouterID
 ip address 10.102.4.11 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/0
 no shutdown
!
interface GigabitEthernet0/1
 no shutdown
!
interface GigabitEthernet0/0.311
 description Link to P1 GigabitEthernet0/7.311 VLAN 311 SW29
 encapsulation dot1Q 311
 ip address 10.102.11.6 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1.311
 description Link to P3 GigabitEthernet0/6.311 VLAN 311 SW212
 encapsulation dot1Q 311
 ip address 10.102.13.6 255.255.255.252
 no shutdown
!
```

## CsC-PE15

```ios
hostname CsC-PE15
!
vrf definition ISP102
 rd 10.100.2.15:102
 route-target export 102:102
 route-target import 102:102
 !
 address-family ipv4
  route-target export 102:102
  route-target import 102:102
 exit-address-family
 !
 address-family ipv6
  route-target export 102:102
  route-target import 102:102
 exit-address-family
!
interface Loopback1020
 description ISP102 RouterID
 vrf forwarding ISP102
 ip address 10.102.50.15 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/14
 description Link to ISP102-PE28 GigabitEthernet0/2 
 vrf forwarding ISP102
 ip address 10.102.49.10 255.255.255.252
 no shutdown
!
```

## CsC-PE16

```ios
hostname CsC-PE16
!
vrf definition ISP102
 rd 10.100.2.16:102
 route-target export 102:102
 route-target import 102:102
 !
 address-family ipv4
  route-target export 102:102
  route-target import 102:102
 exit-address-family
 !
 address-family ipv6
  route-target export 102:102
  route-target import 102:102
 exit-address-family
!
interface Loopback1020
 description ISP102 RouterID
 vrf forwarding ISP102
 ip address 10.102.50.16 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/14
 description Link to ISP102-PE28 GigabitEthernet0/3 
 vrf forwarding ISP102
 ip address 10.102.49.14 255.255.255.252
 no shutdown
!
```

## CsC-PE19

```ios
hostname CsC-PE19
!
vrf definition ISP102
 rd 10.100.2.19:102
 route-target export 102:102
 route-target import 102:102
 !
 address-family ipv4
  route-target export 102:102
  route-target import 102:102
 exit-address-family
 !
 address-family ipv6
  route-target export 102:102
  route-target import 102:102
 exit-address-family
!
interface Loopback1020
 description ISP102 RouterID
 vrf forwarding ISP102
 ip address 10.102.50.19 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/14
 description Link to ISP102-PE31 GigabitEthernet0/2 
 vrf forwarding ISP102
 ip address 10.102.49.2 255.255.255.252
 no shutdown
!
```

## CsC-PE20

```ios
hostname CsC-PE20
!
vrf definition ISP102
 rd 10.100.2.20:102
 route-target export 102:102
 route-target import 102:102
 !
 address-family ipv4
  route-target export 102:102
  route-target import 102:102
 exit-address-family
 !
 address-family ipv6
  route-target export 102:102
  route-target import 102:102
 exit-address-family
!
interface Loopback1020
 description ISP102 RouterID
 vrf forwarding ISP102
 ip address 10.102.50.20 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/14
 description Link to ISP102-PE31 GigabitEthernet0/3 
 vrf forwarding ISP102
 ip address 10.102.49.6 255.255.255.252
 no shutdown
!
```

## Verification

```ios
show ip interface brief
show vrf
show ip route vrf ISP1021 connected
show ip route vrf ISP1022 connected
```

On ISP102 PE/RR routers, use `show ip route connected`; on CsC PEs use `show ip route vrf ISP102 connected`. Verify every /30 peer is reachable using its local interface address as source.

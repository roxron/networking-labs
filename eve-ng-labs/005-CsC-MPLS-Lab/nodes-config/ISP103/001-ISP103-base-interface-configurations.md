# ISP103 IPv4 base interface configurations

Source: **ISP103 IPv4** in `005-CsC-MPLS-Lab-diagram.drawio`, using the assignments summarized in [README.md](README.md). Apply these as additions to existing shared-router configurations. Existing ISP100, ISP101 and ISP102 services remain in their own routing contexts.

P1–P6 use VRFs ISP1031 / ISP1032 and Loopback1031 / Loopback1032. ISP103 PE33, PE34, PE36, PE35 and RR37 use GRT. The four CsC PEs use provider VRF ISP103. IPv4 infrastructure is configured here. Customer-service configuration, when included, is documented separately at the bottom of `006-ISP103-MP-BGP-VPNv4.md`.

RD/RT policy follows the existing lab convention: infrastructure VRFs 103:1 and 103:2; provider VRF router-specific RD 10.100.2.<PE>:103 and common RT 103:103. These are configuration choices, not diagram labels.

## Link inventory

| Network | Endpoint A | Endpoint B | Context / VLAN |
| --- | --- | --- | --- |
| 10.103.1.0/30 | P5 GigabitEthernet0/3.10 10.103.1.1/30 | P6 GigabitEthernet0/3.10 10.103.1.2/30 | ISP1031; direct |
| 10.103.1.4/30 | P1 GigabitEthernet0/3.10 10.103.1.6/30 | P5 GigabitEthernet0/7.10 10.103.1.5/30 | ISP1031; direct |
| 10.103.1.8/30 | P2 GigabitEthernet0/3.10 10.103.1.10/30 | P5 GigabitEthernet0/11.10 10.103.1.9/30 | ISP1031; direct |
| 10.103.1.12/30 | P3 GigabitEthernet0/3.10 10.103.1.14/30 | P6 GigabitEthernet0/7.10 10.103.1.13/30 | ISP1031; direct |
| 10.103.1.16/30 | P4 GigabitEthernet0/3.10 10.103.1.18/30 | P6 GigabitEthernet0/11.10 10.103.1.17/30 | ISP1031; direct |
| 10.103.11.0/30 | ISP103-PE33 GigabitEthernet0/0.433 10.103.11.2/30 | P1 GigabitEthernet0/5.433 10.103.11.1/30 | ISP1031; VLAN 433 SW27 |
| 10.103.49.8/30 | ISP103-PE33 GigabitEthernet0/2 10.103.49.9/30 | CsC-PE15 GigabitEthernet0/13 10.103.49.10/30 | ISP103; direct |
| 10.103.49.12/30 | CsC-PE16 GigabitEthernet0/13 10.103.49.14/30 | ISP103-PE33 GigabitEthernet0/3 10.103.49.13/30 | ISP103; direct |
| 10.103.12.0/30 | ISP103-PE33 GigabitEthernet0/1.433 10.103.12.2/30 | P2 GigabitEthernet0/5.433 10.103.12.1/30 | ISP1031; VLAN 433 SW28 |
| 10.103.14.0/30 | ISP103-PE34 GigabitEthernet0/1.434 10.103.14.2/30 | P4 GigabitEthernet0/5.434 10.103.14.1/30 | ISP1031; VLAN 434 SW210 |
| 10.103.13.0/30 | ISP103-PE34 GigabitEthernet0/0.434 10.103.13.2/30 | P3 GigabitEthernet0/5.434 10.103.13.1/30 | ISP1031; VLAN 434 SW211 |
| 10.103.21.0/30 | ISP103-PE35 GigabitEthernet0/0.435 10.103.21.2/30 | P1 GigabitEthernet0/6.435 10.103.21.1/30 | ISP1032; VLAN 435 SW29 |
| 10.103.23.0/30 | ISP103-PE35 GigabitEthernet0/1.435 10.103.23.2/30 | P3 GigabitEthernet0/6.435 10.103.23.1/30 | ISP1032; VLAN 435 SW212 |
| 10.103.22.0/30 | ISP103-PE36 GigabitEthernet0/1.436 10.103.22.2/30 | P2 GigabitEthernet0/6.436 10.103.22.1/30 | ISP1032; VLAN 436 SW214 |
| 10.103.24.0/30 | P4 GigabitEthernet0/6.436 10.103.24.1/30 | ISP103-PE36 GigabitEthernet0/0.436 10.103.24.2/30 | ISP1032; VLAN 436 SW213 |
| 10.103.49.0/30 | CsC-PE19 GigabitEthernet0/13 10.103.49.2/30 | ISP103-PE35 GigabitEthernet0/2 10.103.49.1/30 | ISP103; direct |
| 10.103.49.4/30 | CsC-PE20 GigabitEthernet0/13 10.103.49.6/30 | ISP103-PE35 GigabitEthernet0/3 10.103.49.5/30 | ISP103; direct |
| 10.103.2.0/30 | P5 GigabitEthernet0/3.20 10.103.2.1/30 | P6 GigabitEthernet0/3.20 10.103.2.2/30 | ISP1032; direct |
| 10.103.2.12/30 | P3 GigabitEthernet0/3.20 10.103.2.14/30 | P6 GigabitEthernet0/7.20 10.103.2.13/30 | ISP1032; direct |
| 10.103.2.16/30 | P4 GigabitEthernet0/3.20 10.103.2.18/30 | P6 GigabitEthernet0/11.20 10.103.2.17/30 | ISP1032; direct |
| 10.103.2.8/30 | P2 GigabitEthernet0/3.20 10.103.2.10/30 | P5 GigabitEthernet0/11.20 10.103.2.9/30 | ISP1032; direct |
| 10.103.2.4/30 | P1 GigabitEthernet0/3.20 10.103.2.6/30 | P5 GigabitEthernet0/7.20 10.103.2.5/30 | ISP1032; direct |
| 10.103.11.4/30 | ISP103-RR37 GigabitEthernet0/0.437 10.103.11.6/30 | P1 GigabitEthernet0/6.437 10.103.11.5/30 | ISP1031; VLAN 437 SW29 |
| 10.103.13.4/30 | ISP103-RR37 GigabitEthernet0/1.437 10.103.13.6/30 | P3 GigabitEthernet0/6.437 10.103.13.5/30 | ISP1031; VLAN 437 SW212 |

## P1

```ios
hostname P1
!
vrf definition ISP1031
 rd 103:1
 route-target export 103:1
 route-target import 103:1
 !
 address-family ipv4
 exit-address-family
!
vrf definition ISP1032
 rd 103:2
 route-target export 103:2
 route-target import 103:2
 !
 address-family ipv4
 exit-address-family
!
interface Loopback1031
 description ISP103 Site1 RouterID
 vrf forwarding ISP1031
 ip address 10.103.0.1 255.255.255.255
 no shutdown
!
interface Loopback1032
 description ISP103 Site2 RouterID
 vrf forwarding ISP1032
 ip address 10.103.5.1 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/3
 no shutdown
!
interface GigabitEthernet0/5
 no shutdown
!
interface GigabitEthernet0/6
 no shutdown
!
interface GigabitEthernet0/3.10
 description Link to P5 GigabitEthernet0/7.10
 encapsulation dot1Q 10
 vrf forwarding ISP1031
 ip address 10.103.1.6 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/5.433
 description Link to ISP103-PE33 GigabitEthernet0/0.433 VLAN 433 SW27
 encapsulation dot1Q 433
 vrf forwarding ISP1031
 ip address 10.103.11.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/6.435
 description Link to ISP103-PE35 GigabitEthernet0/0.435 VLAN 435 SW29
 encapsulation dot1Q 435
 vrf forwarding ISP1032
 ip address 10.103.21.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/3.20
 description Link to P5 GigabitEthernet0/7.20
 encapsulation dot1Q 20
 vrf forwarding ISP1032
 ip address 10.103.2.6 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/6.437
 description Link to ISP103-RR37 GigabitEthernet0/0.437 VLAN 437 SW29
 encapsulation dot1Q 437
 vrf forwarding ISP1031
 ip address 10.103.11.5 255.255.255.252
 no shutdown
!
```

## P2

```ios
hostname P2
!
vrf definition ISP1031
 rd 103:1
 route-target export 103:1
 route-target import 103:1
 !
 address-family ipv4
 exit-address-family
!
vrf definition ISP1032
 rd 103:2
 route-target export 103:2
 route-target import 103:2
 !
 address-family ipv4
 exit-address-family
!
interface Loopback1031
 description ISP103 Site1 RouterID
 vrf forwarding ISP1031
 ip address 10.103.0.2 255.255.255.255
 no shutdown
!
interface Loopback1032
 description ISP103 Site2 RouterID
 vrf forwarding ISP1032
 ip address 10.103.5.2 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/3
 no shutdown
!
interface GigabitEthernet0/5
 no shutdown
!
interface GigabitEthernet0/6
 no shutdown
!
interface GigabitEthernet0/3.10
 description Link to P5 GigabitEthernet0/11.10
 encapsulation dot1Q 10
 vrf forwarding ISP1031
 ip address 10.103.1.10 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/5.433
 description Link to ISP103-PE33 GigabitEthernet0/1.433 VLAN 433 SW28
 encapsulation dot1Q 433
 vrf forwarding ISP1031
 ip address 10.103.12.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/6.436
 description Link to ISP103-PE36 GigabitEthernet0/1.436 VLAN 436 SW214
 encapsulation dot1Q 436
 vrf forwarding ISP1032
 ip address 10.103.22.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/3.20
 description Link to P5 GigabitEthernet0/11.20
 encapsulation dot1Q 20
 vrf forwarding ISP1032
 ip address 10.103.2.10 255.255.255.252
 no shutdown
!
```

## P3

```ios
hostname P3
!
vrf definition ISP1031
 rd 103:1
 route-target export 103:1
 route-target import 103:1
 !
 address-family ipv4
 exit-address-family
!
vrf definition ISP1032
 rd 103:2
 route-target export 103:2
 route-target import 103:2
 !
 address-family ipv4
 exit-address-family
!
interface Loopback1031
 description ISP103 Site1 RouterID
 vrf forwarding ISP1031
 ip address 10.103.0.3 255.255.255.255
 no shutdown
!
interface Loopback1032
 description ISP103 Site2 RouterID
 vrf forwarding ISP1032
 ip address 10.103.5.3 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/3
 no shutdown
!
interface GigabitEthernet0/5
 no shutdown
!
interface GigabitEthernet0/6
 no shutdown
!
interface GigabitEthernet0/3.10
 description Link to P6 GigabitEthernet0/7.10
 encapsulation dot1Q 10
 vrf forwarding ISP1031
 ip address 10.103.1.14 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/5.434
 description Link to ISP103-PE34 GigabitEthernet0/0.434 VLAN 434 SW211
 encapsulation dot1Q 434
 vrf forwarding ISP1031
 ip address 10.103.13.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/6.435
 description Link to ISP103-PE35 GigabitEthernet0/1.435 VLAN 435 SW212
 encapsulation dot1Q 435
 vrf forwarding ISP1032
 ip address 10.103.23.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/3.20
 description Link to P6 GigabitEthernet0/7.20
 encapsulation dot1Q 20
 vrf forwarding ISP1032
 ip address 10.103.2.14 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/6.437
 description Link to ISP103-RR37 GigabitEthernet0/1.437 VLAN 437 SW212
 encapsulation dot1Q 437
 vrf forwarding ISP1031
 ip address 10.103.13.5 255.255.255.252
 no shutdown
!
```

## P4

```ios
hostname P4
!
vrf definition ISP1031
 rd 103:1
 route-target export 103:1
 route-target import 103:1
 !
 address-family ipv4
 exit-address-family
!
vrf definition ISP1032
 rd 103:2
 route-target export 103:2
 route-target import 103:2
 !
 address-family ipv4
 exit-address-family
!
interface Loopback1031
 description ISP103 Site1 RouterID
 vrf forwarding ISP1031
 ip address 10.103.0.4 255.255.255.255
 no shutdown
!
interface Loopback1032
 description ISP103 Site2 RouterID
 vrf forwarding ISP1032
 ip address 10.103.5.4 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/3
 no shutdown
!
interface GigabitEthernet0/5
 no shutdown
!
interface GigabitEthernet0/6
 no shutdown
!
interface GigabitEthernet0/3.10
 description Link to P6 GigabitEthernet0/11.10
 encapsulation dot1Q 10
 vrf forwarding ISP1031
 ip address 10.103.1.18 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/5.434
 description Link to ISP103-PE34 GigabitEthernet0/1.434 VLAN 434 SW210
 encapsulation dot1Q 434
 vrf forwarding ISP1031
 ip address 10.103.14.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/6.436
 description Link to ISP103-PE36 GigabitEthernet0/0.436 VLAN 436 SW213
 encapsulation dot1Q 436
 vrf forwarding ISP1032
 ip address 10.103.24.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/3.20
 description Link to P6 GigabitEthernet0/11.20
 encapsulation dot1Q 20
 vrf forwarding ISP1032
 ip address 10.103.2.18 255.255.255.252
 no shutdown
!
```

## P5

```ios
hostname P5
!
vrf definition ISP1031
 rd 103:1
 route-target export 103:1
 route-target import 103:1
 !
 address-family ipv4
 exit-address-family
!
vrf definition ISP1032
 rd 103:2
 route-target export 103:2
 route-target import 103:2
 !
 address-family ipv4
 exit-address-family
!
interface Loopback1031
 description ISP103 Site1 RouterID
 vrf forwarding ISP1031
 ip address 10.103.0.5 255.255.255.255
 no shutdown
!
interface Loopback1032
 description ISP103 Site2 RouterID
 vrf forwarding ISP1032
 ip address 10.103.5.5 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/11
 no shutdown
!
interface GigabitEthernet0/3
 no shutdown
!
interface GigabitEthernet0/7
 no shutdown
!
interface GigabitEthernet0/3.10
 description Link to P6 GigabitEthernet0/3.10
 encapsulation dot1Q 10
 vrf forwarding ISP1031
 ip address 10.103.1.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/7.10
 description Link to P1 GigabitEthernet0/3.10
 encapsulation dot1Q 10
 vrf forwarding ISP1031
 ip address 10.103.1.5 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/11.10
 description Link to P2 GigabitEthernet0/3.10
 encapsulation dot1Q 10
 vrf forwarding ISP1031
 ip address 10.103.1.9 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/3.20
 description Link to P6 GigabitEthernet0/3.20
 encapsulation dot1Q 20
 vrf forwarding ISP1032
 ip address 10.103.2.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/11.20
 description Link to P2 GigabitEthernet0/3.20
 encapsulation dot1Q 20
 vrf forwarding ISP1032
 ip address 10.103.2.9 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/7.20
 description Link to P1 GigabitEthernet0/3.20
 encapsulation dot1Q 20
 vrf forwarding ISP1032
 ip address 10.103.2.5 255.255.255.252
 no shutdown
!
```

## P6

```ios
hostname P6
!
vrf definition ISP1031
 rd 103:1
 route-target export 103:1
 route-target import 103:1
 !
 address-family ipv4
 exit-address-family
!
vrf definition ISP1032
 rd 103:2
 route-target export 103:2
 route-target import 103:2
 !
 address-family ipv4
 exit-address-family
!
interface Loopback1031
 description ISP103 Site1 RouterID
 vrf forwarding ISP1031
 ip address 10.103.0.6 255.255.255.255
 no shutdown
!
interface Loopback1032
 description ISP103 Site2 RouterID
 vrf forwarding ISP1032
 ip address 10.103.5.6 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/11
 no shutdown
!
interface GigabitEthernet0/3
 no shutdown
!
interface GigabitEthernet0/7
 no shutdown
!
interface GigabitEthernet0/3.10
 description Link to P5 GigabitEthernet0/3.10
 encapsulation dot1Q 10
 vrf forwarding ISP1031
 ip address 10.103.1.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/7.10
 description Link to P3 GigabitEthernet0/3.10
 encapsulation dot1Q 10
 vrf forwarding ISP1031
 ip address 10.103.1.13 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/11.10
 description Link to P4 GigabitEthernet0/3.10
 encapsulation dot1Q 10
 vrf forwarding ISP1031
 ip address 10.103.1.17 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/3.20
 description Link to P5 GigabitEthernet0/3.20
 encapsulation dot1Q 20
 vrf forwarding ISP1032
 ip address 10.103.2.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/7.20
 description Link to P3 GigabitEthernet0/3.20
 encapsulation dot1Q 20
 vrf forwarding ISP1032
 ip address 10.103.2.13 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/11.20
 description Link to P4 GigabitEthernet0/3.20
 encapsulation dot1Q 20
 vrf forwarding ISP1032
 ip address 10.103.2.17 255.255.255.252
 no shutdown
!
```

## ISP103-PE33

```ios
hostname ISP103-PE33
!
interface Loopback0
 description ISP103 Site1 RouterID
 ip address 10.103.3.33 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/0
 no shutdown
!
interface GigabitEthernet0/1
 no shutdown
!
interface GigabitEthernet0/0.433
 description Link to P1 GigabitEthernet0/5.433 VLAN 433 SW27
 encapsulation dot1Q 433
 ip address 10.103.11.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2
 description Link to CsC-PE15 GigabitEthernet0/13
 ip address 10.103.49.9 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/3
 description Link to CsC-PE16 GigabitEthernet0/13
 ip address 10.103.49.13 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1.433
 description Link to P2 GigabitEthernet0/5.433 VLAN 433 SW28
 encapsulation dot1Q 433
 ip address 10.103.12.2 255.255.255.252
 no shutdown
!
```

## ISP103-PE34

```ios
hostname ISP103-PE34
!
interface Loopback0
 description ISP103 Site1 RouterID
 ip address 10.103.3.34 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/0
 no shutdown
!
interface GigabitEthernet0/1
 no shutdown
!
interface GigabitEthernet0/1.434
 description Link to P4 GigabitEthernet0/5.434 VLAN 434 SW210
 encapsulation dot1Q 434
 ip address 10.103.14.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/0.434
 description Link to P3 GigabitEthernet0/5.434 VLAN 434 SW211
 encapsulation dot1Q 434
 ip address 10.103.13.2 255.255.255.252
 no shutdown
!
```

## ISP103-PE36

```ios
hostname ISP103-PE36
!
interface Loopback0
 description ISP103 Site2 RouterID
 ip address 10.103.3.36 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/0
 no shutdown
!
interface GigabitEthernet0/1
 no shutdown
!
interface GigabitEthernet0/1.436
 description Link to P2 GigabitEthernet0/6.436 VLAN 436 SW214
 encapsulation dot1Q 436
 ip address 10.103.22.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/0.436
 description Link to P4 GigabitEthernet0/6.436 VLAN 436 SW213
 encapsulation dot1Q 436
 ip address 10.103.24.2 255.255.255.252
 no shutdown
!
```

## ISP103-PE35

```ios
hostname ISP103-PE35
!
interface Loopback0
 description ISP103 Site2 RouterID
 ip address 10.103.3.35 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/0
 no shutdown
!
interface GigabitEthernet0/1
 no shutdown
!
interface GigabitEthernet0/0.435
 description Link to P1 GigabitEthernet0/6.435 VLAN 435 SW29
 encapsulation dot1Q 435
 ip address 10.103.21.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1.435
 description Link to P3 GigabitEthernet0/6.435 VLAN 435 SW212
 encapsulation dot1Q 435
 ip address 10.103.23.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2
 description Link to CsC-PE19 GigabitEthernet0/13
 ip address 10.103.49.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/3
 description Link to CsC-PE20 GigabitEthernet0/13
 ip address 10.103.49.5 255.255.255.252
 no shutdown
!
```

## ISP103-RR37

```ios
hostname ISP103-RR37
!
interface Loopback0
 description ISP103 Site1 RouterID
 ip address 10.103.4.37 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/0
 no shutdown
!
interface GigabitEthernet0/1
 no shutdown
!
interface GigabitEthernet0/0.437
 description Link to P1 GigabitEthernet0/6.437 VLAN 437 SW29
 encapsulation dot1Q 437
 ip address 10.103.11.6 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1.437
 description Link to P3 GigabitEthernet0/6.437 VLAN 437 SW212
 encapsulation dot1Q 437
 ip address 10.103.13.6 255.255.255.252
 no shutdown
!
```

## CsC-PE15

```ios
hostname CsC-PE15
!
vrf definition ISP103
 rd 10.100.2.15:103
 route-target export 103:103
 route-target import 103:103
 !
 address-family ipv4
  route-target export 103:103
  route-target import 103:103
 exit-address-family
 !
 address-family ipv6
  route-target export 103:103
  route-target import 103:103
 exit-address-family
!
interface Loopback1030
 description ISP103 RouterID
 vrf forwarding ISP103
 ip address 10.103.50.15 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/13
 description Link to ISP103-PE33 GigabitEthernet0/2
 vrf forwarding ISP103
 ip address 10.103.49.10 255.255.255.252
 no shutdown
!
```

## CsC-PE16

```ios
hostname CsC-PE16
!
vrf definition ISP103
 rd 10.100.2.16:103
 route-target export 103:103
 route-target import 103:103
 !
 address-family ipv4
  route-target export 103:103
  route-target import 103:103
 exit-address-family
 !
 address-family ipv6
  route-target export 103:103
  route-target import 103:103
 exit-address-family
!
interface Loopback1030
 description ISP103 RouterID
 vrf forwarding ISP103
 ip address 10.103.50.16 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/13
 description Link to ISP103-PE33 GigabitEthernet0/3
 vrf forwarding ISP103
 ip address 10.103.49.14 255.255.255.252
 no shutdown
!
```

## CsC-PE19

```ios
hostname CsC-PE19
!
vrf definition ISP103
 rd 10.100.2.19:103
 route-target export 103:103
 route-target import 103:103
 !
 address-family ipv4
  route-target export 103:103
  route-target import 103:103
 exit-address-family
 !
 address-family ipv6
  route-target export 103:103
  route-target import 103:103
 exit-address-family
!
interface Loopback1030
 description ISP103 RouterID
 vrf forwarding ISP103
 ip address 10.103.50.19 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/13
 description Link to ISP103-PE35 GigabitEthernet0/2
 vrf forwarding ISP103
 ip address 10.103.49.2 255.255.255.252
 no shutdown
!
```

## CsC-PE20

```ios
hostname CsC-PE20
!
vrf definition ISP103
 rd 10.100.2.20:103
 route-target export 103:103
 route-target import 103:103
 !
 address-family ipv4
  route-target export 103:103
  route-target import 103:103
 exit-address-family
 !
 address-family ipv6
  route-target export 103:103
  route-target import 103:103
 exit-address-family
!
interface Loopback1030
 description ISP103 RouterID
 vrf forwarding ISP103
 ip address 10.103.50.20 255.255.255.255
 no shutdown
!
interface GigabitEthernet0/13
 description Link to ISP103-PE35 GigabitEthernet0/3
 vrf forwarding ISP103
 ip address 10.103.49.6 255.255.255.252
 no shutdown
!
```

## Verification

```ios
show ip interface brief
show vrf
show ip route vrf ISP1031 connected
show ip route vrf ISP1032 connected
```

On ISP103 PE/RR routers, use `show ip route connected`; on CsC PEs use `show ip route vrf ISP103 connected`. Verify every /30 peer is reachable using its local interface address as source.

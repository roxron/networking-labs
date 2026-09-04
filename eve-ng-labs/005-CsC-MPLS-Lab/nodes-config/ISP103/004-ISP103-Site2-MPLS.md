# ISP103 Site2 MPLS configuration

Apply after IS-IS reachability. LDP stays inside Site2; CsC links use BGP labels in file 005.

| Router | LDP context | Router-ID interface | Router ID |
| --- | --- | --- | --- |
| P1 | ISP1032 | Loopback1032 | 10.103.5.1 |
| P2 | ISP1032 | Loopback1032 | 10.103.5.2 |
| P3 | ISP1032 | Loopback1032 | 10.103.5.3 |
| P4 | ISP1032 | Loopback1032 | 10.103.5.4 |
| P5 | ISP1032 | Loopback1032 | 10.103.5.5 |
| P6 | ISP1032 | Loopback1032 | 10.103.5.6 |
| ISP103-PE36 | GRT | Loopback0 | 10.103.3.36 |
| ISP103-PE35 | GRT | Loopback0 | 10.103.3.35 |

## P1

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1032 Loopback1032 force
!
interface GigabitEthernet0/6.435
 mpls ip
!
interface GigabitEthernet0/3.20
 mpls ip
!
```

## P2

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1032 Loopback1032 force
!
interface GigabitEthernet0/6.436
 mpls ip
!
interface GigabitEthernet0/3.20
 mpls ip
!
```

## P3

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1032 Loopback1032 force
!
interface GigabitEthernet0/6.435
 mpls ip
!
interface GigabitEthernet0/3.20
 mpls ip
!
```

## P4

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1032 Loopback1032 force
!
interface GigabitEthernet0/6.436
 mpls ip
!
interface GigabitEthernet0/3.20
 mpls ip
!
```

## P5

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1032 Loopback1032 force
!
interface GigabitEthernet0/3.20
 mpls ip
!
interface GigabitEthernet0/11.20
 mpls ip
!
interface GigabitEthernet0/7.20
 mpls ip
!
```

## P6

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1032 Loopback1032 force
!
interface GigabitEthernet0/3.20
 mpls ip
!
interface GigabitEthernet0/7.20
 mpls ip
!
interface GigabitEthernet0/11.20
 mpls ip
!
```

## ISP103-PE36

```ios
mpls label protocol ldp
mpls ldp router-id Loopback0 force
!
interface GigabitEthernet0/1.436
 mpls ip
!
interface GigabitEthernet0/0.436
 mpls ip
!
```

## ISP103-PE35

```ios
mpls label protocol ldp
mpls ldp router-id Loopback0 force
!
interface GigabitEthernet0/0.435
 mpls ip
!
interface GigabitEthernet0/1.435
 mpls ip
!
```

## Verification

```ios
show mpls interfaces vrf ISP1032
show mpls ldp discovery vrf ISP1032
show mpls ldp neighbor vrf ISP1032
show mpls forwarding-table vrf ISP1032
```

On PE/RR routers omit the VRF qualifier. Expected neighbors:

- P1: ISP103-PE35, P5.
- P2: ISP103-PE36, P5.
- P3: ISP103-PE35, P6.
- P4: ISP103-PE36, P6.
- P5: P6, P2, P1.
- P6: P5, P3, P4.
- ISP103-PE36: P2, P4.
- ISP103-PE35: P1, P3.

# ISP102 Site2 MPLS configuration

Apply after IS-IS reachability. LDP stays inside Site2; CsC links use BGP labels in file 005.

| Router | LDP context | Router-ID interface | Router ID |
| --- | --- | --- | --- |
| P1 | ISP1022 | Loopback1022 | 10.102.5.1 |
| P2 | ISP1022 | Loopback1022 | 10.102.5.2 |
| P3 | ISP1022 | Loopback1022 | 10.102.5.3 |
| P4 | ISP1022 | Loopback1022 | 10.102.5.4 |
| P5 | ISP1022 | Loopback1022 | 10.102.5.5 |
| P6 | ISP1022 | Loopback1022 | 10.102.5.6 |
| ISP102-PE30 | GRT | Loopback0 | 10.102.3.30 |
| ISP102-PE31 | GRT | Loopback0 | 10.102.3.31 |

## P1

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1022 Loopback1022 force
!
interface GigabitEthernet0/6.331
 mpls ip
!
interface GigabitEthernet0/2.20
 mpls ip
!
```

## P2

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1022 Loopback1022 force
!
interface GigabitEthernet0/6.330
 mpls ip
!
interface GigabitEthernet0/2.20
 mpls ip
!
```

## P3

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1022 Loopback1022 force
!
interface GigabitEthernet0/6.331
 mpls ip
!
interface GigabitEthernet0/2.20
 mpls ip
!
```

## P4

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1022 Loopback1022 force
!
interface GigabitEthernet0/6.330
 mpls ip
!
interface GigabitEthernet0/2.20
 mpls ip
!
```

## P5

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1022 Loopback1022 force
!
interface GigabitEthernet0/2.20
 mpls ip
!
interface GigabitEthernet0/10.20
 mpls ip
!
interface GigabitEthernet0/6.20
 mpls ip
!
```

## P6

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1022 Loopback1022 force
!
interface GigabitEthernet0/2.20
 mpls ip
!
interface GigabitEthernet0/6.20
 mpls ip
!
interface GigabitEthernet0/10.20
 mpls ip
!
```

## ISP102-PE30

```ios
mpls label protocol ldp
mpls ldp router-id Loopback0 force
!
interface GigabitEthernet0/1.330
 mpls ip
!
interface GigabitEthernet0/0.330
 mpls ip
!
```

## ISP102-PE31

```ios
mpls label protocol ldp
mpls ldp router-id Loopback0 force
!
interface GigabitEthernet0/0.331
 mpls ip
!
interface GigabitEthernet0/1.331
 mpls ip
!
```

## Verification

```ios
show mpls interfaces vrf ISP1022
show mpls ldp discovery vrf ISP1022
show mpls ldp neighbor vrf ISP1022
show mpls forwarding-table vrf ISP1022
```

On PE/RR routers omit the VRF qualifier. Expected neighbors:

- P1: ISP102-PE31, P5.
- P2: ISP102-PE30, P5.
- P3: ISP102-PE31, P6.
- P4: ISP102-PE30, P6.
- P5: P6, P2, P1.
- P6: P5, P3, P4.
- ISP102-PE30: P2, P4.
- ISP102-PE31: P1, P3.

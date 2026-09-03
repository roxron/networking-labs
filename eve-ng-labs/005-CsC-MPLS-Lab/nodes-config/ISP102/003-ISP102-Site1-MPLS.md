# ISP102 Site1 MPLS configuration

Apply after IS-IS reachability. LDP stays inside Site1; CsC links use BGP labels in file 005.

| Router | LDP context | Router-ID interface | Router ID |
| --- | --- | --- | --- |
| P1 | ISP1021 | Loopback1021 | 10.102.0.1 |
| P2 | ISP1021 | Loopback1021 | 10.102.0.2 |
| P3 | ISP1021 | Loopback1021 | 10.102.0.3 |
| P4 | ISP1021 | Loopback1021 | 10.102.0.4 |
| P5 | ISP1021 | Loopback1021 | 10.102.0.5 |
| P6 | ISP1021 | Loopback1021 | 10.102.0.6 |
| ISP102-PE28 | GRT | Loopback0 | 10.102.3.28 |
| ISP102-PE29 | GRT | Loopback0 | 10.102.3.29 |
| ISP102-RR11 | GRT | Loopback0 | 10.102.4.11 |

## P1

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1021 Loopback1021 force
!
interface GigabitEthernet0/2.10
 mpls ip
!
interface GigabitEthernet0/5.328
 mpls ip
!
interface GigabitEthernet0/7.311
 mpls ip
!
```

## P2

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1021 Loopback1021 force
!
interface GigabitEthernet0/2.10
 mpls ip
!
interface GigabitEthernet0/5.328
 mpls ip
!
```

## P3

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1021 Loopback1021 force
!
interface GigabitEthernet0/2.10
 mpls ip
!
interface GigabitEthernet0/5.329
 mpls ip
!
interface GigabitEthernet0/6.311
 mpls ip
!
```

## P4

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1021 Loopback1021 force
!
interface GigabitEthernet0/2.10
 mpls ip
!
interface GigabitEthernet0/5.329
 mpls ip
!
```

## P5

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1021 Loopback1021 force
!
interface GigabitEthernet0/2.10
 mpls ip
!
interface GigabitEthernet0/6.10
 mpls ip
!
interface GigabitEthernet0/10.10
 mpls ip
!
```

## P6

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1021 Loopback1021 force
!
interface GigabitEthernet0/2.10
 mpls ip
!
interface GigabitEthernet0/6.10
 mpls ip
!
interface GigabitEthernet0/10.10
 mpls ip
!
```

## ISP102-PE28

```ios
mpls label protocol ldp
mpls ldp router-id Loopback0 force
!
interface GigabitEthernet0/0.328
 mpls ip
!
interface GigabitEthernet0/1.328
 mpls ip
!
```

## ISP102-PE29

```ios
mpls label protocol ldp
mpls ldp router-id Loopback0 force
!
interface GigabitEthernet0/1.329
 mpls ip
!
interface GigabitEthernet0/0.329
 mpls ip
!
```

## ISP102-RR11

```ios
mpls label protocol ldp
mpls ldp router-id Loopback0 force
!
interface GigabitEthernet0/0.311
 mpls ip
!
interface GigabitEthernet0/1.311
 mpls ip
!
```

## Verification

```ios
show mpls interfaces vrf ISP1021
show mpls ldp discovery vrf ISP1021
show mpls ldp neighbor vrf ISP1021
show mpls forwarding-table vrf ISP1021
```

On PE/RR routers omit the VRF qualifier. Expected neighbors:

- P1: P5, ISP102-PE28, ISP102-RR11.
- P2: P5, ISP102-PE28.
- P3: P6, ISP102-PE29, ISP102-RR11.
- P4: P6, ISP102-PE29.
- P5: P6, P1, P2.
- P6: P5, P3, P4.
- ISP102-PE28: P1, P2.
- ISP102-PE29: P4, P3.
- ISP102-RR11: P1, P3.

# ISP103 Site1 MPLS configuration

Apply after IS-IS reachability. LDP stays inside Site1; CsC links use BGP labels in file 005.

| Router | LDP context | Router-ID interface | Router ID |
| --- | --- | --- | --- |
| P1 | ISP1031 | Loopback1031 | 10.103.0.1 |
| P2 | ISP1031 | Loopback1031 | 10.103.0.2 |
| P3 | ISP1031 | Loopback1031 | 10.103.0.3 |
| P4 | ISP1031 | Loopback1031 | 10.103.0.4 |
| P5 | ISP1031 | Loopback1031 | 10.103.0.5 |
| P6 | ISP1031 | Loopback1031 | 10.103.0.6 |
| ISP103-PE33 | GRT | Loopback0 | 10.103.3.33 |
| ISP103-PE34 | GRT | Loopback0 | 10.103.3.34 |
| ISP103-RR37 | GRT | Loopback0 | 10.103.4.37 |

## P1

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1031 Loopback1031 force
!
interface GigabitEthernet0/3.10
 mpls ip
!
interface GigabitEthernet0/5.433
 mpls ip
!
interface GigabitEthernet0/6.437
 mpls ip
!
```

## P2

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1031 Loopback1031 force
!
interface GigabitEthernet0/3.10
 mpls ip
!
interface GigabitEthernet0/5.433
 mpls ip
!
```

## P3

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1031 Loopback1031 force
!
interface GigabitEthernet0/3.10
 mpls ip
!
interface GigabitEthernet0/5.434
 mpls ip
!
interface GigabitEthernet0/6.437
 mpls ip
!
```

## P4

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1031 Loopback1031 force
!
interface GigabitEthernet0/3.10
 mpls ip
!
interface GigabitEthernet0/5.434
 mpls ip
!
```

## P5

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1031 Loopback1031 force
!
interface GigabitEthernet0/3.10
 mpls ip
!
interface GigabitEthernet0/7.10
 mpls ip
!
interface GigabitEthernet0/11.10
 mpls ip
!
```

## P6

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1031 Loopback1031 force
!
interface GigabitEthernet0/3.10
 mpls ip
!
interface GigabitEthernet0/7.10
 mpls ip
!
interface GigabitEthernet0/11.10
 mpls ip
!
```

## ISP103-PE33

```ios
mpls label protocol ldp
mpls ldp router-id Loopback0 force
!
interface GigabitEthernet0/0.433
 mpls ip
!
interface GigabitEthernet0/1.433
 mpls ip
!
```

## ISP103-PE34

```ios
mpls label protocol ldp
mpls ldp router-id Loopback0 force
!
interface GigabitEthernet0/1.434
 mpls ip
!
interface GigabitEthernet0/0.434
 mpls ip
!
```

## ISP103-RR37

```ios
mpls label protocol ldp
mpls ldp router-id Loopback0 force
!
interface GigabitEthernet0/0.437
 mpls ip
!
interface GigabitEthernet0/1.437
 mpls ip
!
```

## Verification

```ios
show mpls interfaces vrf ISP1031
show mpls ldp discovery vrf ISP1031
show mpls ldp neighbor vrf ISP1031
show mpls forwarding-table vrf ISP1031
```

On PE/RR routers omit the VRF qualifier. Expected neighbors:

- P1: P5, ISP103-PE33, ISP103-RR37.
- P2: P5, ISP103-PE33.
- P3: P6, ISP103-PE34, ISP103-RR37.
- P4: P6, ISP103-PE34.
- P5: P6, P1, P2.
- P6: P5, P3, P4.
- ISP103-PE33: P1, P2.
- ISP103-PE34: P4, P3.
- ISP103-RR37: P1, P3.

# ISP101 Site1 MPLS configuration

## Scope

This page applies MPLS LDP to ISP101 Site1 as shown on the **ISP101 IPv4** draw.io page. Site1 uses VRF `ISP1011` on the shared P routers. ISP101-PE123 and ISP101-PE124 use their global routing tables.

The underlying IP and IS-IS configuration is documented separately in `ISP101-base-interface-configurations.md` and `ISP101-IGP-ISIS.md`.

The links from ISP101-PE123 to CsC-PE15 and CsC-PE16 are CsC attachment links and are not enabled for the ISP101 Site1 LDP domain in this page.

## LDP identities

| Router | LDP context | Router-ID interface | LDP router ID |
|---|---|---|---|
| P1 | VRF ISP1011 | Loopback1011 | `10.101.0.1` |
| P2 | VRF ISP1011 | Loopback1011 | `10.101.0.2` |
| P3 | VRF ISP1011 | Loopback1011 | `10.101.0.3` |
| P4 | VRF ISP1011 | Loopback1011 | `10.101.0.4` |
| P5 | VRF ISP1011 | Loopback1011 | `10.101.0.5` |
| P6 | VRF ISP1011 | Loopback1011 | `10.101.0.6` |
| ISP101-PE123 | GRT | Loopback0 | `10.101.3.123` |
| ISP101-PE124 | GRT | Loopback0 | `10.101.3.124` |

## Configurations

### P1

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1011 Loopback1011 force
!
interface GigabitEthernet0/1.10
 mpls ip
!
interface GigabitEthernet0/4.123
 mpls ip
```

### P2

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1011 Loopback1011 force
!
interface GigabitEthernet0/1.10
 mpls ip
!
interface GigabitEthernet0/4.123
 mpls ip
!
interface GigabitEthernet0/6.124
 mpls ip
```

### P3

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1011 Loopback1011 force
!
interface GigabitEthernet0/1.10
 mpls ip
```

### P4

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1011 Loopback1011 force
!
interface GigabitEthernet0/1.10
 mpls ip
!
interface GigabitEthernet0/6.124
 mpls ip
```

### P5

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1011 Loopback1011 force
!
interface GigabitEthernet0/1.10
 mpls ip
!
interface GigabitEthernet0/5.10
 mpls ip
!
interface GigabitEthernet0/9.10
 mpls ip
```

### P6

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1011 Loopback1011 force
!
interface GigabitEthernet0/1.10
 mpls ip
!
interface GigabitEthernet0/5.10
 mpls ip
!
interface GigabitEthernet0/9.10
 mpls ip
```

### ISP101-PE123

```ios
mpls label protocol ldp
mpls ldp router-id Loopback0 force
!
interface GigabitEthernet0/0.123
 mpls ip
!
interface GigabitEthernet0/1.123
 mpls ip
```

### ISP101-PE124

```ios
mpls label protocol ldp
mpls ldp router-id Loopback0 force
!
interface GigabitEthernet0/0.124
 mpls ip
!
interface GigabitEthernet0/1.124
 mpls ip
```

## Verification

```ios
show mpls interfaces vrf ISP1011
show mpls ldp discovery vrf ISP1011
show mpls ldp neighbor vrf ISP1011
show mpls ldp bindings vrf ISP1011
show mpls forwarding-table vrf ISP1011
```

On ISP101-PE123 and ISP101-PE124, use the corresponding commands without the `vrf ISP1011` qualifier because their ISP101 interfaces are in GRT.

Expected Site1 LDP adjacencies:

- P1: P5 and ISP101-PE123
- P2: P5, ISP101-PE123, and ISP101-PE124
- P3: P6
- P4: P6 and ISP101-PE124
- P5: P1, P2, and P6
- P6: P3, P4, and P5
- ISP101-PE123: P1 and P2
- ISP101-PE124: P2 and P4


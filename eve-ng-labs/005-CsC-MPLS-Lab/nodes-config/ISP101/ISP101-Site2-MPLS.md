# ISP101 Site2 MPLS configuration

## Scope

This page applies MPLS LDP to ISP101 Site2 as shown on the **ISP101 IPv4** draw.io page. Site2 uses VRF `ISP1012` on the shared P routers. ISP101-PE225, ISP101-PE202, and ISP101-RR1 use their global routing tables.

The underlying IP and IS-IS configuration is documented separately in `ISP101-base-interface-configurations.md` and `ISP101-IGP-ISIS.md`.

The links from ISP101-PE225 to CsC-PE19 and CsC-PE20 are CsC attachment links and are not enabled for the ISP101 Site2 LDP domain in this page.

## LDP identities

| Router | LDP context | Router-ID interface | LDP router ID |
|---|---|---|---|
| P1 | VRF ISP1012 | Loopback1012 | `10.101.5.1` |
| P2 | VRF ISP1012 | Loopback1012 | `10.101.5.2` |
| P3 | VRF ISP1012 | Loopback1012 | `10.101.5.3` |
| P4 | VRF ISP1012 | Loopback1012 | `10.101.5.4` |
| P5 | VRF ISP1012 | Loopback1012 | `10.101.5.5` |
| P6 | VRF ISP1012 | Loopback1012 | `10.101.5.6` |
| ISP101-PE225 | GRT | Loopback0 | `10.101.3.225` |
| ISP101-PE202 | GRT | Loopback0 | `10.101.3.202` |
| ISP101-RR1 | GRT | Loopback0 | `10.101.4.1` |

## Configurations

### P1

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1012 Loopback1012 force
!
interface GigabitEthernet0/1.20
 mpls ip
!
interface GigabitEthernet0/7.225
 mpls ip
```

### P2

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1012 Loopback1012 force
!
interface GigabitEthernet0/1.20
 mpls ip
```

### P3

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1012 Loopback1012 force
!
interface GigabitEthernet0/1.20
 mpls ip
!
interface GigabitEthernet0/4.202
 mpls ip
!
interface GigabitEthernet0/5.231
 mpls ip
!
interface GigabitEthernet0/7.225
 mpls ip
```

### P4

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1012 Loopback1012 force
!
interface GigabitEthernet0/1.20
 mpls ip
!
interface GigabitEthernet0/4.202
 mpls ip
!
interface GigabitEthernet0/5.231
 mpls ip
```

### P5

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1012 Loopback1012 force
!
interface GigabitEthernet0/1.20
 mpls ip
!
interface GigabitEthernet0/5.20
 mpls ip
!
interface GigabitEthernet0/9.20
 mpls ip
```

### P6

```ios
mpls label protocol ldp
mpls ldp router-id vrf ISP1012 Loopback1012 force
!
interface GigabitEthernet0/1.20
 mpls ip
!
interface GigabitEthernet0/5.20
 mpls ip
!
interface GigabitEthernet0/9.20
 mpls ip
```

### ISP101-PE225

```ios
mpls label protocol ldp
mpls ldp router-id Loopback0 force
!
interface GigabitEthernet0/0.225
 mpls ip
!
interface GigabitEthernet0/1.225
 mpls ip
```

### ISP101-PE202

```ios
mpls label protocol ldp
mpls ldp router-id Loopback0 force
!
interface GigabitEthernet0/0.202
 mpls ip
!
interface GigabitEthernet0/1.202
 mpls ip
```

### ISP101-RR1

```ios
mpls label protocol ldp
mpls ldp router-id Loopback0 force
!
interface GigabitEthernet0/0.231
 mpls ip
!
interface GigabitEthernet0/1.231
 mpls ip
```

## Verification

```ios
show mpls interfaces vrf ISP1012
show mpls ldp discovery vrf ISP1012
show mpls ldp neighbor vrf ISP1012
show mpls ldp bindings vrf ISP1012
show mpls forwarding-table vrf ISP1012
```

On ISP101-PE225, ISP101-PE202, and ISP101-RR1, use the corresponding commands without the `vrf ISP1012` qualifier because their ISP101 interfaces are in GRT.

Expected Site2 LDP adjacencies:

- P1: P5 and ISP101-PE225
- P2: P5
- P3: P6, ISP101-PE225, ISP101-PE202, and ISP101-RR1
- P4: P6, ISP101-PE202, and ISP101-RR1
- P5: P1, P2, and P6
- P6: P3, P4, and P5
- ISP101-PE225: P1 and P3
- ISP101-PE202: P3 and P4
- ISP101-RR1: P3 and P4

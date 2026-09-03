# ISP101 IPv4 — P and PE base interface configurations

## Scope

This page covers the **P routers, PE routers, and ISP101 route reflector** on the draw.io page **ISP101 IPv4**. Intermediate switches are intentionally ignored and treated as transparent Layer-2 transport.

Sources are `005-CsC-MPLS-Lab-diagram.drawio` (logical interfaces, addressing and site membership) and `005-CsC-MPLS-Lab.unl` (PE physical interfaces across Layer-2 paths). Missing or conflicting values are marked `<AMBIGUOUS: ...>` and are not guessed.

The draw.io legend assigns the first usable address to the dotted/core-facing endpoint and the last usable address to the remote endpoint. This is used only where the prefix association is clear.

## Participating routers and interfaces

### P routers

| Hostname | Loopback | Connected ISP101 interfaces |
|---|---|---|
| P1 | Lo1010 `10.101.0.1/32` | Gi0/1.10—P5 (Site1); Gi0/1.20—P5 (Site2); Gi0/0.123—ISP101-PE123 |
| P2 | Lo1010 `10.101.0.2/32` | Gi0/1.10—P5 (Site1); Gi0/1.20—P5 (Site2); Gi0/1.123—ISP101-PE123; Gi0/0.124—ISP101-PE124 |
| P3 | Lo1010 `10.101.0.3/32` | Gi0/1.10—P6 (Site1); Gi0/1.20—P6 (Site2); Gi0/0.225 and Gi0/1.225—ISP101-PE225; Gi0/0.202—ISP101-PE202 |
| P4 | Lo1010 `10.101.0.4/32` | Gi0/1.10—P6 (Site1); Site2 also labeled Gi0/1.10; Gi0/1.124—ISP101-PE124; Gi0/1.202—ISP101-PE202 |
| P5 | Lo1010 `10.101.0.5/32` | Gi0/1.10/.20—P6; Gi0/5.10/.20—P1; Gi0/9.10/.20—P2 |
| P6 | Lo1010 `10.101.0.6/32` | Gi0/0.10/.20—P5; Gi0/5.10/.20—P3; Gi0/9.10—P4 for both sites |

### PE routers

| Hostname | Loopback | Connected interfaces |
|---|---|---|
| ISP101-PE123 | Lo0 `10.101.3.123/32` | Gi0/0—P1 Gi0/0.123; Gi0/1—P2 Gi0/1.123; Gi0/2—CsC-PE15 Gi0/15; Gi0/3—CsC-PE16 Gi0/15 |
| ISP101-PE124 | Lo0 `10.101.3.124/32` | Gi0/0—P4 Gi0/1.124; Gi0/1—P2 Gi0/0.124 |
| ISP101-PE225 | Lo0 `10.101.3.225/32` | Gi0/0 and Gi0/1—P3 Gi0/0.225 and Gi0/1.225; Gi0/2—CsC-PE19 Gi0/15; Gi0/3—CsC-PE20 Gi0/2 |
| ISP101-PE202 | Lo0 `10.101.3.202/32` | Gi0/0—P3 Gi0/0.202; Gi0/1—P4 Gi0/1.202 |
| CsC-PE15 | Lo0 `10.100.2.15/32` | Gi0/15—ISP101-PE123 Gi0/2 |
| CsC-PE16 | Lo0 `10.100.2.16/32` | Gi0/15—ISP101-PE123 Gi0/3 |
| CsC-PE19 | Lo1010 `10.101.50.19/32` | Gi0/15—ISP101-PE225 Gi0/2 |
| CsC-PE20 | Lo1010 `10.101.50.20/32` | Gi0/2—ISP101-PE225 Gi0/3 |

### Route reflector

| Hostname | Loopback | Connected interfaces |
|---|---|---|
| ISP101-RR1 | Lo0 `10.101.4.1/32` | Gi0/0—P3 Gi0/0.231 (Site2); Gi0/1—P4 Gi0/1.231 (Site2) |

## VRFs required on every P router

```ios
ip vrf ISP1011
 ! Site1; RD and route-targets are absent from the sources
!
ip vrf ISP1012
 ! Site2; RD and route-targets are absent from the sources
```

## P-router base configurations

### P1

```ios
hostname P1
ip vrf ISP1011
ip vrf ISP1012
!
interface Loopback1010
 ip address 10.101.0.1 255.255.255.255
!
interface GigabitEthernet0/1.10
 encapsulation dot1Q 10
 ip vrf forwarding ISP1011
 ip address 10.101.1.5 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1.20
 encapsulation dot1Q 20
 ip vrf forwarding ISP1012
 ip address 10.101.2.5 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/0.123
 encapsulation dot1Q 123
 ip vrf forwarding ISP1011
 ip address <AMBIGUOUS: access prefix placement is not definitive>
 no shutdown
```

### P2

```ios
hostname P2
ip vrf ISP1011
ip vrf ISP1012
!
interface Loopback1010
 ip address 10.101.0.2 255.255.255.255
!
interface GigabitEthernet0/1.10
 encapsulation dot1Q 10
 ip vrf forwarding ISP1011
 ip address 10.101.1.9 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1.20
 encapsulation dot1Q 20
 ip vrf forwarding ISP1012
 ip address 10.101.2.9 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1.123
 encapsulation dot1Q 123
 ip vrf forwarding ISP1011
 ip address <AMBIGUOUS: access prefix placement is not definitive>
 no shutdown
!
interface GigabitEthernet0/0.124
 encapsulation dot1Q 124
 ip vrf forwarding ISP1011
 ip address <AMBIGUOUS: access prefix placement is not definitive>
 no shutdown
```

### P3

```ios
hostname P3
ip vrf ISP1011
ip vrf ISP1012
!
interface Loopback1010
 ip address 10.101.0.3 255.255.255.255
!
interface GigabitEthernet0/1.10
 encapsulation dot1Q 10
 ip vrf forwarding ISP1011
 ip address <AMBIGUOUS: Site1 is labeled 10.101.2.12/30>
 no shutdown
!
interface GigabitEthernet0/1.20
 encapsulation dot1Q 20
 ip vrf forwarding ISP1012
 ip address <AMBIGUOUS: Site2 is labeled 10.101.1.12/30>
 no shutdown
!
interface GigabitEthernet0/0.225
 encapsulation dot1Q 225
 ip vrf forwarding ISP1011
 ip address <AMBIGUOUS: access prefix placement is not definitive>
 no shutdown
!
interface GigabitEthernet0/1.225
 encapsulation dot1Q 225
 ip vrf forwarding ISP1012
 ip address <AMBIGUOUS: access prefix placement is not definitive>
 no shutdown
!
interface GigabitEthernet0/0.202
 encapsulation dot1Q 202
 ip vrf forwarding ISP1011
 ip address <AMBIGUOUS: access prefix placement is not definitive>
 no shutdown
```

### P4

```ios
hostname P4
ip vrf ISP1011
ip vrf ISP1012
!
interface Loopback1010
 ip address 10.101.0.4 255.255.255.255
!
interface GigabitEthernet0/1.10
 encapsulation dot1Q 10
 ip vrf forwarding ISP1011
 ip address 10.101.1.17 255.255.255.252
 no shutdown
!
interface <AMBIGUOUS: Site2 is also labeled Gi0/1.10>
 ip vrf forwarding ISP1012
 ip address 10.101.2.17 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1.124
 encapsulation dot1Q 124
 ip vrf forwarding ISP1011
 ip address <AMBIGUOUS: access prefix placement is not definitive>
 no shutdown
!
interface GigabitEthernet0/1.202
 encapsulation dot1Q 202
 ip vrf forwarding ISP1011
 ip address <AMBIGUOUS: access prefix placement is not definitive>
 no shutdown
```

### P5

```ios
hostname P5
ip vrf ISP1011
ip vrf ISP1012
!
interface Loopback1010
 ip address 10.101.0.5 255.255.255.255
!
interface GigabitEthernet0/1.10
 encapsulation dot1Q 10
 ip vrf forwarding ISP1011
 ip address 10.101.1.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1.20
 encapsulation dot1Q 20
 ip vrf forwarding ISP1012
 ip address 10.101.2.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/5.10
 encapsulation dot1Q 10
 ip vrf forwarding ISP1011
 ip address 10.101.1.6 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/5.20
 encapsulation dot1Q 20
 ip vrf forwarding ISP1012
 ip address 10.101.2.6 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/9.10
 encapsulation dot1Q 10
 ip vrf forwarding ISP1011
 ip address 10.101.1.10 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/9.20
 encapsulation dot1Q 20
 ip vrf forwarding ISP1012
 ip address 10.101.2.10 255.255.255.252
 no shutdown
```

### P6

```ios
hostname P6
ip vrf ISP1011
ip vrf ISP1012
!
interface Loopback1010
 ip address 10.101.0.6 255.255.255.255
!
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 ip vrf forwarding ISP1011
 ip address 10.101.1.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/0.20
 encapsulation dot1Q 20
 ip vrf forwarding ISP1012
 ip address 10.101.2.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/5.10
 encapsulation dot1Q 10
 ip vrf forwarding ISP1011
 ip address <AMBIGUOUS: Site1 is labeled 10.101.2.12/30>
 no shutdown
!
interface GigabitEthernet0/5.20
 encapsulation dot1Q 20
 ip vrf forwarding ISP1012
 ip address <AMBIGUOUS: Site2 is labeled 10.101.1.12/30>
 no shutdown
!
interface GigabitEthernet0/9.10
 encapsulation dot1Q 10
 ip vrf forwarding ISP1011
 ip address 10.101.1.18 255.255.255.252
 no shutdown
!
interface <AMBIGUOUS: P4-facing Site2 endpoint is also labeled Gi0/9.10>
 ip vrf forwarding ISP1012
 ip address 10.101.2.18 255.255.255.252
 no shutdown
```

## PE-router base configurations

The PE loopbacks and connected physical interfaces are explicit. Interface addresses are left unresolved where the free-floating draw.io prefix labels do not provide a reliable one-to-one mapping.

### ISP101-PE123

```ios
hostname ISP101-PE123
interface Loopback0
 ip address 10.101.3.123 255.255.255.255
!
interface GigabitEthernet0/0
 description Toward P1 Gi0/0.123
 ip address <AMBIGUOUS: corresponding /30 cannot be associated safely>
 no shutdown
!
interface GigabitEthernet0/1
 description Toward P2 Gi0/1.123
 ip address <AMBIGUOUS: corresponding /30 cannot be associated safely>
 no shutdown
!
interface GigabitEthernet0/2
 description To CsC-PE15 Gi0/15
 ip address <AMBIGUOUS: corresponding /30 cannot be associated safely>
 no shutdown
!
interface GigabitEthernet0/3
 description To CsC-PE16 Gi0/15
 ip address <AMBIGUOUS: corresponding /30 cannot be associated safely>
 no shutdown
!
router isis ISP101
 net 49.0101.B000.0000.0123.00
```

### ISP101-PE124

```ios
hostname ISP101-PE124
interface Loopback0
 ip address 10.101.3.124 255.255.255.255
!
interface GigabitEthernet0/0
 description Toward P4 Gi0/1.124
 ip address <AMBIGUOUS: corresponding /30 cannot be associated safely>
 no shutdown
!
interface GigabitEthernet0/1
 description Toward P2 Gi0/0.124
 ip address <AMBIGUOUS: corresponding /30 cannot be associated safely>
 no shutdown
!
! AMBIGUOUS: adjacent IS-IS CsC NET is 49.1111.B000.0000.0017.00,
! whose system ID does not match PE124.
```

### ISP101-PE225

```ios
hostname ISP101-PE225
interface Loopback0
 ip address 10.101.3.225 255.255.255.255
!
interface GigabitEthernet0/0
 description Toward P3 Gi0/0.225
 ip address <AMBIGUOUS: corresponding /30 cannot be associated safely>
 no shutdown
!
interface GigabitEthernet0/1
 description Toward P3 Gi0/1.225
 ip address <AMBIGUOUS: corresponding /30 cannot be associated safely>
 no shutdown
!
interface GigabitEthernet0/2
 description To CsC-PE19 Gi0/15
 ip address <AMBIGUOUS: 10.101.49.0/30 or 10.101.49.4/30>
 no shutdown
!
interface GigabitEthernet0/3
 description To CsC-PE20 Gi0/2
 ip address <AMBIGUOUS: 10.101.49.0/30 or 10.101.49.4/30>
 no shutdown
!
router isis ISP101
 net 49.0101.B000.0000.0225.00
```

### ISP101-PE202

```ios
hostname ISP101-PE202
interface Loopback0
 ip address 10.101.3.202 255.255.255.255
!
interface GigabitEthernet0/0
 description Toward P3 Gi0/0.202 (Site1)
 ip address <AMBIGUOUS: corresponding /30 cannot be associated safely>
 no shutdown
!
interface GigabitEthernet0/1
 description Toward P4 Gi0/1.202 (Site1)
 ip address <AMBIGUOUS: corresponding /30 cannot be associated safely>
 no shutdown
!
router isis ISP101
 net 49.0101.B000.0000.0202.00
```

## Route-reflector base configuration

```ios
hostname ISP101-RR1
!
interface Loopback0
 ip address 10.101.4.1 255.255.255.255
!
interface GigabitEthernet0/0
 description Toward P3 Gi0/0.231 (Site2)
 ip address <AMBIGUOUS: corresponding /30 cannot be associated safely>
 no shutdown
!
interface GigabitEthernet0/1
 description Toward P4 Gi0/1.231 (Site2)
 ip address <AMBIGUOUS: corresponding /30 cannot be associated safely>
 no shutdown
!
router isis ISP101
 net 49.0101.C000.0000.0001.00
```

### CsC-facing PE routers

```ios
hostname CsC-PE15
interface Loopback0
 ip address 10.100.2.15 255.255.255.255
interface GigabitEthernet0/15
 description To ISP101-PE123 Gi0/2
 ip address <AMBIGUOUS: corresponding /30 cannot be associated safely>
 no shutdown
```

```ios
hostname CsC-PE16
interface Loopback0
 ip address 10.100.2.16 255.255.255.255
interface GigabitEthernet0/15
 description To ISP101-PE123 Gi0/3
 ip address <AMBIGUOUS: corresponding /30 cannot be associated safely>
 no shutdown
```

```ios
hostname CsC-PE19
interface Loopback1010
 ip address 10.101.50.19 255.255.255.255
interface GigabitEthernet0/15
 description To ISP101-PE225 Gi0/2
 ip address <AMBIGUOUS: 10.101.49.0/30 or 10.101.49.4/30>
 no shutdown
```

```ios
hostname CsC-PE20
interface Loopback1010
 ip address 10.101.50.20 255.255.255.255
interface GigabitEthernet0/2
 description To ISP101-PE225 Gi0/3
 ip address <AMBIGUOUS: 10.101.49.0/30 or 10.101.49.4/30>
 no shutdown
```

## Unresolved source conflicts

1. P3–P6 Site1 is labeled `10.101.2.12/30`, while Site2 is labeled `10.101.1.12/30`; this is opposite the otherwise consistent site numbering.
2. Both P4–P6 site endpoints are labeled `.10`, so the Site2 subinterface number cannot be determined safely.
3. Free-floating access/CsC prefixes cannot be associated reliably with every edge: `10.101.11.0/30`, `10.101.12.0/30`, `10.101.13.4/30`, `10.101.14.0/30`, `10.101.21.0/30`, `10.101.23.0/30` (twice), `10.101.24.0/30`, `10.101.24.4/30`, `10.101.49.0/30`, and `10.101.49.4/30`.
4. The NET adjacent to ISP101-PE124 is labeled `IS-IS CsC` and uses system ID `0017`, not `0124`.
5. No route distinguishers or route-targets are supplied for `ISP1011` or `ISP1012`.

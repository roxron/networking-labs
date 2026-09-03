# ISP101 IPv4 base interface configurations

## Interpretation rules

This page is based exclusively on the **ISP101 IPv4** page in `005-CsC-MPLS-Lab-diagram.drawio`. The EVE-NG `.unl` file is not used as a source. Switches are not included.

- A label such as `G0/7.225 .1 vrf` means address host octet `.1` on that endpoint and `vrf forwarding` using the VRF object attached to the link.
- An endpoint labeled `GRT` remains in the global routing table and receives no `vrf forwarding` command.
- P-to-P ISP101 links are VRF links. Their link VRF is applied to both P-router endpoints.
- VRF definition stanzas are intentionally **not** created.
- `<AMBIGUOUS: ...>` records a literal diagram conflict; no replacement value is guessed.

## Router/link inventory

| Link | Prefix | Endpoint A | Endpoint B | Routing context |
|---|---|---|---|---|
| P5–P6 Site1 | `10.101.1.0/30` | P5 Gi0/1.10 `.1` | P6 Gi0/0.10 `.2` | VRF ISP1011 both ends |
| P1–P5 Site1 | `10.101.1.4/30` | P1 Gi0/1.10 `.6` | P5 Gi0/5.10 `.5` | VRF ISP1011 both ends |
| P2–P5 Site1 | `10.101.1.8/30` | P2 Gi0/1.10 `.10` | P5 Gi0/9.10 `.9` | VRF ISP1011 both ends |
| P3–P6 Site1 | `10.101.1.12/30` | P3 Gi0/1.10 `.14` | P6 Gi0/5.10 `.13` | VRF ISP1011 both ends |
| P4–P6 Site1 | `10.101.1.16/30` | P4 Gi0/1.10 `.18` | P6 Gi0/9.10 `.17` | VRF ISP1011 both ends |
| P5–P6 Site2 | `10.101.2.0/30` | P5 Gi0/1.20 `.1` | P6 Gi0/0.20 `.2` | VRF ISP1012 both ends |
| P1–P5 Site2 | `10.101.2.4/30` | P1 Gi0/1.20 `.6` | P5 Gi0/5.20 `.5` | VRF ISP1012 both ends |
| P2–P5 Site2 | `10.101.2.8/30` | P2 Gi0/1.20 `.10` | P5 Gi0/9.20 `.9` | VRF ISP1012 both ends |
| P3–P6 Site2 | `10.101.2.12/30` | P3 Gi0/1.20 `.14` | P6 Gi0/5.20 `.13` | VRF ISP1012 both ends |
| P4–P6 Site2 | `10.101.2.16/30` | P4 Gi0/1.20 `.18` | P6 Gi0/9.20 `.17` | VRF ISP1012 both ends |
| P1–ISP101-PE123 | `10.101.11.0/30` | P1 Gi0/0.123 `.2` GRT | ISP101-PE123 Gi0/0 `.1` | PE side VRF ISP1011 |
| P2–ISP101-PE123 | `10.101.12.0/30` | P2 Gi0/1.123 `.2` GRT | ISP101-PE123 Gi0/1 `.1` | PE side VRF ISP1011 |
| P2–ISP101-PE124 | `10.100.12.8/30` | P2 Gi0/0.124 `.10` GRT | ISP101-PE124 Gi0/1 `.9` | PE side VRF ISP1011 |
| P4–ISP101-PE124 | `10.101.14.0/30` | P4 Gi0/1.124 `.2` GRT | ISP101-PE124 Gi0/0 `.1` | PE side VRF ISP1011; duplicates P4–ISP101-PE202 |
| P3–ISP101-PE225 | `10.101.21.0/30` | P3 Gi0/0.225 `.2` GRT | ISP101-PE225 Gi0/0 `.1` | PE side VRF ISP1012 |
| P3–ISP101-PE225 | `10.101.23.0/30` | P3 Gi0/1.225 `.2` GRT | ISP101-PE225 Gi0/1 `.1` | PE side VRF ISP1012 |
| P3–ISP101-PE202 | `10.101.13.4/30` | P3 Gi0/0.202 `.6` GRT | ISP101-PE202 Gi0/0 `.5` | PE side VRF ISP1011 |
| P4–ISP101-PE202 | `10.101.14.0/30` | P4 Gi0/1.202 `.2` GRT | ISP101-PE202 Gi0/1 `.1` | PE side VRF ISP1011 |
| P3–ISP101-RR1 | `10.101.23.4/30` | P3 Gi0/0.231 `.6` GRT | ISP101-RR1 Gi0/0 `.5` | RR side VRF ISP1012 |
| P4–ISP101-RR1 | `10.101.24.4/30` | P4 Gi0/1.231 `.6` GRT | ISP101-RR1 Gi0/1 `.5` | RR side VRF ISP1012 |
| ISP101-PE123–CsC-PE15 | `10.101.49.8/30` | ISP101-PE123 Gi0/2 `.9` GRT | CsC-PE15 Gi0/15 `.10` | CsC side VRF ISP101 |
| ISP101-PE123–CsC-PE16 | `10.101.49.12/30` | ISP101-PE123 Gi0/3 `.13` GRT | CsC-PE16 Gi0/15 `.14` | CsC side VRF ISP101 |
| ISP101-PE225–CsC-PE19 | `10.101.49.0/30` | ISP101-PE225 Gi0/2 `.1` GRT | CsC-PE19 Gi0/15 `.2` | CsC side VRF ISP101 |
| ISP101-PE225–CsC-PE20 | `10.101.49.4/30` | ISP101-PE225 Gi0/3 `.5` GRT | CsC-PE20 Gi0/15 `.6` | CsC side VRF ISP101 |

## P-router configurations

No `ip vrf`/`vrf definition` stanza is included.

### P1

```ios
hostname P1
!
interface Loopback1011
 vrf forwarding ISP1011
 ip address 10.101.0.1 255.255.255.255
!
interface Loopback1012
 vrf forwarding ISP1012
 ip address 10.101.5.1 255.255.255.255
!
interface GigabitEthernet0/1.10
 encapsulation dot1Q 10
 vrf forwarding ISP1011
 ip address 10.101.1.6 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1.20
 encapsulation dot1Q 20
 vrf forwarding ISP1012
 ip address 10.101.2.6 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/0.123
 encapsulation dot1Q 123
 ip address 10.101.11.2 255.255.255.252
 no shutdown
```

### P2

```ios
hostname P2
!
interface Loopback1011
 vrf forwarding ISP1011
 ip address 10.101.0.2 255.255.255.255
!
! AMBIGUOUS: the Site2 loopback label says "Lo1011: 10.101.5.2/32 vrf ISP1012".
! It cannot coexist with the preceding Loopback1011 in a different VRF.
!
interface GigabitEthernet0/1.10
 encapsulation dot1Q 10
 vrf forwarding ISP1011
 ip address 10.101.1.10 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1.20
 encapsulation dot1Q 20
 vrf forwarding ISP1012
 ip address 10.101.2.10 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1.123
 encapsulation dot1Q 123
 ip address 10.101.12.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/0.124
 encapsulation dot1Q 124
 ip address 10.100.12.10 255.255.255.252
 no shutdown
```

### P3

```ios
hostname P3
!
interface Loopback1011
 ! Diagram does not attach a VRF value to this label.
 ip address 10.101.0.3 255.255.255.255
!
interface Loopback1012
 ! Literal diagram value: Lo1012 is assigned to ISP1011.
 vrf forwarding ISP1011
 ip address 10.101.5.3 255.255.255.255
!
interface GigabitEthernet0/1.10
 encapsulation dot1Q 10
 vrf forwarding ISP1011
 ip address 10.101.1.14 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1.20
 encapsulation dot1Q 20
 vrf forwarding ISP1012
 ip address 10.101.2.14 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/0.225
 encapsulation dot1Q 225
 ip address 10.101.21.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1.225
 encapsulation dot1Q 225
 ip address 10.101.23.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/0.202
 encapsulation dot1Q 202
 ip address 10.101.13.6 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/0.231
 encapsulation dot1Q 231
 ip address 10.101.23.6 255.255.255.252
 no shutdown
```

### P4

```ios
hostname P4
!
interface Loopback1011
 vrf forwarding ISP1011
 ip address 10.101.0.4 255.255.255.255
!
interface Loopback1012
 vrf forwarding ISP1012
 ip address 10.101.5.4 255.255.255.255
!
interface GigabitEthernet0/1.10
 encapsulation dot1Q 10
 vrf forwarding ISP1011
 ip address 10.101.1.18 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1.20
 encapsulation dot1Q 20
 vrf forwarding ISP1012
 ip address 10.101.2.18 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1.124
 encapsulation dot1Q 124
 ip address 10.101.14.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1.202
 encapsulation dot1Q 202
 ip address 10.101.14.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1.231
 encapsulation dot1Q 231
 ip address 10.101.24.6 255.255.255.252
 no shutdown
```

### P5

```ios
hostname P5
!
interface Loopback1011
 vrf forwarding ISP1011
 ip address 10.101.0.5 255.255.255.255
!
interface Loopback1012
 vrf forwarding ISP1012
 ip address 10.101.5.5 255.255.255.255
!
interface GigabitEthernet0/1.10
 encapsulation dot1Q 10
 vrf forwarding ISP1011
 ip address 10.101.1.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1.20
 encapsulation dot1Q 20
 vrf forwarding ISP1012
 ip address 10.101.2.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/5.10
 encapsulation dot1Q 10
 vrf forwarding ISP1011
 ip address 10.101.1.5 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/5.20
 encapsulation dot1Q 20
 vrf forwarding ISP1012
 ip address 10.101.2.5 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/9.10
 encapsulation dot1Q 10
 vrf forwarding ISP1011
 ip address 10.101.1.9 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/9.20
 encapsulation dot1Q 20
 vrf forwarding ISP1012
 ip address 10.101.2.9 255.255.255.252
 no shutdown
```

### P6

```ios
hostname P6
!
interface Loopback1011
 vrf forwarding ISP1011
 ip address 10.101.0.6 255.255.255.255
!
interface Loopback1012
 vrf forwarding ISP1012
 ip address 10.101.5.6 255.255.255.255
!
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 vrf forwarding ISP1011
 ip address 10.101.1.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/0.20
 encapsulation dot1Q 20
 vrf forwarding ISP1012
 ip address 10.101.2.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/5.10
 encapsulation dot1Q 10
 vrf forwarding ISP1011
 ip address 10.101.1.13 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/5.20
 encapsulation dot1Q 20
 vrf forwarding ISP1012
 ip address 10.101.2.13 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/9.10
 encapsulation dot1Q 10
 vrf forwarding ISP1011
 ip address 10.101.1.17 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/9.20
 encapsulation dot1Q 20
 vrf forwarding ISP1012
 ip address 10.101.2.17 255.255.255.252
 no shutdown
```

## ISP101 PE configurations

### ISP101-PE123

```ios
hostname ISP101-PE123
!
interface Loopback0
 ip address 10.101.3.123 255.255.255.255
!
interface GigabitEthernet0/0
 description Toward P1 Gi0/0.123
 vrf forwarding ISP1011
 ip address 10.101.11.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 description Toward P2 Gi0/1.123
 vrf forwarding ISP1011
 ip address 10.101.12.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2
 description To CsC-PE15 Gi0/15
 ip address 10.101.49.9 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/3
 description To CsC-PE16 Gi0/15
 ip address 10.101.49.13 255.255.255.252
 no shutdown
```

### ISP101-PE124

```ios
hostname ISP101-PE124
!
interface Loopback0
 ip address 10.101.3.124 255.255.255.255
!
interface GigabitEthernet0/0
 description Toward P4 Gi0/1.124
 vrf forwarding ISP1011
 ip address 10.101.14.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 description Toward P2 Gi0/0.124
 vrf forwarding ISP1011
 ip address 10.100.12.9 255.255.255.252
 no shutdown
```

### ISP101-PE225

```ios
hostname ISP101-PE225
!
interface Loopback0
 ip address 10.101.3.225 255.255.255.255
!
interface GigabitEthernet0/0
 description Toward P3 Gi0/0.225
 vrf forwarding ISP1012
 ip address 10.101.21.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 description Toward P3 Gi0/1.225
 vrf forwarding ISP1012
 ip address 10.101.23.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2
 description To CsC-PE19 Gi0/15
 ip address 10.101.49.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/3
 description To CsC-PE20
 ip address 10.101.49.5 255.255.255.252
 no shutdown
```

### ISP101-PE202

```ios
hostname ISP101-PE202
!
interface Loopback0
 ip address 10.101.3.202 255.255.255.255
!
interface GigabitEthernet0/0
 description Toward P3 Gi0/0.202
 vrf forwarding ISP1011
 ip address 10.101.13.5 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 description Toward P4 Gi0/1.202
 vrf forwarding ISP1011
 ip address 10.101.14.1 255.255.255.252
 no shutdown
```

## ISP101 route-reflector configuration

```ios
hostname ISP101-RR1
!
interface Loopback0
 ip address 10.101.4.1 255.255.255.255
!
interface GigabitEthernet0/0
 description Toward P3 Gi0/0.231
 vrf forwarding ISP1012
 ip address 10.101.23.5 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 description Toward P4 Gi0/1.231
 vrf forwarding ISP1012
 ip address 10.101.24.5 255.255.255.252
 no shutdown
```

## CsC PE configurations

```ios
hostname CsC-PE15
interface Loopback0
 ip address 10.100.2.15 255.255.255.255
interface GigabitEthernet0/15
 description To ISP101-PE123 Gi0/2
 vrf forwarding ISP101
 ip address 10.101.49.10 255.255.255.252
 no shutdown
```

```ios
hostname CsC-PE16
interface Loopback0
 ip address 10.100.2.16 255.255.255.255
interface GigabitEthernet0/15
 description To ISP101-PE123 Gi0/3
 vrf forwarding ISP101
 ip address 10.101.49.14 255.255.255.252
 no shutdown
```

```ios
hostname CsC-PE19
interface Loopback1012
 ip address 10.101.50.19 255.255.255.255
interface GigabitEthernet0/15
 description To ISP101-PE225 Gi0/2
 vrf forwarding ISP101
 ip address 10.101.49.2 255.255.255.252
 no shutdown
```

```ios
hostname CsC-PE20
interface Loopback1012
 ip address 10.101.50.20 255.255.255.255
!
interface GigabitEthernet0/15
 description To ISP101-PE225 Gi0/3
 vrf forwarding ISP101
 ip address 10.101.49.6 255.255.255.252
 no shutdown
```

## Important diagram conflicts

1. `10.101.14.0/30` with endpoint addresses `.1/.2` is used for both P4–ISP101-PE124 and P4–ISP101-PE202, creating duplicate addresses on separate interfaces.
2. P2 Site2 loopback is labeled `Lo1011: 10.101.5.2/32 vrf ISP1012`, conflicting with P2's existing Lo1011 in ISP1011.
3. P3 Lo1011 has no VRF text. P3's `Lo1012: 10.101.5.3/32` is explicitly labeled `vrf ISP1011`, which is preserved literally.
4. VRF definitions, RDs, and route-targets are intentionally absent.

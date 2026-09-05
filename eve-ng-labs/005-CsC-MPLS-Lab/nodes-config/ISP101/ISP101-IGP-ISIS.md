# ISP101 IGP IS-IS configuration

## Source and design interpretation

This page is based on the **ISP101 IPv4** page in `005-CsC-MPLS-Lab-diagram.drawio`. The diagram is the source of truth for site membership, VRF placement, interfaces, Router IDs, and NETs. Switches and the EVE-NG `.unl` file are not used.

ISP101 is split into two independent IS-IS topologies:

- **Site1:** P-router infrastructure in VRF `ISP1011`, using IS-IS instance `ISP1011`. ISP101-PE123 and ISP101-PE124 participate from their global routing tables using IS-IS instance `ISP101`.
- **Site2:** P-router infrastructure in VRF `ISP1012`, using IS-IS instance `ISP1012`. ISP101-PE225, ISP101-PE202, and ISP101-RR1 participate from their global routing tables using IS-IS instance `ISP101`.

IS-IS process tags are locally significant, so a P router using `ISP1011` or `ISP1012` can form an adjacency with a PE or RR using `ISP101`. All NETs use area `49.0101`. The P-router system-ID families are `A100` for Site1 and `A200` for Site2; PE system IDs use `B000`, and the RR uses `C000`.

The diagram explicitly supplies the process tags and NETs. It does not explicitly state the IS-IS level or metric style. The configurations below use `is-type level-2-only`, `metric-style wide`, and `log-adjacency-changes`, matching the existing CsC provider IS-IS convention in this lab.

The CsC-facing links on ISP101-PE123 and ISP101-PE225 are not enabled in the ISP101 IGP. Those links are external attachments to the CsC carrier VRF rather than ISP101 core links.

## Site1

### Site1 membership

| Router | Routing table | IS-IS instance | NET |
|---|---|---|---|
| P1 | VRF ISP1011 | ISP1011 | `49.0101.A100.0000.0001.00` |
| P2 | VRF ISP1011 | ISP1011 | `49.0101.A100.0000.0002.00` |
| P3 | VRF ISP1011 | ISP1011 | `49.0101.A100.0000.0003.00` |
| P4 | VRF ISP1011 | ISP1011 | `49.0101.A100.0000.0004.00` |
| P5 | VRF ISP1011 | ISP1011 | `49.0101.A100.0000.0005.00` |
| P6 | VRF ISP1011 | ISP1011 | `49.0101.A100.0000.0006.00` |
| ISP101-PE123 | GRT | ISP101 | `49.0101.B000.0000.0123.00` |
| ISP101-PE124 | GRT | ISP101 | `49.0101.B000.0000.0124.00` |

### P1

```ios
interface Loopback1011
 ip router isis ISP1011
!
interface GigabitEthernet0/1.10
 ip router isis ISP1011
 isis network point-to-point
!
interface GigabitEthernet0/4.123
 ip router isis ISP1011
 isis network point-to-point
!
router isis ISP1011
 vrf ISP1011
 net 49.0101.A100.0000.0001.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
```

### P2

```ios
interface Loopback1011
 ip router isis ISP1011
!
interface GigabitEthernet0/1.10
 ip router isis ISP1011
 isis network point-to-point
!
interface GigabitEthernet0/4.123
 ip router isis ISP1011
 isis network point-to-point
!
interface GigabitEthernet0/6.124
 ip router isis ISP1011
 isis network point-to-point
!
router isis ISP1011
 vrf ISP1011
 net 49.0101.A100.0000.0002.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
```

### P3

```ios
interface Loopback1011
 ip router isis ISP1011
!
interface GigabitEthernet0/1.10
 ip router isis ISP1011
 isis network point-to-point
!
router isis ISP1011
 vrf ISP1011
 net 49.0101.A100.0000.0003.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
```

### P4

```ios
interface Loopback1011
 ip router isis ISP1011
!
interface GigabitEthernet0/1.10
 ip router isis ISP1011
 isis network point-to-point
!
interface GigabitEthernet0/6.124
 ip router isis ISP1011
 isis network point-to-point
!
router isis ISP1011
 vrf ISP1011
 net 49.0101.A100.0000.0004.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
```

### P5

```ios
interface Loopback1011
 ip router isis ISP1011
!
interface GigabitEthernet0/1.10
 ip router isis ISP1011
 isis network point-to-point
!
interface GigabitEthernet0/5.10
 ip router isis ISP1011
 isis network point-to-point
!
interface GigabitEthernet0/9.10
 ip router isis ISP1011
 isis network point-to-point
!
router isis ISP1011
 vrf ISP1011
 net 49.0101.A100.0000.0005.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
```

### P6

```ios
interface Loopback1011
 ip router isis ISP1011
!
interface GigabitEthernet0/1.10
 ip router isis ISP1011
 isis network point-to-point
!
interface GigabitEthernet0/5.10
 ip router isis ISP1011
 isis network point-to-point
!
interface GigabitEthernet0/9.10
 ip router isis ISP1011
 isis network point-to-point
!
router isis ISP1011
 vrf ISP1011
 net 49.0101.A100.0000.0006.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
```

### ISP101-PE123

```ios
interface Loopback0
 ip router isis ISP101
!
interface GigabitEthernet0/0.123
 ip router isis ISP101
 isis network point-to-point
!
interface GigabitEthernet0/1.123
 ip router isis ISP101
 isis network point-to-point
!
router isis ISP101
 net 49.0101.B000.0000.0123.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
```

### ISP101-PE124

```ios
interface Loopback0
 ip router isis ISP101
!
interface GigabitEthernet0/0.124
 ip router isis ISP101
 isis network point-to-point
!
interface GigabitEthernet0/1.124
 ip router isis ISP101
 isis network point-to-point
!
router isis ISP101
 net 49.0101.B000.0000.0124.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
```

## Site2

### Site2 membership

| Router | Routing table | IS-IS instance | NET |
|---|---|---|---|
| P1 | VRF ISP1012 | ISP1012 | `49.0101.A200.0000.0001.00` |
| P2 | VRF ISP1012 | ISP1012 | `49.0101.A200.0000.0002.00` |
| P3 | VRF ISP1012 | ISP1012 | `49.0101.A200.0000.0003.00` |
| P4 | VRF ISP1012 | ISP1012 | `49.0101.A200.0000.0004.00` |
| P5 | VRF ISP1012 | ISP1012 | `49.0101.A200.0000.0005.00` |
| P6 | VRF ISP1012 | ISP1012 | `49.0101.A200.0000.0006.00` |
| ISP101-PE225 | GRT | ISP101 | `49.0101.B000.0000.0225.00` |
| ISP101-PE202 | GRT | ISP101 | `49.0101.B000.0000.0202.00` |
| ISP101-RR1 | GRT | ISP101 | `49.0101.C000.0000.0001.00` |

### P1

```ios
interface Loopback1012
 ip router isis ISP1012
!
interface GigabitEthernet0/1.20
 ip router isis ISP1012
 isis network point-to-point
!
interface GigabitEthernet0/7.225
 ip router isis ISP1012
 isis network point-to-point
!
router isis ISP1012
 vrf ISP1012
 net 49.0101.A200.0000.0001.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
```

### P2

```ios
interface Loopback1012
 ip router isis ISP1012
!
interface GigabitEthernet0/1.20
 ip router isis ISP1012
 isis network point-to-point
!
router isis ISP1012
 vrf ISP1012
 net 49.0101.A200.0000.0002.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
```

### P3

```ios
interface Loopback1012
 ip router isis ISP1012
!
interface GigabitEthernet0/1.20
 ip router isis ISP1012
 isis network point-to-point
!
interface GigabitEthernet0/4.202
 ip router isis ISP1012
 isis network point-to-point
!
interface GigabitEthernet0/5.231
 ip router isis ISP1012
 isis network point-to-point
!
interface GigabitEthernet0/7.225
 ip router isis ISP1012
 isis network point-to-point
!
router isis ISP1012
 vrf ISP1012
 net 49.0101.A200.0000.0003.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
```

### P4

```ios
interface Loopback1012
 ip router isis ISP1012
!
interface GigabitEthernet0/1.20
 ip router isis ISP1012
 isis network point-to-point
!
interface GigabitEthernet0/4.202
 ip router isis ISP1012
 isis network point-to-point
!
interface GigabitEthernet0/5.231
 ip router isis ISP1012
 isis network point-to-point
!
router isis ISP1012
 vrf ISP1012
 net 49.0101.A200.0000.0004.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
```

### P5

```ios
interface Loopback1012
 ip router isis ISP1012
!
interface GigabitEthernet0/1.20
 ip router isis ISP1012
 isis network point-to-point
!
interface GigabitEthernet0/5.20
 ip router isis ISP1012
 isis network point-to-point
!
interface GigabitEthernet0/9.20
 ip router isis ISP1012
 isis network point-to-point
!
router isis ISP1012
 vrf ISP1012
 net 49.0101.A200.0000.0005.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
```

### P6

```ios
interface Loopback1012
 ip router isis ISP1012
!
interface GigabitEthernet0/1.20
 ip router isis ISP1012
 isis network point-to-point
!
interface GigabitEthernet0/5.20
 ip router isis ISP1012
 isis network point-to-point
!
interface GigabitEthernet0/9.20
 ip router isis ISP1012
 isis network point-to-point
!
router isis ISP1012
 vrf ISP1012
 net 49.0101.A200.0000.0006.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
```

### ISP101-PE225

```ios
interface Loopback0
 ip router isis ISP101
!
interface GigabitEthernet0/0.225
 ip router isis ISP101
 isis network point-to-point
!
interface GigabitEthernet0/1.225
 ip router isis ISP101
 isis network point-to-point
!
router isis ISP101
 net 49.0101.B000.0000.0225.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
```

### ISP101-PE202

```ios
interface Loopback0
 ip router isis ISP101
!
interface GigabitEthernet0/0.202
 ip router isis ISP101
 isis network point-to-point
!
interface GigabitEthernet0/1.202
 ip router isis ISP101
 isis network point-to-point
!
router isis ISP101
 net 49.0101.B000.0000.0202.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
```

### ISP101-RR1

```ios
interface Loopback0
 ip router isis ISP101
!
interface GigabitEthernet0/0.231
 ip router isis ISP101
 isis network point-to-point
!
interface GigabitEthernet0/1.231
 ip router isis ISP101
 isis network point-to-point
!
router isis ISP101
 net 49.0101.C000.0000.0001.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
```

## Verification commands

```ios
show isis neighbors
show isis database
show ip route isis
show ip route vrf ISP1011 isis
show ip route vrf ISP1012 isis
show clns protocol
```

Expected separation:

- `show ip route vrf ISP1011 isis` displays only Site1 infrastructure and Site1 PE loopbacks.
- `show ip route vrf ISP1012 isis` displays only Site2 infrastructure, Site2 PE loopbacks, and the ISP101-RR1 loopback.
- GRT IS-IS routes on Site1 PE routers remain separate from GRT IS-IS routes on Site2 PE/RR routers because there is no ISP101 IGP link joining the two site topologies.

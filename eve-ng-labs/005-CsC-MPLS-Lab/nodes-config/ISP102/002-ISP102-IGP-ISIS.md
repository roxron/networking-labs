# ISP102 IGP IS-IS configuration

Apply after base interfaces and switch VLAN transport. Site1 includes PE28, PE29 and RR11; Site2 includes PE30 and PE31. Shared P routers have separate ISP1021 and ISP1022 processes. PE/RR processes use tag ISP102 in GRT. Level-2-only, wide metrics and point-to-point interface mode follow the existing lab convention. CsC-facing links do not participate in this IGP.

# Site 1

## P1

```ios
router isis ISP1021
 vrf ISP1021
 net 49.0102.A100.0000.0001.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1021
!
interface Loopback1021
 ip router isis ISP1021
!
interface GigabitEthernet0/2.10
 ip router isis ISP1021
 isis network point-to-point
!
interface GigabitEthernet0/5.328
 ip router isis ISP1021
 isis network point-to-point
!
interface GigabitEthernet0/7.311
 ip router isis ISP1021
 isis network point-to-point
!
```

## P2

```ios
router isis ISP1021
 vrf ISP1021
 net 49.0102.A100.0000.0002.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1021
!
interface Loopback1021
 ip router isis ISP1021
!
interface GigabitEthernet0/2.10
 ip router isis ISP1021
 isis network point-to-point
!
interface GigabitEthernet0/5.328
 ip router isis ISP1021
 isis network point-to-point
!
```

## P3

```ios
router isis ISP1021
 vrf ISP1021
 net 49.0102.A100.0000.0003.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1021
!
interface Loopback1021
 ip router isis ISP1021
!
interface GigabitEthernet0/2.10
 ip router isis ISP1021
 isis network point-to-point
!
interface GigabitEthernet0/5.329
 ip router isis ISP1021
 isis network point-to-point
!
interface GigabitEthernet0/6.311
 ip router isis ISP1021
 isis network point-to-point
!
```

## P4

```ios
router isis ISP1021
 vrf ISP1021
 net 49.0102.A100.0000.0004.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1021
!
interface Loopback1021
 ip router isis ISP1021
!
interface GigabitEthernet0/2.10
 ip router isis ISP1021
 isis network point-to-point
!
interface GigabitEthernet0/5.329
 ip router isis ISP1021
 isis network point-to-point
!
```

## P5

```ios
router isis ISP1021
 vrf ISP1021
 net 49.0102.A100.0000.0005.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1021
!
interface Loopback1021
 ip router isis ISP1021
!
interface GigabitEthernet0/2.10
 ip router isis ISP1021
 isis network point-to-point
!
interface GigabitEthernet0/6.10
 ip router isis ISP1021
 isis network point-to-point
!
interface GigabitEthernet0/10.10
 ip router isis ISP1021
 isis network point-to-point
!
```

## P6

```ios
router isis ISP1021
 vrf ISP1021
 net 49.0102.A100.0000.0006.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1021
!
interface Loopback1021
 ip router isis ISP1021
!
interface GigabitEthernet0/2.10
 ip router isis ISP1021
 isis network point-to-point
!
interface GigabitEthernet0/6.10
 ip router isis ISP1021
 isis network point-to-point
!
interface GigabitEthernet0/10.10
 ip router isis ISP1021
 isis network point-to-point
!
```

## ISP102-PE28

```ios
router isis ISP102
 net 49.0102.B000.0000.0028.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback0
!
interface Loopback0
 ip router isis ISP102
!
interface GigabitEthernet0/0.328
 ip router isis ISP102
 isis network point-to-point
!
interface GigabitEthernet0/1.328
 ip router isis ISP102
 isis network point-to-point
!
```

## ISP102-PE29

```ios
router isis ISP102
 net 49.0102.B000.0000.0029.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback0
!
interface Loopback0
 ip router isis ISP102
!
interface GigabitEthernet0/1.329
 ip router isis ISP102
 isis network point-to-point
!
interface GigabitEthernet0/0.329
 ip router isis ISP102
 isis network point-to-point
!
```

## ISP102-RR11

```ios
router isis ISP102
 net 49.0102.C000.0000.0011.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback0
!
interface Loopback0
 ip router isis ISP102
!
interface GigabitEthernet0/0.311
 ip router isis ISP102
 isis network point-to-point
!
interface GigabitEthernet0/1.311
 ip router isis ISP102
 isis network point-to-point
!
```

# Site 2

## P1

```ios
router isis ISP1022
 vrf ISP1022
 net 49.0102.A200.0000.0001.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1022
!
interface Loopback1022
 ip router isis ISP1022
!
interface GigabitEthernet0/6.331
 ip router isis ISP1022
 isis network point-to-point
!
interface GigabitEthernet0/2.20
 ip router isis ISP1022
 isis network point-to-point
!
```

## P2

```ios
router isis ISP1022
 vrf ISP1022
 net 49.0102.A200.0000.0002.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1022
!
interface Loopback1022
 ip router isis ISP1022
!
interface GigabitEthernet0/6.330
 ip router isis ISP1022
 isis network point-to-point
!
interface GigabitEthernet0/2.20
 ip router isis ISP1022
 isis network point-to-point
!
```

## P3

```ios
router isis ISP1022
 vrf ISP1022
 net 49.0102.A200.0000.0003.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1022
!
interface Loopback1022
 ip router isis ISP1022
!
interface GigabitEthernet0/6.331
 ip router isis ISP1022
 isis network point-to-point
!
interface GigabitEthernet0/2.20
 ip router isis ISP1022
 isis network point-to-point
!
```

## P4

```ios
router isis ISP1022
 vrf ISP1022
 net 49.0102.A200.0000.0004.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1022
!
interface Loopback1022
 ip router isis ISP1022
!
interface GigabitEthernet0/6.330
 ip router isis ISP1022
 isis network point-to-point
!
interface GigabitEthernet0/2.20
 ip router isis ISP1022
 isis network point-to-point
!
```

## P5

```ios
router isis ISP1022
 vrf ISP1022
 net 49.0102.A200.0000.0005.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1022
!
interface Loopback1022
 ip router isis ISP1022
!
interface GigabitEthernet0/2.20
 ip router isis ISP1022
 isis network point-to-point
!
interface GigabitEthernet0/10.20
 ip router isis ISP1022
 isis network point-to-point
!
interface GigabitEthernet0/6.20
 ip router isis ISP1022
 isis network point-to-point
!
```

## P6

```ios
router isis ISP1022
 vrf ISP1022
 net 49.0102.A200.0000.0006.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1022
!
interface Loopback1022
 ip router isis ISP1022
!
interface GigabitEthernet0/2.20
 ip router isis ISP1022
 isis network point-to-point
!
interface GigabitEthernet0/6.20
 ip router isis ISP1022
 isis network point-to-point
!
interface GigabitEthernet0/10.20
 ip router isis ISP1022
 isis network point-to-point
!
```

## ISP102-PE30

```ios
router isis ISP102
 net 49.0102.B000.0000.0030.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback0
!
interface Loopback0
 ip router isis ISP102
!
interface GigabitEthernet0/1.330
 ip router isis ISP102
 isis network point-to-point
!
interface GigabitEthernet0/0.330
 ip router isis ISP102
 isis network point-to-point
!
```

## ISP102-PE31

```ios
router isis ISP102
 net 49.0102.B000.0000.0031.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback0
!
interface Loopback0
 ip router isis ISP102
!
interface GigabitEthernet0/0.331
 ip router isis ISP102
 isis network point-to-point
!
interface GigabitEthernet0/1.331
 ip router isis ISP102
 isis network point-to-point
!
```

## Verification

```ios
show isis neighbors
show isis database
show ip route vrf ISP1021 isis
show ip route vrf ISP1022 isis
```

On PE/RR routers use `show ip route isis`. Expect all site-local PE/RR and infrastructure /32s; verify both uplinks on each PE and RR.

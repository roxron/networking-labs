# ISP103 IGP IS-IS configuration

Apply after base interfaces and switch VLAN transport. Site1 includes PE33, PE34 and RR37; Site2 includes PE36 and PE35. Shared P routers have separate ISP1031 and ISP1032 processes. PE/RR processes use tag ISP103 in GRT. Level-2-only, wide metrics and point-to-point interface mode follow the existing lab convention. CsC-facing links do not participate in this IGP.

# Site 1

## P1

```ios
router isis ISP1031
 vrf ISP1031
 net 49.0103.A100.0000.0001.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1031
!
interface Loopback1031
 ip router isis ISP1031
!
interface GigabitEthernet0/3.10
 ip router isis ISP1031
 isis network point-to-point
!
interface GigabitEthernet0/5.433
 ip router isis ISP1031
 isis network point-to-point
!
interface GigabitEthernet0/6.437
 ip router isis ISP1031
 isis network point-to-point
!
```

## P2

```ios
router isis ISP1031
 vrf ISP1031
 net 49.0103.A100.0000.0002.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1031
!
interface Loopback1031
 ip router isis ISP1031
!
interface GigabitEthernet0/3.10
 ip router isis ISP1031
 isis network point-to-point
!
interface GigabitEthernet0/5.433
 ip router isis ISP1031
 isis network point-to-point
!
```

## P3

```ios
router isis ISP1031
 vrf ISP1031
 net 49.0103.A100.0000.0003.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1031
!
interface Loopback1031
 ip router isis ISP1031
!
interface GigabitEthernet0/3.10
 ip router isis ISP1031
 isis network point-to-point
!
interface GigabitEthernet0/5.434
 ip router isis ISP1031
 isis network point-to-point
!
interface GigabitEthernet0/6.437
 ip router isis ISP1031
 isis network point-to-point
!
```

## P4

```ios
router isis ISP1031
 vrf ISP1031
 net 49.0103.A100.0000.0004.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1031
!
interface Loopback1031
 ip router isis ISP1031
!
interface GigabitEthernet0/3.10
 ip router isis ISP1031
 isis network point-to-point
!
interface GigabitEthernet0/5.434
 ip router isis ISP1031
 isis network point-to-point
!
```

## P5

```ios
router isis ISP1031
 vrf ISP1031
 net 49.0103.A100.0000.0005.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1031
!
interface Loopback1031
 ip router isis ISP1031
!
interface GigabitEthernet0/3.10
 ip router isis ISP1031
 isis network point-to-point
!
interface GigabitEthernet0/7.10
 ip router isis ISP1031
 isis network point-to-point
!
interface GigabitEthernet0/11.10
 ip router isis ISP1031
 isis network point-to-point
!
```

## P6

```ios
router isis ISP1031
 vrf ISP1031
 net 49.0103.A100.0000.0006.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1031
!
interface Loopback1031
 ip router isis ISP1031
!
interface GigabitEthernet0/3.10
 ip router isis ISP1031
 isis network point-to-point
!
interface GigabitEthernet0/7.10
 ip router isis ISP1031
 isis network point-to-point
!
interface GigabitEthernet0/11.10
 ip router isis ISP1031
 isis network point-to-point
!
```

## ISP103-PE33

```ios
router isis ISP103
 net 49.0103.B000.0000.0033.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback0
!
interface Loopback0
 ip router isis ISP103
!
interface GigabitEthernet0/0.433
 ip router isis ISP103
 isis network point-to-point
!
interface GigabitEthernet0/1.433
 ip router isis ISP103
 isis network point-to-point
!
```

## ISP103-PE34

```ios
router isis ISP103
 net 49.0103.B000.0000.0034.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback0
!
interface Loopback0
 ip router isis ISP103
!
interface GigabitEthernet0/1.434
 ip router isis ISP103
 isis network point-to-point
!
interface GigabitEthernet0/0.434
 ip router isis ISP103
 isis network point-to-point
!
```

## ISP103-RR37

```ios
router isis ISP103
 net 49.0103.C000.0000.0037.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback0
!
interface Loopback0
 ip router isis ISP103
!
interface GigabitEthernet0/0.437
 ip router isis ISP103
 isis network point-to-point
!
interface GigabitEthernet0/1.437
 ip router isis ISP103
 isis network point-to-point
!
```

# Site 2

## P1

```ios
router isis ISP1032
 vrf ISP1032
 net 49.0103.A200.0000.0001.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1032
!
interface Loopback1032
 ip router isis ISP1032
!
interface GigabitEthernet0/6.435
 ip router isis ISP1032
 isis network point-to-point
!
interface GigabitEthernet0/3.20
 ip router isis ISP1032
 isis network point-to-point
!
```

## P2

```ios
router isis ISP1032
 vrf ISP1032
 net 49.0103.A200.0000.0002.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1032
!
interface Loopback1032
 ip router isis ISP1032
!
interface GigabitEthernet0/6.436
 ip router isis ISP1032
 isis network point-to-point
!
interface GigabitEthernet0/3.20
 ip router isis ISP1032
 isis network point-to-point
!
```

## P3

```ios
router isis ISP1032
 vrf ISP1032
 net 49.0103.A200.0000.0003.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1032
!
interface Loopback1032
 ip router isis ISP1032
!
interface GigabitEthernet0/6.435
 ip router isis ISP1032
 isis network point-to-point
!
interface GigabitEthernet0/3.20
 ip router isis ISP1032
 isis network point-to-point
!
```

## P4

```ios
router isis ISP1032
 vrf ISP1032
 net 49.0103.A200.0000.0004.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1032
!
interface Loopback1032
 ip router isis ISP1032
!
interface GigabitEthernet0/6.436
 ip router isis ISP1032
 isis network point-to-point
!
interface GigabitEthernet0/3.20
 ip router isis ISP1032
 isis network point-to-point
!
```

## P5

```ios
router isis ISP1032
 vrf ISP1032
 net 49.0103.A200.0000.0005.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1032
!
interface Loopback1032
 ip router isis ISP1032
!
interface GigabitEthernet0/3.20
 ip router isis ISP1032
 isis network point-to-point
!
interface GigabitEthernet0/11.20
 ip router isis ISP1032
 isis network point-to-point
!
interface GigabitEthernet0/7.20
 ip router isis ISP1032
 isis network point-to-point
!
```

## P6

```ios
router isis ISP1032
 vrf ISP1032
 net 49.0103.A200.0000.0006.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback1032
!
interface Loopback1032
 ip router isis ISP1032
!
interface GigabitEthernet0/3.20
 ip router isis ISP1032
 isis network point-to-point
!
interface GigabitEthernet0/7.20
 ip router isis ISP1032
 isis network point-to-point
!
interface GigabitEthernet0/11.20
 ip router isis ISP1032
 isis network point-to-point
!
```

## ISP103-PE36

```ios
router isis ISP103
 net 49.0103.B000.0000.0036.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback0
!
interface Loopback0
 ip router isis ISP103
!
interface GigabitEthernet0/1.436
 ip router isis ISP103
 isis network point-to-point
!
interface GigabitEthernet0/0.436
 ip router isis ISP103
 isis network point-to-point
!
```

## ISP103-PE35

```ios
router isis ISP103
 net 49.0103.B000.0000.0035.00
 is-type level-2-only
 metric-style wide
 log-adjacency-changes
 passive-interface Loopback0
!
interface Loopback0
 ip router isis ISP103
!
interface GigabitEthernet0/0.435
 ip router isis ISP103
 isis network point-to-point
!
interface GigabitEthernet0/1.435
 ip router isis ISP103
 isis network point-to-point
!
```

## Verification

```ios
show isis neighbors
show isis database
show ip route vrf ISP1031 isis
show ip route vrf ISP1032 isis
```

On PE/RR routers use `show ip route isis`. Expect all site-local PE/RR and infrastructure /32s; verify both uplinks on each PE and RR.

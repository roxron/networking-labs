# ISP100 IPv4 base interface configurations

## Source and scope

This page documents the `10.100.0.0/16` CsC carrier infrastructure shown on the **CsC Carrier IPv4** page of `005-CsC-MPLS-Lab-diagram.drawio`. In this document, that infrastructure is referred to as **ISP100**.

The draw.io page is the topology source of truth. Uploaded router configurations were used to confirm hostnames, complete addresses, interface state, IS-IS activation, and MPLS activation. The EVE-NG `.unl` file is not used. Switch configurations are outside this document.

EVE-NG does not export the VLAN database reliably into startup-config files. Therefore, missing switch `vlan` definitions are not treated as discrepancies. VLAN IDs and switch paths below come from the diagram.

All ISP100 routed interfaces are in the global routing table. No `vrf forwarding` commands or VRF definitions belong in these base configurations. Customer-facing interfaces, including the ISP101 VRF attachments on CsC PE routers, are intentionally excluded.

## Router inventory

| Role | Routers | Router-ID loopbacks |
|---|---|---|
| P | P1–P6 | `10.100.1.1/32`–`10.100.1.6/32` |
| PE | CsC-PE15–CsC-PE20 | `10.100.2.15/32`–`10.100.2.20/32` |
| RR | CsC-RR21, CsC-RR22 | `10.100.3.21/32`, `10.100.3.22/32` |

## Link inventory

| Prefix | Endpoint A | Endpoint B | Transport |
|---|---|---|---|
| `10.100.0.0/30` | P5 Gi0/0 `.1` | P6 Gi0/0 `.2` | Direct |
| `10.100.0.4/30` | P5 Gi0/4 `.5` | P1 Gi0/0 `.6` | Direct |
| `10.100.0.8/30` | P5 Gi0/8 `.9` | P2 Gi0/0 `.10` | Direct |
| `10.100.0.12/30` | P6 Gi0/4 `.13` | P3 Gi0/0 `.14` | Direct |
| `10.100.0.16/30` | P6 Gi0/8 `.17` | P4 Gi0/0 `.18` | Direct |
| `10.100.11.0/30` | P1 Gi0/4.100 `.1` | CsC-PE15 Gi0/0.100 `.2` | VLAN100-SW27 |
| `10.100.11.4/30` | P1 Gi0/5.101 `.5` | CsC-PE16 Gi0/0.101 `.6` | VLAN101-SW27 |
| `10.100.11.8/30` | P1 Gi0/6.100 `.9` | CsC-PE19 Gi0/0.100 `.10` | VLAN100-SW29 |
| `10.100.11.12/30` | P1 Gi0/7.101 `.13` | CsC-PE20 Gi0/0.101 `.14` | VLAN101-SW29 |
| `10.100.12.0/30` | P2 Gi0/4.101 `.1` | CsC-PE15 Gi0/1.101 `.2` | VLAN101-SW28 |
| `10.100.12.4/30` | P2 Gi0/5.100 `.5` | CsC-PE16 Gi0/1.100 `.6` | VLAN100-SW28 |
| `10.100.12.8/30` | P2 Gi0/6.100 `.9` | CsC-PE17 Gi0/0.100 `.10` | VLAN100-SW214 |
| `10.100.12.12/30` | P2 Gi0/7.101 `.13` | CsC-PE18 Gi0/0.101 `.14` | VLAN101-SW214 |
| `10.100.13.0/30` | P3 Gi0/6.101 `.1` | CsC-PE19 Gi0/1.101 `.2` | VLAN101-SW212 |
| `10.100.13.4/30` | P3 Gi0/7.100 `.5` | CsC-PE20 Gi0/1.100 `.6` | VLAN100-SW212 |
| `10.100.13.8/30` | P3 Gi0/4.100 `.9` | CsC-RR21 Gi0/0.100 `.10` | VLAN100-SW211 |
| `10.100.13.12/30` | P3 Gi0/5.101 `.13` | CsC-RR22 Gi0/0.101 `.14` | VLAN101-SW211 |
| `10.100.14.0/30` | P4 Gi0/6.100 `.1` | CsC-PE17 Gi0/1.100 `.2` | VLAN100-SW213 |
| `10.100.14.4/30` | P4 Gi0/7.101 `.5` | CsC-PE18 Gi0/1.101 `.6` | VLAN101-SW213 |
| `10.100.14.8/30` | P4 Gi0/4.101 `.9` | CsC-RR21 Gi0/1.101 `.10` | VLAN101-SW210 |
| `10.100.14.12/30` | P4 Gi0/5.100 `.13` | CsC-RR22 Gi0/1.100 `.14` | VLAN100-SW210 |

## P-router configurations

### P1

```ios
hostname P1
!
interface Loopback0
 description RouterID
 ip address 10.100.1.1 255.255.255.255
 ip router isis CsC
 no shutdown
!
interface GigabitEthernet0/0
 description Link to P5 int g0/4
 ip address 10.100.0.6 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/4.100
 description Link to CsC-PE15 int g0/0.100 via VLAN100-SW27
 encapsulation dot1Q 100
 ip address 10.100.11.1 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/5.101
 description Link to CsC-PE16 int g0/0.101 via VLAN101-SW27
 encapsulation dot1Q 101
 ip address 10.100.11.5 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/6.100
 description Link to CsC-PE19 int g0/0.100 via VLAN100-SW29
 encapsulation dot1Q 100
 ip address 10.100.11.9 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/7.101
 description Link to CsC-PE20 int g0/0.101 via VLAN101-SW29
 encapsulation dot1Q 101
 ip address 10.100.11.13 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
```

### P2

```ios
hostname P2
!
interface Loopback0
 description RouterID
 ip address 10.100.1.2 255.255.255.255
 ip router isis CsC
 no shutdown
!
interface GigabitEthernet0/0
 description Link to P5 int g0/8
 ip address 10.100.0.10 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/4.101
 description Link to CsC-PE15 int g0/1.101 via VLAN101-SW28
 encapsulation dot1Q 101
 ip address 10.100.12.1 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/5.100
 description Link to CsC-PE16 int g0/1.100 via VLAN100-SW28
 encapsulation dot1Q 100
 ip address 10.100.12.5 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/6.100
 description Link to CsC-PE17 int g0/0.100 via VLAN100-SW214
 encapsulation dot1Q 100
 ip address 10.100.12.9 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/7.101
 description Link to CsC-PE18 int g0/0.101 via VLAN101-SW214
 encapsulation dot1Q 101
 ip address 10.100.12.13 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
```

### P3

```ios
hostname P3
!
interface Loopback0
 description RouterID
 ip address 10.100.1.3 255.255.255.255
 ip router isis CsC
 no shutdown
!
interface GigabitEthernet0/0
 description Link to P6 int g0/4
 ip address 10.100.0.14 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/4.100
 description Link to CsC-RR21 int g0/0.100 via VLAN100-SW211
 encapsulation dot1Q 100
 ip address 10.100.13.9 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/5.101
 description Link to CsC-RR22 int g0/0.101 via VLAN101-SW211
 encapsulation dot1Q 101
 ip address 10.100.13.13 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/6.101
 description Link to CsC-PE19 int g0/1.101 via VLAN101-SW212
 encapsulation dot1Q 101
 ip address 10.100.13.1 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/7.100
 description Link to CsC-PE20 int g0/1.100 via VLAN100-SW212
 encapsulation dot1Q 100
 ip address 10.100.13.5 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
```

### P4

```ios
hostname P4
!
interface Loopback0
 description RouterID
 ip address 10.100.1.4 255.255.255.255
 ip router isis CsC
 no shutdown
!
interface GigabitEthernet0/0
 description Link to P6 int g0/8
 ip address 10.100.0.18 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/4.101
 description Link to CsC-RR21 int g0/1.101 via VLAN101-SW210
 encapsulation dot1Q 101
 ip address 10.100.14.9 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/5.100
 description Link to CsC-RR22 int g0/1.100 via VLAN100-SW210
 encapsulation dot1Q 100
 ip address 10.100.14.13 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/6.100
 description Link to CsC-PE17 int g0/1.100 via VLAN100-SW213
 encapsulation dot1Q 100
 ip address 10.100.14.1 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/7.101
 description Link to CsC-PE18 int g0/1.101 via VLAN101-SW213
 encapsulation dot1Q 101
 ip address 10.100.14.5 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
```

### P5

```ios
hostname P5
!
interface Loopback0
 description RouterID
 ip address 10.100.1.5 255.255.255.255
 ip router isis CsC
 no shutdown
!
interface GigabitEthernet0/0
 description Link to P6 int g0/0
 ip address 10.100.0.1 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/4
 description Link to P1 int g0/0
 ip address 10.100.0.5 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/8
 description Link to P2 int g0/0
 ip address 10.100.0.9 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
```

### P6

```ios
hostname P6
!
interface Loopback0
 description RouterID
 ip address 10.100.1.6 255.255.255.255
 ip router isis CsC
 no shutdown
!
interface GigabitEthernet0/0
 description Link to P5 int g0/0
 ip address 10.100.0.2 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/4
 description Link to P3 int g0/0
 ip address 10.100.0.13 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/8
 description Link to P4 int g0/0
 ip address 10.100.0.17 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
```

## PE-router configurations

### CsC-PE15

```ios
hostname CsC-PE15
!
interface Loopback0
 description RouterID
 ip address 10.100.2.15 255.255.255.255
 ip router isis CsC
 no shutdown
!
interface GigabitEthernet0/0.100
 description Link to P1 int g0/4.100 via VLAN100-SW27
 encapsulation dot1Q 100
 ip address 10.100.11.2 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/1.101
 description Link to P2 int g0/4.101 via VLAN101-SW28
 encapsulation dot1Q 101
 ip address 10.100.12.2 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
```

### CsC-PE16

```ios
hostname CsC-PE16
!
interface Loopback0
 description RouterID
 ip address 10.100.2.16 255.255.255.255
 ip router isis CsC
 no shutdown
!
interface GigabitEthernet0/0.101
 description Link to P1 int g0/5.101 via VLAN101-SW27
 encapsulation dot1Q 101
 ip address 10.100.11.6 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/1.100
 description Link to P2 int g0/5.100 via VLAN100-SW28
 encapsulation dot1Q 100
 ip address 10.100.12.6 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
```

### CsC-PE17

```ios
hostname CsC-PE17
!
interface Loopback0
 description RouterID
 ip address 10.100.2.17 255.255.255.255
 ip router isis CsC
 no shutdown
!
interface GigabitEthernet0/0.100
 description Link to P2 int g0/6.100 via VLAN100-SW214
 encapsulation dot1Q 100
 ip address 10.100.12.10 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/1.100
 description Link to P4 int g0/6.100 via VLAN100-SW213
 encapsulation dot1Q 100
 ip address 10.100.14.2 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
```

### CsC-PE18

```ios
hostname CsC-PE18
!
interface Loopback0
 description RouterID
 ip address 10.100.2.18 255.255.255.255
 ip router isis CsC
 no shutdown
!
interface GigabitEthernet0/0.101
 description Link to P2 int g0/7.101 via VLAN101-SW214
 encapsulation dot1Q 101
 ip address 10.100.12.14 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/1.101
 description Link to P4 int g0/7.101 via VLAN101-SW213
 encapsulation dot1Q 101
 ip address 10.100.14.6 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
```

### CsC-PE19

```ios
hostname CsC-PE19
!
interface Loopback0
 description RouterID
 ip address 10.100.2.19 255.255.255.255
 ip router isis CsC
 no shutdown
!
interface GigabitEthernet0/0.100
 description Link to P1 int g0/6.100 via VLAN100-SW29
 encapsulation dot1Q 100
 ip address 10.100.11.10 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/1.101
 description Link to P3 int g0/6.101 via VLAN101-SW212
 encapsulation dot1Q 101
 ip address 10.100.13.2 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
```

### CsC-PE20

```ios
hostname CsC-PE20
!
interface Loopback0
 description RouterID
 ip address 10.100.2.20 255.255.255.255
 ip router isis CsC
 no shutdown
!
interface GigabitEthernet0/0.101
 description Link to P1 int g0/7.101 via VLAN101-SW29
 encapsulation dot1Q 101
 ip address 10.100.11.14 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/1.100
 description Link to P3 int g0/7.100 via VLAN100-SW212
 encapsulation dot1Q 100
 ip address 10.100.13.6 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
```

## Route-reflector configurations

### CsC-RR21

```ios
hostname CsC-RR21
!
interface Loopback0
 description RouterID
 ip address 10.100.3.21 255.255.255.255
 ip router isis CsC
 no shutdown
!
interface GigabitEthernet0/0.100
 description Link to P3 int g0/4.100 via VLAN100-SW211
 encapsulation dot1Q 100
 ip address 10.100.13.10 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/1.101
 description Link to P4 int g0/4.101 via VLAN101-SW210
 encapsulation dot1Q 101
 ip address 10.100.14.10 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
```

### CsC-RR22

```ios
hostname CsC-RR22
!
interface Loopback0
 description RouterID
 ip address 10.100.3.22 255.255.255.255
 ip router isis CsC
 no shutdown
!
interface GigabitEthernet0/0.101
 description Link to P3 int g0/5.101 via VLAN101-SW211
 encapsulation dot1Q 101
 ip address 10.100.13.14 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
!
interface GigabitEthernet0/1.100
 description Link to P4 int g0/5.100 via VLAN100-SW210
 encapsulation dot1Q 100
 ip address 10.100.14.14 255.255.255.252
 ip router isis CsC
 mpls ip
 isis network point-to-point
 no shutdown
```

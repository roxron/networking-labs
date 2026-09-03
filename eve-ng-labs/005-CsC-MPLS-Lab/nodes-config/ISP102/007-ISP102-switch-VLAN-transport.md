# ISP102 switch VLAN transport

Apply before IS-IS and MPLS. These additions carry the tagged router subinterfaces through the local switches shown on the ISP102 page. The VLANs terminate on router subinterfaces; no SVI addresses are needed. Each /30 uses two ports on the same switch, so no additional inter-switch VLAN transport is required for these links.

Use `add` on existing trunk allowed lists to preserve ISP100/ISP101 VLANs. The new PE/RR ports are configured as trunks because their router interfaces use 802.1Q subinterfaces. Existing native VLAN settings remain unchanged; ISP102 VLANs 311 and 328–331 must remain tagged. Parent router ports must be enabled, as in file 001.

| Switch | VLAN | Router path |
| --- | --- | --- |
| SW27 | 328 | P1 Gi0/5 → Gi1/1; PE28 Gi0/0 → Gi2/1 |
| SW28 | 328 | P2 Gi0/5 → Gi1/1; PE28 Gi0/1 → Gi2/1 |
| SW211 | 329 | P3 Gi0/5 → Gi1/1; PE29 Gi0/0 → Gi2/2 |
| SW210 | 329 | P4 Gi0/5 → Gi1/1; PE29 Gi0/1 → Gi2/2 |
| SW29 | 331 | P1 Gi0/6 → Gi1/0; PE31 Gi0/0 → Gi2/1 |
| SW29 | 311 | P1 Gi0/7 → Gi1/1; RR11 Gi0/0 → Gi2/2 |
| SW212 | 331 | P3 Gi0/6 → Gi1/0; PE31 Gi0/1 → Gi2/1 |
| SW212 | 311 | P3 Gi0/6 → Gi1/0; RR11 Gi0/1 → Gi2/2 |
| SW214 | 330 | P2 Gi0/6 → Gi1/0; PE30 Gi0/1 → Gi2/1 |
| SW213 | 330 | P4 Gi0/6 → Gi1/0; PE30 Gi0/0 → Gi2/1 |

## SW27

```ios
vlan 328
 name ISP102-328
!
interface GigabitEthernet1/1
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 328
 no shutdown
!
interface GigabitEthernet2/1
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 328
 no shutdown
!
```

## SW28

```ios
vlan 328
 name ISP102-328
!
interface GigabitEthernet1/1
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 328
 no shutdown
!
interface GigabitEthernet2/1
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 328
 no shutdown
!
```

## SW211

```ios
vlan 329
 name ISP102-329
!
interface GigabitEthernet1/1
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 329
 no shutdown
!
interface GigabitEthernet2/2
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 329
 no shutdown
!
```

## SW210

```ios
vlan 329
 name ISP102-329
!
interface GigabitEthernet1/1
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 329
 no shutdown
!
interface GigabitEthernet2/2
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 329
 no shutdown
!
```

## SW29

```ios
vlan 311
 name ISP102-311
!
vlan 331
 name ISP102-331
!
interface GigabitEthernet1/0
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 331
 no shutdown
!
interface GigabitEthernet1/1
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 311
 no shutdown
!
interface GigabitEthernet2/1
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 331
 no shutdown
!
interface GigabitEthernet2/2
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 311
 no shutdown
!
```

## SW212

```ios
vlan 311
 name ISP102-311
!
vlan 331
 name ISP102-331
!
interface GigabitEthernet1/0
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 311,331
 no shutdown
!
interface GigabitEthernet2/1
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 331
 no shutdown
!
interface GigabitEthernet2/2
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 311
 no shutdown
!
```

## SW214

```ios
vlan 330
 name ISP102-330
!
interface GigabitEthernet1/0
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 330
 no shutdown
!
interface GigabitEthernet2/1
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 330
 no shutdown
!
```

## SW213

```ios
vlan 330
 name ISP102-330
!
interface GigabitEthernet1/0
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 330
 no shutdown
!
interface GigabitEthernet2/1
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 330
 no shutdown
!
```

## Verification

```ios
show vlan brief
show interfaces trunk
show spanning-tree vlan 311
show spanning-tree vlan 328
show spanning-tree vlan 329
show spanning-tree vlan 330
show spanning-tree vlan 331
```

Check the VLANs present on each switch and verify both ports of each listed path forward the relevant tagged VLAN.

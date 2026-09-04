# ISP103 switch VLAN transport

Apply before IS-IS and MPLS. VLANs 433–437 carry the tagged router subinterfaces shown on the ISP103 IPv4 page. Each /30 connects two ports on the same switch, so these links require no additional inter-switch VLAN transport or SVIs.

Use `add` to preserve existing ISP100, ISP101 and ISP102 trunk VLAN lists. Keep existing native VLAN settings; ISP103 service VLANs must remain tagged. Both VLANs 435 and 437 share Gi1/0 on SW29 and SW212, matching P1/P3 Gi0/6. New PE/RR ports use trunks because the routers terminate dot1Q subinterfaces.

## Physical port and VLAN inventory

| Switch | VLAN | P-router path | PE/RR path |
| --- | --- | --- | --- |
| SW27 | 433 | P1 Gi0/5 → Gi1/1 | ISP103-PE33 Gi0/0 → Gi2/2 |
| SW28 | 433 | P2 Gi0/5 → Gi1/1 | ISP103-PE33 Gi0/1 → Gi2/2 |
| SW211 | 434 | P3 Gi0/5 → Gi1/1 | ISP103-PE34 Gi0/0 → Gi2/3 |
| SW210 | 434 | P4 Gi0/5 → Gi1/1 | ISP103-PE34 Gi0/1 → Gi2/3 |
| SW29 | 435 | P1 Gi0/6 → Gi1/0 | ISP103-PE35 Gi0/0 → Gi3/0 |
| SW212 | 435 | P3 Gi0/6 → Gi1/0 | ISP103-PE35 Gi0/1 → Gi3/0 |
| SW214 | 436 | P2 Gi0/6 → Gi1/0 | ISP103-PE36 Gi0/1 → Gi2/2 |
| SW213 | 436 | P4 Gi0/6 → Gi1/0 | ISP103-PE36 Gi0/0 → Gi2/2 |
| SW29 | 437 | P1 Gi0/6 → Gi1/0 | ISP103-RR37 Gi0/0 → Gi2/3 |
| SW212 | 437 | P3 Gi0/6 → Gi1/0 | ISP103-RR37 Gi0/1 → Gi2/3 |

## SW27

```ios
vlan 433
 name ISP103-433
!
interface GigabitEthernet1/1
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 433
 no shutdown
!
interface GigabitEthernet2/2
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 433
 no shutdown
!
```

## SW28

```ios
vlan 433
 name ISP103-433
!
interface GigabitEthernet1/1
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 433
 no shutdown
!
interface GigabitEthernet2/2
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 433
 no shutdown
!
```

## SW211

```ios
vlan 434
 name ISP103-434
!
interface GigabitEthernet1/1
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 434
 no shutdown
!
interface GigabitEthernet2/3
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 434
 no shutdown
!
```

## SW210

```ios
vlan 434
 name ISP103-434
!
interface GigabitEthernet1/1
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 434
 no shutdown
!
interface GigabitEthernet2/3
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 434
 no shutdown
!
```

## SW29

```ios
vlan 435
 name ISP103-435
!
vlan 437
 name ISP103-437
!
interface GigabitEthernet1/0
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 435,437
 no shutdown
!
interface GigabitEthernet3/0
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 435
 no shutdown
!
interface GigabitEthernet2/3
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 437
 no shutdown
!
```

## SW212

```ios
vlan 435
 name ISP103-435
!
vlan 437
 name ISP103-437
!
interface GigabitEthernet1/0
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 435,437
 no shutdown
!
interface GigabitEthernet3/0
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 435
 no shutdown
!
interface GigabitEthernet2/3
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 437
 no shutdown
!
```

## SW214

```ios
vlan 436
 name ISP103-436
!
interface GigabitEthernet1/0
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 436
 no shutdown
!
interface GigabitEthernet2/2
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 436
 no shutdown
!
```

## SW213

```ios
vlan 436
 name ISP103-436
!
interface GigabitEthernet1/0
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 436
 no shutdown
!
interface GigabitEthernet2/2
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 436
 no shutdown
!
```

## Verification

```ios
show vlan brief
show interfaces trunk
show spanning-tree vlan 433
show spanning-tree vlan 434
show spanning-tree vlan 435
show spanning-tree vlan 436
show spanning-tree vlan 437
```

Check the VLANs present on each switch and confirm both ports of each path forward the tagged VLAN. Physical cabling must match the inventory above.

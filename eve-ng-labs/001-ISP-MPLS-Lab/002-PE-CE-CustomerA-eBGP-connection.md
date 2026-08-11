# Task 002 — Connect Customer A to a PE Router with eBGP

## Purpose

Add the first customer-edge router to the lab and use external BGP (eBGP) to exchange IPv4 prefixes between Customer A and the provider edge. This task introduces the PE-to-CE routing boundary without yet building an MPLS Layer 3 VPN between multiple customer sites.

## Status

**Planned.** Complete the topology and addressing decisions in this document after adding the CE router to the Draw.io and EVE-NG topologies.

## Prerequisites

- [Task 001](./001-base-objectives.md) completed
- Stable IGP and LDP operation in the provider core
- A new CE router added for Customer A
- One unused physical interface selected on PE1 or PE2
- A dedicated point-to-point PE-to-CE subnet
- At least one Customer A prefix to advertise
- Provider and customer BGP AS numbers selected

## Proposed Topology Change

The first Customer A site attaches to one PE router:

```text
Customer A LAN
      |
     CE-A
      |
     eBGP
      |
     PE1
      |
 ISP MPLS core
```

PE1 is used as the proposed attachment point. Change the document if the diagram places CE-A on PE2 instead.

## Devices and Roles

| Device | Role |
|---|---|
| CE-A | Customer A edge router; originates the customer prefix |
| PE1 | Provider edge; exchanges IPv4 routes with CE-A using eBGP |
| P1–P6 | Provider transit; unchanged by this task |
| PE2 | Remote provider edge; unchanged until a later service task |

## Interface and IP Addressing

The current diagram does not define the CE router or its addressing. Fill in this table when the topology is updated.

| Device | Interface | Connected To | IPv4 Address | Purpose |
|---|---|---|---|---|
| PE1 | `TBD` | CE-A | `TBD /30 or /31` | Provider side of PE-to-CE link |
| CE-A | `TBD` | PE1 | `TBD /30 or /31` | Customer side of PE-to-CE link |
| CE-A | Loopback0 or LAN interface | Customer A LAN | `TBD` | Customer prefix advertised to PE1 |

### BGP Parameters

| Parameter | Value |
|---|---|
| Provider AS | `TBD` |
| Customer A AS | `TBD` |
| PE neighbor address | `TBD` |
| CE neighbor address | `TBD` |
| Customer A advertised prefix | `TBD` |
| Address family | IPv4 unicast |

> [!NOTE]
> Do not invent production-style addresses or AS numbers in the device configurations. First add the CE router and labels to the diagram, then replace every `TBD` consistently.

## Technologies and Protocols

- IPv4 point-to-point PE-to-CE addressing
- eBGP
- IPv4 unicast route exchange
- BGP prefix origination with a `network` statement
- Inbound and outbound route validation
- Optional prefix filtering and maximum-prefix protection

## Objectives

1. Add CE-A to the diagram and EVE-NG topology.
2. Establish direct IPv4 connectivity between CE-A and PE1.
3. Establish an eBGP session between the customer and provider ASes.
4. Advertise at least one Customer A prefix from CE-A.
5. Verify that PE1 installs the customer prefix in the expected routing table.
6. Advertise only intended provider routes or a default route toward CE-A.
7. Confirm that customer routes do not leak into the provider IGP.
8. Apply basic BGP safety controls.

## Configuration Tasks

### 1. Update the Topology Source

- Add CE-A to `ISP-MPLS-Lab-Diagram.drawio`.
- Connect CE-A to an unused PE1 interface.
- Label both interfaces and the point-to-point subnet.
- Add the Customer A LAN or loopback prefix.
- Record the selected AS numbers.
- Replace the `TBD` values in this document.

### 2. Configure PE-to-CE Addressing

PE1 template:

```cisco
interface <PE1-CE-INTERFACE>
 description TO-CE-A
 ip address <PE-IP> <SUBNET-MASK>
 no shutdown
```

CE-A template:

```cisco
hostname CE-A
!
interface <CE-A-PE-INTERFACE>
 description TO-PE1
 ip address <CE-IP> <SUBNET-MASK>
 no shutdown
!
interface Loopback0
 description CUSTOMER-A-PREFIX
 ip address <CUSTOMER-A-HOST> <CUSTOMER-MASK>
```

Verify direct connectivity before configuring BGP.

### 3. Configure eBGP on PE1

```cisco
router bgp <PROVIDER-AS>
 bgp log-neighbor-changes
 neighbor <CE-IP> remote-as <CUSTOMER-A-AS>
 neighbor <CE-IP> description CUSTOMER-A
 !
 address-family ipv4 unicast
  neighbor <CE-IP> activate
 exit-address-family
```

### 4. Configure eBGP on CE-A

```cisco
router bgp <CUSTOMER-A-AS>
 bgp log-neighbor-changes
 neighbor <PE-IP> remote-as <PROVIDER-AS>
 neighbor <PE-IP> description PROVIDER-PE1
 !
 address-family ipv4 unicast
  network <CUSTOMER-A-NETWORK> mask <CUSTOMER-MASK>
  neighbor <PE-IP> activate
 exit-address-family
```

The `network` statement requires an exact matching route in the CE-A routing table.

### 5. Apply Basic Routing Policy

Create an explicit prefix list for the Customer A route and apply it inbound on PE1.

```cisco
ip prefix-list CUSTOMER-A-IN seq 10 permit <CUSTOMER-A-NETWORK>/<PREFIX-LENGTH>
!
router bgp <PROVIDER-AS>
 address-family ipv4 unicast
  neighbor <CE-IP> prefix-list CUSTOMER-A-IN in
  neighbor <CE-IP> maximum-prefix 10 80 restart 5
 exit-address-family
```

Decide what CE-A should learn from PE1. For this initial task, prefer either a filtered default route or a small explicit provider prefix set instead of the full provider routing table.

### 6. Preserve Provider-Core Isolation

- Do not enable MPLS on the CE-facing interface.
- Do not form an IS-IS adjacency with CE-A.
- Do not redistribute the customer BGP prefix into the provider IGP.
- P routers should continue to carry only provider infrastructure routes.

## Verification Commands

### Direct Connectivity

```cisco
show ip interface brief
show interfaces description
show ip arp
ping <PEER-IP>
```

### BGP Session and Routes

```cisco
show ip bgp summary
show ip bgp neighbors <PEER-IP>
show ip bgp
show ip bgp <CUSTOMER-A-NETWORK>/<PREFIX-LENGTH>
show ip route bgp
show ip prefix-list CUSTOMER-A-IN
```

### Provider Isolation

On a P router:

```cisco
show ip route <CUSTOMER-A-NETWORK> <CUSTOMER-MASK>
show isis database
show mpls ldp neighbor
```

The customer prefix should not appear in the P-router IGP table during this task.

## Expected Results

- The PE1-to-CE-A link is `up/up`.
- Each endpoint can ping the other's directly connected address.
- The eBGP session reaches `Established`.
- CE-A advertises only the approved Customer A prefix.
- PE1 receives and installs that prefix as a BGP route.
- CE-A receives only the routes allowed by the provider's outbound policy.
- The customer route is not redistributed into IS-IS.
- P routers remain unaware of Customer A prefixes.
- Existing MPLS underlay operation remains unchanged.

## Troubleshooting Notes

| Symptom | Likely Cause | Corrective Action |
|---|---|---|
| PE and CE cannot ping | Address, mask, interface, or EVE-NG link problem | Compare both ends and verify `up/up` state |
| BGP remains `Idle` | Missing route to peer or neighbor not configured | Verify direct reachability and neighbor addresses |
| BGP shows `Active` | TCP/179 unreachable, wrong peer address, or ACL | Test ping, inspect ACLs, and verify the physical link |
| `Bad peer AS` notification | `remote-as` does not match the peer's local AS | Correct the AS numbers on both routers |
| Session is established but no prefix arrives | Missing exact route or inactive address family | Check CE routing table, `network` mask, and neighbor activation |
| Prefix is rejected by PE1 | Prefix list does not match | Inspect prefix-list counters and exact prefix length |
| Customer prefix appears on P routers | Accidental redistribution into the IGP | Remove redistribution and verify IS-IS configuration |
| CE receives too many routes | Missing or incorrect outbound policy on PE1 | Apply an explicit outbound prefix list |

## Completion Checklist

- [ ] CE-A added to Draw.io
- [ ] CE-A added and cabled in EVE-NG
- [ ] PE-to-CE subnet documented
- [ ] Customer A prefix documented
- [ ] Provider and customer AS numbers documented
- [ ] All `TBD` placeholders replaced
- [ ] Direct PE-to-CE ping successful
- [ ] eBGP session established
- [ ] Customer prefix received on PE1
- [ ] Import and export policy verified
- [ ] Customer route absent from P-router IGP tables
- [ ] Task 001 MPLS checks still pass
- [ ] Final configurations saved

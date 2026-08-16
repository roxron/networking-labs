# Routing

## Protocol map

| Topic | Use | First checks |
|---|---|---|
| Static route | Simple reachability, default/backup paths | next-hop recursion, exit interface, AD |
| OSPF | Link-state IGP | area, network type, timers, MTU, authentication |
| EIGRP | Cisco-oriented advanced distance vector | AS/name, K-values, source subnet, authentication |
| IS-IS | Link-state IGP common in SP cores | level, area/NET, circuit type, MTU, authentication |
| BGP | Inter-AS and policy routing | TCP/179 reachability, ASN, address family, policy, next hop |

## Configuration workflow

1. Establish interface and underlay reachability.
2. Choose stable router IDs and document protocol boundaries.
3. Form adjacency/session before applying policy.
4. Originate only routes present in the RIB unless the design explicitly uses another mechanism.
5. Apply inbound/outbound policy with an explicit default disposition.
6. Validate control plane, RIB, FIB/CEF, and data plane separately.
7. Save only after expected convergence and rollback testing.

### Minimal OSPF example

```ios
router ospf <PROCESS_ID>
 router-id <ROUTER_ID>
 passive-interface default
 no passive-interface <TRANSIT_INTERFACE>
!
interface <TRANSIT_INTERFACE>
 ip ospf <PROCESS_ID> area <AREA_ID>
 ip ospf network point-to-point
```

```ios
show ip ospf neighbor
show ip ospf interface brief
show ip ospf database
show ip route ospf
show ip cef <PREFIX>
```

OSPF neighbors must agree on key link parameters; diagnose state transitions rather than immediately resetting the process. See Cisco’s [IOS XE OSPF guide](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_iro-cfg-0.html) and [RFC 2328](https://www.rfc-editor.org/rfc/rfc2328).

### Minimal eBGP example

```ios
router bgp <LOCAL_AS>
 bgp log-neighbor-changes
 neighbor <PEER_IP> remote-as <PEER_AS>
 ! Add update-source/ebgp-multihop only when the topology requires them.
 address-family ipv4 unicast
  neighbor <PEER_IP> activate
  neighbor <PEER_IP> route-map <OUT_POLICY> out
  network <PREFIX> mask <MASK>
 exit-address-family
```

```ios
show bgp ipv4 unicast summary
show bgp ipv4 unicast neighbors <PEER_IP>
show bgp ipv4 unicast <PREFIX>
show ip route <PREFIX>
show ip cef <PREFIX>
```

Do not assume “Established” means policy is correct. Compare received, accepted, best, installed, and advertised routes. BGP behavior and the decision process are defined by [RFC 4271](https://www.rfc-editor.org/rfc/rfc4271).

## Redistribution guardrails

- Prefer one-way redistribution at a clear boundary.
- Set metrics explicitly.
- Tag imported routes and deny the same tag on the return path.
- Filter to known prefixes; avoid broad mutual redistribution.
- Test failure and recovery paths for feedback loops and suboptimal routing.

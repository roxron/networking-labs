# 01 Review of Routing

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CCNP/CCNP_ROUTE by Grag Dicknson/01 Review of Routing`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CCNP / CCNP_ROUTE by Grag Dicknson. Content is preserved as historical study material; validate commands against the target platform and release.

```text
ROUTING Versus SWITCHING:
!
> Common question: what is the difference? 
> The line has been blurred in recent years
  > L3 switches can perform routing 
  > Larger routers can perform switching 
> The technical defference is the OSI layer they operate as 
  > Switches operate at L2 
  > Routers operate at L3 
!
!
!
ROUTING BASICS:
!
> Review of concepts learned at the CCNA level 
> Routers conect networks at Layer 3 
  > The L3 address is abstracted from L2 address 
> Forwarding decisions are made using teh routing table 
> Router ca ne Learned from various sources
  > Connected networks 
  > Static routes 
  > Dynamic routing protocols
! 
Routing Protocols:
!
> Routing protocols were touched on in the CCNA
  > More in-depth studies in CCNP ROUTE 300-101 
> Two categories of routing protocols:
  > IGP - Interior Gateway Protocol: Used within a singel AS (Autonomous System) 
  > EGP - Exterier Gateway Protocol: Used to connect multiple different AS 
!
!
!
ROUTING PROTOCOLS:
!
> As discussed, routing protocols populate learned routes
  > Routing Protocol determines the "best" route
  > Install that route in the routing table 
  > Different protocols use defferent methods
!
> Three defferent types of routing protocols: 
  > Distance-vector 
  > Link-state 
  > Path-Vector 
!
> Distance-Vector Protocols
  > Does not keep a network topology in memory 
    > Only knows "X hops in that direction"
  > Sends a full copy of the routing table at pre-set intervals
  > High convergence time (hold-down timers help) 
  > Potential for routing loops (split horizon and poison reverse helps) 
  > Protoco.s include RIP and EIGRP 
!
> Link-State protocols
  > Keep a topology map of the network on the router 
  > each router runs the SPF algorithm to determine the best path 
  > Install that route in the routing table 
  > Only sends link-state advertisements when needed 
  > Examples are OSPF and IS-IS 
!
> Path-Vector protocols 
  > Practically identical to Distance-Vector protocols 
  > Keeps a database of destinations and the path to reach them 
  > Example is BGP
!
!
!
FRANE RELAY NETWORKING:
!
> The exam calls for you to describe frame relay 
> Frame relay describes both layer 1 and layer 2 on a WAN 
> The end-user purchases a local loop into the provider's cloud
> The provider takes the frame from the end user and switches ot to the destination 
  > Using a Permanent Virtual Circuit (PVC)
!
> Frame relay uses a DLCI as logical address
> The DLCI is locally significant 
  > Used by the recipient to identify the traffic origin 
  > Can have multiple DLCIs on the same physical circuit 
> You can use Frame Relay to set up a mesh between all your localtions
  > Full or partial 
  > Hub-and-spoke 
!
!
!
End of the Review of Routing!!!
```

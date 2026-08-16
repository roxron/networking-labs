# 02 Basic EIGRP

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CCNP/CCNP_ROUTE by Grag Dicknson/02 Basic EIGRP`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CCNP / CCNP_ROUTE by Grag Dicknson. Content is preserved as historical study material; validate commands against the target platform and release.

```text
BASIC EIGRP:
!
EIGRP Overview:
!
> EIGRP is one of the simpler routing protocols to get up and running 
> The exam requires us to know a great deal about how the protocol works internally for planning
> We also need to verify that EIGRP is performing according to plan 
> This is an overview of how the protocol works with more in-depth discussion later 
!
> EIGRP was Cisco proprietary but was converted to an open standard in 2013 
> Is a distance-vector but incorporates some features of link-state protocols
  > Sends update packets on link changes 
  > Maintains neighbor adjacencies using hello packets 
  > Calculates a loop-free path through the network using the feasibility condition 
!
> Uses two internal tables: 
  > Neighbor Table: A table of directly connected routes that also run EIGRP 
  > Topology Table: Used to keep routes learned from neighbor routers. Successor routes are installed in the routing table
> Supports CIDR and VLSM 
> Supports load balancing 
!
> Enabled with "router eigrp [as]" command 
> Use the "network [network] [wildcard mask]" to add specific networks to the process 
  > Enables EIGRP hello packets on those interfaces: 
 --------------------------------
 | roiter eigrp 100             |
 | network 10.10.10.0 0.0.0.255 |
 | no auto-summary              |
 |______________________________
 !
!
!
EIGRP Neighbor relationships:
!
> EIGPR maintains an active relationship with directly connected neighbor routers 
> When enabled on an interface using the "network" command, hello packets are sent:
  > Using multicast address 224.0.0.10 
  > Protocol ID 88 
!
> When a hello packet is received, an init packet is sent back if parameters match:
   > K-values
   > AS Number
   > IP network 
   > Authentication (if used) 
> Simply an acknowledgement that the hello was received 
> Contains the same sequence number as in the hello 
!
> When this initial reply is received back, the original router replies with an INIT of its own 
> Ths completes the three-way-handshake
> Full routes are sent afterwards
> As long as hellos packets are received the adjacency is"up"
  > hold timer determines how long to wait 
  > You can seet the hold timer lower than the hello interval (this is a Bad Thing)
!
> You can manually define neighbors, but:
  > This disables all multicast processing on the interface 
  > Neighbors must be statically defined on the both ends 
> Thsi forces EIGRP to use unicast communication instead of multicast 
!
!
EIGRP Route Selection:
!
> EIGRP uses a composite metric to determine best routes 
  > Does not use a single component 
> If configured uses bandwidth, delay, load and relibility 
> The K-values act as variables in the formula 
  > Do not correspond with specific elements of the metric 
  > By default K1 and K3 are 1 and the rest are 0 
> Full Formula: 
               [(K1*Bandwidth + K2*Bandwidth/256-Load + K3*Delay) * K5/K4+Reliability] * 256 = EIGRP Metric 

> Short Formula: (Bandwidth+Delay) * 256
!
> Bandwidth is 10^7/(Minimum interface speed) 
> Delay is cumulative delay in 10s of microseconds 
> This formula generates the metric (distance) for the route 
  > The route with the lowest distance is the successor route nd is installed in the routing table and advertisd 
  > Higher-cost routes that are also valid (i.e. loop-free) are called "feasible successor" routes
  > used as a backup in case the primary fails 
!
> Route Calculation process is called DUAL (Diffusing Update Algorithm)
> Delay and minimum bandwidth are included in the EIGRP updates from neighbor 
> The router then calculates the cost to reach the destination network: this is called the feasible distance 
> This is in turn advertised to all neighbors as the reported distance or advertised distance
!
> Destinations that have a successor route are said to be in a passive state 
> Destinations changes to active state when the successor fails and there are no feasible successors 
!
> The "Feasibility Confition" determines which routes are loop-free:
  > If, for a destination, a neighbor router advertises a distance that is strictly lower 
    than our feasible distance, then this neighbor lies on a loop-free route to the destination 
  > Basically, if the neighbor's distance is lower than ours, it must be closer to the destination
!
!
Basic EIGPR Configuration:
!
R1(config)# router eigrp 10
R1(config-router)# no auto-summary 
R1(config-router)# network 10.0.0.0 0.0.0.3
R1(config-router)# network 172.16.0.0 0.0.255.255
R1(config-router)# network 192.168.10.0 0.0.0.255 
R1(config-router)# exit 
!
Verify Basic EIGRP:
!
R1# show ip eigrp neighbor
R1# show ip eigrp interfaces 
R1# show ip eigrp topology 
R1# show ip route eigrp 
!
!
Static Neighbor Configuration:
!
R1(config)# router eigrp 10 
R1(config-router)# neighbor 10.0.0.2 g0/0 
R1(config-router)# exit 
!
Verify Static Neighbor:
!
R1# show ip eigrp neighbor detail 
!
!
EIGRP Passive interface Configuration:
!
R1(config)# router eigrp 10 
R1(config-router)# passive-interface G0/3 
R1(config-router)# exit 
!
Verify Passive interface: 
!
R1# show ip protocols | include ^eigrp 
!
```

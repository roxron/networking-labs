# 04 Basic OSPF

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CCNP/CCNP_ROUTE by Grag Dicknson/04 Basic OSPF`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CCNP / CCNP_ROUTE by Grag Dicknson. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Basic OSPF:
!
Review of OSPF Concepts
!
> OSPF is a link-state routing protocol
> Every router in the routing domain knows about the etire network topology (Called Link-State Database) 
> Instead of advertising routes to neighbor routers, link-state protocol advertise links 
> Each router runs the SPF (Shortest Path First) algorithm to determine the best path through the network 
> Only runs SPF when it receives a link state change 
!
> Each router keeps a list of directly-connected router in a neighbor table 
> When a new neighbor adjacency is formed the entire LSDB (link-state database) is transfered to the new neighbor   
  > This is done by using Link-State Update (LSU) containing Link-State Advrtisements (LSA) 
!
!
> The list of link states (the LSDB) is kept in the topology table in teh router 
> The router runs the SPF algorithm against it 
> The resulting routes end up in the route table 
> The route table is not advertised to the neighbors 
> If an LSA is received, it is processed and propagated 
!
> OSPF Routers are organized into areas that split up the LSDB - LSAs are not flooded between areas 
> Area 0 is the Backbone area 
 > Router in Area 0 are called Backbone Routers 
 > Multi-area router are called Area Border Routers (ABR)
 > Routers only in one area are called Internal Routers
 > Edge router are called Autonomous System Border Routers (ASBR)
!
!
!
OSPF Metric Calculation:
!
> The OSPF metric is easier to calculate than EIGRP 
> Every interface is assigned a cost 
> The cost is the reference bandwidth ? configured bandwidth (dropping any decimals)
  > Reference bandwidth defaults to 100,00 Kbit (100 Mbit) 
  > Can be modified globally or per-interface 
  > Shoud be the same on all router in the network 
!
> This metric (and the corresponding networks) are advertised to neighbor using LSAs 
  > Different LSAs advertise different configuration items, this is covered later
> The router takes the LSAs advertised from neighbors, and builds the topology int memory 
> Interface costs are added to generate the metric 
> lowest cost metric is added to the route table 
!
!
Basic OSPF Configuration:
!
R1(config)# router ospf 10 
R1(config-router)# router-id 1.1.1.1 
R1(config-router)# network 10.0.0.0 0.0.0.3 area 0 
R1(config-router)# network 192.168.1.0 0.0.0.255 area 0
!
Verify OSPF:
!
R1# show ip ospf 
R1# show ip ospf database 
R1# show ip ospf neighbor
R1# show ip ospf interface 
R1# show ip ospf interface brief 
R1# show ip ospf rib
R1# show ip route ospf 
!
!
OSPF Neighborship on LANs
!
> Like EIGRP, OSPF maintains neighbor relationships
> Specific parameters must match 
> Routers can become neighbors, or fully-adjacent neighbors 
  > Fully adjacent neighbors directly exchange LSDB info 
  > On LANs, thos generally the R and BDR 
  > For others, the adjacency is formed but there is no database exchande
!
> OSPF sends hello packets on LAN interfaces 
  > Can be disabled with the passive-interface command
  > Can be specifically enable with the "ip ospf process-id area area" interface command 
> Sent to multicast address 224.0.0.5 
> Hello packets contains parameters about the sending router that are compared to derermine neighbor eligibility 
!
> Hello packet contains:
  * Router ID                      * Router priority 
  * Subnet mask                    * List of neighbors 
  * Area ID                        * Authentication digest 
  * Stub flag                      * DR/BDR IP address(es) 
  * Hello/Dead timers
!
> Specific papmeters must match to form adjacency 
  * IP address in same subnet 
  * Unique router ID 
  * Same area 
  * Not passive interface 
  * Hello/Dead timers 
  * Authentication 
  * MTU (will prevent LSA exchange)
!
!
!
OSPF DR and BDR Roles:
!
> OSPF elects a Designated Rouer and Backup Designated Rouer on broadcast networks 
> This is to cut down on the amount of bandwidth consumed by the routing protocol
  > If a full relationship is in place, LSAs are sent to all neighbors every times an event takes place 
  > With a DR/BDR, the LASs are sent to those routers and *they* flood the changes 
!
> The DR is elected by:
  * Router priority (default 1) - set to 0 to prevent it becoming a DR or BDR
  * if there is a tie for priority, highest router ID wins
> The BDR is elected the same way, it si the second highest priority RID 
> If DR fails, the BDR take its place
> if the BDR fails, a new election takes place 
!
!
!
OSPF Neighborship on WANs
!
> OSPF neighbors on WANs are similar to LANs 
> For the most part it "jist works" - OSPF detects the correct network type
> However, for the exam we will discuss the various OSPF network types and the differences between them 
> Of cource, a lab follows all this to explore the configurations 
!
> Network types:
  * Broadcast - Uses DR/BDR, dynamic neighbor discovery 
  * Point-to-Point - Dynamin neighbor discovery 
  * Nonbroadcast (NBMA) - Uses DR/BRD, no dynamic discovery 
  * Point-to-multipoint - Dynamic neighbor discovery 
  * Point-to-multipoint - nonbroadcst 
!
Change network type:
!
R1(config)# interface G0/0 
R1(config-if)# ip ospf network point-to-point 
!
!
!
OSPF Virtual Links 
!
> The two rules of OSPF:
  * There must be one and only one Area 0 
  * All other areas must connect to Area 0
> What about when that is not possible? 
  * Links failures may split Area 0 
  * Acquisitons may already run OSPF 
  * May need to split an exiting area because it's grown too big 
!
> We can use a virtual link to fix this 
> A virtual link creates a "tunnel" between two ABRs to get the traffic back to Area 0 
> Configured using area 0 virtual-link RID 
  * The area is the area that the packets transit to get to A 0 
  * The RID is the remote router ID that is onte the other end of the link
!
OSPF Virtual Link Configuration:
!
R1(config)# router ospf 10 
R1(config-router)# area 5 virtual-link 2.2.2.2
!
R2(config)# router ospf 10 
R2(config-router)# area 5 virtual-link 1.1.1.1
!
R1# show ip ospf virtual-link 
!
!
!
End of this Module!!!
```

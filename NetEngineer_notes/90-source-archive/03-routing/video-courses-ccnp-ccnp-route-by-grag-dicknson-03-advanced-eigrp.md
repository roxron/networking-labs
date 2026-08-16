# 03 Advanced EIGRP

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CCNP/CCNP_ROUTE by Grag Dicknson/03 Advanced EIGRP`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CCNP / CCNP_ROUTE by Grag Dicknson. Content is preserved as historical study material; validate commands against the target platform and release.

```text
ADVANCED EIGRP:
!
!
Tuning The EIGRP Metric:
!
> Most of time the default metric calculation works 
> There are times where you want certain parts to be more important 
> Adjust the K-Values 
 > Must be the same on all neighbors 
 > Will break adjacencies/routing when implemented 
!
Change K-Values:
!
R1(config)# router eigrp 10 
R1(config-router)# metric weights 0 1 0 1 0 0
!
!
Change Bandwidth and Delay:
!
R1(config)# interface g0/0 
R1(config-if)# bandwidth 100000
R1(config-if)# delay 500 
R1# show interfaces g0/0 
!
!
Tunning EIGRP Convergence:
!
> By default EIGRP sends hello packets: 
  > Every 5 seconds on LAN interface 
  > Every 60 seconds on WAN (serial, NBMA) interfaces 
> The host timer is 3 times the hello interval 
> This can be adjusted on a per-interface basis 
  > Hello timers do not have to match 
  > Make sure it's shorter that the hold timer 
  > Hold timer does not automatically change 
!
> Change Hello and Hold Timers:
!
R1(config)# interface G0/0 
R1(config-if)# ip hello-interval eigrp 10 1 
R1(config-if)# ip hold-time eigrp 10 3 
! 
Verify: 
R1# show ip eigrp interface G0/0 detait 
R1# show ip eigrp neighbors 
!
!
EIGRP Stub Routers:
!
> When an EIGRP route fails, it goes "active"
> This means that the router is actively searching for a route for this network 
> Sends query messages to all neighbors 
> Those neighbors in turn send query messages 
> This is not always a desired behavior 
  > some routes may never have routes 
  > Routes can get "stuck in active" 
!
> Routers that have only one path out can be set as a stub 
> This prevents the routers from being queried in the event of a failure 
 > Reduces convergence time 
 > Prevents branches from being used as a "transit" route 
> Prevents routes from being suck in active 
!
Configure EIGRP Stub: 
!
R1(config)# router eigrp 10 
R1(config-router)# eigrp stub 
!
Verify:
!
R1# show ip eigrp neighbors detail 
!
!
Load Balancig in EIGRP:
!
> When two routes have the same metric EIGRP add both to the routing table 
> CEF then forward traffic equally over the links 
> This works by default with EIGRP 
  > Default of four paths 
  > Maximum of six paths 
> Higher-metric routes do not make it into the routing table 
!
> Enable unequal cost load balancing using the variance command 
> Multiplier for the EIGRP metric
  > "Use routes that are x times worse that the best"
> Adds routes to the maximum 
> Only closer routes will be added 
!
Enable Unequal Load Balancing:
!
R1(config)# router eigrp 10 
R1(config-router)# variance 2 
!
!
EIGRP Route Summarization:
!
> Summarization takes several routes and "combines: them into a single advertisement 
> Solve several Issues: 
  > Smaller route tables 
  > Best metric advertied fron constituent routes 
  > Reduces queries - queries stop at summarizing router 
> Requires carefull planning and forethought ont the IP network 
!
> Like with anything, there are tradeoffs: 
  > All packets for the summarized routes flow to the summarizing router before being discarded 
  > Can cause sub-optimal routing if individual routes in the summary fail 
!
> Summarization is on by default ( remember "no auto-summary")
> This summarizes accoss classful boundaries 
> Manual summarization can also be done at any point in the network 
> You can summarize on individual links 
!
Configure EIGRP Summarization:
!
R1(config)# interface G0/1 
R1(config-if)# ip summary-address eigrp 10 192.168.0.0 255.255.252.0
!
!
Default Route in EIGRP: 
!
> Everyone needs a default route
> Many places configure a static route as the default (especially in branch locations) 
> However it is possible to advertise this
> Four basic mthods to advertise the default route 
!
> Default-network 
> Sends all unknown traffic to the destination where the specified default network lives
> Must be a classful network
> Bst to use a loopback address 
> Can be confusing to troubleshoot 
  > No actual "0.0.0.0" route 
  > No Gateway of last resort 
!
> Network 0.0.0.0 
> Add "all networks" to EIGRP on the router that has the proper default route 
> Caveat: the "ip route 0.0.0.0 0.0.0.0" must use an interface as next-hop 
> Does not work on multi-access connections  
!
> Summary 
> Summarize 0.0.0.0 on the proper interface(s) at the edge of the network 
> Can be difficult to configure in highly redundant networks 
> Otherwise, its one of the less painful methods 
!
> Redistribure static 
> Works if you have a static default route 
> Advertises the route out of all interfaces just like any other EIGRP route 
 > Allows for multi-path 
> Recommended to sue a route map on the redistribution
!
Configure EIGRP DEfault route: 
!
> Method 1: Default Network
!
R1(config)# ip default-network 192.168.200.0
R!(config)# 
!
!
> Method 2: Network 0.0.0.0 
!
R1(config)# router eigrp 10 
R1(config-router)# network 0.0.0.0 
R1(config-router)# exit
R1(config)# ip route 0.0.0.0 0.0.0.0 G0/0 
!
!
> Method 3: Summary Route 
!
R1(config)# interface G0/1
R1(config-if)# ip summary-address eigrp 10 0.0.0.0 0.0.0.0
!
!
> Method 4: Static Redistribution
!
R1(config)# ip route 0.0.0.0 0.0.0.0 50.0.0.1
R1(config)# router eigrp 10 
R1(config-router)# redistribute static metric 100000 10 255 1 1500 
!
!
!
End of this module!!!
```

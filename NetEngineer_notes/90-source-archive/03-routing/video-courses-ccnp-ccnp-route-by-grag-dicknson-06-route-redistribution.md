# 06 Route Redistribution

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CCNP/CCNP_ROUTE by Grag Dicknson/06 Route Redistribution`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CCNP / CCNP_ROUTE by Grag Dicknson. Content is preserved as historical study material; validate commands against the target platform and release.

```text
ROUTE REISTRIBUTION:
!
> Route redistribution is used to take routes from one routing domain and inject them inot another 
> Main use cases:
  * Mergers/Acquisitions
  * Large corporations with BGP Backbone 
  * Redistribute MPLS routes 
!
> Redistribution requires one or more routers that are in both routing domains 
  * For load balancing/redundancy multiple redistribution points can be used
  * This present speacial issues to consider 
> Different routing protocols use different metrics 
> Specify the metric values at the redistribution point 
!
Basic Redistribution:
!
R1(config)# router ospf 10 
R1(config-router)# redistribute eigp 10 subnets 
!
R1(config)# router eigrp 10 
R1(config-router)# redistribute ospf 10 metric 500000 10 255 1 1500 
!
!
!
Filtering Redistributed Routes:
!
> Basic route redistribution moves all routes 
> There are times where not all routes need to be advertised between routing domains
> This is controlled using two methods 
  * Route Maps - Used to limit routes based on a number of criteria, includeing route type (applied with distribute list)
  * Prefix List - Filters based on subnet and mask of the route 
!
> Route maps can match a route and change its parameters as it's redistributing 
  * The match keyword matches the route against an ACL or specifc attributes of route 
  * The set keyword (optional modifies parameters og the route in question 
> Work hand in hand with a standard ACL
!
> Prefix List filter just on the subnet range and mask 
> You can specify that mask lengths are between specific values 
> Very useful when you only care about the subnets and not metric type, tag etc
> Can not modify routes 
> They "expand" to fit futere routes that may be added
!
!
!
Route Loops in Redistribution 
!
> Redistributing on a singel router introduces a single point of failure 
> Most redistribution setups call for multiple redistribution points 
> This introduces the potential for routes redistributed into one routing domain to "loop" back to it through the other redistributing router 
!
> EIGRP and OSPF have built-in mechanisms to prevent this:
  * OSPF prefers internal routes over E1/E2 
  * EIGRP uses a higher administrative distance on external routes 
> This can be controlled with route tags and filters 
> Set and controlled in route maps 
!
> Route tag - a "coler" on a route that can be assigned at redistribution time:
  * Follows the route through the redistributin 
  * Does not affect the rote in any way 
> This allows you to filter routes tht have been redistributed so they are not added to the other routing domain
!
```

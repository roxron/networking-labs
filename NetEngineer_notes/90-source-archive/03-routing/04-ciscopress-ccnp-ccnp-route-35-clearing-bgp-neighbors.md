# 35 Clearing BGP Neighbors

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/35 Clearing BGP Neighbors`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
BGP clear Command Options 
-----------------------------------------------------------------------------------
Command                                Hard or Soft                    One or All Neighbors              Direction
clear ip bgp *                            Hard                                All                           Both
clear ip bgp 1.1.1.1                      Hard                                one                           Both
clear ip bgp 1.1.1.1 out                  Soft                                One                            Out
clear ip bgp 1.1.1.1 soft out             Soft                                One                            Out
clear ip bgp 1.1.1.1 in                   Soft                                One                            In
clear ip bgp 1.1.1.1 soft in              Soft                                One                            In
clear ip bgp * soft                       Soft                                All                            Both
Clear ip bgp 1.1.1.1 soft                 Soft                                One                            Both 

Use this command if you do clear ip bgp * soft in :
!
router bgp 500
neighbor [1.1.1.1] soft-reconfiguration inbound

Displaying the Results of BGP Filtering:
Use this commad to see BGP routes before Inbound Filter:
!
show ip bgp neighbors 1.1.1.1 received-routes
!
!
Use this command to see BGP routes after Outbound Filter:
!
show ip bgp neighbors 1.1.1.1 advertised-routtes
```

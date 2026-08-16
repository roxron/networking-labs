# 01 Troubleshooting Device Performance

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP TSHOOT/01 Troubleshooting Device Performance`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Command Reference :
!
used TCAM resources:
SW1# show platform tcam utilization 
!
display the current SDM template:
SW1# show sdm prefer
!
Displays a router’s ARP cache:
R1# show ip arp 
!
Shows a collection of interface statistics
R1# show interface 
!
Provides information about the number of TCP segment:
R1# show tcp statistics
!
Displays average CPU utilization:
SW1# show processes cpu 
!
Shows a graphical view of CPU utilization:
R1# show processes cpu history 
!
Displays multiple interface IP statistics:
R1# show ip interface 
!
Shows the contents of the fast cache:
R1# show ip cache
!
Displays information about the IP Input process on a router:
R1# show  processes cpu | include IP Input 
!
Displays the router’s Layer 3 forwarding information:
R1# show ip cef 
!
Verifies that a valid adjacency exists:
R1# show adjacency 
!
Displays destinations reachable through the combination of the specified egress interface and next-hop IP address.
R1# show ip cef adjacency G0/1 10.10.0.1 detail 
!
Provides information contained in a router’s adjacency table:
R1# show adjacency detail 
!
Displays information about packets forwarded by the router using a packet-switching mechanism other than CEF:
SW1# show memory not-cef-switched 
!
Shows information about memory availability on a route:
R1# show memory allocating-process totals 
!
Shows how many buffers (of various types) are currently free:
R1# show buffers 
!
Shows how much memory is being consumed by the various BGP processes of a router:
R1# show processes memory | include bgp 
!
Shows the memory available on the line cards of a router:
R1# show diag 
!
```

# 08 Router Performance Troubleshooting

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/08 Router Performance Troubleshooting`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
HIGH CPU UTILIZATION SOURCES 
> ARP INPUT 
> NET BACKGROUND PROCESS 
> IP BACKGROUND PROCESS 
> TCP TIMER PROCESS 

R1# show processes cpu history 
R1# show processes cpu | include ^CPU|^ PID|ARP Input 


HIGH MEMORY UTILIZATION SOURCES:
> CAUSE OF MEMORY SHORTAGES
  - NOT MEETING MINIMUM REQUIREMENT FOR IOS VERSION YOU ARE RUNNING
  - MEMORY LEAK (ios bug)
  - BUFFER LEAK (ios bug)
  - BGP (giant routing table)

R1# show processes memory
```

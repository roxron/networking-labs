# 07 Foundations  Switch Performance Troubleshooting

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/07 Foundations_ Switch Performance Troubleshooting`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
COMPONETS OF A CATALYST SWITCH:
!
> PORTS
> FORWARDING LOGIC (ASICS)
> BACKPLANE
> CONTROL PLANE 
! 
!
FOUNDATIONS: 

> UNDERSTANDING  SWITCH COMPONENTS 
> SWITCH TCAM OVERLOAD 
> WATCHING SWITCH PROCESSOR


TWO REASONS FOR SWITCH PERFORMANCE DECREASE:

> PORT ERRORS 
> DUPLEX MISMATCH 

COMMANDS TO DIAGNOSE:
S1# show interfaces counters 
S1# show interfaces counters errors
S1# show interfaces 
S1# show interfaces | include line protocol|duplex 
S1# show interfaces | include Half 


SDM Template Configuration:

S1# show sdm prefer 
S1(config)# sdm prefer ?
                  
              access 
              default 
              dual-ipv4-and-ipv6 
              routing 
              vlan 

CHECK TCAM UTILIZATION:

S1# show platform tcam utilization 


CPU UTILIZATION - SWITCH EDITION:

> SWITCH CPU UTILIZATION MATTERS - IT SHOULD REMAIN LOW 

> CISCO RECOMENDED 5% - 10%  MAXIMUM LEVELS OF PROCESSING 

> WHAT COULD CAUSE HIGH CPU? 
   
   - TCAM OVERLOAD (STP LOOP)
   - DBUG COMMAND LEFT RUNNING 
   - FREQUENT ROUTING OR FHRP UPDATES 
   - FREQUNT SNMP SCANS
```

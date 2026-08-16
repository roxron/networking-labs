# 36 Management%3a Troubleshooting IP SLA, SPAN, and RSPAN

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/36 Management%3a Troubleshooting IP SLA, SPAN, and RSPAN`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Management: Troubleshooting IP SLA, SPAN, and RSPAN:
!
IP SLA AND SPAN: WHAT CAN GO WRONG?:
!
> SLA SOURCE AND DESTINATION ADDRESS NEED TO BE REACHABLE FROM EACH END 
> SLA MUST BE STARTED / IP SLA RESPONDER ENABLE (IF NEEDED)
> SPAN SOURCE AND DESTINATION SESSION NUMBERS MUST MATCH ON LOCAL SWITCH 
> SPAN SOURCE OR DESTINATION INTERFACE MISCONFIGURED 
> RSPAN VLAN NOT IDENTIFIED OR ADDED TO TRUNK 
!
- show run | section sla 
- show ip sla application 
- show ip sla configuration 
- show ip sla statistics 
- debug ip sla trace <#>
- show run | section  monitor 
!
!
```

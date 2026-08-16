# 35 Management%3a Troubleshooting Syslog, SNMP, and NTP

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/35 Management%3a Troubleshooting Syslog, SNMP, and NTP`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Management: Troubleshooting Syslog, SNMP, and NTP:
!
SYSLOG/SNMP/NTP: WHAT CAN GO WRONG?:
!
> TIME SERVER UNREACHABLE / ACL BLOCKING ( UDP 123/161-162/514
> AUTHENTICATION MISMATCH 
> MISSING 'SERVICE TIMESTAMPS' COMMAND 
> MISSING 'SNMP-SERVER IFINDEX PERSIST' COMMAND 
> COMMUNITY STRING INCORRECT 
!
- show run | section ntp / snmp / logging 
- show ntp associations (detail) 
- debug ntp all 
- show logging 
!
!
```

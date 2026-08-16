# 37  Management%3a Troubleshooting Telnet and SSH

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/37  Management%3a Troubleshooting Telnet and SSH`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Management: Troubleshooting Telnet and SSH:
!
TELNET AND SSH: WHAT CAN GO WRONG?:
!
> IP ADDRESS OF THE DEVICE NOT REACHABLE 
> INCORRECT TRANSPORT PROTOCOLS DEFINED FOR VTY LINES 
> FORGOTTEN OR MISCONFIGURED 'LOGIN' AND 'PASSWORD' COMMAND 
> ACL (TCP 22. 23) OR MAXED OUT VTY LINES 
> INCORRECT SSH VERSION AND KEY SIZE USED 
!
- show run | s vty / aaa
- show run | s username 
- show user 
- show ssh 
!
!
```

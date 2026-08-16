# 23 CEF

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/23 CEF`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Disable Fast Switching and go back to Process Switching:
R1(config)# interface G0/0
R1(config-if)# no ip route-cache
!


Enable Fast Switching:
R1(config)# interface G0/0
R1(config-if)# ip route-cache
!

Enable Cisco Express Forwarding Globally:
R1(config)# ip cef
!
Enable CEF on an Interface:
R1(config)# interface G0/1
R1(config-if)# ip route-cache cef
!

Verify CEF:
R1# show ip interface G0/1
R1# show ip cef
R1# show adjacency detail
R1# show adjacency summary
R1# show cef not-cef-switched
R1# show cef interface g0/0
```

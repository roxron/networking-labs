# 51 uRPF

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/51 uRPF`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Unicast Reverse Path Forwarding

uRPF Sample Configuration:
!
interface FastEthernet1/0
ip address 192.168.1.1 255.255.255.0
ip verify unicast source reachable-via rx
!
... OUTPUT OMITTED ...
!
interface Serial2/0
ip address 172.16.0.1 255.255.255.252
ip verify unicast source reachable-via any allow-default
!
!
R1# show cef interface fa1/0
R1# show ip traffic
R1# show acess-list
R1# show ip interface fa1/0
```

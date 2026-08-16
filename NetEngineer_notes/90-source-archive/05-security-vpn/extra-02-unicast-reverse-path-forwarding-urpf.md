# 02 Unicast Reverse Path Forwarding (uRPF)

> Imported source note. Provenance: `NetEngineer_Journal/Extra/02 Unicast Reverse Path Forwarding (uRPF)`  
> Original source context: Extra. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R4(config)# access-list 50 deny any
R4(config)# inteface S2/1
R4(config-if)# ip verify unicast source reachable-via rx 50 

Verify uRPF
R4# show cef interface S2/1
R4# show ip traffic 
R4# show interface S2/1
```

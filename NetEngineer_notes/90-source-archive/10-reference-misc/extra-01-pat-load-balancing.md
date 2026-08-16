# 01 PAT Load-Balancing

> Imported source note. Provenance: `NetEngineer_Journal/Extra/01 PAT Load-Balancing`  
> Original source context: Extra. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# interface S0/0
R1(config-if)# ip nat outside
R1(config-if)# interface S0/1
R1(config-if)# ip nat outside
R1(config-if)# interface F0/0
R1(config-if)# ip nat inside
R1(config-if)# exit
R1(config)# ip access-list standard NAT 
R1(config-std-acl)# permit 192.168.0.0 0.0.0.255
R1(config-std-acl)# deny any
R1(config-std-acl)# exit
R1(config)# route-map NAT1 permit 10
R1(config-route-map)# match ip address NAT
R1(config-route-map)# match interface S0/0
R1(config-route-map)# exit
R1(config)# route-map NAT2 permit 10
R1(config-route-map)# match ip adderss NAT
R1(config-route-map)# match interface S0/1
R1(config-route-map)# exit
R1(config)# ip nat inside source route-map NAT1 interface S0/0 overload 
R1(config)# ip nat inside source route-map NAT2 interface S0/1 overload
```

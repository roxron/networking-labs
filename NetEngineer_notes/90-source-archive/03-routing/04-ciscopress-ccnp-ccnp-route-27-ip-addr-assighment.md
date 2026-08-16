# 27 IP Addr Assighment

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/27 IP Addr Assighment`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Static IP Address and Default Route Configuration:
R1# conf t
R1(config)# int s 1/0
R1(config-if)# ip address 10.1.1.2 255.255.255.252
R1(config-if)# no shutdown
R1(config-if)# exit
R1(config)# ip route 0.0.0.0 0.0.0.0 10.1.1.1
R1(config)# end
R1# show ip route


Dynamic IP Address Configuration:
R1# conf term
R1(config)# interface fa 0/1
R1(config-if)# ip address dhcp
R1(config-if)# end
R1#


Prevent a router from installing a static default route via DHCP:
R1(config)# interface G0/0
R1(config-if)# no ip dhcp client request router
```

# 41 IPv6 Addresss Assignment

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/41 IPv6 Addresss Assignment`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Manual IPv6 Address Assignment and Static Default Route Configuration:
R1# conf term
R1(config)# interface fa 0/0
R1(config-if)# ipv6 address 2000:1::2/64
R1(config-if)# exit
R1(config)# ipv6 route ::/0 2000:1::1
R1(config)# end
R1# ping 2000:a::1
```

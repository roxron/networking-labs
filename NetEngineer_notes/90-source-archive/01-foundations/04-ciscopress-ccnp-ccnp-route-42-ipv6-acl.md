# 42 IPv6 ACL

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/42 IPv6 ACL`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
IPv6 ACL Configuration and Verification:
R1# conf term
R1(config)# ipv6 access-list ALLOW_WEB
R1(config-ipv6-acl)# permit tcp any any eq www
R1(config-ipv6-acl)# permit tcp any any eq 443
R1(config-ipv6-acl)# exit
R1(config)# interface fa 0/0
R1(config-if)# ipv6 traffic-filter ALLOW_WEB out
R1(config-if)# end
R1# show access-lists
Client1# telnet 2000:a::1 80
```

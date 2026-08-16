# 14 IPV6 CBAC

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/IPV6/14 IPV6 CBAC`  
> Original source context: 01 CBTNUGGETS / IPV6. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R2(config)# ipv6 access-list OUTSIDE-IN in
R2(config-ipv6-acl)# permit udp any any eq 521
R2(config-ipv6-acl)# deny tcp any any 
R2(config-ipv6-acl)# exit 
R2(config)# interface G0/1
R2(config-if)# ipv6 traffic-filter OUTSIDE-IN in 
R2(config-if)# exit
R2(config)# ipv6 inspect name CBAC-Rule tcp audit-trail on 
R2(config)# ipv6 inspect name CBAC-Rule icmp audit-trail on
R2(config)# interface G0/1
R2(config-if)# ipv6 inspect CBAC-Rule out 
R2(config-if)# end 

R2# show ipv6 inspect config 
R2# show ipv6 inspect interfaces
R2# show ipv6 inspect sessions
```

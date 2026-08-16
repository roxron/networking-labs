# 47 Time-Based ACLs

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/47 Time-Based ACLs`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Time-Based ACL Configuration Example:
R1# conf term
R1(config)# time-range WEEKDAYS
R1(config-time-range)# periodic weekdays 8:00 to 17:00
R1(config-time-range)# exit
R1(config)# access-list 100 permit tcp any host 192.168.1.10 eq 80 time-range WEEKDAYS
R1(config)# interface serial 1/0
R1(config-if)# ip access-group 100 in
R1(config-if)# end
```

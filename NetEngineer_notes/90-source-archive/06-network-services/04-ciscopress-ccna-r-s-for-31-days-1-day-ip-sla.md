# 1 Day IP SLA

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNA R&S for 31 days/1 Day IP SLA`  
> Original source context: 04 CISCOPRESS / CCNA R&S for 31 days. Content is preserved as historical study material; validate commands against the target platform and release.

```text
IP SLA Configuration
R1(config)# ip sla 1
R1(config-ip-sla)# icmp-echo 192.168.1.5
R1(config-ip-sla-echo)# frequency 30
R1(config-ip-sla-echo)# exit
R1(config)# ip sla schedule 1 start-time now life forever
R1(config)# end
R1#
!
R1# show ip sla configuration
R1# show ip sla statistics
```

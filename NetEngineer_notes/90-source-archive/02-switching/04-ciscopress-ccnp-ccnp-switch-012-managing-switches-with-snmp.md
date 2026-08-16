# 012 Managing Switches with SNMP

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP SWITCH/012 Managing Switches with SNMP.txt`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Chapter 14. Managing Switches with SNMP:
!
Configuring SNMPv1:
!
Switch(config)# access-list 10 permit 192.168.3.99
Switch(config)# access-list 10 permit 192.168.100.4
Switch(config)# snmp-server community MonitorIt ro 10
Switch(config)# snmp-server host 192.168.3.99 MonitorIt
!
Configuring SNMPv2C:
!
Switch(config)# access-list 10 permit 192.168.3.99
Switch(config)# access-list 10 permit 192.168.100.4
Switch(config)# snmp-server community MonitorIt ro 10
Switch(config)# snmp-server host 192.168.3.99 version 2c MonitorIt
!
snmpwalk -v2c -c cisco 10.100.0.102
!
!
Configuring SNMPv3:
!
Switch(config)# access-list 10 permit 192.168.3.99
Switch(config)# access-list 10 permit 192.168.100.4
Switch(config)# snmp-server group NetOps v3 priv
Switch(config)# snmp-server user mymonitor NetOps v3 auth sha s3cr3tauth priv aes  128 s3cr3tpr1v 10
Switch(config)# snmp-server host 192.168.3.99 informs version 3 priv mymonitor
!
 snmpwalk -v3 -u RUSTEM -l authPriv -a MD5 -A cisco12345 -x DES -X cisco12345 10.100.0.102
```

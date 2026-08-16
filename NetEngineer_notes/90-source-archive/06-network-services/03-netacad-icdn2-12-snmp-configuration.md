# 12 SNMP Configuration

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN2/12 SNMP Configuration`  
> Original source context: 03 NETACAD / ICDN2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring SNMP:
R1(config)# snmp-server community cisconet rw SNMP_ACL
R1(config)# snmp-server location NOC_SNMP_MANAGER
R1(config)# snmp-server contact Rustem Saliev
R1(config)# snmp-server host 10.10.20.105 version 2c cisconet 
R1(config)# snmp-server enable trap 
R1(config)# ip access-list standard SNMP_ACL
R1(config-std-nacl)# permit 10.10.20.105

Verify SNMP:
R1# show snmp 
R1# show snmp community 


Configuring SNMPv3:
R1(config)# ip access-list standard PERMIT-ADMIN
R1(config-std-nacl)# permit 10.10.20.0 0.0.0.255
R1(config-std-nacl)# exit
R1(config)# snmp-server view SNMP-RO iso included
R1(config)# snmp-server group ADMIN v3 priv read SNMP-RO access PERMIT-ADMIN
R1(config)# snmp-server user RUSTEM ADMIN v3 auth sha cisco12345 priv aes 128 cisco54321
R1(config)# exit
R1#
```

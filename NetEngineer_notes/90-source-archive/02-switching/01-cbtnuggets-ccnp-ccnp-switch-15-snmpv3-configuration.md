# 15 SNMPv3 Configuration

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP SWITCH/15 SNMPv3 Configuration`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
SNMPv3 Configuration:
SW3(config)# snmp-server view ALL-ACCESS iso included 
SW3(config)# snmp-server group GROUP1 v3 priv read ALL-ACCESS 
SW3(config)# snmp-server user RUSTEM GROUP1 v3 auth sha Cisco12345 priv des56 asdf12345
```

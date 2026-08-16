# 08 PortSecurity

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP SWITCH/08 PortSecurity`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP SWITCH. Content is preserved as historical study material; validate commands against the target platform and release.

```text
SW1(config)# interface range G0/1-10 
SW1(config-if-range)# switchport mode access
SW1(config-if-range)# switchport port-security 
SW1(config-if-range)# switchport port-security maximum 10
SW1(config-if-range)# switchport port-security violation shutdown 
SW1(config-if-range)# switchport port-security mac-address sticky 
SW1(config-if-range)# exit
SW1(config)# 

SW1# show port-security 
SW1# show port-security address 
SW1# show port-security interface G0/1
```

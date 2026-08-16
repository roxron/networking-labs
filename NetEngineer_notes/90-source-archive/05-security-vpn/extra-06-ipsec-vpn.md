# 06 IPsec VPN

> Imported source note. Provenance: `NetEngineer_Journal/Extra/06 IPsec VPN`  
> Original source context: Extra. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# crypto isakmp policy 1
R1(config-isakmp)# encryption aes
R1(config-isakmp)# authentication pre-share 
R1(config-isakmp)# exit
R1(config)# crypto isakmp key CISCO12345 address 0.0.0.0
R1(config)# crypto ipsec transform-set OUT-SET esp-aes
R1(cfg-crypto-trans)# exit
R1(config)# ip access-list extended 100
R1(config-ext-nacl)# permit ip 10.11.0.0 0.0.0.255 10.33.0.0 0.0.0.255
R1(config-ext-nacl)# exit
R1(config)# crypto map OUR-MAP 1 ipsec-isakmp
R1(config-crypto-map)# match address 100
R1(config-crypto-map)# set peer 10.23.0.3
R1(config-crypto-map)# set transform-set OUR-SET
R1(config-crypto-map)# exit
R1(config)# interface S0/0 
R1(config-if)# crypto map OUR-MAP
```

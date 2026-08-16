# 05 Built-in IOS Troubleshooting Tools

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNP/CCNP TSHOOT/05 Built-in IOS Troubleshooting Tools`  
> Original source context: 01 CBTNUGGETS / CCNP / CCNP TSHOOT. Content is preserved as historical study material; validate commands against the target platform and release.

```text
SHOW COMMANDS:
# show ip route 
# show ip route 10.33.0.0
# show ip route 10.243.0.0 longer-prefixes  
# show ip route 10.243.0.0 255.255.0.0 longer-prefixes 
# show ip interface brief 
# show processes cpu
# show processes cpu | include IP Input
# show processes cpu | exclude 0.00 
# show interfaces 
# show interfaces | include is up
# show interfaces | include is up|rate
# show interfaces | include is up| ( rate )
# show interfaces | include line protocols|error
# show tech-support 
# show tech-support redirect tftp://192.168.25.15/tech.txt
# ping 10.1.0.1 source 192.168.1.1 
# ping 10.1.0.1 size 1500 repeat 1000
# ping 10.1.0.1 size 1500 df-bit 
# telnet 10.1.0.1 80 

R1(config)# service tcp-small-server
```

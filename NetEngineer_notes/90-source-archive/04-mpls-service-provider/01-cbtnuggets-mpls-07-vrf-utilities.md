# 07 VRF Utilities

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/MPLS/07 VRF Utilities`  
> Original source context: 01 CBTNUGGETS / MPLS. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1# ping vrf CUST_A 192.168.0.1
R1# show ip route vrf CUST_A
R1(config)# ip route vrf CUST_A 10.10.10.0 255.255.255.0 172.16.1.1
R1# traceroute vrf CUST_A 172.16.1.1
R1# telnet 192.168.1.1 /vrf CUST_A
R1# traceroute mpls ipv4 10.100.0.200 255.255.255.255
```

# 05 Configure DHCP Services

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CIsco ASA/04 Basic Settings/05 Configure DHCP Services`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CIsco ASA / 04 Basic Settings. Content is preserved as historical study material; validate commands against the target platform and release.

```text
DHCP Server:
!
asa(config)# dhcpd address 192.168.1.131-192.168.1.175 inside 
asa(config)# dhcpd dns 8.8.8.8
asa(config)# dhcpd domain ciscoasa.lab
asa(config)# dhcpd enable inside 
!
asa# show dhcpd binding
asa# show dhcpd statistics
!
!
DHCPv4 Relay Agent:
!
asa(config)# dhcprelay server 10.20.12.5 outside 
asa(config)# dhcprelay enable dmz
!
or
!
asa(config)# interface G0/0
asa(config-if)# dhcprelay server 10.3.4.5
!
DHCP relay trust and timeouts:
!
asa(config)# dhcprelay information trust-all
asa(config)# dhcprelay timeout 30
!
!
DHCPv6 Relay Agent:
!
asa(config)# ipv6 dhcprelay server 1ffc:c00:6:a8bb:aaff:f123:1234 outside 
asa(config)# dhcprelay enable dmz 
!
!
Verify DHCP relay:
!
asa# show dhcprelay statistics
!
```

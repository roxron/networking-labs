# 04 Dynamic ARP Inspection

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/04 Dynamic ARP Inspection`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Verify dhcp snooping table:
!
# show ip dhcp snooping binding
!
Configure DAI:
!
SW1(config)# ip arp inspection vlan 10
SW1(config)# end
SW1# show ip arp inspection vlan 10
SW1# show ip arp inspection statistics vlan 10 
!
!
Enable trunk port as trusted:
SW1(config)# interface g0/0 
SW1(config-if)# ip arp inpection trust 
SW1(config-if)# 
!
!
Limit ARP packets rate on untrusted ports:
!
SW1(config)# interface g0/1
SW1(config-if)# ip arp inspection limit rate 10
!
!
Configure ARP ACL:
!
SW1(config)# arp access-list MY_ARP_ACL 
SW1(config-arp-nacl)# permit ip host 192.168.10.1 mac 0011.a1f1.1234 0.0.0.0
SWconfig-arp-nacl)# end
SW1# show arp access-list 
SW1(config)# ip arp inspection filter MY_ARP_ACL vlan 10
!
SW1# show interface status err-disabled
!
!
Err Disable Port Auto no shutdown:
!
SW1(config)# errdisable recovey cause arp-insperction
SW1(config)# errdisable recovery interval 30
```

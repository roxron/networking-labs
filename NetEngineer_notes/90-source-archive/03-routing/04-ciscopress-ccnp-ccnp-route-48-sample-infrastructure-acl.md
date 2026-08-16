# 48 Sample Infrastructure ACL

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/48 Sample Infrastructure ACL`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Sample Infrastructure ACL:
!
ip access-list extended INFRASTRUCTURE
!
! BLOCK PACKET FRAGMENTS
deny tcp any any fragments
deny udp any any fragments
deny icmp any any fragments
deny ip any any fragments
!
! ALLOW NECESSARY ROUTING PROTOCOL
! AND NETWORK MANAGMENT TRAFFIC
permit tcp host < external-bgp-peer > host < internal-bgp-peer > eq bgp
permit tcp host < external-bgp-peer > eq bgp host < internal-bgp-peer >
permit tcp < address-of-management-stations > any eq 22
permit tcp < address-of-management-stations > any eq 161
permit icmp < address-of-management-stations > any echo
!
! BLOCK ALL OTHER TRAFFIC DESTINED FOR INTERNAL NETWORK
deny ip any < address-space-of-internal-network >
!
! PERMIT OFF-NET TO OFF-NET TRAFFIC
permit ip any any
!
! APPLY ACL IN THE INBOUND DIRECTION TO AN INTERFACE
! CONNECTING TO AN EXTERNAL NETWORK
interface Serial1/0
ip access-group INFRASTRUCTURE in
```

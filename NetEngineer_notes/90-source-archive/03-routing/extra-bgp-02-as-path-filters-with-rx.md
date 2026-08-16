# 02 AS-PATH Filters with RX

> Imported source note. Provenance: `NetEngineer_Journal/Extra/BGP/02 AS-PATH Filters with RX`  
> Original source context: Extra / BGP. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Using Regular Expressions:
!
MAtch Anything: ( Permit All or Deny All)
ip as-path access-list 1 deny .*
!
Deny Anything that begin with specific ASN:
ip as-path access-list 2 deny ^65501_ 
!
Permint any as-path that ends with certain ASN:
ip as-path access-list 3 permit _65501$
!
Deny exact ASN:
ip as-path access-list 4 deny ^65501$
!
Deny Exact AS-PATH:
ip as-path access-list 50 deny ^65501 64950 251$
!
Deny any path that has passed certain ASN:
ip as-path access-list 60 deny _65501_
!
Permit ASN locally originated:
ip as-path access-list 70 permit ^$
!
!
Deny specific ASN or ASN with 1 one character less:
it will match ASN 65501 or 6550:
ip as-path access-list 101 deny ^65501?$
!
Permit one ASN and empty []:
ip as-path access-list 200 permit ^(65501)?$   
!
Deny path that passed through either ASNs:
ip as-path access-list 300 deny _(65501) | (65515)_ 
!
Permit exact ASN and then any other ASN one more time:
ip as-path access-list 400 permint ^65501 [0-9]+$
!
Matches prefixes from AS 51 where AS 51 is behind one of our directly connected AS’es.
ip as-path access-list 401 deny ^([0-9]+)_51
!
Matches prefixes from the clients of directly connected AS 51.
ip as-path access-list 402 permit ^51_([0-9]+)
!
Matches prefixes from the clients of directly connected AS 51, where AS 51 might be doing AS PATH prepending.
ip as-path access-list 403 permit  ^(51_)+([0-9]+)
!
Matches prefixes from the clients of directly connected AS 51, where the clients might be doing AS PATH prepending.
ip as-path access-list 404 permit ^51_([0-9]+_)+
!
Matches prefixed from confederation peer 65200
ip as-path access-list 404 permit ^\65200\)
!
Directly connected ASes:
ip as-path access-list 405 permit ^[0-9]+$
```

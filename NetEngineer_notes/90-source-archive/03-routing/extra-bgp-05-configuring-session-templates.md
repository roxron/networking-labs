# 05 Configuring Session Templates

> Imported source note. Provenance: `NetEngineer_Journal/Extra/BGP/05 Configuring Session Templates`  
> Original source context: Extra / BGP. Content is preserved as historical study material; validate commands against the target platform and release.

```text
router bgp 500
 template peer-session bgp-top 
  update-source loopback100
  timers 30 90 
exit-peer-session 
!
template peer-session ibgp 
 remote-as 100
 password cisco
 inherit peer-session bgp-top 
exit-peer-session 
!
template peer-session ebgp
 ttl-security hops 2
 inherit peer-session bgp-top 
exit-peer-session
!
no synchronization 
bgp log-neighbor-changes
neighbor 192.168.255.2 inherit peer-session ibgp 
neighbor 192.168.255.3 inherit peer-session ibgp 
neighbor 192.168.255.4 remote-as 200
neighbor 192.168.255.4 inherit peer-session ebgp 
neighbor 192.168.255.4 password no_Access
neighbor 192.168.255.5 remote-as 300
neighbor 192.168.255.5 inherit peer-session ebgp
neighbor 192.168.255.5 password Do_Not_Tell 
no auto-summary
!
```

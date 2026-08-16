# 30 SSL VPNs

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/30 SSL VPNs`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configure Clientless SSL VPN:
!
webvpn        
 enable outside
 no anyconnect-essentials
 tunnel-group-list enable
group-policy Clientless internal
group-policy Clientless attributes
 vpn-tunnel-protocol ssl-clientless
 webvpn       
  url-list value Web-Servers
username rustem password LkSoLPvIm46gmLgc encrypted
username bob password WYJjW4wLJEYR0N/m encrypted privilege 0
username bob attributes
 vpn-group-policy Clientless
tunnel-group Clientless type remote-access
tunnel-group Clientless general-attributes
 default-group-policy Clientless
tunnel-group Clientless webvpn-attributes
 group-alias No-Client enable
 group-url https://10.99.0.2/No-Client enable
!
!
!
```

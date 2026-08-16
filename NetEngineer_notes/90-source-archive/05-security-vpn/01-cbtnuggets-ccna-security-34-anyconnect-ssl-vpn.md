# 34 AnyConnect SSL VPN

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/34 AnyConnect SSL VPN`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Create Group Policies:
!
ip local pool Pool-10.89 10.89.0.100-10.89.0.151 mask 255.255.255.0
access-list Split-Tunnel-Policy standard permit 10.89.0.0 255.255.255.0
group-policy GroupPolicy1 internal 
group-policy GroupPolicy1 attributes
 split-tunnel-policy tunnelspecified 
 split-tunnel-network-list value Split-Tunnel-Policy 
 address-pools value Pool-10.89
exit 
!
!
!
Create Anyconnect Connection Profile:
!
group-policy GroupPolicy1 attributes 
 vpn-tunnel-protocol ikev2 ssl-client
 dns-server none
 wins-server none
 default-domain none
exit 
tunnel-group TunnelGroup1 type remote-access
tunnel-group TunnelGroup1 general-atributes 
 default-group-policy GroupPolicy1
tunnel-group TunnelGroup1 webvpn-attributes
 group-alias anyconnect enable 
!
!
!
Enable AnyConnect on the interface with Identity Certificate:
!
webvpn 
 anyconnect image disk0:/anyconnect-win-4.5.04029-webdeploy-k9.pkg 1
 anyconnect enable 
ssl trust-point SDM_TrustPoint7 outside 
crypto ikev2 remote-access trustpoint ASDM_TrustPoint7 line 2
!
!
!
Create User:
!
username admin-user1 password cisco privilege 15
username admin-user1 attributes
 vpn-group-policy GroupPolicy1
exit
!
!
Verify Anyconnect VPN:
!
ASA# show vpn-sessiondb anyconnect 
!
```

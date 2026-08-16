# 31 Implementing Clientless SSL VPNs

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCNA SECURITY/31 Implementing Clientless SSL VPNs`  
> Original source context: 01 CBTNUGGETS / CCNA SECURITY. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Create Group Policy:
!
import webvpn url-list Manage-Routers disk0:/tmpAsdmImportFile363190
delete /nonconfirm disk0:/tmpAsdmImportFile363190
access-list Routers-Only webstyle permit url https://10.90.0.[8-9]:443 log default 
access-list Routers-Only webstyle permit url http://10.90.0.[8-9]/* log default 
access-list Routers-Only webstyle deny url any log default 
group-policy Network-Engineers internal 
group-policy Network-Engineers attributes
 vpn-session-timeout 15 
 vpn-tunnel-protocol ssl-clientless
 webvpn
  url-list value Manage-Routers
  filter value Routers-Only
  url-entry enable 
 exit
group-policy Network-Engineers attributes
 banner none
 banner value Welcome to Network Engineering Team.
exit 
!
!
!
Create Connection Profile:
!
dns domain-lookup outside 
tunnel-group NetEng type remote-access 
tunnel-group NetEng general-attributes
 default-group-policy Network-Engineers
tunnel-group NetEng webvpn-attributes
 group-alias network enable 
 group-url https://10.99.0.2/network enable
!
!
!
Create a new user:
!
username roxron password cjkdnf432523fdsF encrypted privilege 15
username roxron attributes 
 group-lock value NetEng
 vpn-group-policy Network-Engineers
exit 
!
!
Verify VPN:
!
ASA# show  vpn-sessiondb webvpn
```

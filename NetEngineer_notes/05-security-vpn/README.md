# Security and VPN

## Management-plane baseline (IOS/IOS XE template)

Stage AAA changes through console/OOB access and test a second session before closing the first.

```ios
hostname <HOSTNAME>
ip domain name <DOMAIN>
username <BREAK_GLASS_USER> privilege 15 algorithm-type scrypt secret <SECRET>
aaa new-model
aaa authentication login VTY-AUTH group radius local
aaa authorization exec VTY-AUTH group radius local if-authenticated
!
radius server <RADIUS_NAME>
 address ipv4 <RADIUS_IP> auth-port 1812 acct-port 1813
 key 0 <SHARED_SECRET>
!
ip access-list standard MGMT-SOURCES
 permit <MGMT_SUBNET> <WILDCARD>
 deny any log
!
crypto key generate rsa general-keys modulus 2048
ip ssh version 2
ip ssh authentication-retries 3
ip ssh time-out 60
!
line vty 0 15
 transport input ssh
 access-class MGMT-SOURCES in vrf-also
 login authentication VTY-AUTH
 authorization exec VTY-AUTH
 exec-timeout 10 0
```

Notes:

- Prefer stronger supported keys/algorithms and centralized secret management; 2048 bits is a compatibility floor, not a universal optimum.
- `service password-encryption` is obfuscation, not strong secret protection.
- Do not paste placeholder or lab secrets into production.
- `vrf-also`, type 8/9 secrets, SSH algorithms, and RADIUS syntax vary by platform/release.
- The journal’s `no access-class MNGT_ONLY in` removes the VTY restriction; the curated template intentionally applies the ACL.
- An OOB VRF also needs addressed interfaces, routing, DNS/NTP/RADIUS reachability, and tested return paths.

Cisco’s [IOS XE hardening guide](https://sec.cloudapps.cisco.com/security/center/resources/IOS_XE_hardening) covers management-plane protection and AAA fallback; its [SSH guide](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/sec_usr_ssh/configuration/xe-2/sec-usr-ssh-xe-2-book/sec-usr-ssh-sec-shell.html) documents hostname/domain/key prerequisites.

## Change validation

```ios
show ip ssh
show ssh
show aaa servers
show users
show access-lists MGMT-SOURCES
show vrf
show ip route vrf <MGMT_VRF>
ping vrf <MGMT_VRF> <RADIUS_IP> source <MGMT_INTERFACE>
```

Test centralized login, local fallback during a controlled server failure, authorization level, ACL rejection from a non-management source, and config persistence.

## ACL/NAT/VPN procedure

1. Define traffic direction and pre-/post-NAT addresses.
2. Write explicit permit/deny intent and account for implicit deny.
3. Identify routing and NAT order of operation for the platform.
4. Apply at the correct interface/direction or policy attachment point.
5. Clear counters only with operational approval, then generate test traffic.
6. Inspect ACL hits, translations, IKE/IPsec SAs, encaps/decaps, drops, and return routing.
7. Roll back the attachment before deleting policy objects.

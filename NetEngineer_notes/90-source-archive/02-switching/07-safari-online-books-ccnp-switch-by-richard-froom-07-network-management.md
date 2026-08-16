# 07 Network Management

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/BOOKS/CCNP SWITCH by Richard Froom/07 Network Management`  
> Original source context: 07 SAFARI ONLINE / BOOKS / CCNP SWITCH by Richard Froom. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Chapter 7. Network Management
!
AAA:
!
Configuring AAA:
!
To enable AAA:
!
SW1(config)# aaa new-model
!
!
Configure Local User:
!
SW1(config)# username Rustem privilege 15 secret cisco
!
Configuring RADIUS for Console and vty Access:
!
SW1(config)# radius server MyRadius
SW1(config-radius-server)# address ipv4 172.16.1.1
SW1(config-radius-server)# key cisco456
SW1(config-radius-server)# exit
!
SW1(config)# aaa group server radius MyGroup
SW1(config-sg-radius)# server name myRadius
!
!
Configure a login authentication:
!
SW1(config)# aaa authentication lgoin radius_list group MyGroup local 
!
!
Aplly authentication method to VTY line:
!
SW1(config)# line vty 0 15
SW1(config-line)# login authentication radius_list
!
!
!
Configuring TACACS+ for Console and vty Access:
!
Configure TACACS+ 
!
SW1(config)# tacacs server TAC_SERVER_1
SW1(config-server-tacacs)# address ipv4 10.10.99.25
SW1(config-server-tacacs)# key cisco
!
Add TACACS+ Server to Auth Group:
!
SW1(config)# aaa group server tacacs+ MyGroupTAC1
SW1(config-sg-tacacs+)# server name TAC_SERVER_1
!
!
Configure Login method:
!
SW1(config)# aaa authentication login default group MyGroupTAC1 local
SW1(config)# aaa authorization exec default group MyGroupTA1 local 
!
!
Aplly authentication method to VTY line:
!
SW1(config)# line vty 0 15 
SW1(config-line)# login authentication default 
!
!
!
!
Identity-Based Networking
!
IEEE 802.1X Configuration:
!
SW1(config)# aaa new-model
SW1(config)# radius server MyRadius
SW1(config-radius-server)# address ipv4 172.16.1.1 
SW1(config-radius-server)# key cisco
!
SW1(config)# aaa group server radius MyGroup
SW1(config-sg-radius)# server name MyRadius
!
SW1(config)# aaa authentication dot1x default group MyGroup 
SW1(config)# dot1x system-auth-control 
!
SW1(config)# interface G0/2
SW1(config-if)# dot1x port-control auto
or
SW1(config-if)# access-session port-control auto
snmp!
!
!l IP SLA Responder on Control V2 port 1167

Network Time Protocols:
!
Configuring the System Clock Manually:
!
SW1# show clock 
SW1# show clock detail 
!
SW1# clock set 12:13:00 10 January 2019 
!
SW1(config)# clock timezone EDT -5 
SW1(config)# clock summer-time EDT recurring
!
!
Disable NTP on an interface:
!
SW1(config-if)# ntp disable 
!
!
Limit Number of NTP sessions;
!
SW1(config)# ntp max-associations 100 
!
Use multiple NTP Sources:
!
SW1(config)# ntp server 10.10.10.10 prefer 
SW1(config)# ntp server 20.20.20.20 
!
Permit NTP by ACL:
!
SW1(config)# access-list 123 permit udp host 10.10.10.10 eq ntp 
!
!
Verify NTP:
!
SW1# show ntp status 
SW1# show ntp associations 
!
!
Syncronize hardware time:
!
SW1(config)# ntp update-calender 
!
!
Securing NTP:
!
NTPServer(config)# ntp authentication-key 1 md5 MyPassword
NTPServer(config)# ntp authenticate
NTPServer(config)# ntp trusted-key 1
!
NTPClient(config)# ntp authentication-key 1 md5 MyPassword
NTPClient(config)# ntp authenticate
NTPClient(config)# ntp trusted-key 1
NTPClient(config)# ntp server 10.0.1.22 key 1
!
!
NTP Access-group:
!
Router(config)# access-list 1 permit 10.0.1.0 0.0.255.255
Router(config)# ntp access-group peer 1
!
Router(config)# access-list 1 permit 10.1.0.0 0.0.255.255
Router(config)# ntp access-group server-only 1
!
!
Configure NTPv4:
!
SW1(config)# ntp server 2001:DB8:1000:AA::10 version 4 
!
SW1(config)# ntp peer 2001:DB8:1000:BB::2 version 4
!
SW1(config)# ntp multicast IPv6-address
!
SW1(config-if)# ntp multicast client 
!
!
!
SNTP:
!
Configure SNTP:
!
SW1(config)# snpt server 10.10.10.10
!
show sntp 
debug sntp packets 
!
!
!
!
SNMP:
!
SNMPv3 Configuration Example:
!
Switch(config)# access-list 99 permit 10.1.1.0 0.0.0.255
Switch(config)# snmp-server view OPS sysUpTime included
Switch(config)# snmp-server view OPS ifDescr included
Switch(config)# snmp-server view OPS ifAdminStatus included	
Switch(config)# snmp-server view OPS ifOperStatus included
Switch(config)# snmp-server user userZ groupZ v3 auth sha secretpwd2 priv aes 256  secondsecretpwd2
Switch(config)# snmp-server enable traps
Switch(config)# snmp-server host 10.1.1.50 traps version 3 priv userZ cpu port-security
Switch(config)# snmp-server ifindex persist
!
!
Verify SNMPv3:
!
show snmp 
show snmp view 
show snmp group 
show snmp user
end

Use SNMP_WALK on Ubuntu to test snmpv3:
!
#  snmpwalk -v3 -u RUSTEM -l authPriv -a MD5 -A cisco12345 -x DES -X cisco12345 10.100.0.102	
!
```

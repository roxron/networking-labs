# 12 Day LAN Security and Device Hardening

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNA R&S for 31 days/12 Day LAN Security and Device Hardening`  
> Original source context: 04 CISCOPRESS / CCNA R&S for 31 days. Content is preserved as historical study material; validate commands against the target platform and release.

```text
LAN Security and Device Hardening:
!
Port Security Configuration Example:
!
S1(config)# interface range fa 0/5 - fa 0/24
S1(config-if-range)# switchport mode access
S1(config-if-range)# switchport port-security
S1(config-if-range)# switchport port-security maximum 3
S1(config-if-range)# switchport port-security violation restrict
S1(config-if-range)# switchport port-security mac-address sticky
!
!
Port Security Verification Command:
!
S1# show port-security 
S1# show port-security interface G0/5
S1# show port-security address 
!
!
Port Restoration After a Violation:
!
S1# show interface fa0/18 status
S1# show port-security interface fastethernet 0/5
!
S1(config)# interface G0/5
S1(config-if)# shutdown 
S1(config-if)# no shutdown 
!
!
!
LAN Threat Mitigation:
!
Configuring the Native and Management VLAN:
!
S1(config)# vlan 86
S1(config-vlan)# name Management&Native
S1(config-vlan)# interface vlan 86
S1(config-if)# ip address 10.10.86.10 255.255.255.0
S1(config-if)# no shutdown
S1(config-if)# ip default-gateway 10.10.86.254
S1(config)# interface range fa0/1 - 2
S1(config-if-range)# switchport mode trunk
S1(config-if-range)# switchport trunk native vlan 86
S1(config-if-range)#
!
!
Assigning Unused Ports to a Black Hole VLAN:
!
S1(config)# vlan 999
S1(config-vlan)# name BlackHole
S1(config-vlan)# interface range fa0/20 - 24
S1(config-if-range)# shutdown
S1(config-if-range)# switchport mode access
S1(config-if-range)# switchport access vlan 999
S1(config-if-range)#
!
!
!
SSH Configuration:
!
Configuring SSH Remote Access on a Switch:
!
S1# show ip ssh
!
S1# conf t
S1(config)# ip domain-name cisco.com
S1(config)# crypto key generate rsa
!
S1(config)# line vty 0 15
S1(config-line)# login local
S1(config-line)# transport input ssh
S1(config-line)# user admin password ccna
!
1(config)# ip ssh version2
S1(config)# ip ssh authentication-retries 5
S1(config)# ip ssh time-out 60
S1(config)# end
S1# show ip ssh
!
!
To remove the RSA key pair:
!
crypto key zeroize rsa
!
```

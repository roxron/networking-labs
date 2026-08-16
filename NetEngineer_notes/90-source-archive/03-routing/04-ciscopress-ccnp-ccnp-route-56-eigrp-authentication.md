# 56 EIGRP Authentication

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/56 EIGRP Authentication`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
EIGRP for IPv4 Authentication Configuration:
!Configuration on Router R1
key chain R1KEYCHAIN
key 1
key-string PRIMARY_KEY
accept-lifetime 01:00:00 Apr 1 2014 01:00:00 May 2 2014
send-lifetime 01:00:00 Apr 1 2014 01:00:00 May 2 2014
key 2
key-string SECONDARY_KEY
accept-lifetime 01:00:00 May 1 2014 infinite
send-lifetime 01:00:00 May 1 2014 infinite
!
interface Serial1/0
ip address 10.1.1.1 255.255.255.252
ip authentication mode eigrp 1 md5
ip authentication key-chain eigrp 1 R1KEYCHAIN
!
router eigrp 1
network 0.0.0.0
!
!
!
!Configuration on Router R2
key chain R2KEYCHAIN
key 1
key-string PRIMARY_KEY
accept-lifetime 01:00:00 Apr 1 2014 01:00:00 May 2 2014
send-lifetime 01:00:00 Apr 1 2014 01:00:00 May 2 2014
key 2
key-string SECONDARY_KEY
accept-lifetime 01:00:00 May 1 2014 infinite
send-lifetime 01:00:00 May 1 2014 infinite
!
interface Serial1/0
ip address 10.1.1.2 255.255.255.252
ip authentication mode eigrp 1 md5
ip authentication key-chain eigrp 1 R2KEYCHAIN
!
router eigrp 1
network 0.0.0.0
!
!
R2# show key chain 
R2# show ip eigrp neighbors
R2# show ip eigrp interface g0/0



EIGRP for IPv6 Authentication Configuration:
!Configuration on Router R1
key chain R1KEYCHAIN
key 1
key-string PRIMARY_KEY
accept-lifetime 01:00:00 Apr 1 2014 01:00:00 May 2 2014
send-lifetime 01:00:00 Apr 1 2014 01:00:00 May 2 2014
key 2
key-string SECONDARY_KEY
accept-lifetime 01:00:00 May 1 2014 infinite
send-lifetime 01:00:00 May 1 2014 infinite
!
interface Serial1/0
ipv6 address 2002::1/64
ipv6 eigrp 100
ipv6 authentication mode eigrp 100 md5
ipv6 authentication key-chain eigrp 100 R1KEYCHAIN
!
ipv6 router eigrp 100
eigrp router-id 1.1.1.1
!
!
!
!Configuration on Router R2
key chain R2KEYCHAIN
key 1
key-string PRIMARY_KEY
accept-lifetime 01:00:00 Apr 1 2014 01:00:00 May 2 2014
send-lifetime 01:00:00 Apr 1 2014 01:00:00 May 2 2014
key 2
key-string SECONDARY_KEY
accept-lifetime 01:00:00 May 1 2014 infinite
send-lifetime 01:00:00 May 1 2014 infinite
!
interface Serial1/0
ipv6 address 2002::2/64
ipv6 eigrp 100
ipv6 authentication mode eigrp 100 md5
ipv6 authentication key-chain eigrp 100 R2KEYCHAIN
!
ipv6 router eigrp 100
eigrp router-id 2.2.2.2
!
!
R1# show key chain 
R1# show ipv6 eigrp neighbors
R1# show ipv6 eigrp interface G0/0



Named EIGRP Authentication Configuration:
!Configuration on Router R1
key chain R1KEYCHAIN
key 1
key-string PRIMARY_KEY
accept-lifetime 01:00:00 Apr 1 2014 01:00:00 May 2 2014
send-lifetime 01:00:00 Apr 1 2014 01:00:00 May 2 2014
key 2
key-string SECONDARY_KEY
accept-lifetime 01:00:00 May 1 2014 infinite
send-lifetime 01:00:00 May 1 2014 infinite
!
interface FastEthernet0/0
ip address 172.16.1.1 255.255.255.0
!
interface Serial1/0
ip address 10.1.1.1 255.255.255.252
!
router eigrp AUTH_DEMO
!
address-family ipv4 unicast autonomous-system 2
!
af-interface Serial1/0
authentication mode md5
authentication key-chain R1KEYCHAIN
exit-af-interface
!
topology base
exit-af-topology
network 0.0.0.0
exit-address-family
```
